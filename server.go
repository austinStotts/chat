package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
	_ "github.com/gorilla/websocket"
	_ "github.com/lib/pq"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

var connectionStr = "user=postgres dbname=chat password=00000000 host=127.0.0.1 sslmode=disable"
var db, err = sql.Open("postgres", connectionStr)

// Row struct
type Row struct {
	ID       int
	Message  string
	Username string
	Created  string
	Room     string
	Type     string
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

			err := data.Scan(&row.ID, &row.Message, &row.Username, &row.Created, &row.Room, &row.Type)
			if err != nil {
				panic(err)
			}
			slice = append(slice, row)
		}

		messages, err := json.Marshal(slice)
		if err != nil {
			panic(err)
		}

		fmt.Printf("%T", messages)
		w.Write(messages)
	}
	return
}

func handlePost(w http.ResponseWriter, r *http.Request) {
	querys := r.URL.Query()
	fmt.Println(querys)
	if r.Method == "POST" { // post message
		fmt.Println("POST request being processed")
		queryString := fmt.Sprintf("INSERT INTO messages (message, username, created, room, type) VALUES ('%s','%s','%s','%s','%s')",
			querys["message"][0], querys["username"][0], querys["created"][0], querys["room"][0], querys["type"][0])

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

	http.HandleFunc("/api/room", handleRequest)
	http.HandleFunc("/api/new", handlePost)

	http.HandleFunc("/connect", func(w http.ResponseWriter, r *http.Request) {
		connection, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			panic(err)
		}
		go func(connection *websocket.Conn) {
			for {
				messageType, message, err := connection.ReadMessage()
				if err != nil {
					panic(err)
				}
				connection.WriteMessage(messageType, message)
			}
		}(connection)
	})

	http.Handle("/", http.FileServer(http.Dir("dist")))
	log.Fatal(http.ListenAndServe(":3000", nil))
}

// json.Marshal(Row{ID:999,Message:"hello :)",Created:"01:26:2019 03:07:49",Room:"home",Type:"text"}
