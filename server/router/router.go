package router

import (
	"backend/middleware"

	"github.com/gorilla/mux"
)

func Router() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/api/accounting", middleware.GetAllAccount).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/accounting", middleware.CreateAccount).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/accounting/{id}", middleware.AddSubItem).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/changePW/{id}", middleware.ChangePW).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/deleteAccount/{id}", middleware.DeleteOneAccount).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/api/accounting/{id}", middleware.GetOneAccount).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/deleteCount/{id}", middleware.DeleteOneContent).Methods("PUT", "OPTIONS")
	return router
}
