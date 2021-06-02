package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"backend/router"

	"github.com/rs/cors"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "9080"
	}
	r := router.Router()

	c := cors.AllowAll()
	handler := c.Handler(r)

	fmt.Println("Starting server on: ", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
	//log.Fatal(http.ListenAndServe(":"+port, r))

	//log.Fatal(http.ListenAndServe("main.dslriwa6h76ii.amplifyapp.com:"+port, r))
}
