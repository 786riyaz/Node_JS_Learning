# 📘 Express.js Revision Notes

---

## 🌐 What is Express.js?

* Express.js is a **web framework for Node.js**
* Used to build **REST APIs**, **web applications**, and **server-side rendered apps**
* Built on top of Node.js `http` module

---

## 📦 Install Express

```bash
npm install express
```

---

## 🚀 Basic Express Server Setup

```js
const express = require('express');
const app = express();

app.get('', (req, res) => {
  res.send("Home Page");
});

app.get('/about', (req, res) => {
  res.send("About Page");
});

app.listen(786);
```

---

## 🧾 Sending HTML Response

```js
app.get('', (req, res) => {
  res.send(`
    <h1>This is Home Page</h1>
    <br>
    <a href="/contact">Contact Page</a>
  `);
});
```

---

## 📤 Sending JSON / Array Response

```js
app.get('/data', (req, res) => {
  res.send([1, 2, 3, 4]);
});
```

---

## 📂 Serving Static Files

```js
app.use(express.static(public_Folder_Path));
```

Used for serving:

* HTML
* CSS
* JS
* Images

---

## ▶️ Server with Callback

```js
app.listen(786, () => {
  console.log("Server running at port 786");
});
```

---

## 📄 Sending HTML Files

```js
app.get("/", (req, res) => {
  res.sendFile(home_file_Path);
});

app.get("/about", (req, res) => {
  res.sendFile(about_file_Path);
});
```

---

## ❌ 404 Page Handling

```js
app.use((req, res) => {
  res.status(404).sendFile(`${Folder_Path}/404.html`);
});
```

---

# 🧩 Template Engine (EJS)

Used for **dynamic server-side pages**

---

## 📦 Install EJS

```bash
npm install ejs
```

---

## ⚙️ Configure EJS

```js
app.set("view engine", "ejs");
```

---

## 🧠 Render Dynamic Data

### `index.js`

```js
app.get("/profile", (req, res) => {
  const data = {
    name: "Riyaz",
    age: 25,
    skills: ["C", "C++", "Python", "JavaScript"]
  };

  res.render("profile", data);
});
```

---

### `views/profile.ejs`

```ejs
<h2>Name :: <%= name %></h2>
<h2>Age :: <%= age %></h2>

<ul>
  <% skills.forEach((skill) => { %>
    <li><%= skill %></li>
  <% }) %>
</ul>
```

---

## 🔁 Include Common Files

```ejs
<%- include('common/header') %>
```

Used for:

* Headers
* Footers
* Navbar

---

# 🔀 Middleware in Express

### Definition

Middleware is a **function that executes before the final route handler**.

### Responsibilities

* Modify request & response
* Authentication
* Validation
* Logging
* Parsing
* Error handling

---

## 📌 Types of Middleware

* Application-level
* Router-level
* Error-handling
* Built-in
* Third-party

---

## 🔒 Custom Middleware Example

```js
const reqFilter = (req, res, next) => {
  if (!req.query.age) {
    res.send("Please provide age");
  } else if (req.query.age >= 18) {
    next();
  } else {
    res.send("Age is less than 18");
  }
};
```

---

## 📎 Application-Level Middleware

```js
app.use(reqFilter);
```

---

## 🎯 Route-Level Middleware

```js
app.get("/users", reqFilter, (req, res) => {
  res.send("User Page");
});
```

---

## 🧭 Router-Level Middleware

```js
const route = express.Router();

route.use(reqFilter);

route.get("/users", (req, res) => {
  res.send("Users Page");
});

app.use("/", route);
```

---

## ⚠️ Error Handling Middleware

Used to handle runtime and application errors globally.

---

# 🗄️ MongoDB with Node.js

---

## 📦 Install MongoDB Driver

```bash
npm i mongodb
```

---

## 🔌 MongoDB Connection

```js
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'E-Commerce';
const client = new MongoClient(url);

async function connectToDatabase() {
  try {
    const result = await client.connect();
    console.log("Connected");

    const db = result.db(dbName);
    const collection = db.collection("Products");

    const response = await collection.find({}).toArray();
    console.log(response);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

connectToDatabase();
```

---

## ➕ Insert Data

```js
let result = await collection.insertOne({...});

if (result.acknowledged) {
  console.log("Insert Successful");
}
```

```js
await collection.insertMany([{...}, {...}, {...}]);
```

---

## 🔍 Read Data

```js
await collection.findOne();
await collection.find({}).toArray();
await collection.findOne({ productName: "Ideapad" });
await collection.find({ price: { $gt: 500 } }).toArray();
```

---

## ✏️ Update Data

```js
await collection.updateOne(
  { condition },
  { $set: {...} }
);

await collection.updateMany(
  { condition },
  { $set: {...} }
);
```

---

## 🗑️ Delete Data

```js
await collection.deleteOne({ condition });
await collection.deleteMany({ condition });
```

```js
result.acknowledged;
result.deletedCount;
```

---

# 🧠 Mongoose (ODM)

---

## 📦 Install Mongoose

```bash
npm install mongoose
```

---

## 🔌 Connect & Define Schema

```js
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/E-Comm");

const productsSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  category: String,
  brand: String,
  price: Number
});

const Products = mongoose.model("CollectionName", productsSchema);
```

---

## 💾 Save Document

```js
const newProduct = new Products({...});

newProduct.save()
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

---

# 🐬 MySQL with Node.js

---

## 📦 Install MySQL

```bash
npm i mysql
```

---

## 🔌 MySQL Connection

```js
const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'E-Commerce'
});

con.connect((err) => {
  if (err) {
    console.log("Connection Error");
  } else {
    console.log("Connection Successful");
  }
});
```

---

## 📊 Execute Query

```js
con.query("SELECT * FROM Products", (err, result) => {
  console.log(result);
});
```
