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
		port = "8080"
	}
	r := router.Router()
	fmt.Println("Starting server on: ", port)
	log.Fatal(http.ListenAndServe(":"+port, r))

}
