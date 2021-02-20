const mysql = require("mysql");
const express = require("express");

const port = 3001;
const app = express();

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "list_db",
});

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to Db");
    console.log(err);
    return;
  }
  console.log("Connection established");
});

app.listen(port, () => {
  console.log(`App server now listening to port ${port}`);
});
