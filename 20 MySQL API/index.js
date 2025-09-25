const express = require("express");
const mysql = require("mysql");

const app = express();
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "E-Commerce",
});

con.connect((err) => {
  if (err) {
    console.log("Error is establishing connection with database");
  } else {
    console.log("Connected successfully with database");
  }
});

app.get("/", (req, res) => {
  console.log("Inside Get Method");
  //   con.query("SELECT * FROM Products WHERE Category = 'Laptop'", (err, result) => {
  //   con.query("SELECT * FROM Products WHERE Price > 200", (err, result) => {
  con.query("SELECT * FROM Products", (err, result) => {
    console.log("Result");
    console.log(result);
    res.send(result);
  });
});

app.post("/", (req, res) => {
  console.log("Inside Post Method");
  let dataToInsert = req.body;
  console.log("Request Body ::", dataToInsert);

  let SqlQuery = `INSERT INTO Products SET ?`;

  con.query(SqlQuery, dataToInsert, (err, result, fields) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).send("Database error");
    }
    console.log(result);
    // res.send("Product inserted successfully!");
    res.send(result);
  });
});

app.post("/create", (req, res) => {
  console.log("Inside Post Method");
  let dataToInsert = req.body;
  console.log("Request Body ::", dataToInsert);

  let ProductName = dataToInsert.ProductName;
  let Category = dataToInsert.Category;
  let Brand = dataToInsert.Brand;
  let Price = dataToInsert.Price;
  let SqlQuery = `INSERT INTO Products (ProductName, Category, Brand, Price) VALUES ('${ProductName}', '${Category}', '${Brand}', ${Price})`;
  console.log("Query ::", SqlQuery);

  con.query(SqlQuery, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).send("Database error");
    }
    console.log(result);
    // res.send("Product inserted successfully!");
    res.send(result);
  });
});

app.put("/", (req, res) => {
  console.log("Inside Update Method");
  let requestBody = req.body;
  console.log("Request Body ::", requestBody);

  let dataToBeUpdated = [requestBody.ProductName, requestBody.Category, requestBody.Brand, requestBody.Price, requestBody.ProductName];
  let SqlQuery = `UPDATE Products SET ProductName = ?, Category = ?, Brand = ?, Price= ? WHERE ProductName = ?`;

  con.query(SqlQuery, dataToBeUpdated, (err, result, fields) => {
    if (err) {
      console.log("Error has been occured during the edit process");
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  console.log("Inside Update Method");
  let requestBody = req.body;
  console.log("Request Body ::", requestBody);

  let ProductName = requestBody.ProductName;
  let Category = requestBody.Category;
  let Brand = requestBody.Brand;
  let Price = requestBody.Price;
  let SqlQuery = `UPDATE Products SET ProductName = '${ProductName}', Category = '${Category}', Brand = '${Brand}', Price= ${Price} WHERE ProductName = '${ProductName}';`;

  con.query(SqlQuery, (err, result) => {
    if (err) {
      console.log("Error has been occured during the edit process");
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.put("/update/:productName", (req, res) => {
  console.log("Inside Update Method");
  const productName = req.params.productName; // take ProductName from URL
  const requestBody = req.body;

  // Collect only provided fields
  let fields = [];
  let values = [];

  if (requestBody.Category) {
    fields.push("Category = ?");
    values.push(requestBody.Category);
  }
  if (requestBody.Brand) {
    fields.push("Brand = ?");
    values.push(requestBody.Brand);
  }
  if (requestBody.Price) {
    fields.push("Price = ?");
    values.push(requestBody.Price);
  }
  if (requestBody.ProductName) {
    fields.push("ProductName = ?");
    values.push(requestBody.ProductName);
  }

  // If no fields to update
  if (fields.length === 0) {
    return res.status(400).send({ message: "No fields to update" });
  }

  // Final query
  let SqlQuery = `UPDATE Products SET ${fields.join(
    ", "
  )} WHERE ProductName = ?`;
  values.push(productName);

  console.log("SQL Query ::", SqlQuery);
  console.log("Values ::", values);

  con.query(SqlQuery, values, (err, result) => {
    if (err) {
      console.error("Error during update:", err);
      return res.status(500).send("Database update failed");
    } else {
      console.log("Update result:", result);
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "Product not found" });
      }
      res.send({ message: "Product updated successfully", result });
    }
  });
});

app.delete("/delete/:productName", (req, res) => {
  console.log("Inside the Delete Method");
  let productName = req.params.productName;
  console.log("Product Name to be Deleted ::", productName);
  
  let SqlQuery = `DELETE FROM Products WHERE ProductName = '${productName}'`;
  con.query(SqlQuery, (err,result)=>{
      if(err){
          console.log("Error while deleting the product");
        } else {
            console.log("Record Deleted Successfully");
            res.send(result);
    }
  })
});

app.listen(786);