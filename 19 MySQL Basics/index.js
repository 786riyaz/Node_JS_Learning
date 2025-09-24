const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "E-Commerce",
});

con.connect((err) => {
  if (err) {
    console.log("Error in establishing connection with database");
  } else {
    console.log("Connected successfully with database");
  }
});

con.query("Select * from Products", (err, result) => {
  console.log("Result ::");
  console.log(result);
});
