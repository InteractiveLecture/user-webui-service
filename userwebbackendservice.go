package main

import (
	//"github.com/gorilla/context"

	"fmt"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"time"

	"github.com/InteractiveLecture/middlewares/jwtware"
	"github.com/InteractiveLecture/servicecache"
	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()
	servicecache.Configure("discovery:8500", 10*time.Second, "authentication-service", "lecture-service")
	//serviceclient.Configure(cacheadapter.New("discovery:8500", 10*time.Second, 5*time.Second, 3))
	servicecache.Start(3, 5*time.Second)
	log.Println("listening on 8000")

	r.PathPrefix("/").Handler(http.FileServer(http.Dir("/app")))

	// Posten der Login-daten
	r.Methods("POST").
		Path("/login").
		Handler(createProxy(
		"authentication-service",
		"/oauth/token"))

	//Topics Pfade
	// ---------------

	// GET, POST
	r.Path("/topics").
		Handler(jwtware.New(createProxy(
		"lecture-service",
		"/topics")))

	// GET, DELETE; PUT
	r.Path("/topics/{id}").
		Handler(jwtware.New(createProxy(
		"lecture-service",
		"/topics/{id}")))

	// GET; POST
	r.Path("/topics/{id}/modules").
		Handler(jwtware.New(createProxy(
		"lecture-service",
		"/topics/{id}/modules")))

	// POST; GET DELETE
	r.Path("/topics/{id}/officers").
		Handler(jwtware.New(createProxy(
		"lecture-service",
		"/topics/{id}/officers")))

	// POST; GET DELETE
	r.Path("/topics/{id}/assistants").
		Handler(jwtware.New(createProxy(
		"lecture-service",
		"/topics/{id}/assistants")))

	// HINTS Anfragen
	//---------------------

	// GET; POST; DELETE; PUT
	r.Path("/hint/{id}").
		Handler(jwtware.New(createProxy(
		"lecture-service",
		"/hint/{id}")))

	// Konsumiert den angebenen Hint
	r.Methods("POST").
		Path("/hint/{id}/consume").
		Handler(jwtware.New(createProxy(
		"lecture-service",
		"/hint/{id}/consume")))

	// USER Anfragen
	//---------------------

	// PUT; GET DELETE
	r.Path("/users/{id}").
		Handler(jwtware.New(createProxy(
		"lecture-service",
		"/users/{id}")))

	// Fügt einen weiteren User hinzu
	r.Methods("POST").
		Path("/users").
		Handler(jwtware.New(createProxy(
		"lecture-service",
		"/users")))

	// Exercises Pfade
	//----------------------------

	// GET; DELETE; POST; PUT
	r.Path("/exercises/{id}").
		Handler(jwtware.New(createProxy(
		"lecture-service",
		"/exercises/{id}")))

	// Erfolg einer Übung melden
	r.Methods("POST").
		Path("/exercises/{id}/success").
		Handler(jwtware.New(createProxy(
		"lecture-service",
		"/exercises/{id}/success")))

	// POST; GET
	r.Path("/exercises/{id}/hints").
		Handler(jwtware.New(createProxy(
		"lecture-service",
		"/exercises/{id}/hints")))

	// Modules Pfade
	//----------------------------

	r.Methods("POST").
		Path("/modules").
		Handler(jwtware.New(createProxy(
		"lecture-service",
		"/modules")))

	//GET;DELETE;PUT
	r.Path("/modules/{id}").
		Handler(jwtware.New(createProxy(
		"lecture-service",
		"/modules/{id}")))

	// GET; POST
	r.Path("/modules/{id}/recommendations").
		Handler(jwtware.New(createProxy(
		"lecture-service",
		"/modules/{id}/recommendations")))
	//DELETE
	r.Methods("DELETE").
		Path("/modules/{Tid}/recommendations/{Rid}").
		Handler(jwtware.New(createProxy(
		"lecture-service",
		"/modules/{Tid}/recommendations/{Rid}")))

	//GET; POST
	r.Path("/modules/{id}/exercises").
		Handler(jwtware.New(createProxy(
		"lecture-service",
		"/modules/{id}/exercises")))

	// Bind to a port and pass our router in
	http.ListenAndServe(":8000", r)
}

func createProxy(service, servicePath string) http.Handler {
	address, _ := servicecache.GetServiceAddress(service)
	targetURL, err := url.Parse(fmt.Sprintf("http://%s%s", address, servicePath))
	if err != nil {
		panic(err)
	}
	handler := httputil.NewSingleHostReverseProxy(targetURL)
	handler.Director = func(r *http.Request) {
		r.Host = address
		r.URL = targetURL
	}
	return handler
}
