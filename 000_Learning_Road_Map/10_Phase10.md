# PHASE 10: Database Integration with Node.js

**Level:** Intermediate to Advanced  
**Goal:** Learn how to connect Node.js applications with databases, perform CRUD operations, manage database connections, understand relationships, and integrate SQL and NoSQL databases using drivers, ORMs, and ODMs.

## Topics Covered

1. What is a Database?
2. Why Do Backend Applications Need Databases?
3. Types of Databases
4. SQL vs NoSQL
5. Relational Databases
6. Non-Relational Databases
7. Database Integration Architecture
8. Database Drivers
9. MySQL Integration with Node.js
10. MongoDB Integration with Node.js
11. Database Connection Management
12. Connection Pooling
13. CRUD Operations with MySQL
14. CRUD Operations with MongoDB
15. SQL Queries
16. MongoDB Queries
17. What is ORM?
18. What is ODM?
19. Sequelize ORM
20. Mongoose ODM
21. Database Models
22. Database Relationships
23. One-to-One Relationships
24. One-to-Many Relationships
25. Many-to-Many Relationships
26. Database Transactions
27. Database Indexing
28. Database Error Handling
29. Building a Database-Driven REST API
30. Interview Questions

---

# 1. What is a Database?

A database is an organized collection of data that can be stored, accessed, managed, and modified efficiently.

In simple words:

A database is used to store application data permanently so that it can be retrieved whenever required.

### Example

Consider an e-commerce application.

It needs to store:

- User information.
- Product information.
- Orders.
- Payments.
- Categories.
- Reviews.
- Addresses.

Without a database, the application would have difficulty maintaining this information after restarting.

A database provides persistent storage.

### Example: Users Table

| id | name | email | age |
|---:|---|---|---:|
| 1 | John | john@example.com | 25 |
| 2 | David | david@example.com | 30 |
| 3 | Alex | alex@example.com | 22 |

This table stores user information.

### Why Do We Need Databases?

1. Persistent data storage.
2. Efficient data retrieval.
3. Data organization.
4. Data modification.
5. Data security and access control.
6. Data relationships.
7. Concurrent access.
8. Data consistency.
9. Backup and recovery.

---

# 2. Why Do Backend Applications Need Databases?

Consider a user registration application.

When a user registers, the backend receives information:

```json
{
    "name": "John",
    "email": "john@example.com",
    "password": "password123"
}
```

The backend needs to save this information.

The general process is:

```text
         FRONTEND
             |
             | Registration Request
             v
        NODE.JS SERVER
             |
             v
         CONTROLLER
             |
             v
          SERVICE
             |
             v
        DATABASE MODEL
             |
             v
          DATABASE
             |
             |
       Save User Data
             |
             v
        API RESPONSE
             |
             v
          FRONTEND
```

### What Happens Without a Database?

You could store information in a JavaScript array:

```javascript
const users = [];

users.push({
    id: 1,
    name: "John",
    email: "john@example.com"
});
```

However, this data exists only in application memory.

When the Node.js process restarts, the data disappears.

### With a Database

```text
Node.js Application
        |
        v
     Database
        |
        v
   Persistent Storage
```

The data remains available after restarting the Node.js application, assuming the database and its storage remain intact.

---

# 3. Types of Databases

Databases can be categorized into several types.

The two major categories commonly used in web development are:

1. SQL Databases.
2. NoSQL Databases.

Other database categories include:

- Key-value databases.
- Document databases.
- Graph databases.
- Time-series databases.
- Search-oriented databases.
- In-memory databases.

Let's focus on SQL and NoSQL first.

---

# 4. SQL vs NoSQL

## 4.1 What is SQL?

SQL stands for **Structured Query Language**.

It is a language used to communicate with relational databases.

SQL allows you to:

- Create databases.
- Create tables.
- Insert records.
- Retrieve records.
- Update records.
- Delete records.
- Join tables.
- Manage transactions.

Example:

```sql
SELECT * FROM users;
```

This retrieves all records from the `users` table.

### Popular SQL Databases

- MySQL
- PostgreSQL
- Microsoft SQL Server
- Oracle Database
- SQLite

## 4.2 What is NoSQL?

NoSQL generally refers to database systems that do not rely on the traditional relational table model.

Many NoSQL databases support flexible data models.

For example, document databases store information as documents.

### Popular NoSQL Databases

- MongoDB
- Redis
- Apache Cassandra
- Neo4j
- Amazon DynamoDB

## 4.3 SQL vs NoSQL Comparison

| Feature | SQL | NoSQL |
|---|---|---|
| Data Model | Tables | Documents, key-value, graph, etc. |
| Structure | Usually predefined schema | Often flexible schema |
| Relationships | Foreign keys and joins | References, embedding, or other mechanisms |
| Query Language | SQL | Database-specific query APIs |
| Transactions | Commonly supported | Depends on database |
| Schema | Usually structured | Often flexible |
| Scaling | Vertical and horizontal options | Often designed with distributed scaling in mind |
| Examples | MySQL, PostgreSQL | MongoDB, Redis |

### Which One Should You Use?

Use SQL when:

- Data has clear relationships.
- You need relational queries.
- You need strong transactional guarantees.
- You need complex joins.
- Your data is naturally tabular.

Use NoSQL when:

- Your data is naturally document-oriented.
- Your document structures vary.
- You need flexible data modeling.
- Your application benefits from document-level operations.
- You need database-specific distributed capabilities.

**Important:** NoSQL does not mean there are no schemas, and SQL does not automatically mean every database has identical behavior. Both categories have different data models and consistency capabilities.

---

# 5. Relational Databases

A relational database stores data in tables.

Each table contains:

- Rows.
- Columns.
- Primary keys.
- Foreign keys.
- Constraints.

### Example

Consider an e-commerce application.

It has two tables.

**Users Table**

| id | name | email |
|---:|---|---|
| 1 | John | john@example.com |
| 2 | David | david@example.com |

**Orders Table**

| id | user_id | total |
|---:|---:|---:|
| 101 | 1 | 5000 |
| 102 | 1 | 3000 |
| 103 | 2 | 7000 |

Notice the `user_id` column in the orders table.

It references the `id` column in the users table.

This is a relationship between two tables.

### Primary Key

A primary key uniquely identifies a record in a table.

Example:

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(150)
);
```

Here, `id` is the primary key.

### Foreign Key

A foreign key establishes a relationship between tables.

Example:

```sql
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,

    user_id INT,

    total DECIMAL(10,2),

    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

Here, `user_id` references `users.id`.

### Why Are Relationships Important?

Suppose you want to find all orders belonging to John.

You can use:

```sql
SELECT
    users.name,
    orders.id,
    orders.total
FROM users
JOIN orders
ON users.id = orders.user_id
WHERE users.id = 1;
```

Result:

| name | id | total |
|---|---:|---:|
| John | 101 | 5000 |
| John | 102 | 3000 |

We will study database relationships in detail later in this phase.

---

# 6. Non-Relational Databases

A non-relational database does not necessarily store data in traditional tables.

MongoDB is a popular document-oriented database.

It stores information in collections and documents.

### MongoDB Structure

```text
Database
   |
   └── Collection
          |
          ├── Document
          ├── Document
          └── Document
```

### SQL vs MongoDB Terminology

| SQL | MongoDB |
|---|---|
| Database | Database |
| Table | Collection |
| Row | Document |
| Column | Field |
| Primary Key | `_id` |
| JOIN | `$lookup` or application-side relationship handling |

### Example: MongoDB User Document

```json
{
    "_id": "671abc123",
    "name": "John",
    "email": "john@example.com",
    "age": 25,
    "address": {
        "city": "Ahmedabad",
        "country": "India"
    },
    "skills": [
        "JavaScript",
        "Node.js",
        "React"
    ]
}
```

Notice:

- `address` is an embedded object.
- `skills` is an array.
- Fields can have different data types.

MongoDB supports flexible document structures.

### Example: Two User Documents

```json
{
    "name": "John",
    "age": 25
}
```

```json
{
    "name": "David",
    "age": 30,
    "city": "Ahmedabad"
}
```

These documents can have different fields within the same collection, although a consistent schema is still recommended for predictable application behavior.

---

# 7. Database Integration Architecture

Let's understand how Node.js communicates with databases.

```text
          FRONTEND
              |
              v
          API REQUEST
              |
              v
         EXPRESS ROUTE
              |
              v
          CONTROLLER
              |
              v
           SERVICE
              |
              v
       DATABASE DRIVER / ORM
              |
              v
           DATABASE
              |
              v
          QUERY RESULT
              |
              v
           SERVICE
              |
              v
          CONTROLLER
              |
              v
         API RESPONSE
```

There are different ways to connect Node.js with a database.

### Method 1: Using Database Drivers

You communicate with the database using its driver.

Examples:

```text
Node.js → mysql2 → MySQL
```

```text
Node.js → mongodb → MongoDB
```

### Method 2: Using ORM

ORM stands for Object Relational Mapping.

Example:

```text
Node.js → Sequelize → MySQL
```

### Method 3: Using ODM

ODM stands for Object Document Mapping.

Example:

```text
Node.js → Mongoose → MongoDB
```

We will cover all three approaches.

---

# 8. What is a Database Driver?

A database driver is a software library that allows an application to communicate with a particular database.

Node.js cannot directly communicate with MySQL or MongoDB just because it supports JavaScript.

It needs a database driver or another compatible database client.

### Example: MySQL Driver

Install:

```bash
npm install mysql2
```

Import:

```javascript
const mysql = require("mysql2");
```

### Example: MongoDB Driver

Install:

```bash
npm install mongodb
```

Import:

```javascript
const { MongoClient } = require("mongodb");
```

### Popular Node.js Database Drivers

| Database | Driver |
|---|---|
| MySQL | mysql2 |
| PostgreSQL | pg |
| MongoDB | mongodb |
| SQLite | better-sqlite3 |
| Redis | redis |

### What Does a Driver Do?

A database driver generally handles:

1. Database communication.
2. Query execution.
3. Connection management.
4. Result retrieval.
5. Error reporting.
6. Data type conversion.

---

# 9. MySQL Integration with Node.js

Let's connect Node.js with MySQL using the `mysql2` package.

## 9.1 Install MySQL Driver

```bash
npm install mysql2
```

## 9.2 Create Project Structure

```text
mysql-project/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │
│   ├── routes/
│   │
│   ├── services/
│   │
│   └── app.js
│
├── server.js
├── .env
├── .gitignore
└── package.json
```

## 9.3 Create Database

Open MySQL and execute:

```sql
CREATE DATABASE node_learning;
```

Select database:

```sql
USE node_learning;
```

Create users table:

```sql
CREATE TABLE users (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    age INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
```

## 9.4 Create Environment Variables

File: `.env`

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=node_learning
DB_PORT=3306
```

Never commit this file to GitHub.

## 9.5 Create Database Connection

File: `src/config/db.js`

```javascript
const mysql = require("mysql2/promise");

const pool = mysql.createPool({

    host: process.env.DB_HOST,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME,

    port: Number(process.env.DB_PORT) || 3306,

    waitForConnections: true,

    connectionLimit: 10,

    queueLimit: 0

});

module.exports = pool;
```

### Why `mysql2/promise`?

The `mysql2` package provides callback-based and Promise-based APIs.

By importing:

```javascript
require("mysql2/promise");
```

we can use `async/await`.

Example:

```javascript
const [rows] = await pool.query(
    "SELECT * FROM users"
);
```

### What is a Connection Pool?

A connection pool maintains multiple reusable database connections.

Instead of creating a new connection for every request, the application can reuse existing connections.

We will discuss this in detail in Section 12.

## 9.6 Test Database Connection

Create:

`src/config/testConnection.js`

```javascript
const pool = require("./db");

async function testConnection() {

    try {

        const connection = await pool.getConnection();

        console.log("MySQL connected successfully");

        connection.release();

    } catch (error) {

        console.error("Database connection failed:", error);

        process.exit(1);

    }

}

module.exports = testConnection;
```

You can call this function when the server starts.

---

# 10. MySQL CRUD Operations with Node.js

CRUD stands for:

- Create.
- Read.
- Update.
- Delete.

Let's implement these operations using `mysql2`.

## 10.1 Create User

```javascript
const pool = require("../config/db");

async function createUser(userData) {

    const { name, email, age } = userData;

    const sql = `
        INSERT INTO users (name, email, age)
        VALUES (?, ?, ?)
    `;

    const [result] = await pool.execute(
        sql,
        [name, email, age]
    );

    return {
        id: result.insertId,
        name,
        email,
        age
    };

}

module.exports = createUser;
```

### Important: What is `?`?

The question marks are parameter placeholders.

Values are passed separately:

```javascript
pool.execute(sql, [name, email, age]);
```

This helps prevent SQL injection when used correctly.

Never construct SQL queries by directly concatenating untrusted user input.

## 10.2 Read All Users

```javascript
async function getAllUsers() {

    const [rows] = await pool.execute(
        "SELECT * FROM users"
    );

    return rows;

}
```

## 10.3 Read User by ID

```javascript
async function getUserById(id) {

    const [rows] = await pool.execute(
        "SELECT * FROM users WHERE id = ?",
        [id]
    );

    return rows[0] || null;

}
```

## 10.4 Update User

```javascript
async function updateUser(id, userData) {

    const { name, email, age } = userData;

    const [result] = await pool.execute(
        `
        UPDATE users
        SET name = ?, email = ?, age = ?
        WHERE id = ?
        `,
        [name, email, age, id]
    );

    return result;

}
```

## 10.5 Delete User

```javascript
async function deleteUser(id) {

    const [result] = await pool.execute(
        "DELETE FROM users WHERE id = ?",
        [id]
    );

    return result;

}
```

### Important MySQL Result Properties

For an INSERT operation:

```javascript
result.insertId
```

Returns the newly inserted record's ID.

For UPDATE and DELETE:

```javascript
result.affectedRows
```

Returns the number of affected rows.

Example:

```javascript
if (result.affectedRows === 0) {
    console.log("No record found");
}
```

**Important:** `affectedRows` can depend on the operation and driver configuration. For an UPDATE, it may be zero when the record exists but the supplied values do not change anything. Do not always interpret zero as proof that the record does not exist.

---

# 11. MongoDB Integration with Node.js

Now let's connect Node.js with MongoDB using the official MongoDB Node.js driver.

## 11.1 Install MongoDB Driver

```bash
npm install mongodb
```

## 11.2 Create MongoDB Database

You can use:

- MongoDB Community Server locally.
- MongoDB Atlas in the cloud.

Suppose your database name is:

```text
node_learning
```

Collection:

```text
users
```

MongoDB creates databases and collections when data is first stored, unless you explicitly create them beforehand.

## 11.3 Configure Environment Variables

`.env`

```env
PORT=3000

MONGODB_URI=mongodb://127.0.0.1:27017

MONGODB_DB=node_learning
```

For MongoDB Atlas, use the connection string provided by Atlas instead.

## 11.4 Create Database Connection

File: `src/config/db.js`

```javascript
const { MongoClient } = require("mongodb");

const client = new MongoClient(
    process.env.MONGODB_URI
);

let db;

async function connectDB() {

    await client.connect();

    db = client.db(
        process.env.MONGODB_DB
    );

    console.log("MongoDB connected successfully");

    return db;

}

function getDB() {

    if (!db) {
        throw new Error("Database is not connected");
    }

    return db;

}

module.exports = {
    connectDB,
    getDB,
    client
};
```

### Why Create a Separate Connection File?

Because database connection logic should not be repeated in every controller or service.

Instead, create one reusable database connection module.

## 11.5 Test MongoDB Connection

File: `server.js`

```javascript
require("dotenv").config();

const express = require("express");

const { connectDB } = require("./src/config/db");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

async function startServer() {

    try {

        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {

        console.error("Server startup failed:", error);

        process.exit(1);

    }

}

startServer();
```

**Important:** The server starts listening only after the database connection succeeds.

---

# 12. MongoDB CRUD Operations with Node.js

The MongoDB driver provides methods to work with collections.

First, get the collection:

```javascript
const { getDB } = require("../config/db");

const usersCollection = () => {
    return getDB().collection("users");
};
```

## 12.1 Create User

```javascript
async function createUser(userData) {

    const result = await usersCollection().insertOne({
        name: userData.name,
        email: userData.email,
        age: userData.age,
        createdAt: new Date()
    });

    return {
        _id: result.insertedId,
        ...userData
    };

}
```

MongoDB generates an `_id` automatically if you do not supply one.

## 12.2 Read All Users

```javascript
async function getAllUsers() {

    const users = await usersCollection()
        .find({})
        .toArray();

    return users;

}
```

## 12.3 Read User by ID

```javascript
const { ObjectId } = require("mongodb");

async function getUserById(id) {

    if (!ObjectId.isValid(id)) {
        return null;
    }

    const user = await usersCollection().findOne({
        _id: new ObjectId(id)
    });

    return user;

}
```

### What is ObjectId?

MongoDB uses BSON ObjectId values as the default identifier for documents.

Example:

```text
671abc123456789012345678
```

It is not simply an ordinary JavaScript string.

When searching by `_id`, you generally need to convert the incoming string into an ObjectId.

## 12.4 Update User

```javascript
async function updateUser(id, userData) {

    if (!ObjectId.isValid(id)) {
        return null;
    }

    const result = await usersCollection().updateOne(

        {
            _id: new ObjectId(id)
        },

        {
            $set: userData
        }

    );

    return result;

}
```

### What is `$set`?

`$set` is a MongoDB update operator.

It updates specified fields without replacing the entire document.

Example:

Existing document:

```json
{
    "_id": "671abc123",
    "name": "John",
    "email": "john@example.com",
    "age": 25
}
```

Update:

```javascript
{
    $set: {
        age: 30
    }
}
```

Updated document:

```json
{
    "_id": "671abc123",
    "name": "John",
    "email": "john@example.com",
    "age": 30
}
```

## 12.5 Delete User

```javascript
async function deleteUser(id) {

    if (!ObjectId.isValid(id)) {
        return null;
    }

    const result = await usersCollection().deleteOne({
        _id: new ObjectId(id)
    });

    return result;

}
```

---

# 13. Database Connection Management

Database connections are an important part of backend development.

A Node.js application may receive hundreds or thousands of requests.

Each request might need database access.

Creating a new database connection for every request is inefficient.

### Incorrect Approach

```javascript
app.get("/users", async (req, res) => {

    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "node_learning"
    });

    const [rows] = await connection.query(
        "SELECT * FROM users"
    );

    res.json(rows);

});
```

Problems:

- Creates a new connection for each request.
- Adds connection overhead.
- Can exhaust database connection limits.
- Requires careful connection cleanup.

### Better Approach

Create a reusable database connection pool.

```javascript
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "node_learning",
    waitForConnections: true,
    connectionLimit: 10
});
```

Then reuse it:

```javascript
const [rows] = await pool.execute(
    "SELECT * FROM users"
);
```

---

# 14. Connection Pooling

Connection pooling is a technique in which a group of database connections is created and reused.

Instead of opening a new connection for every database operation, the application borrows an available connection from the pool.

### Without Connection Pooling

```text
Request 1 → Create Connection → Query → Close

Request 2 → Create Connection → Query → Close

Request 3 → Create Connection → Query → Close
```

Every request creates a new connection.

### With Connection Pooling

```text
             CONNECTION POOL
             _______________
            |               |
Request 1 → | Connection 1  |
Request 2 → | Connection 2  |
Request 3 → | Connection 3  |
            | Connection 4  |
            | Connection 5  |
            |_______________|
```

Connections are reused after operations finish.

### Benefits

1. Reduced connection overhead.
2. Better resource utilization.
3. Improved performance under concurrent workloads.
4. Controlled number of active connections.
5. More efficient database communication.

### Example

```javascript
const pool = mysql.createPool({

    host: "localhost",

    user: "root",

    database: "node_learning",

    waitForConnections: true,

    connectionLimit: 10,

    queueLimit: 0

});
```

### Important Configuration

| Option | Meaning |
|---|---|
| `waitForConnections` | Whether requests wait when all connections are busy |
| `connectionLimit` | Maximum number of connections in the pool |
| `queueLimit` | Maximum number of waiting requests; zero means unlimited in mysql2 |

### Does MongoDB Also Use Connection Pooling?

Yes.

The MongoDB Node.js driver manages a connection pool for each server in the topology.

You can configure pool behavior:

```javascript
const client = new MongoClient(
    process.env.MONGODB_URI,
    {
        maxPoolSize: 10,
        minPoolSize: 2
    }
);
```

You generally create one MongoDB client per application process and reuse it.

---

# 15. What is ORM?

ORM stands for **Object Relational Mapping**.

An ORM allows developers to interact with relational databases using programming-language objects and methods rather than writing every SQL query manually.

### Without ORM

```javascript
const [rows] = await pool.execute(
    "SELECT * FROM users WHERE id = ?",
    [1]
);
```

### With ORM

Using Sequelize:

```javascript
const user = await User.findByPk(1);
```

The ORM translates the operation into an appropriate SQL query.

### Why Use ORM?

1. Less repetitive SQL code.
2. Object-oriented data interaction.
3. Model definitions.
4. Relationship management.
5. Query building.
6. Database migrations and schema management.
7. Improved code organization.

### Popular Node.js ORMs

- Sequelize
- Prisma
- TypeORM
- Drizzle ORM

### Important

An ORM does not eliminate the need to understand SQL.

You should still understand:

- SELECT.
- INSERT.
- UPDATE.
- DELETE.
- JOIN.
- GROUP BY.
- Indexes.
- Transactions.

---

# 16. What is ODM?

ODM stands for **Object Document Mapping**.

An ODM allows developers to interact with document-oriented databases using application-level objects and schemas.

A popular Node.js ODM is Mongoose.

### Without ODM

Using MongoDB driver:

```javascript
const users = await db
    .collection("users")
    .find({})
    .toArray();
```

### With ODM

Using Mongoose:

```javascript
const users = await User.find();
```

### ORM vs ODM

| Feature | ORM | ODM |
|---|---|---|
| Full Form | Object Relational Mapping | Object Document Mapping |
| Database Type | Relational | Document-oriented |
| Data Structure | Tables and rows | Collections and documents |
| Example | Sequelize | Mongoose |
| Common Database | MySQL | MongoDB |

**Remember:**

- Sequelize is an ORM.
- Mongoose is an ODM.

---

# 17. Sequelize ORM

Now let's integrate MySQL using Sequelize.

Sequelize is a promise-based Node.js ORM that supports several relational databases.

It supports:

- MySQL.
- PostgreSQL.
- MariaDB.
- SQLite.
- Microsoft SQL Server.

## 17.1 Install Sequelize

```bash
npm install sequelize mysql2
```

`sequelize` is the ORM.

`mysql2` is the MySQL driver.

## 17.2 Configure Database Connection

File: `src/config/db.js`

```javascript
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 3306,
        dialect: "mysql",

        logging: false,

        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

module.exports = sequelize;
```

### Explanation

| Property | Purpose |
|---|---|
| `host` | Database server address |
| `port` | Database port |
| `dialect` | Database type |
| `logging` | Enables or disables SQL logging |
| `pool.max` | Maximum pool connections |
| `pool.min` | Minimum pool connections |
| `pool.acquire` | Maximum time to acquire a connection |
| `pool.idle` | Time before an idle connection may be released |

## 17.3 Test Sequelize Connection

```javascript
const sequelize = require("./db");

async function connectDB() {

    try {

        await sequelize.authenticate();

        console.log("MySQL connected using Sequelize");

    } catch (error) {

        console.error("Database connection failed:", error);

        throw error;

    }

}

module.exports = connectDB;
```

`authenticate()` checks whether Sequelize can establish a connection.

## 17.4 Create User Model

File: `src/models/User.js`

```javascript
const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const User = sequelize.define("User", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },

    age: {
        type: DataTypes.INTEGER,
        allowNull: true
    }

}, {

    tableName: "users",

    timestamps: true,

    createdAt: "created_at",

    updatedAt: "updated_at"

});

module.exports = User;
```

### What is a Model?

A model represents a database table and defines how application code interacts with its records.

### What is `DataTypes`?

Sequelize provides `DataTypes` to define column data types.

Examples:

```javascript
DataTypes.STRING
DataTypes.INTEGER
DataTypes.BOOLEAN
DataTypes.DATE
DataTypes.TEXT
DataTypes.DECIMAL
DataTypes.FLOAT
DataTypes.JSON
```

### What is `timestamps`?

By default, Sequelize can manage two timestamp fields:

```text
createdAt
updatedAt
```

Here, we mapped them to:

```text
created_at
updated_at
```

If you already have a database table without these columns, you must configure timestamps appropriately or add the columns.

## 17.5 Create a User

```javascript
const User = require("../models/User");

async function createUser() {

    const user = await User.create({

        name: "John",

        email: "john@example.com",

        age: 25

    });

    return user;

}
```

Sequelize generates the corresponding SQL INSERT operation.

## 17.6 Get All Users

```javascript
const users = await User.findAll();
```

Equivalent SQL:

```sql
SELECT * FROM users;
```

## 17.7 Get User by ID

```javascript
const user = await User.findByPk(1);
```

Equivalent SQL:

```sql
SELECT * FROM users
WHERE id = 1;
```

## 17.8 Find User by Condition

```javascript
const user = await User.findOne({

    where: {
        email: "john@example.com"
    }

});
```

## 17.9 Update User

```javascript
const [updatedCount] = await User.update(

    {
        name: "John Smith",
        age: 30
    },

    {
        where: {
            id: 1
        }
    }

);
```

`updatedCount` tells you how many records were updated.

## 17.10 Delete User

```javascript
const deletedCount = await User.destroy({

    where: {
        id: 1
    }

});
```

## 17.11 Pagination with Sequelize

```javascript
const users = await User.findAll({

    limit: 10,

    offset: 0,

    order: [
        ["created_at", "DESC"]
    ]

});
```

## 17.12 Filtering with Sequelize

```javascript
const { Op } = require("sequelize");

const users = await User.findAll({

    where: {
        age: {
            [Op.gte]: 18
        }
    }

});
```

`Op.gte` means greater than or equal to.

Other commonly used operators:

| Operator | Meaning |
|---|---|
| `Op.eq` | Equal |
| `Op.ne` | Not equal |
| `Op.gt` | Greater than |
| `Op.gte` | Greater than or equal |
| `Op.lt` | Less than |
| `Op.lte` | Less than or equal |
| `Op.in` | Matches any value in an array |
| `Op.notIn` | Does not match values |
| `Op.like` | SQL LIKE |
| `Op.between` | Between two values |
| `Op.or` | OR condition |
| `Op.and` | AND condition |

Example:

```javascript
const users = await User.findAll({

    where: {
        age: {
            [Op.between]: [18, 30]
        }
    }

});
```

This retrieves users whose ages are between 18 and 30.

---

# 18. Mongoose ODM

Now let's integrate MongoDB using Mongoose.

Mongoose provides:

- Schema definitions.
- Models.
- Validation.
- Middleware/hooks.
- Query building.
- Relationship population.
- Document methods.

## 18.1 Install Mongoose

```bash
npm install mongoose
```

## 18.2 Connect MongoDB

File: `src/config/db.js`

```javascript
const mongoose = require("mongoose");

async function connectDB() {

    try {

        await mongoose.connect(
            process.env.MONGODB_URI
        );

        console.log("MongoDB connected using Mongoose");

    } catch (error) {

        console.error("MongoDB connection failed:", error);

        throw error;

    }

}

module.exports = connectDB;
```

Mongoose manages a connection pool internally.

## 18.3 Create User Schema

File: `src/models/User.js`

```javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    age: {
        type: Number,
        min: 0
    },

    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }

}, {

    timestamps: true

});

const User = mongoose.model("User", userSchema);

module.exports = User;
```

## 18.4 What is Schema?

A schema defines the structure and rules for documents managed by a Mongoose model.

Example:

```javascript
name: {
    type: String,
    required: true
}
```

This means:

- `name` must be a string.
- `name` is required.

### Common Mongoose Schema Types

| Type | Description |
|---|---|
| String | Text |
| Number | Numeric value |
| Boolean | True or false |
| Date | Date and time |
| Array | Array of values |
| ObjectId | MongoDB document reference |
| Mixed | Flexible data type |
| Buffer | Binary data |

## 18.5 Create User

```javascript
const User = require("../models/User");

async function createUser() {

    const user = await User.create({

        name: "John",

        email: "john@example.com",

        age: 25

    });

    return user;

}
```

## 18.6 Get All Users

```javascript
const users = await User.find();
```

## 18.7 Get User by ID

```javascript
const user = await User.findById(
    "671abc123456789012345678"
);
```

## 18.8 Find User by Condition

```javascript
const user = await User.findOne({

    email: "john@example.com"

});
```

## 18.9 Update User

```javascript
const user = await User.findByIdAndUpdate(

    userId,

    {
        age: 30
    },

    {
        new: true,
        runValidators: true
    }

);
```

### Explanation

`new: true` returns the updated document.

`runValidators: true` runs applicable schema validators during the update.

## 18.10 Delete User

```javascript
const user = await User.findByIdAndDelete(userId);
```

---

# 19. Sequelize vs Mongoose

This is an important comparison.

| Feature | Sequelize | Mongoose |
|---|---|---|
| Type | ORM | ODM |
| Database | Relational | MongoDB |
| Data Structure | Tables | Documents |
| Schema | Model definitions | Schema definitions |
| Relationships | Associations | References or embedding |
| Query Language | SQL generated by ORM | MongoDB query operations |
| Primary Identifier | Usually primary key | Usually `_id` |
| Example | `User.findByPk(1)` | `User.findById(id)` |

### Sequelize Example

```javascript
const user = await User.findByPk(1);
```

### Mongoose Example

```javascript
const user = await User.findById(id);
```

Both provide convenient methods for interacting with their respective databases.

---

# 20. Database Models

A model is an application-level representation of a database entity.

For example:

```text
User
Product
Order
Category
Payment
Review
```

In Sequelize, a model generally maps to a relational table.

In Mongoose, a model generally maps to a MongoDB collection.

### Example: E-commerce Models

```text
models/
│
├── User.js
├── Product.js
├── Category.js
├── Order.js
├── OrderItem.js
└── Payment.js
```

Each model defines the structure and behavior of a particular entity.

### Why Use Models?

1. Organize database logic.
2. Define data structure.
3. Apply validation rules.
4. Define relationships.
5. Reuse database operations.
6. Make application code easier to maintain.

---

# 21. Database Relationships

Database relationships describe how records in different tables or collections are associated.

There are three primary relationship types:

1. One-to-One.
2. One-to-Many.
3. Many-to-Many.

Let's understand each one.

## 21.1 One-to-One Relationship

One record in Table A is associated with one record in Table B.

Example:

A user has one profile.

```text
USERS
------
id
name
email

USER_PROFILES
-------------
id
user_id
address
phone
```

Relationship:

```text
USER
  |
  | 1
  |
  | 1
  |
USER_PROFILE
```

Example SQL:

```sql
CREATE TABLE user_profiles (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT UNIQUE,

    address VARCHAR(255),

    phone VARCHAR(20),

    FOREIGN KEY (user_id) REFERENCES users(id)

);
```

The `UNIQUE` constraint ensures a user cannot have multiple profile records through this foreign key.

### Sequelize Example

```javascript
User.hasOne(UserProfile, {
    foreignKey: "user_id"
});

UserProfile.belongsTo(User, {
    foreignKey: "user_id"
});
```

### Mongoose Example

A profile can store a reference to its user:

```javascript
const profileSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    address: String,

    phone: String

});
```

## 21.2 One-to-Many Relationship

One record in Table A can be associated with multiple records in Table B.

Example:

One user can have multiple orders.

```text
USER
-----
id
name

ORDER
-----
id
user_id
total
```

Relationship:

```text
       USER
         |
         | 1
         |
         | Many
         |
       ORDERS
```

### SQL Example

```sql
CREATE TABLE orders (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT,

    total DECIMAL(10,2),

    FOREIGN KEY (user_id) REFERENCES users(id)

);
```

### Sequelize Example

```javascript
User.hasMany(Order, {
    foreignKey: "user_id"
});

Order.belongsTo(User, {
    foreignKey: "user_id"
});
```

### Mongoose Example

```javascript
const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    total: Number

});
```

A user can have multiple order documents referencing the same user.

## 21.3 Many-to-Many Relationship

Multiple records in Table A can be associated with multiple records in Table B.

Example:

Students and Courses.

- One student can enroll in multiple courses.
- One course can have multiple students.

```text
STUDENTS
--------
id
name

COURSES
-------
id
name

STUDENT_COURSES
---------------
student_id
course_id
```

Relationship:

```text
STUDENTS
    |
    | Many
    |
STUDENT_COURSES
    |
    | Many
    |
COURSES
```

### SQL Example

```sql
CREATE TABLE student_courses (

    student_id INT,

    course_id INT,

    PRIMARY KEY (student_id, course_id),

    FOREIGN KEY (student_id) REFERENCES students(id),

    FOREIGN KEY (course_id) REFERENCES courses(id)

);
```

### Sequelize Example

```javascript
Student.belongsToMany(Course, {
    through: StudentCourse,
    foreignKey: "student_id"
});

Course.belongsToMany(Student, {
    through: StudentCourse,
    foreignKey: "course_id"
});
```

### Mongoose Example

You can store arrays of references:

```javascript
const studentSchema = new mongoose.Schema({

    name: String,

    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ]

});
```

Alternatively, use a separate enrollment collection when the relationship needs additional fields, such as enrollment date, grade, or status.

### Relationship Comparison

| Relationship | Example |
|---|---|
| One-to-One | User → Profile |
| One-to-Many | User → Orders |
| Many-to-Many | Students ↔ Courses |

### Important MongoDB Concept: Embedding vs Referencing

MongoDB allows you to model related information in two main ways.

**Embedding:**

```json
{
    "name": "John",
    "address": {
        "city": "Ahmedabad",
        "country": "India"
    }
}
```

The related information is stored inside the same document.

**Referencing:**

```json
{
    "name": "John",
    "profile": "671abc123456789012345678"
}
```

The related information is stored in another document.

Use embedding when related information is commonly retrieved together and its size and update pattern are appropriate.

Use referencing when data is shared, independently managed, or may grow substantially.

---

# 22. Database Transactions

A transaction is a group of database operations treated as one logical unit.

A transaction should preserve the required database consistency rules.

The classic ACID properties are:

1. Atomicity.
2. Consistency.
3. Isolation.
4. Durability.

Let's understand them.

### Atomicity

Either all operations succeed or the transaction is rolled back.

### Consistency

A transaction should preserve defined database constraints and integrity rules.

### Isolation

Concurrent transactions should behave according to the database's configured isolation level.

### Durability

Once a transaction is committed, its changes should survive failures according to the database's durability guarantees.

### Example: Bank Transfer

Suppose John transfers ₹1,000 to David.

Two operations are required:

1. Deduct ₹1,000 from John's account.
2. Add ₹1,000 to David's account.

What happens if the first operation succeeds but the second fails?

Money would be deducted without being credited.

A transaction solves this problem.

### SQL Transaction Example

```sql
START TRANSACTION;

UPDATE accounts
SET balance = balance - 1000
WHERE id = 1;

UPDATE accounts
SET balance = balance + 1000
WHERE id = 2;

COMMIT;
```

If something goes wrong:

```sql
ROLLBACK;
```

### Sequelize Transaction Example

```javascript
const sequelize = require("../config/db");

async function transferMoney() {

    const transaction = await sequelize.transaction();

    try {

        await Account.decrement(
            "balance",
            {
                by: 1000,
                where: { id: 1 },
                transaction
            }
        );

        await Account.increment(
            "balance",
            {
                by: 1000,
                where: { id: 2 },
                transaction
            }
        );

        await transaction.commit();

        console.log("Transfer completed");

    } catch (error) {

        await transaction.rollback();

        throw error;

    }

}
```

### Mongoose Transaction Example

MongoDB supports transactions when running in a suitable replica set or sharded cluster configuration.

```javascript
const mongoose = require("mongoose");

async function transferMoney() {

    const session = await mongoose.startSession();

    try {

        session.startTransaction();

        await Account.updateOne(
            { _id: account1 },
            { $inc: { balance: -1000 } },
            { session }
        );

        await Account.updateOne(
            { _id: account2 },
            { $inc: { balance: 1000 } },
            { session }
        );

        await session.commitTransaction();

    } catch (error) {

        await session.abortTransaction();

        throw error;

    } finally {

        await session.endSession();

    }

}
```

**Important:** Production financial operations also need balance checks, concurrency controls, idempotency, and proper validation. Transactions alone do not guarantee that business rules are correct.

---

# 23. Database Indexing

An index is a data structure that helps a database locate records more efficiently.

Think of an index like the index section of a book.

Without an index, you may need to scan many pages to find a topic.

With an index, you can locate the topic more quickly.

### Without Index

Suppose you have one million users.

You execute:

```sql
SELECT *
FROM users
WHERE email = 'john@example.com';
```

Without a suitable index, the database may need to examine many rows.

This is called a table scan.

### With Index

Create an index:

```sql
CREATE INDEX idx_users_email
ON users(email);
```

Now the database can use the index to locate matching records more efficiently.

### Unique Index

```sql
CREATE UNIQUE INDEX idx_unique_email
ON users(email);
```

This prevents duplicate non-null email values, subject to the database's unique-index and NULL semantics.

### MongoDB Index

```javascript
db.users.createIndex({
    email: 1
});
```

Here:

- `1` means ascending index order.
- `-1` means descending index order.

### Unique MongoDB Index

```javascript
db.users.createIndex(
    { email: 1 },
    { unique: true }
);
```

### Mongoose Index

```javascript
const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    }

});
```

### Benefits of Indexing

1. Faster data retrieval.
2. Better query performance.
3. Efficient sorting for supported queries.
4. Efficient uniqueness enforcement.

### Disadvantages of Indexing

1. Requires additional storage.
2. Slows down some write operations.
3. Requires maintenance.
4. Too many indexes can reduce overall performance.

**Important:** Do not create indexes on every column or field. Create indexes based on actual query patterns and inspect query execution plans.

---

# 24. Database Error Handling

Database operations can fail for different reasons.

Examples:

- Database unavailable.
- Invalid connection credentials.
- Duplicate email.
- Missing required field.
- Invalid query.
- Connection timeout.
- Network interruption.
- Constraint violation.

Your backend should handle these errors appropriately.

### Example: MySQL Error Handling

```javascript
try {

    const [result] = await pool.execute(
        "INSERT INTO users (name, email) VALUES (?, ?)",
        ["John", "john@example.com"]
    );

    console.log(result);

} catch (error) {

    if (error.code === "ER_DUP_ENTRY") {

        console.log("Email already exists");

    } else {

        console.error("Database error:", error);

    }

}
```

### Example: MongoDB Error Handling

```javascript
try {

    await User.create({
        name: "John",
        email: "john@example.com"
    });

} catch (error) {

    if (error.code === 11000) {

        console.log("Duplicate field value");

    } else {

        console.error(error);

    }

}
```

### Important

Do not send raw database errors or stack traces to clients in production.

Instead, return an appropriate HTTP response.

Example:

```javascript
res.status(409).json({
    success: false,
    message: "Email already exists"
});
```

Detailed error information should be logged securely on the server.

---

# 25. Building a Database-Driven REST API

Now let's combine the concepts.

We will build a user management REST API using:

- Node.js.
- Express.js.
- MySQL.
- Sequelize.
- Controller-Service-Model architecture.

This example uses Sequelize with MySQL.

## 25.1 Project Structure

```text
user-api/
│
├── src/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   └── User.js
│   │
│   ├── services/
│   │   └── userService.js
│   │
│   ├── controllers/
│   │   └── userController.js
│   │
│   ├── routes/
│   │   └── userRoutes.js
│   │
│   ├── middleware/
│   │   └── errorHandler.js
│   │
│   └── app.js
│
├── server.js
├── .env
├── .gitignore
└── package.json
```

## 25.2 Install Packages

```bash
npm init -y

npm install express sequelize mysql2 dotenv
```

## 25.3 Create Database

```sql
CREATE DATABASE user_api;
```

## 25.4 Configure Environment

`.env`

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=user_api
DB_PORT=3306
```

## 25.5 Database Configuration

File: `src/config/db.js`

```javascript
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 3306,
        dialect: "mysql",
        logging: false
    }
);

module.exports = sequelize;
```

## 25.6 Create User Model

File: `src/models/User.js`

```javascript
const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const User = sequelize.define("User", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },

    age: {
        type: DataTypes.INTEGER
    }

}, {

    tableName: "users",

    timestamps: true

});

module.exports = User;
```

## 25.7 Create User Service

File: `src/services/userService.js`

```javascript
const User = require("../models/User");

const { Op } = require("sequelize");

// GET ALL USERS
exports.getAllUsers = async (query) => {

    const page = Math.max(
        1,
        Number.parseInt(query.page, 10) || 1
    );

    const limit = Math.min(
        100,
        Math.max(
            1,
            Number.parseInt(query.limit, 10) || 10
        )
    );

    const offset = (page - 1) * limit;

    const where = {};

    if (query.search) {

        where.name = {
            [Op.like]: `%${query.search}%`
        };

    }

    const { count, rows } = await User.findAndCountAll({

        where,

        limit,

        offset,

        order: [
            ["id", "DESC"]
        ]

    });

    return {
        users: rows,

        pagination: {
            page,
            limit,
            totalRecords: count,
            totalPages: Math.ceil(count / limit)
        }

    };

};

// GET USER BY ID
exports.getUserById = async (id) => {

    return await User.findByPk(id);

};

// CREATE USER
exports.createUser = async (data) => {

    return await User.create(data);

};

// UPDATE USER
exports.updateUser = async (id, data) => {

    const user = await User.findByPk(id);

    if (!user) {
        return null;
    }

    await user.update(data);

    return user;

};

// DELETE USER
exports.deleteUser = async (id) => {

    const user = await User.findByPk(id);

    if (!user) {
        return null;
    }

    await user.destroy();

    return user;

};
```

## 25.8 Create Controller

File: `src/controllers/userController.js`

```javascript
const userService = require("../services/userService");

// GET ALL USERS
exports.getUsers = async (req, res, next) => {

    try {

        const result = await userService.getAllUsers(req.query);

        res.status(200).json({
            success: true,
            data: result.users,
            pagination: result.pagination
        });

    } catch (error) {
        next(error);
    }

};

// GET USER BY ID
exports.getUserById = async (req, res, next) => {

    try {

        const user = await userService.getUserById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        next(error);
    }

};

// CREATE USER
exports.createUser = async (req, res, next) => {

    try {

        const user = await userService.createUser(req.body);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user
        });

    } catch (error) {
        next(error);
    }

};

// UPDATE USER
exports.updateUser = async (req, res, next) => {

    try {

        const user = await userService.updateUser(
            req.params.id,
            req.body
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user
        });

    } catch (error) {
        next(error);
    }

};

// DELETE USER
exports.deleteUser = async (req, res, next) => {

    try {

        const user = await userService.deleteUser(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {
        next(error);
    }

};
```

## 25.9 Create Routes

File: `src/routes/userRoutes.js`

```javascript
const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", userController.getUsers);

router.get("/:id", userController.getUserById);

router.post("/", userController.createUser);

router.put("/:id", userController.updateUser);

router.patch("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;
```

For this learning example, PUT and PATCH share an update handler. In a production API, implement and document their different semantics explicitly.

## 25.10 Create Error Middleware

File: `src/middleware/errorHandler.js`

```javascript
function errorHandler(err, req, res, next) {

    console.error(err);

    if (err.name === "SequelizeUniqueConstraintError") {

        return res.status(409).json({
            success: false,
            message: "Email already exists"
        });

    }

    if (err.name === "SequelizeValidationError") {

        return res.status(422).json({
            success: false,
            message: "Validation failed"
        });

    }

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });

}

module.exports = errorHandler;
```

## 25.11 Create app.js

File: `src/app.js`

```javascript
const express = require("express");

const userRoutes = require("./routes/userRoutes");

const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {

    res.status(200).json({
        success: true,
        message: "API is running"
    });

});

app.use("/api/v1/users", userRoutes);

app.use((req, res) => {

    res.status(404).json({
        success: false,
        message: "Route not found"
    });

});

app.use(errorHandler);

module.exports = app;
```

## 25.12 Create server.js

File: `server.js`

```javascript
require("dotenv").config();

const app = require("./src/app");

const sequelize = require("./src/config/db");

require("./src/models/User");

const PORT = process.env.PORT || 3000;

async function startServer() {

    try {

        await sequelize.authenticate();

        console.log("Database connected successfully");

        await sequelize.sync();

        console.log("Database models synchronized");

        app.listen(PORT, () => {

            console.log(`Server running on port ${PORT}`);

        });

    } catch (error) {

        console.error("Server startup failed:", error);

        process.exit(1);

    }

}

startServer();
```

### Important: `sequelize.sync()`

`sequelize.sync()` synchronizes model definitions with database tables.

For learning and small development projects, it can be useful.

However, avoid relying on automatic schema synchronization for production schema changes.

Use database migrations for controlled schema evolution.

## 25.13 Run the Project

```bash
node --watch server.js
```

Or add this script to `package.json`:

```json
{
    "scripts": {
        "dev": "node --watch server.js",
        "start": "node server.js"
    }
}
```

Run:

```bash
npm run dev
```

---

# 26. Test the Database-Driven API

Use Postman.

### 1. Health Check

```http
GET http://localhost:3000/health
```

### 2. Create User

```http
POST http://localhost:3000/api/v1/users
```

Body:

```json
{
    "name": "John",
    "email": "john@example.com",
    "age": 25
}
```

### 3. Get All Users

```http
GET http://localhost:3000/api/v1/users
```

### 4. Get User by ID

```http
GET http://localhost:3000/api/v1/users/1
```

### 5. Update User

```http
PATCH http://localhost:3000/api/v1/users/1
```

Body:

```json
{
    "name": "John Smith"
}
```

### 6. Delete User

```http
DELETE http://localhost:3000/api/v1/users/1
```

### 7. Search Users

```http
GET http://localhost:3000/api/v1/users?search=john
```

### 8. Pagination

```http
GET http://localhost:3000/api/v1/users?page=1&limit=10
```

**Production note:** This is a learning implementation. Before production use, add request validation, strict update-field allowlists, safe pagination bounds, authentication and authorization where required, structured logging, and database migrations. The current PATCH handler passes the request body directly to Sequelize, so it should not be used as-is with untrusted input.

---

# 27. Database Integration Best Practices

These are important practices for real-world Node.js applications.

### 1. Use Environment Variables

Never hardcode database credentials.

```javascript
process.env.DB_PASSWORD
```

### 2. Use Connection Pooling

Reuse database connections instead of opening a new connection for every request.

### 3. Use Parameterized Queries

Avoid SQL injection.

Correct:

```javascript
await pool.execute(
    "SELECT * FROM users WHERE id = ?",
    [id]
);
```

Incorrect:

```javascript
await pool.query(
    `SELECT * FROM users WHERE id = ${id}`
);
```

### 4. Avoid Business Logic Inside Controllers

Keep business logic in services.

### 5. Handle Database Errors

Use centralized error handling.

### 6. Use Transactions

Use transactions when multiple database operations must succeed or fail together.

### 7. Use Indexes Carefully

Create indexes based on actual query patterns.

### 8. Avoid Returning Sensitive Data

Never return password hashes or private internal fields unnecessarily.

### 9. Use Database Migrations

Manage schema changes through version-controlled migrations.

### 10. Validate Data

Do not rely only on database constraints or ORM schemas.

Validate incoming API data before processing it.

---

# 28. Important Database Terminology

| Term | Meaning |
|---|---|
| Database | Organized data storage |
| DBMS | Database Management System |
| RDBMS | Relational Database Management System |
| SQL | Structured Query Language |
| NoSQL | Broad category of non-relational database systems |
| Table | Structured collection of rows and columns |
| Row | Individual record |
| Column | Attribute of a table |
| Collection | MongoDB document container |
| Document | MongoDB record |
| Primary Key | Unique identifier for a record |
| Foreign Key | Field referencing another table's key |
| Schema | Defined structure and rules for data |
| Query | Request to retrieve or modify data |
| CRUD | Create, Read, Update, Delete |
| Driver | Library that communicates with a database |
| ORM | Object Relational Mapping |
| ODM | Object Document Mapping |
| Model | Application representation of data |
| Connection Pool | Reusable database connections |
| Transaction | Group of operations treated as a logical unit |
| Index | Data structure that improves lookup efficiency |
| Migration | Version-controlled database schema change |
| ACID | Atomicity, Consistency, Isolation, Durability |
| JOIN | Combines related rows from SQL tables |
| Aggregation | Data processing and summarization |
| Replication | Maintaining copies of data |
| Sharding | Distributing data across multiple servers |

---

# 29. Interview Questions and Answers

### Q1. What is a database?

A database is an organized collection of data that can be stored, retrieved, and managed efficiently.

### Q2. What is DBMS?

DBMS stands for Database Management System. It is software used to create, manage, and interact with databases.

### Q3. What is RDBMS?

RDBMS stands for Relational Database Management System. It stores data in related tables.

### Q4. What is the difference between SQL and NoSQL?

SQL databases generally use relational tables and structured schemas. NoSQL databases support different data models, such as documents, key-value pairs, and graphs.

### Q5. What is a primary key?

A primary key uniquely identifies a record in a table.

### Q6. What is a foreign key?

A foreign key establishes a relationship between records in different tables.

### Q7. What is a database driver?

A database driver is a library that allows an application to communicate with a database.

### Q8. How does Node.js connect to MySQL?

Node.js can connect to MySQL using packages such as `mysql2`.

### Q9. How does Node.js connect to MongoDB?

Node.js can connect to MongoDB using the official `mongodb` driver or Mongoose.

### Q10. What is connection pooling?

Connection pooling maintains reusable database connections to reduce connection overhead.

### Q11. What is ORM?

ORM stands for Object Relational Mapping. It allows developers to interact with relational databases using objects and methods.

### Q12. What is ODM?

ODM stands for Object Document Mapping. It provides an object-oriented interface for document databases.

### Q13. What is Sequelize?

Sequelize is a promise-based ORM for Node.js that supports relational databases such as MySQL and PostgreSQL.

### Q14. What is Mongoose?

Mongoose is an ODM for MongoDB that provides schemas, models, validation, and query functionality.

### Q15. What is a Sequelize model?

A Sequelize model represents a database table and defines its attributes and configuration.

### Q16. What is a Mongoose schema?

A Mongoose schema defines the structure, types, and validation rules for documents.

### Q17. What is the difference between `findOne()` and `findByPk()` in Sequelize?

`findOne()` retrieves the first matching record based on specified conditions, while `findByPk()` retrieves a record using its primary key.

### Q18. What is the difference between `find()` and `findOne()` in Mongoose?

`find()` returns matching documents, while `findOne()` returns the first matching document or `null`.

### Q19. What is a database transaction?

A transaction is a group of database operations treated as one logical unit.

### Q20. What are ACID properties?

- Atomicity.
- Consistency.
- Isolation.
- Durability.

### Q21. What is indexing?

Indexing is a technique used to improve data retrieval performance.

### Q22. What is the difference between embedding and referencing in MongoDB?

Embedding stores related data inside the same document, while referencing stores related data in separate documents and connects them through identifiers.

### Q23. What is a One-to-Many relationship?

A relationship where one record can be associated with multiple records in another table or collection.

### Q24. What is a Many-to-Many relationship?

A relationship where multiple records from one entity can be associated with multiple records from another entity.

### Q25. What is a database migration?

A migration is a version-controlled change to database structure, such as creating a table or adding a column.

### Q26. Why should we use parameterized SQL queries?

They separate SQL instructions from user-supplied values and help prevent SQL injection.

### Q27. What is the difference between `sequelize.authenticate()` and `sequelize.sync()`?

`authenticate()` checks database connectivity. `sync()` synchronizes Sequelize model definitions with database tables.

### Q28. What is the difference between `insertId` and `affectedRows` in MySQL?

`insertId` provides the generated identifier for an inserted record. `affectedRows` indicates how many rows were affected by a query.

### Q29. Does MongoDB support transactions?

Yes. MongoDB supports multi-document transactions in supported deployment configurations, including replica sets and sharded clusters.

### Q30. Should we use ORM or raw SQL?

It depends on the application. ORMs improve productivity and organization, while raw SQL offers direct control over queries. Both can be used together when appropriate.

---

# 30. Phase 10 Cheat Sheet

### MySQL

```javascript
// Connect
const mysql = require("mysql2/promise");

// Create pool
const pool = mysql.createPool(config);

// Insert
await pool.execute(
    "INSERT INTO users (name) VALUES (?)",
    ["John"]
);

// Select
const [rows] = await pool.execute(
    "SELECT * FROM users"
);

// Update
await pool.execute(
    "UPDATE users SET name = ? WHERE id = ?",
    ["David", 1]
);

// Delete
await pool.execute(
    "DELETE FROM users WHERE id = ?",
    [1]
);
```

### Sequelize

```javascript
// Create
await User.create({ name: "John" });

// Read all
await User.findAll();

// Read by primary key
await User.findByPk(1);

// Read by condition
await User.findOne({
    where: { email: "john@example.com" }
});

// Update
await User.update(
    { name: "David" },
    { where: { id: 1 } }
);

// Delete
await User.destroy({
    where: { id: 1 }
});
```

### MongoDB Driver

```javascript
// Insert
await collection.insertOne({ name: "John" });

// Read
await collection.find({}).toArray();

// Read one
await collection.findOne({ name: "John" });

// Update
await collection.updateOne(
    { name: "John" },
    { $set: { age: 30 } }
);

// Delete
await collection.deleteOne({
    name: "John"
});
```

### Mongoose

```javascript
// Create
await User.create({ name: "John" });

// Read all
await User.find();

// Read one
await User.findOne({ email: "john@example.com" });

// Read by ID
await User.findById(id);

// Update
await User.findByIdAndUpdate(
    id,
    { age: 30 },
    { new: true }
);

// Delete
await User.findByIdAndDelete(id);
```

---

# 31. Phase 10 Completion Checklist

Before moving to Phase 11, make sure you can:

- [ ] Explain what a database is.
- [ ] Understand SQL vs NoSQL.
- [ ] Understand relational databases.
- [ ] Understand document databases.
- [ ] Understand tables, rows, columns, and collections.
- [ ] Understand primary keys and foreign keys.
- [ ] Connect Node.js with MySQL.
- [ ] Connect Node.js with MongoDB.
- [ ] Understand database drivers.
- [ ] Implement connection pooling.
- [ ] Perform MySQL CRUD operations.
- [ ] Perform MongoDB CRUD operations.
- [ ] Understand ORM.
- [ ] Understand ODM.
- [ ] Integrate Sequelize.
- [ ] Integrate Mongoose.
- [ ] Create database models.
- [ ] Understand database relationships.
- [ ] Implement One-to-One relationships.
- [ ] Implement One-to-Many relationships.
- [ ] Implement Many-to-Many relationships.
- [ ] Understand database transactions.
- [ ] Understand ACID properties.
- [ ] Understand database indexing.
- [ ] Handle database errors.
- [ ] Build a database-driven REST API.

## Practical Projects

Complete these projects to strengthen your understanding.

| Project | Database | Concepts |
|---|---|---|
| User Management API | MySQL | CRUD, Sequelize |
| Product Management API | MySQL | Filtering, sorting, pagination |
| Blog API | MongoDB | Mongoose, schemas, references |
| Expense Tracker API | MySQL | Relationships, transactions |
| Todo API | MongoDB | CRUD, validation |
| E-commerce Backend | MySQL | Multiple relationships, transactions |

### Recommended Learning Order

Since you will work with both MySQL and MongoDB, follow this order:

1. Build a CRUD API using `mysql2`.
2. Build the same CRUD API using Sequelize.
3. Build a CRUD API using the MongoDB driver.
4. Build the same CRUD API using Mongoose.
5. Create relationships in Sequelize.
6. Create references and embedded documents in Mongoose.
7. Implement transactions and indexes.

This will help you understand what the database driver does and what additional functionality an ORM or ODM provides.

---

# What Comes Next?

## PHASE 11: Authentication & Authorization

In Phase 11, we will learn how to authenticate users and control access to backend resources.

Topics:

1. What is Authentication?
2. What is Authorization?
3. Authentication vs Authorization.
4. User Registration.
5. User Login.
6. Password Hashing.
7. Encryption vs Hashing.
8. bcrypt and bcryptjs.
9. JSON Web Tokens (JWT).
10. JWT Structure.
11. Access Tokens.
12. Refresh Tokens.
13. Token-Based Authentication.
14. Session-Based Authentication.
15. Cookies.
16. HTTP-Only Cookies.
17. Secure Cookies.
18. Authentication Middleware.
19. Protected Routes.
20. Role-Based Access Control (RBAC).
21. Permission-Based Authorization.
22. Logout Implementation.
23. Password Reset.
24. Email Verification.
25. Google OAuth.
26. Authentication Security Best Practices.
27. Complete Authentication System with Node.js and Express.

**Phase 10's most important takeaway:** Understand the difference between a database driver, ORM, and ODM. A driver communicates directly with the database; an ORM maps application objects to relational data; an ODM maps application objects to document data.