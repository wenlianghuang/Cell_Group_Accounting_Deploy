package router

import (
	"backend/middleware"

	"net/http"

	"github.com/gorilla/mux"
)

func Router() *mux.Router {

	router := mux.NewRouter()
	buildHandler := http.FileServer(http.Dir("/Users/Apple/GoogleMatt/Web Programming/Cell_Group_Accounting_Deploy/build"))
	router.PathPrefix("/").Handler(buildHandler)
	staticHandler := http.StripPrefix("/static/", http.FileServer(http.Dir("/Users/Apple/GoogleMatt/Web Programming/Cell_Group_Accounting_Deploy/build/static>")))
	router.PathPrefix("/static/").Handler(staticHandler)

	router.HandleFunc("/api/accounting", middleware.GetAllAccount).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/accounting", middleware.CreateAccount).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/accounting/{id}", middleware.AddSubItem).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/changePW/{id}", middleware.ChangePW).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/deleteAccount/{id}", middleware.DeleteOneAccount).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/api/accounting/{id}", middleware.GetOneAccount).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/deleteCount/{id}", middleware.DeleteOneContent).Methods("PUT", "OPTIONS")
	return router
}
