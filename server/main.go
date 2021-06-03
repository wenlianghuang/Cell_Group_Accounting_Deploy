package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"backend/router"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "5000"
	}
	r := router.Router()
	buildHandler := http.FileServer(http.Dir("../build"))
	r.PathPrefix("/").Handler(buildHandler)
	staticHandler := http.StripPrefix("/static/", http.FileServer(http.Dir("../build/static")))
	r.PathPrefix("/static/").Handler(staticHandler)
	fmt.Println("Starting server on: ", port)

	log.Fatal(http.ListenAndServe(":"+port, r))

	//log.Fatal(http.ListenAndServe("main.dslriwa6h76ii.amplifyapp.com:"+port, r))
}
