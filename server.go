package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/lib/pq"
)

var connectionStr = "user=postgres dbname=chat password=00000000 host=127.0.0.1 sslmode=disable"
var db, err = sql.Open("postgres", connectionStr)

// Row struct
type Row struct {
	ID       int
	Message  string
	Username string
	Created  string
	Room     string
}

func handleRequest(w http.ResponseWriter, r *http.Request) {
	fmt.Println("GET request being processed")
	w.Header().Set("Content-Type", "application/json")
	querys := r.URL.Query()
	if r.Method == "GET" { // get messages
		data, err := db.Query(`SELECT * FROM messages WHERE room = '` + querys["id"][0] + `'`)
		if err != nil {
			panic(err)
		}

		slice := make([]Row, 0)
		for data.Next() {
			var row Row

			err := data.Scan(&row.ID, &row.Message, &row.Username, &row.Created, &row.Room)
			if err != nil {
				panic(err)
			}
			slice = append(slice, row)
		}

		messages, err := json.Marshal(slice)
		if err != nil {
			panic(err)
		}

		w.Write(messages)
	} else if r.Method == "POST" { // post message
		fmt.Println("POST request being processed")
		queryString := fmt.Sprintf("INSERT INTO messages (message, username, created, room) VALUES ('%s','%s','%s','%s')",
			querys["message"][0], querys["username"][0], querys["created"][0], querys["room"][0])

		response, err := db.Query(queryString)
		if err != nil {
			fmt.Println(response)
			panic(err)
		}

		w.WriteHeader(200)
	}
}

func main() {
	fmt.Println("running...")
	err := db.Ping()
	if err != nil {
		panic(err)
	}

	type Request struct {
		Req *http.Request
		res http.ResponseWriter
	}

	http.HandleFunc("/api/room", handleRequest)

	http.Handle("/", http.FileServer(http.Dir("dist")))
	log.Fatal(http.ListenAndServe(":3000", nil))
}
