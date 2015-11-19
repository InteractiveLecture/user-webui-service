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

	// TOPIC Anfragen
	//---------------------

	// TODO Groupware Nutzung bestimmen. Pfade vereinfachen

	// Liste aller Topics
	r.Path("/topics").
		Handler(jwtware.New(createProxy(
		"lecture-service",
		"/topics")))

	// Ein spezielles Topic bearbeiten
	r.Path("/topics/{id}").
		Handler(jwtware.New(createProxy(
		"lecture-service",
		"/topics/{id}")))

	// Rootmodul Pfade
	r.Path("/topics/{id}/modules").
		Handler(jwtware.New(createProxy(
		"lecture-service",
		"/topics/{id}/modules")))

	// Officer Pfade
	r.Path("/topics/{id}/officers").
		Handler(jwtware.New(createProxy(
		"lecture-service",
		"/topics/{id}/officers")))

	// assistant Pfade
	r.Path("/topics/{id}/assistants").
		Handler(jwtware.New(createProxy(
		"lecture-service",
		"/topics/{id}/assistants")))

	// HINTS Anfragen
	//---------------------

	// Einen einzelnen Hint anfragen
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

	// Einen einzelnen User anfragen
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
