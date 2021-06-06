package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/CellGroup/server/router"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "9080"
	}
	r := router.Router()
	fmt.Println("Starting server on: ", port)

	log.Fatal(http.ListenAndServe(":"+port, r))
}
