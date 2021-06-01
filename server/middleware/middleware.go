package middleware

import (
	"backend/models"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var collection *mongo.Collection

func init() {
	loadTheEnv()
	createDBInstance()
}

func loadTheEnv() {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}
}

func createDBInstance() {
	// DB connection string
	connectionString := os.Getenv("DB_URI")

	// Database Name
	dbName := os.Getenv("DB_NAME")

	// Collection name
	collName := os.Getenv("DB_COLLECTION_NAME")

	// Set client options
	clientOptions := options.Client().ApplyURI(connectionString)

	// connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")

	collection = client.Database(dbName).Collection(collName)

	fmt.Println("Collection instance created!")
}

func CreateAccount(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencode")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var task models.Account_Password

	_ = json.NewDecoder(r.Body).Decode(&task)
	fmt.Printf("task: %+v\n", task)

	insertOneTask(task)
	json.NewEncoder(w).Encode(task)
}

func insertOneTask(task models.Account_Password) {
	insertResult, err := collection.InsertOne(context.Background(), task)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Inserted a Single Record ", insertResult.InsertedID)
}

func GetAllAccount(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencode")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	payload := getAllAccount()
	json.NewEncoder(w).Encode(payload)
}

func getAllAccount() []primitive.M {
	cur, err := collection.Find(context.Background(), bson.D{{}})
	if err != nil {
		log.Fatal(err)
	}

	var results []primitive.M

	for cur.Next(context.Background()) {
		var result bson.M
		e := cur.Decode(&result)

		if e != nil {
			log.Fatal(e)
		}

		results = append(results, result)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	cur.Close(context.Background())
	fmt.Printf("results: %+v\n", results)
	return results
}

func AddSubItem(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Contexxt-Type", "application/x-www-form-urlencoder")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	id, _ := primitive.ObjectIDFromHex(params["id"])
	filter := bson.M{"_id": id}

	var subitema models.Item_Date_BuySell
	_ = json.NewDecoder(r.Body).Decode(&subitema)
	subitem := []models.Item_Date_BuySell{models.Item_Date_BuySell{
		Item:         subitema.Item,
		BuyorSell:    subitema.BuyorSell,
		SelectedDate: subitema.SelectedDate,
		Price:        subitema.Price,
	}}
	subadd := bson.M{"$addToSet": bson.M{"subtest": bson.M{"$each": subitem}}}

	result, err := collection.UpdateOne(context.Background(), filter, subadd)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("modified count: ", result.ModifiedCount)

	var totalmoney models.Account_Password
	if err := collection.FindOne(context.Background(), bson.M{"_id": id}).Decode(&totalmoney); err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Total money: %+v\n", totalmoney.InitMoney)
	if subitema.BuyorSell == "buy" {
		addmoney := bson.M{"$set": bson.M{"initmoney": totalmoney.InitMoney - subitema.Price}}
		moneyresult, err := collection.UpdateOne(context.Background(), filter, addmoney)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println("modified count: ", moneyresult)
	} else if subitema.BuyorSell == "sell" {
		addmoney := bson.M{"$set": bson.M{"initmoney": totalmoney.InitMoney + subitema.Price}}
		moneyresult, err := collection.UpdateOne(context.Background(), filter, addmoney)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println("modified count: ", moneyresult)
	}
	json.NewEncoder(w).Encode(params["id"])
}

func ChangePW(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoder")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	params := mux.Vars(r)
	id, _ := primitive.ObjectIDFromHex(params["id"])
	filter := bson.M{"_id": id}
	var changepw models.Account_Password
	_ = json.NewDecoder(r.Body).Decode(&changepw)
	fmt.Println("chagepw Password: ", changepw.Password)
	update := bson.M{"$set": bson.M{"password": changepw.Password}}

	result, err := collection.UpdateOne(context.Background(), filter, update)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("modified count: ", result.ModifiedCount)
}

func GetOneAccount(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencode")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	docID, _ := primitive.ObjectIDFromHex(params["id"])
	var result bson.M
	//cur, err := collection.FindOne(context.Background(), bson.M{"_id": docID}).Decode(&result)
	if err := collection.FindOne(context.Background(), bson.M{"_id": docID}).Decode(&result); err != nil {
		log.Fatal(err)
	}

	//payload := getAllAccount()
	json.NewEncoder(w).Encode(result)
}

func DeleteOneAccount(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	id, _ := primitive.ObjectIDFromHex(params["id"])
	filter := bson.M{"_id": id}

	d, err := collection.DeleteOne(context.Background(), filter)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("modified count: ", d.DeletedCount)
}

func DeleteOneContent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Aloow-Headers", "Content-Type")
	params := mux.Vars(r)
	id, _ := primitive.ObjectIDFromHex(params["id"])
	filter := bson.M{"_id": id}
	var changect models.Item_Date_BuySell
	_ = json.NewDecoder(r.Body).Decode(&changect)
	fmt.Println("delete subtest: ", changect)

	subdelete := bson.M{"$pull": bson.M{"subtest": bson.M{"item": changect.Item, "buyorsell": changect.BuyorSell, "selecteddate": changect.SelectedDate, "price": changect.Price}}}
	result, err := collection.UpdateOne(context.Background(), filter, subdelete)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Delete modified count: ", result.UpsertedCount)

	var totalmoney models.Account_Password
	if err := collection.FindOne(context.Background(), bson.M{"_id": id}).Decode(&totalmoney); err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Total money: %+v\n", totalmoney.InitMoney)
	if changect.BuyorSell == "buy" {
		addmoney := bson.M{"$set": bson.M{"initmoney": totalmoney.InitMoney + changect.Price}}
		moneyresult, err := collection.UpdateOne(context.Background(), filter, addmoney)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println("modified count: ", moneyresult)
	} else if changect.BuyorSell == "sell" {
		addmoney := bson.M{"$set": bson.M{"initmoney": totalmoney.InitMoney + changect.Price}}
		moneyresult, err := collection.UpdateOne(context.Background(), filter, addmoney)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println("modified count: ", moneyresult)
	}
	json.NewEncoder(w).Encode(params["id"])

}
