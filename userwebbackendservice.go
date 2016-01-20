package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"strings"

	"github.com/InteractiveLecture/middlewares/groupware"
	"github.com/InteractiveLecture/middlewares/jwtware"
	"github.com/InteractiveLecture/serviceclient"
	"github.com/gorilla/mux"
	"github.com/koding/websocketproxy"
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
		"/topics/{id}", resolver, "id"), *auth))

	// GET; POST
	r.Path("/topics/{id}/modules").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/topics/{id}/modules", resolver, "id"), *auth))

	// POST; GET DELETE
	r.Path("/topics/{id}/officers").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/topics/{id}/officers", resolver, "id"), *auth))

	// POST; GET DELETE
	r.Path("/topics/{id}/assistants").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/topics/{id}/assistants", resolver, "id"), *auth))

	// HINTS Anfragen
	//---------------------

	// GET; POST; DELETE; PUT
	r.Path("/hint/{id}").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/hint/{id}", resolver, "id"), *auth))

	// Konsumiert den angebenen Hint
	r.Methods("POST").
		Path("/hint/{id}/consume").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/hint/{id}/consume", resolver, "id"), *auth))

	// USER Anfragen
	//---------------------

	// PUT; GET DELETE
	r.Path("/user/{id}").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/users/{id}", resolver, "id"), *auth))

	// Fügt einen weiteren User hinzu
	r.Methods("POST").
		Path("/user").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/users", resolver), *auth))

	r.Methods("GET").
		Path("/user/{id}/balances").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/users/{id}/balances", resolver, "id"), *auth))

	r.Methods("GET").
		Path("/user/{id}/exercises").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/users/{id}/exercises", resolver, "id"), *auth))

	// Exercises Pfade
	//----------------------------

	// GET; DELETE; POST; PUT
	r.Path("/exercise/{id}").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/exercises/{id}", resolver, "id"), *auth))

	// Erfolg einer Übung melden
	r.Methods("POST").
		Path("/exercise/{id}/success").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/exercises/{id}/success", resolver, "id"), *auth))

	// POST; GET
	r.Path("/exercise/{id}/hints").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/exercises/{id}/hints", resolver, "id"), *auth))

	// Modules Pfade
	//----------------------------

	r.Methods("POST").
		Path("/module").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/modules", resolver), *auth))

	//GET;DELETE;PUT
	r.Path("/module/{id}").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/modules/{id}", resolver, "id"), *auth))

	// GET; POST
	r.Path("/module/{id}/recommendations").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/modules/{id}/recommendations", resolver, "id"), *auth))
	//DELETE
	r.Methods("DELETE").
		Path("/module/{tid}/recommendations/{rid}").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/modules/{tid}/recommendations/{rid}", resolver, "tid", "rid"), *auth))

	//GET; POST
	r.Path("/module/{id}/exercises").
		Handler(jwtWrapper(createProxy(
		"lecture-service",
		"/modules/{id}/exercises", resolver, "id"), *auth))

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
		"/{id}", resolver, "id"), *auth))

	u, _ := url.Parse("http://example.com")
	wsp := websocketproxy.NewProxy(u)
	log.Println(wsp)
	wsp.Backend = func(r *http.Request) *url.URL {
		address, err := resolver.Resolve("java-evaluation-service")
		if err != nil {
			panic(err)
		}
		u, err := url.Parse(fmt.Sprintf("ws://%s/user-compiler", address))
		if err != nil {
			panic(err)
		}
		return u
	}
	r.Handle("/java-backend", jwtWrapper(wsp, *auth))
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("/app")))
	log.Println("listening on 8080")
	// Bind to a port and pass our router in
	log.Fatal(http.ListenAndServe(":8080", r))
}

func createProxy(service, servicePath string, resolver serviceclient.AddressResolver, idFields ...string) http.Handler {
	handler := httputil.ReverseProxy{}
	handler.Director = func(r *http.Request) {
		vars := mux.Vars(r)
		for _, v := range idFields {
			id := vars[v]
			servicePath = strings.Replace(servicePath, "{"+v+"}", id, -1)
		}
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
