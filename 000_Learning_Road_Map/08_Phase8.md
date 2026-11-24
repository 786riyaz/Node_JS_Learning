# PHASE 08: Express.js Fundamentals

**Level:** Beginner to Intermediate  
**Goal:** Learn Express.js from the fundamentals and understand how to build backend applications using routing, middleware, controllers, and request-response handling.

---

## Topics Covered

1. What is Express.js?
2. Why Express.js?
3. Node.js HTTP vs Express.js
4. Installing Express.js
5. Creating an Express Server
6. Express Application Object
7. Routing Fundamentals
8. HTTP Methods in Express
9. Route Parameters
10. Query Parameters
11. Request and Response Objects
12. Middleware
13. Types of Middleware
14. Built-in Middleware
15. Application-Level Middleware
16. Router-Level Middleware
17. Error-Handling Middleware
18. Serving Static Files
19. Express Router
20. Controllers
21. Organizing Backend Project Structure
22. Building a CRUD API with Express
23. Common Express.js Mistakes
24. Interview Questions

---

# 1. What is Express.js?

Express.js is a minimal and flexible web application framework built on top of Node.js.

It simplifies the development of web servers and REST APIs.

Node.js provides built-in modules such as `http`, `fs`, and `path`.

Express.js uses Node.js functionality and provides additional abstractions for:

- Routing.
- Middleware.
- Request handling.
- Response handling.
- Error handling.
- Static file serving.
- API development.

### Simple Definition

**Express.js is a Node.js web framework that simplifies building web applications and REST APIs.**

### Example: Node.js HTTP Server

Using the native HTTP module:

```javascript
const http = require("node:http");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.end("Home Page");
    } else if (req.url === "/about") {
        res.end("About Page");
    } else {
        res.statusCode = 404;
        res.end("Not Found");
    }
});

server.listen(3000);
```

### Same Example Using Express.js

```javascript
const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.get("/about", (req, res) => {
    res.send("About Page");
});

app.listen(3000);
```

Notice how Express makes routing and response handling simpler.

---

# 2. Why Express.js?

You can build backend applications using only Node.js, but as applications become larger, manually managing routes and request handling becomes complicated.

Express provides a cleaner way to organize backend applications.

### Problems Express.js Solves

| Without Express.js | With Express.js |
|---|---|
| Manual route matching | Built-in routing |
| Manual request body parsing | Built-in JSON middleware |
| Manual response handling | Convenient response methods |
| Manual middleware management | Middleware system |
| Manual static file serving | `express.static()` |
| Complex route organization | Express Router |
| Repetitive code | Reusable application structure |

### Common Features

1. Routing.
2. Middleware support.
3. Request and response utilities.
4. Static file serving.
5. Error handling.
6. Router management.
7. Integration with databases and other Node.js packages.

### Important

Express.js does not replace Node.js.

Express.js runs on Node.js and uses its runtime capabilities.

---

# 3. Node.js HTTP vs Express.js

Let's compare both approaches.

| Feature | Node.js HTTP | Express.js |
|---|---|---|
| Type | Built-in Node.js module | Third-party framework |
| Installation | No installation required | Requires npm installation |
| Routing | Manual | Built-in routing |
| Middleware | No Express-style middleware system | Middleware architecture |
| Request Body | Manual stream handling | Middleware such as `express.json()` |
| Response | `res.write()`, `res.end()` | `res.send()`, `res.json()` |
| Static Files | Manual implementation | `express.static()` |
| Error Handling | Manual | Middleware-based |
| Development Speed | More manual work | Faster development |

### Example Comparison

**Node.js HTTP:**

```javascript
const http = require("node:http");

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/users") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify([
            { id: 1, name: "John" }
        ]));
    }
});

server.listen(3000);
```

**Express.js:**

```javascript
const express = require("express");

const app = express();

app.get("/users", (req, res) => {
    res.json([
        { id: 1, name: "John" }
    ]);
});

app.listen(3000);
```

---

# 4. Installing Express.js

Create a new project directory.

```bash
mkdir express-learning
cd express-learning
```

Initialize the Node.js project:

```bash
npm init -y
```

Install Express:

```bash
npm install express
```

Express will be added to your `dependencies` in `package.json`.

### Example package.json

```json
{
    "name": "express-learning",
    "version": "1.0.0",
    "main": "server.js",
    "scripts": {
        "start": "node server.js",
        "dev": "node --watch server.js"
    },
    "dependencies": {
        "express": "^5.1.0"
    }
}
```

The exact version will depend on the version installed.

### Verify Installation

```bash
npm list express
```

### Recommended Project Structure

```text
express-learning/
│
├── node_modules/
│
├── package.json
│
├── package-lock.json
│
└── server.js
```

---

# 5. Creating Your First Express Server

Create a file named `server.js`.

```javascript
const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello from Express.js");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

### Run the Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Output:

```text
Hello from Express.js
```

### Understanding the Code

**Step 1: Import Express**

```javascript
const express = require("express");
```

Imports the Express package.

**Step 2: Create Express Application**

```javascript
const app = express();
```

Creates an Express application instance.

This `app` object provides methods for:

- Routing.
- Middleware registration.
- Server configuration.
- Request handling.

**Step 3: Define a Route**

```javascript
app.get("/", (req, res) => {
    res.send("Hello from Express.js");
});
```

This defines a GET route for `/`.

**Step 4: Start the Server**

```javascript
app.listen(PORT, () => {
    console.log("Server started");
});
```

Starts the HTTP server and makes it listen on the specified port.

### Important: What Does app.listen() Do?

Internally, Express uses Node.js HTTP server functionality.

Conceptually, it is similar to:

```javascript
const http = require("node:http");

const server = http.createServer(app);

server.listen(3000);
```

Express handles the request processing through its application callback.

---

# 6. Express Application Object

The Express application object is created using:

```javascript
const app = express();
```

It provides several methods to configure and manage your application.

### Important app Methods

| Method | Purpose |
|---|---|
| `app.get()` | Handles GET requests |
| `app.post()` | Handles POST requests |
| `app.put()` | Handles PUT requests |
| `app.patch()` | Handles PATCH requests |
| `app.delete()` | Handles DELETE requests |
| `app.use()` | Registers middleware |
| `app.listen()` | Starts the server |
| `app.route()` | Creates route handlers for a path |
| `app.set()` | Sets application settings |
| `app.get()` | Also retrieves an application setting when called with one argument |

**Note:** `app.get()` has two different uses:

```javascript
app.get("/users", handler);
```

Defines a GET route.

```javascript
app.get("env");
```

Retrieves the application setting named `env`.

---

# 7. Routing Fundamentals

Routing determines how an application responds to a particular URL and HTTP method.

In Express.js, routing is implemented using methods such as:

```javascript
app.get()
app.post()
app.put()
app.patch()
app.delete()
```

### Basic Syntax

```javascript
app.METHOD(PATH, HANDLER);
```

Where:

- `app` is the Express application.
- `METHOD` is the HTTP method.
- `PATH` is the route path.
- `HANDLER` is the callback function.

### Example

```javascript
app.get("/users", (req, res) => {
    res.send("Get Users");
});

app.post("/users", (req, res) => {
    res.send("Create User");
});

app.put("/users/1", (req, res) => {
    res.send("Update User");
});

app.delete("/users/1", (req, res) => {
    res.send("Delete User");
});
```

### Multiple Routes Example

```javascript
const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.get("/about", (req, res) => {
    res.send("About Page");
});

app.get("/contact", (req, res) => {
    res.send("Contact Page");
});

app.get("/services", (req, res) => {
    res.send("Services Page");
});

app.listen(3000);
```

### What Happens When a Route Does Not Exist?

If no route or middleware sends a response, Express eventually returns a default 404 response.

You can create your own 404 handler:

```javascript
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});
```

Register this after your application routes.

---

# 8. HTTP Methods in Express

Express provides methods corresponding to HTTP methods.

## 8.1 GET

Used to retrieve data.

```javascript
app.get("/users", (req, res) => {
    res.json([
        { id: 1, name: "John" },
        { id: 2, name: "David" }
    ]);
});
```

## 8.2 POST

Used to submit data or create a resource.

```javascript
app.post("/users", (req, res) => {
    res.send("User created");
});
```

## 8.3 PUT

Used to replace a resource.

```javascript
app.put("/users/:id", (req, res) => {
    res.send("User replaced");
});
```

## 8.4 PATCH

Used to partially update a resource.

```javascript
app.patch("/users/:id", (req, res) => {
    res.send("User updated partially");
});
```

## 8.5 DELETE

Used to delete a resource.

```javascript
app.delete("/users/:id", (req, res) => {
    res.send("User deleted");
});
```

### Complete Example

```javascript
const express = require("express");

const app = express();

app.get("/users", (req, res) => {
    res.send("GET request");
});

app.post("/users", (req, res) => {
    res.send("POST request");
});

app.put("/users/:id", (req, res) => {
    res.send("PUT request");
});

app.patch("/users/:id", (req, res) => {
    res.send("PATCH request");
});

app.delete("/users/:id", (req, res) => {
    res.send("DELETE request");
});

app.listen(3000);
```

---

# 9. Route Parameters

Route parameters are dynamic values included in the URL path.

They are useful when identifying a particular resource.

### Example

```text
/users/101
/users/102
/users/103
```

Here, the user ID changes dynamically.

### Express Syntax

```javascript
app.get("/users/:id", (req, res) => {
    console.log(req.params.id);

    res.send(`User ID: ${req.params.id}`);
});
```

Open:

```text
http://localhost:3000/users/101
```

Output:

```text
User ID: 101
```

### Multiple Route Parameters

```javascript
app.get("/users/:userId/orders/:orderId", (req, res) => {
    const { userId, orderId } = req.params;

    res.json({
        userId,
        orderId
    });
});
```

URL:

```text
/users/101/orders/5001
```

Response:

```json
{
    "userId": "101",
    "orderId": "5001"
}
```

### Important

Route parameter values are strings.

If you need a number, convert and validate it.

```javascript
const userId = Number(req.params.id);

if (!Number.isInteger(userId)) {
    return res.status(400).json({
        message: "Invalid user ID"
    });
}
```

---

# 10. Query Parameters

Query parameters are values passed after the `?` character in the URL.

They are commonly used for:

- Searching.
- Filtering.
- Sorting.
- Pagination.

### Example URL

```text
/products?category=electronics&sort=price&page=2
```

### Express Example

```javascript
app.get("/products", (req, res) => {
    const category = req.query.category;

    const sort = req.query.sort;

    const page = req.query.page;

    res.json({
        category,
        sort,
        page
    });
});
```

Request:

```text
GET /products?category=electronics&sort=price&page=2
```

Response:

```json
{
    "category": "electronics",
    "sort": "price",
    "page": "2"
}
```

### Destructuring Query Parameters

```javascript
app.get("/products", (req, res) => {
    const {
        category,
        sort,
        page,
        limit
    } = req.query;

    res.json({
        category,
        sort,
        page,
        limit
    });
});
```

### Query Parameters vs Route Parameters

| Feature | Route Parameters | Query Parameters |
|---|---|---|
| Location | URL path | After `?` |
| Purpose | Identify resources | Filter or customize results |
| Express Property | `req.params` | `req.query` |
| Example | `/users/101` | `/users?page=2` |

---

# 11. Request and Response Objects

Express provides two important objects to route handlers:

```javascript
app.get("/", (req, res) => {

});
```

1. `req` — Request object.
2. `res` — Response object.

## 11.1 Request Object (req)

The `req` object contains information about the incoming HTTP request.

### Important req Properties

| Property | Purpose |
|---|---|
| `req.params` | Route parameters |
| `req.query` | Query parameters |
| `req.body` | Parsed request body |
| `req.headers` | Request headers |
| `req.method` | HTTP method |
| `req.url` | Request URL |
| `req.path` | URL path |
| `req.protocol` | Request protocol |
| `req.hostname` | Request hostname |
| `req.ip` | Remote IP address |
| `req.cookies` | Cookies, if cookie-parsing middleware is installed |

### Example

```javascript
app.get("/users/:id", (req, res) => {
    console.log("Params:", req.params);

    console.log("Query:", req.query);

    console.log("Method:", req.method);

    console.log("Headers:", req.headers);

    res.send("Check terminal");
});
```

Request:

```text
http://localhost:3000/users/101?active=true
```

Output:

```javascript
Params: {
    id: "101"
}

Query: {
    active: "true"
}

Method: GET
```

**Important:** `req.body` is not automatically parsed. You need suitable body-parsing middleware.

## 11.2 Response Object (res)

The `res` object is used to send responses to the client.

### Important Response Methods

| Method | Purpose |
|---|---|
| `res.send()` | Sends a response |
| `res.json()` | Sends JSON response |
| `res.status()` | Sets HTTP status code |
| `res.sendStatus()` | Sets status and sends status message |
| `res.redirect()` | Redirects the client |
| `res.set()` | Sets response headers |
| `res.cookie()` | Sets a cookie |
| `res.clearCookie()` | Clears a cookie |
| `res.download()` | Sends a file as a download |
| `res.sendFile()` | Sends a file |
| `res.end()` | Ends the response |

### Example: res.send()

```javascript
app.get("/message", (req, res) => {
    res.send("Hello World");
});
```

### Example: res.json()

```javascript
app.get("/user", (req, res) => {
    res.json({
        id: 1,
        name: "John",
        email: "john@example.com"
    });
});
```

### Example: res.status()

```javascript
app.get("/users", (req, res) => {
    res.status(200).json({
        message: "Users fetched successfully"
    });
});
```

### Example: Error Response

```javascript
app.get("/error", (req, res) => {
    res.status(500).json({
        message: "Internal Server Error"
    });
});
```

### Example: res.redirect()

```javascript
app.get("/old-page", (req, res) => {
    res.redirect("/new-page");
});

app.get("/new-page", (req, res) => {
    res.send("Welcome to the new page");
});
```

### Example: res.sendFile()

```javascript
const path = require("node:path");

app.get("/download", (req, res) => {
    res.sendFile(
        path.join(__dirname, "files", "document.pdf")
    );
});
```

### Important Rule: Send Only One Response

Incorrect:

```javascript
app.get("/users", (req, res) => {
    res.send("First response");

    res.send("Second response");
});
```

This causes an error because the response has already been sent.

Correct:

```javascript
app.get("/users", (req, res) => {
    return res.send("Response sent once");
});
```

Using `return` helps prevent accidental execution of code after sending a response.

---

# 12. Middleware

Middleware is one of the most important concepts in Express.js.

A middleware function is a function that has access to:

- Request object (`req`).
- Response object (`res`).
- Next middleware function (`next`).

It can execute code, modify the request or response, end the request-response cycle, or pass control to the next middleware.

### Basic Syntax

```javascript
function middleware(req, res, next) {
    // Execute some logic

    next();
}
```

### What is next()?

`next()` passes control to the next middleware function in the Express request-processing chain.

### Basic Example

```javascript
const express = require("express");

const app = express();

function logger(req, res, next) {
    console.log("Request received");

    next();
}

app.use(logger);

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.listen(3000);
```

### Execution Flow

```text
       Client Request
              |
              v
        Logger Middleware
              |
              v
            next()
              |
              v
          Route Handler
              |
              v
        Send Response
```

### What Happens If You Do Not Call next()?

Consider:

```javascript
function middleware(req, res, next) {
    console.log("Middleware executed");
}
```

If the middleware neither sends a response nor calls `next()`, the request remains pending.

The client may eventually experience a timeout.

### Middleware Can Modify req

```javascript
function userMiddleware(req, res, next) {
    req.user = {
        id: 101,
        name: "John"
    };

    next();
}

app.use(userMiddleware);

app.get("/profile", (req, res) => {
    res.json(req.user);
});
```

Response:

```json
{
    "id": 101,
    "name": "John"
}
```

This pattern is commonly used by authentication middleware.

---

# 13. Types of Middleware

Express supports several types of middleware.

The major categories are:

1. Application-level middleware.
2. Router-level middleware.
3. Built-in middleware.
4. Third-party middleware.
5. Error-handling middleware.

Let's understand each one.

---

# 14. Application-Level Middleware

Application-level middleware is registered using:

```javascript
app.use()
```

or application route methods.

It can apply to the entire application or a particular path.

### Example: Global Middleware

```javascript
const express = require("express");

const app = express();

app.use((req, res, next) => {
    console.log("Request URL:", req.url);

    console.log("Request Method:", req.method);

    next();
});

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.get("/about", (req, res) => {
    res.send("About Page");
});

app.listen(3000);
```

Every request passing through this middleware logs its URL and method.

### Example: Path-Specific Middleware

```javascript
app.use("/admin", (req, res, next) => {
    console.log("Admin middleware");

    next();
});
```

This middleware runs for matching paths under `/admin`.

For example:

```text
/admin
/admin/users
/admin/settings
```

### Middleware Order Matters

Consider:

```javascript
app.use((req, res, next) => {
    console.log("Middleware 1");

    next();
});

app.use((req, res, next) => {
    console.log("Middleware 2");

    next();
});

app.get("/", (req, res) => {
    console.log("Route Handler");

    res.send("Home");
});
```

Output:

```text
Middleware 1
Middleware 2
Route Handler
```

Express executes middleware in the order it is registered, subject to route matching and control flow.

---

# 15. Built-in Middleware

Express provides several built-in middleware functions.

The most important are:

1. `express.json()`
2. `express.urlencoded()`
3. `express.static()`

## 15.1 express.json()

It parses incoming requests with JSON payloads.

After parsing, the resulting JavaScript value is available in:

```javascript
req.body
```

### Example

```javascript
const express = require("express");

const app = express();

app.use(express.json());

app.post("/users", (req, res) => {
    console.log(req.body);

    res.json({
        message: "User received",
        user: req.body
    });
});

app.listen(3000);
```

Send this request using Postman:

```http
POST http://localhost:3000/users
```

Body:

```json
{
    "name": "John",
    "email": "john@example.com"
}
```

Response:

```json
{
    "message": "User received",
    "user": {
        "name": "John",
        "email": "john@example.com"
    }
}
```

### Important

Without:

```javascript
app.use(express.json());
```

`req.body` will generally be `undefined` for JSON requests.

Also, the JSON parser only processes requests with matching content types.

## 15.2 express.urlencoded()

It parses URL-encoded form submissions.

Example:

```javascript
app.use(express.urlencoded({
    extended: true
}));
```

### What is URL-Encoded Data?

HTML forms can submit data using:

```text
application/x-www-form-urlencoded
```

Example body:

```text
name=John&email=john%40example.com
```

After parsing:

```javascript
{
    name: "John",
    email: "john@example.com"
}
```

### What does extended mean?

The `extended` option controls how URL-encoded data is parsed.

- `extended: false` uses a simpler parser.
- `extended: true` supports richer nested structures through the `qs` parser.

## 15.3 express.static()

It serves static files such as:

- HTML.
- CSS.
- JavaScript.
- Images.
- Fonts.
- PDFs.

### Project Structure

```text
project/
│
├── server.js
│
└── public/
    ├── index.html
    ├── style.css
    └── logo.png
```

### server.js

```javascript
const express = require("express");
const path = require("node:path");

const app = express();

app.use(express.static(
    path.join(__dirname, "public")
));

app.listen(3000);
```

Now these resources are accessible:

```text
http://localhost:3000/index.html
http://localhost:3000/style.css
http://localhost:3000/logo.png
```

You can also use a virtual prefix:

```javascript
app.use(
    "/static",
    express.static(path.join(__dirname, "public"))
);
```

Now the image can be accessed through:

```text
http://localhost:3000/static/logo.png
```

### Built-in Middleware Summary

| Middleware | Purpose |
|---|---|
| `express.json()` | Parse JSON request bodies |
| `express.urlencoded()` | Parse URL-encoded request bodies |
| `express.static()` | Serve static files |

---

# 16. Router-Level Middleware

Router-level middleware works similarly to application-level middleware, but it is attached to an Express Router instance.

It is useful when an application contains multiple modules.

### Example

```javascript
const express = require("express");

const router = express.Router();

router.use((req, res, next) => {
    console.log("User router middleware");

    next();
});

router.get("/", (req, res) => {
    res.send("All Users");
});

router.get("/:id", (req, res) => {
    res.send(`User ID: ${req.params.id}`);
});

module.exports = router;
```

### Main Application

```javascript
const express = require("express");

const userRouter = require("./routes/userRoutes");

const app = express();

app.use("/users", userRouter);

app.listen(3000);
```

Now the routes are:

```text
GET /users
GET /users/101
```

### Why Use Router-Level Middleware?

It helps to:

- Organize middleware by module.
- Protect specific routes.
- Separate authentication logic.
- Keep route files manageable.

---

# 17. Third-Party Middleware

Third-party middleware is middleware developed outside Express and installed using NPM.

Common examples:

| Package | Purpose |
|---|---|
| `cors` | Configure Cross-Origin Resource Sharing |
| `morgan` | HTTP request logging |
| `cookie-parser` | Parse cookies |
| `helmet` | Set security-related HTTP headers |
| `express-rate-limit` | Rate limiting |
| `multer` | Handle multipart form data and file uploads |
| `compression` | Compress HTTP responses |

### Example: Morgan

Install:

```bash
npm install morgan
```

Use:

```javascript
const express = require("express");

const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(3000);
```

Now each request is logged in the terminal.

### Example: CORS

Install:

```bash
npm install cors
```

Use:

```javascript
const cors = require("cors");

app.use(cors());
```

This enables broad cross-origin access.

In production, configure allowed origins appropriately instead of automatically allowing every origin.

---

# 18. Error-Handling Middleware

Express provides a special middleware pattern for handling errors.

An error-handling middleware has four parameters:

```javascript
(err, req, res, next)
```

### Syntax

```javascript
function errorHandler(err, req, res, next) {
    // Handle error
}
```

### Example

```javascript
const express = require("express");

const app = express();

app.get("/error", (req, res, next) => {
    const error = new Error("Something went wrong");

    next(error);
});

app.use((err, req, res, next) => {
    console.error(err.message);

    res.status(500).json({
        message: "Internal Server Error"
    });
});

app.listen(3000);
```

Open:

```text
http://localhost:3000/error
```

Response:

```json
{
    "message": "Internal Server Error"
}
```

### Why do we need centralized error handling?

Without centralized error handling, you may repeat error-response logic in every route.

Centralized middleware allows you to:

- Log errors consistently.
- Return consistent responses.
- Separate error handling from business logic.
- Avoid exposing internal details to clients.

### Important: Middleware Order

Error-handling middleware should generally be registered after routes and other middleware.

```javascript
app.use(express.json());

// Routes
app.use("/api/users", userRouter);

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        message: "Internal Server Error"
    });
});
```

### Express 5 Async Error Handling

Express 5 automatically forwards rejected Promises from async route handlers and middleware to error-handling middleware.

Example:

```javascript
app.get("/users", async (req, res) => {
    const users = await getUsers();

    res.json(users);
});
```

If `getUsers()` rejects, Express 5 forwards the error.

In Express 4, async route handlers generally require explicit error forwarding or a wrapper.

---

# 19. Express Router

Express Router allows you to create modular route handlers.

It helps organize large applications into separate route files.

### Without Router

Imagine you have 100 API endpoints in one file.

Your `server.js` can become very large.

### With Router

You can separate routes by resource:

```text
project/
│
├── server.js
│
├── routes/
│   ├── userRoutes.js
│   ├── productRoutes.js
│   └── orderRoutes.js
│
└── controllers/
    ├── userController.js
    ├── productController.js
    └── orderController.js
```

## 19.1 Creating User Router

File: `routes/userRoutes.js`

```javascript
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "Get all users"
    });
});

router.get("/:id", (req, res) => {
    res.json({
        message: "Get user",
        id: req.params.id
    });
});

router.post("/", (req, res) => {
    res.json({
        message: "Create user"
    });
});

router.put("/:id", (req, res) => {
    res.json({
        message: "Update user",
        id: req.params.id
    });
});

router.delete("/:id", (req, res) => {
    res.json({
        message: "Delete user",
        id: req.params.id
    });
});

module.exports = router;
```

## 19.2 Import Router in server.js

```javascript
const express = require("express");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

### Available Endpoints

| Method | Endpoint |
|---|---|
| GET | `/api/users` |
| GET | `/api/users/:id` |
| POST | `/api/users` |
| PUT | `/api/users/:id` |
| DELETE | `/api/users/:id` |

### How Does Router Work?

When you write:

```javascript
app.use("/api/users", userRoutes);
```

Express mounts the router under `/api/users`.

Inside the router:

```javascript
router.get("/:id", handler);
```

The final route becomes:

```text
/api/users/:id
```

This makes route organization much easier.

---

# 20. Controllers

Controllers contain the request-handling logic for routes.

They help separate route definitions from application logic.

### Why Do We Need Controllers?

Consider this approach:

```javascript
app.get("/users", (req, res) => {
    const users = [
        { id: 1, name: "John" },
        { id: 2, name: "David" }
    ];

    res.json(users);
});
```

For a small application, this is acceptable.

However, if every route contains business logic, database queries, validation, and error handling, route files become difficult to maintain.

Controllers solve this organizational problem.

## 20.1 Project Structure

```text
project/
│
├── server.js
│
├── routes/
│   └── userRoutes.js
│
└── controllers/
    └── userController.js
```

## 20.2 Create Controller

File: `controllers/userController.js`

```javascript
const users = [
    {
        id: 1,
        name: "John",
        email: "john@example.com"
    },
    {
        id: 2,
        name: "David",
        email: "david@example.com"
    }
];

exports.getUsers = (req, res) => {
    res.json(users);
};

exports.getUserById = (req, res) => {
    const id = Number(req.params.id);

    const user = users.find((u) => u.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);
};

exports.createUser = (req, res) => {
    const { name, email } = req.body;

    const newUser = {
        id: users.length + 1,
        name,
        email
    };

    users.push(newUser);

    res.status(201).json({
        message: "User created",
        user: newUser
    });
};
```

## 20.3 Create Routes

File: `routes/userRoutes.js`

```javascript
const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", userController.getUsers);

router.get("/:id", userController.getUserById);

router.post("/", userController.createUser);

module.exports = router;
```

## 20.4 Main Application

File: `server.js`

```javascript
const express = require("express");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

### Request Flow

```text
          CLIENT
             |
             |
        HTTP Request
             |
             v
          SERVER
             |
             v
       Express Middleware
             |
             v
        Express Router
             |
             v
        Route Handler
             |
             v
          Controller
             |
             v
        Business Logic
             |
             v
        HTTP Response
             |
             v
          CLIENT
```

### Important

Controllers are an application architecture convention, not a special Express feature.

Express does not force you to use controllers, but they help organize larger applications.

---

# 21. Organizing Backend Project Structure

As your application grows, you should separate different responsibilities into different directories.

A common Express.js project structure looks like this:

```text
backend/
│
├── node_modules/
│
├── src/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── userController.js
│   │   └── productController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── models/
│   │   ├── userModel.js
│   │   └── productModel.js
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── productRoutes.js
│   │
│   ├── services/
│   │   ├── userService.js
│   │   └── productService.js
│   │
│   ├── utils/
│   │   └── helpers.js
│   │
│   └── app.js
│
├── server.js
│
├── .env
├── .gitignore
├── package.json
└── package-lock.json
```

### Responsibilities

| Folder | Responsibility |
|---|---|
| `config/` | Configuration and database setup |
| `controllers/` | Handle HTTP requests and responses |
| `middleware/` | Authentication, logging, validation, etc. |
| `models/` | Database models and data structures |
| `routes/` | Define API endpoints |
| `services/` | Business logic and reusable operations |
| `utils/` | Helper functions |
| `app.js` | Configure Express application |
| `server.js` | Start the HTTP server |

### What is the Difference Between app.js and server.js?

This is a common backend architecture pattern.

**app.js**

Responsible for:

- Creating the Express application.
- Registering middleware.
- Registering routes.
- Registering error handlers.

**server.js**

Responsible for:

- Starting the HTTP server.
- Listening on a port.
- Handling server startup and shutdown.

### Example: app.js

```javascript
const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "API is running"
    });
});

module.exports = app;
```

### Example: server.js

```javascript
const app = require("./src/app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

This separation makes the application easier to test and maintain.

---

# 22. Building a CRUD API with Express

Now let's build a complete in-memory CRUD API.

CRUD stands for:

| Operation | Meaning | HTTP Method |
|---|---|---|
| Create | Create a resource | POST |
| Read | Retrieve a resource | GET |
| Update | Modify a resource | PUT/PATCH |
| Delete | Remove a resource | DELETE |

### Project Structure

```text
express-crud/
│
├── controllers/
│   └── userController.js
│
├── routes/
│   └── userRoutes.js
│
├── app.js
│
├── server.js
│
└── package.json
```

### Step 1: Initialize Project

```bash
npm init -y
```

Install Express:

```bash
npm install express
```

### Step 2: Create Controller

File: `controllers/userController.js`

```javascript
let users = [
    {
        id: 1,
        name: "John",
        email: "john@example.com"
    },
    {
        id: 2,
        name: "David",
        email: "david@example.com"
    }
];

// GET ALL USERS
exports.getUsers = (req, res) => {
    res.status(200).json({
        success: true,
        data: users
    });
};

// GET SINGLE USER
exports.getUserById = (req, res) => {
    const id = Number(req.params.id);

    const user = users.find((u) => u.id === id);

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
};

// CREATE USER
exports.createUser = (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: "Name and email are required"
        });
    }

    const newUser = {
        id: users.length
            ? Math.max(...users.map((u) => u.id)) + 1
            : 1,
        name,
        email
    };

    users.push(newUser);

    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser
    });
};

// UPDATE USER
exports.updateUser = (req, res) => {
    const id = Number(req.params.id);

    const user = users.find((u) => u.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: "Name and email are required"
        });
    }

    user.name = name;

    user.email = email;

    res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user
    });
};

// DELETE USER
exports.deleteUser = (req, res) => {
    const id = Number(req.params.id);

    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    const deletedUser = users.splice(index, 1)[0];

    res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: deletedUser
    });
};
```

### Step 3: Create Routes

File: `routes/userRoutes.js`

```javascript
const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", userController.getUsers);

router.get("/:id", userController.getUserById);

router.post("/", userController.createUser);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;
```

### Step 4: Create app.js

```javascript
const express = require("express");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

module.exports = app;
```

### Step 5: Create server.js

```javascript
const app = require("./app");

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

### Step 6: Run the Project

```bash
node server.js
```

### Available Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/users` | Get all users |
| GET | `/api/users/1` | Get user by ID |
| POST | `/api/users` | Create user |
| PUT | `/api/users/1` | Update user |
| DELETE | `/api/users/1` | Delete user |

### Test Using Postman

**1. Get all users**

```http
GET http://localhost:3000/api/users
```

**2. Get user by ID**

```http
GET http://localhost:3000/api/users/1
```

**3. Create user**

```http
POST http://localhost:3000/api/users
```

Body:

```json
{
    "name": "Riyaz",
    "email": "riyaz@example.com"
}
```

**4. Update user**

```http
PUT http://localhost:3000/api/users/1
```

Body:

```json
{
    "name": "John Smith",
    "email": "johnsmith@example.com"
}
```

**5. Delete user**

```http
DELETE http://localhost:3000/api/users/1
```

### Important Limitations

This is an educational project.

- Data is stored in memory.
- Data disappears after restarting the server.
- No database integration.
- No authentication.
- No advanced validation.
- No pagination.
- No centralized production error handling.

We will address these concerns in upcoming phases.

---

# 23. Common Express.js Mistakes

## Mistake 1: Forgetting express.json()

Incorrect:

```javascript
const app = express();

app.post("/users", (req, res) => {
    console.log(req.body);
});
```

Correct:

```javascript
app.use(express.json());

app.post("/users", (req, res) => {
    console.log(req.body);
});
```

## Mistake 2: Middleware Order Is Incorrect

Incorrect:

```javascript
app.post("/users", (req, res) => {
    console.log(req.body);
});

app.use(express.json());
```

Correct:

```javascript
app.use(express.json());

app.post("/users", (req, res) => {
    console.log(req.body);
});
```

The JSON parsing middleware must run before the route that needs the parsed body.

## Mistake 3: Forgetting next()

Incorrect:

```javascript
app.use((req, res, next) => {
    console.log("Request received");
});
```

Correct:

```javascript
app.use((req, res, next) => {
    console.log("Request received");

    next();
});
```

## Mistake 4: Sending Multiple Responses

Incorrect:

```javascript
app.get("/users", (req, res) => {
    res.send("First response");

    res.send("Second response");
});
```

Correct:

```javascript
app.get("/users", (req, res) => {
    return res.send("Response sent");
});
```

## Mistake 5: Not Handling Errors

Incorrect:

```javascript
app.get("/users", async (req, res) => {
    const users = await getUsers();

    res.json(users);
});
```

In Express 5, rejected Promises are forwarded to error middleware automatically. However, you should still implement centralized error handling.

## Mistake 6: Putting All Logic in server.js

For small learning projects, this is acceptable.

For larger applications, separate:

- Routes.
- Controllers.
- Services.
- Models.
- Middleware.

## Mistake 7: Trusting User Input

Never assume that data from:

```javascript
req.body
req.params
req.query
```

is valid.

Always validate and sanitize input according to the application's requirements.

We will cover this in Phase 12.

---

# 24. Important Express.js Concepts Summary

| Concept | Meaning |
|---|---|
| Express.js | Node.js web framework |
| `express()` | Creates an Express application |
| `app` | Express application instance |
| `app.listen()` | Starts the HTTP server |
| `app.use()` | Registers middleware |
| `app.get()` | Defines GET route |
| `app.post()` | Defines POST route |
| `req` | Incoming request object |
| `res` | Outgoing response object |
| `req.params` | Route parameters |
| `req.query` | Query parameters |
| `req.body` | Parsed request body |
| `res.send()` | Sends a response |
| `res.json()` | Sends JSON response |
| `res.status()` | Sets status code |
| Middleware | Function in request-response processing chain |
| `next()` | Passes control to the next middleware |
| `express.json()` | Parses JSON requests |
| `express.urlencoded()` | Parses URL-encoded requests |
| `express.static()` | Serves static files |
| `express.Router()` | Creates modular routers |
| Controller | Contains request-handling logic |
| Error Middleware | Handles application errors |

---

# 25. Interview Questions and Answers

### Q1. What is Express.js?

Express.js is a minimal and flexible Node.js web framework used to build web applications and REST APIs.

### Q2. Why do we use Express.js?

It simplifies routing, middleware, request handling, response handling, and backend application development.

### Q3. Is Express.js a Node.js framework?

Yes. Express.js is a web framework built on top of Node.js.

### Q4. What is the difference between Node.js and Express.js?

Node.js is a JavaScript runtime environment. Express.js is a web framework that runs on Node.js.

### Q5. What is an Express application?

It is an application instance created using `express()` that provides methods for configuring middleware, routes, and application behavior.

### Q6. What is routing in Express?

Routing determines how an application responds to requests for particular paths and HTTP methods.

### Q7. What is middleware?

Middleware is a function that can access the request, response, and next middleware function during request processing.

### Q8. What is next()?

`next()` passes control to the next middleware or route handler.

### Q9. What happens if next() is not called?

If the middleware does not send a response or pass control onward, the request remains pending.

### Q10. What are the types of middleware in Express?

- Application-level middleware.
- Router-level middleware.
- Built-in middleware.
- Third-party middleware.
- Error-handling middleware.

### Q11. What is express.json()?

It is built-in middleware that parses incoming JSON request bodies.

### Q12. What is express.urlencoded()?

It parses URL-encoded form data.

### Q13. What is express.static()?

It serves static assets such as HTML, CSS, JavaScript, and images.

### Q14. What is Express Router?

Express Router creates modular route handlers that can be mounted in an application.

### Q15. What is the difference between app.use() and app.get()?

`app.use()` registers middleware. `app.get()` defines a handler for GET requests.

### Q16. What is the difference between req.params and req.query?

`req.params` contains route parameters, while `req.query` contains query parameters.

### Q17. What is req.body?

It contains the parsed request body, provided suitable middleware has been registered.

### Q18. What is the difference between res.send() and res.json()?

`res.send()` sends a response with various supported types. `res.json()` sends a JSON response with the appropriate content type.

### Q19. What is the purpose of res.status()?

It sets the HTTP response status code.

### Q20. What is error-handling middleware?

It is middleware with four parameters: `err`, `req`, `res`, and `next`. It handles errors passed through Express.

### Q21. Where should error middleware be registered?

Generally, after the application's routes and other middleware.

### Q22. Does Express 5 support async route handlers?

Yes. Rejected Promises from async route handlers are automatically forwarded to error-handling middleware.

### Q23. What is the difference between Router and Controller?

Router defines endpoints and connects them to handlers. Controllers contain the request-handling logic.

### Q24. Why should we separate controllers and routes?

It improves code organization, readability, maintainability, and reusability.

### Q25. What is the purpose of express.static()?

It allows an application to serve static files from a specified directory.

### Q26. What is third-party middleware?

It is middleware provided by external packages, such as CORS, Morgan, Helmet, and Multer.

### Q27. What is CORS?

Cross-Origin Resource Sharing is a browser-enforced mechanism that controls whether a web page can access resources from another origin.

### Q28. What is the difference between app.js and server.js?

`app.js` generally configures the Express application, while `server.js` starts the HTTP server.

### Q29. Can Express.js work without a database?

Yes. Express.js can handle requests and responses without a database. You can use in-memory data, files, or external services.

### Q30. Is Express.js suitable for REST API development?

Yes. Express.js provides routing, middleware, and request-response handling features that make it suitable for REST API development.

---

# 26. Phase 08 Cheat Sheet

| Task | Express.js Syntax |
|---|---|
| Import Express | `require("express")` |
| Create Application | `express()` |
| Start Server | `app.listen(3000)` |
| Register Middleware | `app.use()` |
| GET Route | `app.get()` |
| POST Route | `app.post()` |
| PUT Route | `app.put()` |
| PATCH Route | `app.patch()` |
| DELETE Route | `app.delete()` |
| Create Router | `express.Router()` |
| Route Parameters | `req.params` |
| Query Parameters | `req.query` |
| Request Body | `req.body` |
| Send Response | `res.send()` |
| Send JSON | `res.json()` |
| Set Status | `res.status()` |
| Redirect | `res.redirect()` |
| Send File | `res.sendFile()` |
| Parse JSON | `express.json()` |
| Parse Form Data | `express.urlencoded()` |
| Serve Static Files | `express.static()` |
| Error Middleware | `(err, req, res, next)` |
| Forward Error | `next(error)` |

---

# 27. Phase 08 Completion Checklist

Before moving to Phase 9, make sure you can:

- [ ] Explain what Express.js is.
- [ ] Understand why Express.js is used.
- [ ] Compare Node.js HTTP and Express.js.
- [ ] Install Express.js using NPM.
- [ ] Create an Express server.
- [ ] Understand the Express application object.
- [ ] Create GET, POST, PUT, PATCH, and DELETE routes.
- [ ] Understand route parameters.
- [ ] Understand query parameters.
- [ ] Understand the request object.
- [ ] Understand the response object.
- [ ] Understand middleware.
- [ ] Create custom middleware.
- [ ] Understand middleware execution order.
- [ ] Understand application-level middleware.
- [ ] Understand router-level middleware.
- [ ] Use `express.json()`.
- [ ] Use `express.urlencoded()`.
- [ ] Use `express.static()`.
- [ ] Understand third-party middleware.
- [ ] Understand error-handling middleware.
- [ ] Create modular routes using Express Router.
- [ ] Separate routes and controllers.
- [ ] Organize a backend project.
- [ ] Build a complete CRUD API.

## Practical Tasks to Complete

1. Create an Express server.
2. Create separate route files for users and products.
3. Create controllers for both modules.
4. Implement complete CRUD operations.
5. Implement custom logging middleware.
6. Implement middleware that checks an API key.
7. Implement centralized error-handling middleware.
8. Serve static HTML, CSS, and image files.
9. Test every endpoint using Postman.
10. Organize the application using `app.js`, `server.js`, routes, and controllers.

---

# What Comes Next?

## PHASE 09: REST APIs & Backend Architecture

In Phase 9, we will go deeper into professional backend API development.

Topics will include:

1. What is REST Architecture?
2. REST Principles and Constraints.
3. REST vs RESTful APIs.
4. Resource-Based API Design.
5. REST API Naming Conventions.
6. CRUD API Design.
7. HTTP Methods and Status Codes in REST.
8. Request and Response Structure.
9. API Versioning.
10. Pagination.
11. Filtering and Sorting.
12. Searching.
13. API Response Standards.
14. Controller-Service-Model Architecture.
15. Separation of Concerns.
16. Dependency Management.
17. Environment-Based Configuration.
18. API Documentation.
19. Postman Collections.
20. Building a Structured REST API.

**Recommended focus before Phase 9:** Build the CRUD API from this phase using separate route and controller files. Make sure you understand how a request travels through middleware, router, controller, and finally reaches the response.