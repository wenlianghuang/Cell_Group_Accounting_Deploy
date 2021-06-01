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
	//router.HandleFunc("/api/accounting/{id}", middleware.GetOneAccount).Methods("GET", "OPTIONS")
	//router.HandleFunc("/api/task/{id}", middleware.TaskComplete).Methods("PUT", "OPTIONS")
	//router.HandleFunc("/api/undoTask/{id}", middleware.TaskUndo).Methods("PUT", "OPTIONS")
	//router.HandleFunc("/api/deleteTask/{id}", middleware.DeleteTask).Methods("DELETE", "OPTIONS")
	//router.HandleFunc("/api/deleteAllTask", middleware.DeleteAllTask).Methods("DELETE", "OPTIONS")
	//router.HandleFunc("/api/addtask/{id}", middleware.AddSubTask).Methods("PUT", "OPTIONS")
	return router
}
