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
//app.use(bodyParser.urlencoded());
// parse application/json
app.use(bodyParser.json());

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

app.get("/", (req, res) => res.send("api working"));

app.post("/add", (req, res) => {
  const receivedName = req.body.newName
  connection.query(
    `INSERT INTO list_names VALUES('${receivedName}')`,
    function (err, result, fields) {
      if (err) throw err;
    }
  );
  res.send(200);
});