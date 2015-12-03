package main

import (
	//"github.com/gorilla/context"
	"flag"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"time"

	"github.com/InteractiveLecture/middlewares/groupware"
	"github.com/InteractiveLecture/middlewares/jwtware"
	"github.com/InteractiveLecture/servicecache"
	"github.com/gorilla/mux"
	"golang.org/x/net/websocket"
)

func jwtWrapper(next http.Handler, auth bool) http.Handler {
	if !auth {
		return next
	}
	return jwtware.New(next)
}

func groupWrapper(next http.Handler, noGrp bool, groups ...string) http.Handler {
	if noGrp {
		return next
	}
	options := groupware.DefaultOptions(next, groups...)
	return groupware.New(options)
}

func main() {
	auth := flag.Bool("auth", true, "disable authentication requirements")
	flag.Parse()
	log.Println(*auth)
	r := mux.NewRouter()
	log.Println("configuring cache...")
	servicecache.Configure("discovery:8500", 10*time.Second, "authentication-service", "lecture-service")
	//serviceclient.Configure(cacheadapter.New("discovery:8500", 10*time.Second, 5*time.Second, 3))
	servicecache.Start(3, 5*time.Second)

	// Posten der Login-daten
	r.Methods("POST").
		Path("/login").
		Handler(createProxy(
		"*authentication-service",
		"/o*auth/token"))

	//Topics Pfade
	// ---------------

	// GET, POST
	r.Path("/topics").
		Handler(
		//jwtware.New(
		jwtWrapper(createProxy(
			"lecture-service",
			"/topics"), *auth),
		//),
	)

	/*	r.Path("/topics").Methods("GET").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hallo Welt"))
	})*/
	// GET, DELETE; PUT
	r.Path("/topics/{id}").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/topics/{id}"), *auth))

	// GET; POST
	r.Path("/topics/{id}/modules").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/topics/{id}/modules"), *auth))

	// POST; GET DELETE
	r.Path("/topics/{id}/officers").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/topics/{id}/officers"), *auth))

	// POST; GET DELETE
	r.Path("/topics/{id}/assistants").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/topics/{id}/assistants"), *auth))

	// HINTS Anfragen
	//---------------------

	// GET; POST; DELETE; PUT
	r.Path("/hint/{id}").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/hint/{id}"), *auth))

	// Konsumiert den angebenen Hint
	r.Methods("POST").
		Path("/hint/{id}/consume").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/hint/{id}/consume"), *auth))

	// USER Anfragen
	//---------------------

	// PUT; GET DELETE
	r.Path("/users/{id}").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/users/{id}"), *auth))

	// Fügt einen weiteren User hinzu
	r.Methods("POST").
		Path("/users").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/users"), *auth))

	// Exercises Pfade
	//----------------------------

	// GET; DELETE; POST; PUT
	r.Path("/exercises/{id}").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/exercises/{id}"), *auth))

	// Erfolg einer Übung melden
	r.Methods("POST").
		Path("/exercises/{id}/success").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/exercises/{id}/success"), *auth))

	// POST; GET
	r.Path("/exercises/{id}/hints").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/exercises/{id}/hints"), *auth))

	// Modules Pfade
	//----------------------------

	r.Methods("POST").
		Path("/modules").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/modules"), *auth))

	//GET;DELETE;PUT
	r.Path("/modules/{id}").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/modules/{id}"), *auth))

	// GET; POST
	r.Path("/modules/{id}/recommendations").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/modules/{id}/recommendations"), *auth))
	//DELETE
	r.Methods("DELETE").
		Path("/modules/{Tid}/recommendations/{Rid}").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/modules/{Tid}/recommendations/{Rid}"), *auth))

	//GET; POST
	r.Path("/modules/{id}/exercises").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/modules/{id}/exercises"), *auth))

	r.Handle("/java-backend", jwtWrapper(websocket.Handler(websocketHandler), *auth))
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("/app")))
	log.Println("listening on 8000")
	// Bind to a port and pass our router in
	log.Fatal(http.ListenAndServe(":8000", r))
}

func createProxy(service, servicePath string) http.Handler {
	log.Println("creating proxy...")
	handler := httputil.ReverseProxy{}
	handler.Director = func(r *http.Request) {
		log.Println("getting address..")
		address, _ := servicecache.GetServiceAddress(service)
		targetURL, err := url.Parse(fmt.Sprintf("http://%s%s", address, servicePath))
		if err != nil {
			panic(err)
		}
		log.Printf("forwarding from :%s  to: %s", r.Host, targetURL.String())
		r.Host = address
		r.URL = targetURL
	}
	return &handler
}

func websocketHandler(ws *websocket.Conn) {
	io.Copy(ws, ws)
}
