const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connection = mysql.createConnection({
  host: "seartenmdb.crtkt9pfprmx.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "SeartenMarketplaceftw2021",
  database: "seartendb",
    port: "3306"
});

const port = 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

//Create a connection to the DB
//Express set to port 5000
connection.connect((err) => {
  if (err) {
    console.log("Error connecting to DB");
    console.log(err);
  } else {
    console.log("Connection established with DB");
  }
});

app.listen(port, () => {
  console.log("Express is listening on port 5000");
});

//GET Fetch stored list names for initialisation of app
app.get("/initialise", (req, res) => {
  connection.query(
    `CREATE TABLE IF NOT EXISTS list_names(name VARCHAR(50), is_empty int)`,
    function (err, result, fields) {
      if (err) throw err;
    }
  );
  connection.query(
    `SELECT name FROM list_names`,
    function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    }
  );
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
  connection.query(
    `DROP TABLE IF EXISTS \`${receivedName}\``,
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

  connection.query(
    `CREATE TABLE IF NOT EXISTS \`${receivedName}\`(list_item varchar(50) PRIMARY KEY, completed int)`,
    function (err, result, fields) {
      if (err) throw err;
    }
  );
  res.sendStatus(200);
});

//GET Get all list elements for a list
app.get("/get_items", (req, res) => {
  const receivedName = req.query.listName;
  connection.query(
    `SELECT list_item from \`${receivedName}\``,
    function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    }
  );
});

//POST Add a single reminder to a list
app.post("/add_reminder", (req, res) => {
  const receivedReminder = req.body.reminderName;
  const listName = req.body.listName;
  connection.query(
    `INSERT INTO \`${listName}\` VALUES('${receivedReminder}', 1) ON DUPLICATE KEY UPDATE list_item = '${receivedReminder}'`,
    function (err, result, fields) {
      if (err) throw err;
    }
  );
  res.sendStatus(200);
});

//POST Delete a single reminder from a list
app.post("/delete_reminder", (req, res) => {
  const receivedReminder = req.body.reminderName;
  const listName = req.body.listName;
  connection.query(
    `DELETE FROM \`${listName}\` WHERE list_item = '${receivedReminder}'`,
    function (err, result, fields) {
      if (err) throw err;
    }
  );
  res.sendStatus(200);
});
