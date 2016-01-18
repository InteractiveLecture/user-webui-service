package main

import (
	"flag"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"

	"github.com/InteractiveLecture/middlewares/groupware"
	"github.com/InteractiveLecture/middlewares/jwtware"
	"github.com/InteractiveLecture/serviceclient"
	"github.com/gorilla/mux"
	"github.com/koding/websocketproxy"
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
	resolver := serviceclient.ConsulDnsAddressResolver{"discovery:53"}

	// Posten der Login-daten
	r.Methods("POST").
		Path("/login").
		Handler(createProxy(
		"authentication-service",
		"/oauth/token", resolver))

	//Topics Pfade
	// ---------------

	// GET, POST
	r.Path("/topics").
		Handler(
		//jwtware.New(
		jwtWrapper(createProxy(
			"lecture-service",
			"/topics", resolver), *auth),
		//),
	)

	/*	r.Path("/topics").Methods("GET").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hallo Welt"))
	})*/
	// GET, DELETE; PUT
	r.Path("/topics/{id}").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/topics/{id}", resolver), *auth))

	// GET; POST
	r.Path("/topics/{id}/modules").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/topics/{id}/modules", resolver), *auth))

	// POST; GET DELETE
	r.Path("/topics/{id}/officers").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/topics/{id}/officers", resolver), *auth))

	// POST; GET DELETE
	r.Path("/topics/{id}/assistants").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/topics/{id}/assistants", resolver), *auth))

	// HINTS Anfragen
	//---------------------

	// GET; POST; DELETE; PUT
	r.Path("/hint/{id}").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/hint/{id}", resolver), *auth))

	// Konsumiert den angebenen Hint
	r.Methods("POST").
		Path("/hint/{id}/consume").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/hint/{id}/consume", resolver), *auth))

	// USER Anfragen
	//---------------------

	// PUT; GET DELETE
	r.Path("/users/{id}").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/users/{id}", resolver), *auth))

	// Fügt einen weiteren User hinzu
	r.Methods("POST").
		Path("/users").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/users", resolver), *auth))

	r.Methods("GET").
		Path("/users/{id}/balances").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/users/{id}/balances", resolver), *auth))

	r.Methods("GET").
		Path("/users/{id}/exercises").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/users/{id}/exercises", resolver), *auth))

	// Exercises Pfade
	//----------------------------

	// GET; DELETE; POST; PUT
	r.Path("/exercises/{id}").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/exercises/{id}", resolver), *auth))

	// Erfolg einer Übung melden
	r.Methods("POST").
		Path("/exercises/{id}/success").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/exercises/{id}/success", resolver), *auth))

	// POST; GET
	r.Path("/exercises/{id}/hints").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/exercises/{id}/hints", resolver), *auth))

	// Modules Pfade
	//----------------------------

	r.Methods("POST").
		Path("/modules").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/modules", resolver), *auth))

	//GET;DELETE;PUT
	r.Path("/modules/{id}").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/modules/{id}", resolver), *auth))

	// GET; POST
	r.Path("/modules/{id}/recommendations").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/modules/{id}/recommendations", resolver), *auth))
	//DELETE
	r.Methods("DELETE").
		Path("/modules/{Tid}/recommendations/{Rid}").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/modules/{Tid}/recommendations/{Rid}", resolver), *auth))

	//GET; POST
	r.Path("/modules/{id}/exercises").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/modules/{id}/exercises", resolver), *auth))

	//TODO: Routen für Scripte festlegen. Dummy: /scripte

	r.Methods("POST").
		Path("/videos").
		Handler(jwtWrapper(createProxy(
		"media-service",
		"/", resolver), *auth))
	r.Methods("GET").
		Path("/videos/{id}").
		Handler(jwtWrapper(createProxy(
		"media-service",
		"/{id}", resolver), *auth))

	u, _ := url.Parse("http://example.com")
	wsp := websocketproxy.NewProxy(u)

	wsp.Dialer.Proxy = func(r *http.Request) (*url.URL, error) {
		address, err := resolver.Resolve("java-evaluation-service")
		if err != nil {
			return nil, err
		}
		return url.Parse(fmt.Sprintf("ws://%s/user-compiler", address))
	}
	r.Handle("/java-backend", jwtWrapper(wsp, *auth))
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("/app")))
	log.Println("listening on 8080")
	// Bind to a port and pass our router in
	log.Fatal(http.ListenAndServe(":8080", r))
}

func createProxy(service, servicePath string, resolver serviceclient.AddressResolver) http.Handler {
	log.Println("creating proxy...")
	handler := httputil.ReverseProxy{}
	handler.Director = func(r *http.Request) {
		log.Println("getting address..")
		address, err := resolver.Resolve(service)
		if err != nil {
			panic(err)
		}
		address = address + ":8080"
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
