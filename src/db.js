const mysql = require("mysql");

class DB {
  constructor() {
    this.connection = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "list_db",
    });
    
  }

  connect = ()=>{
    this.connection.connect((err) => {
      if (err) {
        console.log("Error connecting to Db");
        console.log(err);
        return;
      }
      console.log("Connection established");

    });
    return this.connection;
  }

  getListNames() {
    this.connection.query(
      "SELECT name FROM list_names",
      function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      }
    );
  }
}

export default DB;
