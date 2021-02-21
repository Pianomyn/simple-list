const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "list_db",
});

const port = 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

//Create a connection to the DB
//Express set to port 5000
connection.connect((err) => {
  if (err) {
    console.log("Error connecting to Db");
    console.log(err);
  } else {
    console.log("Connection established with DB");
  }
});

app.listen(port, () => {
  console.log("Express is listening on port 5000");
});

//GET Fetch DB info for initialisation of app
app.get("/initialise", (req, res) => {
  connection.query(`SELECT name FROM list_names`, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

//POST Delete a single list from the database
app.post("/delete_list", (req, res) => {
  const receivedName = req.body.listName;
  connection.query(
    `DELETE FROM list_names WHERE name = '${receivedName}'`,
    function (err, result, fields) {
      if (err) throw err;
    }
  );
  res.sendStatus(200);
});

//POST Add a single list name to the database
app.post("/add_list", (req, res) => {
  const receivedName = req.body.newName;
  connection.query(
    `INSERT INTO list_names VALUES('${receivedName}', 1) ON DUPLICATE KEY UPDATE name = '${receivedName}'`,
    function (err, result, fields) {
      if (err) throw err;
    }
  );
  res.sendStatus(200);
});
