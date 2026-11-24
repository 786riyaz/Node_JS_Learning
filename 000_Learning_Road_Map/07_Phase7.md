# PHASE 07: HTTP & Web Server Fundamentals in Node.js

**Level:** Beginner to Intermediate  
**Goal:** Understand HTTP communication, client-server architecture, request and response handling, and learn to create a web server using Node.js without Express.js.

---

## Topics Covered

1. What is HTTP?
2. Client-Server Architecture
3. How the Web Works
4. HTTP Request and Response Lifecycle
5. HTTP Methods
6. HTTP Status Codes
7. HTTP Headers
8. Request Body
9. Query Parameters
10. Route Parameters
11. Node.js HTTP Module
12. Creating an HTTP Server
13. Handling Different Routes
14. Handling GET Requests
15. Handling POST Requests
16. Parsing JSON Request Bodies
17. Serving HTML and Static Files
18. Content-Type and MIME Types
19. HTTP vs HTTPS
20. Building a Basic REST API Without Express
21. Interview Questions

---

# 1. What is HTTP?

HTTP stands for **Hypertext Transfer Protocol**.

It is an application-layer protocol used for communication between clients and servers.

In simple words:

HTTP defines how a client sends a request to a server and how the server sends a response back.

### Example

Suppose you open:

```text
https://example.com
```

Your browser sends an HTTP request to the server.

The server processes the request and returns a response containing information such as:

- HTML.
- CSS.
- JavaScript.
- Images.
- JSON data.

Your browser receives the response and displays the website.

### HTTP Communication

```text
       CLIENT                         SERVER
      (Browser)                  (Node.js Backend)
          |                             |
          |                             |
          |------ HTTP Request -------->|
          |                             |
          |                       Process Request
          |                             |
          |<----- HTTP Response --------|
          |                             |
       Display Website                  |
```

### Important Characteristics of HTTP

1. HTTP follows a request-response model.
2. It is an application-layer protocol.
3. HTTP is stateless by default.
4. It supports different request methods.
5. It supports headers and message bodies.
6. It can transfer different types of data.

### What does Stateless Mean?

HTTP is stateless by default.

It means the server does not automatically remember previous requests from a particular client.

For example:

**Request 1:**

```http
GET /profile HTTP/1.1
Host: example.com
```

**Request 2:**

```http
GET /orders HTTP/1.1
Host: example.com
```

By default, the server treats these as separate requests.

If the application needs to remember a user's identity between requests, it can use:

- Cookies.
- Sessions.
- Authentication tokens.
- Other application-level state mechanisms.

We will cover authentication and authorization in Phase 11.

---

# 2. Client-Server Architecture

Client-server architecture is a model in which one system requests services or resources from another system.

There are two primary components:

1. Client
2. Server

## 2.1 What is a Client?

A client is an application or device that sends requests to a server.

Examples:

- Web browsers.
- Mobile applications.
- Desktop applications.
- Frontend applications built with React.
- API testing tools such as Postman.

## 2.2 What is a Server?

A server is a system that receives requests, processes them, and returns responses.

Examples:

- Node.js backend.
- PHP backend.
- Python backend.
- Java backend.
- Database server.

### Example: React + Node.js Application

```text
        FRONTEND
     React Application
            |
            |
       HTTP Request
            |
            v
       BACKEND SERVER
       Node.js + Express
            |
            |
       Business Logic
            |
            v
         DATABASE
          MongoDB
            |
            |
       Query Result
            |
            v
       BACKEND SERVER
            |
            |
       HTTP Response
            |
            v
        FRONTEND
```

### Practical Example

Suppose you have an application that displays users.

The frontend sends:

```http
GET /api/users
```

The Node.js backend:

1. Receives the request.
2. Identifies the requested route.
3. Retrieves users from the database.
4. Converts the result into JSON.
5. Sends the response.

Example response:

```json
[
    {
        "id": 1,
        "name": "John",
        "email": "john@example.com"
    },
    {
        "id": 2,
        "name": "David",
        "email": "david@example.com"
    }
]
```

---

# 3. How the Web Works

Let's understand what happens when you enter a website address in your browser.

Suppose you visit:

```text
https://www.example.com/products
```

Several steps happen behind the scenes.

## Step 1: URL Parsing

The browser identifies different parts of the URL.

```text
https://www.example.com:443/products?id=10
```

| Component | Value | Meaning |
|---|---|---|
| Protocol | `https` | Communication protocol |
| Hostname | `www.example.com` | Server hostname |
| Port | `443` | Server communication port |
| Path | `/products` | Requested resource |
| Query String | `id=10` | Additional request data |

## Step 2: DNS Lookup

The browser needs to find the IP address associated with the hostname.

DNS stands for **Domain Name System**.

It converts domain names into IP addresses.

Example:

```text
www.example.com
       |
       v
   DNS Lookup
       |
       v
93.184.216.34
```

This is an illustrative IP address.

## Step 3: Establish Connection

For HTTP over TCP, the client establishes a TCP connection with the server.

For HTTPS, TLS negotiation also occurs to establish an encrypted connection.

HTTP/3 uses QUIC over UDP rather than TCP.

## Step 4: Send HTTP Request

The browser sends a request to the server.

Example:

```http
GET /products?id=10 HTTP/1.1
Host: www.example.com
Accept: application/json
```

## Step 5: Server Processes Request

The server:

1. Receives the request.
2. Identifies the route.
3. Executes business logic.
4. Communicates with the database if necessary.
5. Prepares a response.

## Step 6: Server Sends HTTP Response

Example:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "id": 10,
    "name": "Laptop",
    "price": 75000
}
```

## Step 7: Browser Processes Response

The browser receives the response.

Depending on the content type, it may:

- Render HTML.
- Apply CSS.
- Execute JavaScript.
- Display an image.
- Process JSON.

### Complete Flow

```text
             USER
              |
              |
        Enter Website URL
              |
              v
          URL Parsing
              |
              v
          DNS Lookup
              |
              v
       Establish Connection
              |
              v
        Send HTTP Request
              |
              v
         SERVER RECEIVES
              |
              v
        Process Request
              |
              v
       Database / Services
              |
              v
        Prepare Response
              |
              v
        HTTP Response
              |
              v
         Browser Receives
              |
              v
         Render Content
```

---

# 4. HTTP Request and Response Lifecycle

Every normal HTTP exchange involves a request and a response.

Let's understand their structure.

## 4.1 HTTP Request Structure

An HTTP request generally contains:

1. Request line.
2. Headers.
3. Optional body.

### Example

```http
POST /api/users HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json
Authorization: Bearer abc123

{
    "name": "John",
    "email": "john@example.com"
}
```

Let's break it down.

### Request Line

```http
POST /api/users HTTP/1.1
```

| Part | Value | Meaning |
|---|---|---|
| Method | `POST` | Operation requested |
| Path | `/api/users` | Requested resource |
| HTTP Version | `HTTP/1.1` | Protocol version |

### Headers

```http
Host: localhost:3000
Content-Type: application/json
Accept: application/json
Authorization: Bearer abc123
```

Headers provide additional information about the request.

### Body

```json
{
    "name": "John",
    "email": "john@example.com"
}
```

The request body contains the data sent to the server.

For example:

- User registration data.
- Login credentials.
- Product information.
- Form submissions.

---

## 4.2 HTTP Response Structure

An HTTP response generally contains:

1. Status line.
2. Headers.
3. Optional body.

### Example

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
    "message": "User created successfully",
    "userId": 101
}
```

### Status Line

```http
HTTP/1.1 201 Created
```

| Part | Value |
|---|---|
| HTTP Version | HTTP/1.1 |
| Status Code | 201 |
| Status Message | Created |

### Response Headers

```http
Content-Type: application/json
```

This tells the client that the response body contains JSON.

### Response Body

```json
{
    "message": "User created successfully",
    "userId": 101
}
```

This contains the actual response data.

---

# 5. HTTP Methods

HTTP methods define the intended operation that the client wants to perform on a resource.

The most commonly used methods are:

1. GET
2. POST
3. PUT
4. PATCH
5. DELETE
6. HEAD
7. OPTIONS

## 5.1 GET

GET is used to retrieve data from a server.

Example:

```http
GET /api/users
```

It requests a list of users.

Another example:

```http
GET /api/users/101
```

It requests a specific user.

**Important characteristics:**

- GET is a safe method.
- GET is idempotent.
- GET request bodies have no generally defined semantics and should normally be avoided.
- Query parameters are commonly used to filter or paginate results.

## 5.2 POST

POST is commonly used to submit data to the server or create a resource.

Example:

```http
POST /api/users
```

Request body:

```json
{
    "name": "John",
    "email": "john@example.com"
}
```

The server may create a new user.

**Important characteristics:**

- POST is not generally idempotent.
- It commonly contains a request body.
- It is used for form submissions, resource creation, and other processing operations.

## 5.3 PUT

PUT is used to create or replace the state of a resource at a specified URI.

Example:

```http
PUT /api/users/101
```

Request body:

```json
{
    "name": "John Smith",
    "email": "johnsmith@example.com"
}
```

The server replaces the user resource with the supplied representation, subject to the API's rules.

**Important:** PUT is generally idempotent.

Sending the same PUT request multiple times should have the same intended effect as sending it once.

## 5.4 PATCH

PATCH is used to partially modify an existing resource.

Example:

```http
PATCH /api/users/101
```

Request body:

```json
{
    "name": "John Smith"
}
```

Only the name is being updated.

**Important:** PATCH is not guaranteed to be idempotent. Its idempotency depends on the patch operation.

## 5.5 DELETE

DELETE is used to remove a resource.

Example:

```http
DELETE /api/users/101
```

This requests deletion of user 101.

DELETE is defined as idempotent in HTTP semantics, although repeated requests may return different status codes.

## 5.6 HEAD

HEAD works similarly to GET, but the server returns response headers without the response body.

Example:

```http
HEAD /api/users
```

It can be used to check:

- Whether a resource exists.
- Content type.
- Content length.
- Last modified information.

## 5.7 OPTIONS

OPTIONS is used to discover communication options supported by a server or resource.

Example:

```http
OPTIONS /api/users
```

It is commonly involved in CORS preflight requests made by browsers.

---

## 5.8 HTTP Methods Comparison

| Method | Purpose | Request Body | Safe | Idempotent |
|---|---|---|---|---|
| GET | Retrieve data | Generally no | Yes | Yes |
| POST | Submit/process/create | Commonly yes | No | No, generally |
| PUT | Replace resource | Commonly yes | No | Yes |
| PATCH | Partially update | Commonly yes | No | Not guaranteed |
| DELETE | Delete resource | Optional | No | Yes |
| HEAD | Retrieve headers | Generally no | Yes | Yes |
| OPTIONS | Discover options | Generally no | Yes | Yes |

### What is Idempotency?

An operation is idempotent if performing it multiple times has the same intended effect as performing it once.

Example:

```http
DELETE /api/users/101
```

The first request may delete the user.

The second request does not delete anything further.

The final intended resource state remains the same.

### What is a Safe Method?

A safe method is intended to retrieve information without requesting a state change on the server.

GET and HEAD are safe methods.

---

# 6. HTTP Status Codes

HTTP status codes tell the client the result of its request.

Status codes are divided into five categories.

| Category | Range | Meaning |
|---|---|---|
| 1xx | 100–199 | Informational |
| 2xx | 200–299 | Success |
| 3xx | 300–399 | Redirection |
| 4xx | 400–499 | Client Error |
| 5xx | 500–599 | Server Error |

## 6.1 1xx: Informational

These indicate that the request has been received and the process is continuing.

Examples:

- `100 Continue`
- `101 Switching Protocols`

## 6.2 2xx: Success

These indicate successful request processing.

| Status Code | Meaning | Common Use |
|---|---|---|
| 200 | OK | Successful GET request |
| 201 | Created | Resource successfully created |
| 202 | Accepted | Request accepted for processing |
| 204 | No Content | Successful operation without response body |

### Example: 200 OK

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "message": "Success"
}
```

### Example: 201 Created

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
    "message": "User created",
    "id": 101
}
```

### Example: 204 No Content

```http
HTTP/1.1 204 No Content
```

There is no response body.

This is commonly used after successful deletion.

## 6.3 3xx: Redirection

These indicate that further action is needed to complete the request.

| Status Code | Meaning |
|---|---|
| 301 | Moved Permanently |
| 302 | Found |
| 303 | See Other |
| 304 | Not Modified |
| 307 | Temporary Redirect |
| 308 | Permanent Redirect |

## 6.4 4xx: Client Errors

These indicate a problem with the request.

| Status Code | Meaning | Example |
|---|---|---|
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | User does not have permission |
| 404 | Not Found | Resource does not exist |
| 405 | Method Not Allowed | Unsupported method for route |
| 409 | Conflict | Duplicate email or conflicting state |
| 415 | Unsupported Media Type | Unsupported request content type |
| 422 | Unprocessable Content | Validation failure |
| 429 | Too Many Requests | Rate limit exceeded |

### 401 vs 403

This is a common interview question.

**401 Unauthorized:**

The request lacks valid authentication credentials.

Example: The user has not logged in.

**403 Forbidden:**

The server understands the request but refuses to authorize it.

Example: A normal user tries to access an admin-only endpoint.

## 6.5 5xx: Server Errors

These indicate that the server failed to process a valid request.

| Status Code | Meaning |
|---|---|
| 500 | Internal Server Error |
| 501 | Not Implemented |
| 502 | Bad Gateway |
| 503 | Service Unavailable |
| 504 | Gateway Timeout |

### Important Status Codes to Remember

```text
200 - OK
201 - Created
204 - No Content

301 - Moved Permanently
302 - Found
304 - Not Modified

400 - Bad Request
401 - Unauthorized
403 - Forbidden
404 - Not Found
405 - Method Not Allowed
409 - Conflict
422 - Unprocessable Content
429 - Too Many Requests

500 - Internal Server Error
502 - Bad Gateway
503 - Service Unavailable
504 - Gateway Timeout
```

---

# 7. HTTP Headers

HTTP headers provide additional information about requests and responses.

They are key-value pairs.

### Example

```http
Content-Type: application/json
Authorization: Bearer token123
Accept: application/json
```

Here:

- `Content-Type` is the header name.
- `application/json` is its value.

## 7.1 Request Headers

Request headers provide information about the client and the request.

Common request headers:

| Header | Purpose |
|---|---|
| Host | Identifies the requested host |
| Accept | Specifies acceptable response formats |
| Content-Type | Specifies request body format |
| Authorization | Sends authentication credentials |
| User-Agent | Identifies the client software |
| Cookie | Sends cookies to the server |
| Origin | Identifies the origin of a browser request |
| Referer | Indicates the referring URL |
| Accept-Language | Specifies preferred languages |

### Example

```http
GET /api/users HTTP/1.1
Host: localhost:3000
Accept: application/json
Authorization: Bearer abc123
```

## 7.2 Response Headers

Response headers provide information about the server's response.

Common response headers:

| Header | Purpose |
|---|---|
| Content-Type | Describes response body format |
| Content-Length | Indicates body length in bytes |
| Cache-Control | Defines caching behavior |
| Set-Cookie | Sends cookies to the client |
| Location | Provides a redirect or resource location |
| Access-Control-Allow-Origin | Controls allowed origins for CORS |
| ETag | Provides a resource validator |
| Last-Modified | Indicates the resource modification date |

### Example

```http
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-cache
Content-Length: 25
```

## 7.3 Content-Type vs Accept

These two headers are commonly confused.

### Content-Type

Specifies the media type of the message body being sent.

Example:

```http
Content-Type: application/json
```

Meaning: The request or response body is JSON.

### Accept

Specifies the media types the client can accept in the response.

Example:

```http
Accept: application/json
```

Meaning: The client prefers a JSON response.

### Comparison

| Header | Meaning |
|---|---|
| Content-Type | What format am I sending? |
| Accept | What format can I receive? |

---

# 8. Request Body

The request body contains data sent from the client to the server.

It is commonly used with:

- POST
- PUT
- PATCH

### Example

```http
POST /api/users HTTP/1.1
Content-Type: application/json

{
    "name": "John",
    "email": "john@example.com"
}
```

Here, the JSON object is the request body.

### Common Request Body Formats

| Content Type | Purpose |
|---|---|
| `application/json` | JSON data |
| `application/x-www-form-urlencoded` | URL-encoded form data |
| `multipart/form-data` | File uploads and form fields |
| `text/plain` | Plain text |
| `application/xml` | XML data |

### Important

In the Node.js built-in HTTP module, request bodies are not automatically parsed into JavaScript objects.

You need to read the incoming request stream and parse the data yourself.

Express.js provides middleware that simplifies this process. We will cover that in Phase 8.

---

# 9. Query Parameters

Query parameters are additional values included in the URL after the `?` character.

They are commonly used for:

- Filtering.
- Searching.
- Pagination.
- Sorting.
- Optional parameters.

### Example

```text
/api/users?name=John&age=25
```

Here:

| Parameter | Value |
|---|---|
| name | John |
| age | 25 |

### Multiple Query Parameters

```text
/api/products?category=electronics&sort=price&page=2&limit=10
```

### How to Read Query Parameters in Node.js

Node.js provides the built-in `URL` class.

```javascript
const url = new URL(
    "http://localhost:3000/api/users?name=John&age=25"
);

console.log(url.searchParams.get("name"));

console.log(url.searchParams.get("age"));
```

**Output:**

```text
John
25
```

### Get All Query Parameters

```javascript
const url = new URL(
    "http://localhost:3000/api/users?name=John&age=25"
);

for (const [key, value] of url.searchParams) {
    console.log(key, value);
}
```

**Output:**

```text
name John
age 25
```

### Important Methods

| Method | Purpose |
|---|---|
| `get()` | Gets the first value of a parameter |
| `getAll()` | Gets all values for a parameter |
| `has()` | Checks whether a parameter exists |
| `set()` | Sets a parameter |
| `append()` | Adds another parameter value |
| `delete()` | Removes a parameter |

### Example

```javascript
const url = new URL("http://localhost:3000/api/users");

url.searchParams.set("page", "2");

url.searchParams.set("limit", "10");

console.log(url.toString());
```

**Output:**

```text
http://localhost:3000/api/users?page=2&limit=10
```

---

# 10. Route Parameters

Route parameters are dynamic values included as part of the URL path.

They are commonly used to identify a specific resource.

### Example

```text
/api/users/101
/api/users/102
/api/users/103
```

Here, `101`, `102`, and `103` represent user IDs.

A framework such as Express.js provides built-in route parameter handling.

However, in the built-in HTTP module, you need to extract these values yourself.

### Example

```javascript
const pathname = "/api/users/101";

const segments = pathname.split("/");

const userId = segments[3];

console.log(userId);
```

**Output:**

```text
101
```

### Query Parameters vs Route Parameters

| Feature | Query Parameters | Route Parameters |
|---|---|---|
| Location | After `?` | Inside URL path |
| Purpose | Filtering and optional values | Identifying resources |
| Example | `/users?page=2` | `/users/101` |
| Common use | Search, pagination, sorting | User ID, product ID |

### Important

A query parameter is not necessarily optional in every API, and route parameters are not necessarily required by every URL design. These are common conventions rather than strict HTTP rules.

---

# 11. Node.js HTTP Module

Node.js provides a built-in module called `http`.

It allows us to:

- Create HTTP servers.
- Receive HTTP requests.
- Send HTTP responses.
- Handle different routes.
- Build basic APIs.

You do not need to install any external package.

### Import HTTP Module

CommonJS:

```javascript
const http = require("node:http");
```

ES Modules:

```javascript
import http from "node:http";
```

### Important HTTP Module Methods

| Method | Purpose |
|---|---|
| `http.createServer()` | Creates an HTTP server |
| `server.listen()` | Starts listening on a port |
| `server.close()` | Stops the server |
| `http.request()` | Makes an HTTP request |
| `http.get()` | Makes a GET request |

### Important Request and Response Objects

When using `http.createServer()`, the callback receives two objects:

```javascript
http.createServer((req, res) => {
    // Request and response handling
});
```

**`req` — IncomingMessage**

Contains information about the incoming request.

Examples:

```javascript
req.method
req.url
req.headers
req.httpVersion
```

**`res` — ServerResponse**

Used to construct and send the response.

Examples:

```javascript
res.statusCode
res.setHeader()
res.write()
res.end()
```

---

# 12. Creating Your First HTTP Server

Let's create a basic HTTP server.

### File: server.js

```javascript
const http = require("node:http");

const server = http.createServer((req, res) => {
    res.write("Hello from Node.js Server");

    res.end();
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
```

### Run the Server

```bash
node server.js
```

Output:

```text
Server running at http://localhost:3000
```

Open your browser:

```text
http://localhost:3000
```

You should see:

```text
Hello from Node.js Server
```

### Understanding the Code

**Step 1: Import HTTP module**

```javascript
const http = require("node:http");
```

Imports the built-in HTTP module.

**Step 2: Create Server**

```javascript
const server = http.createServer((req, res) => {
});
```

Creates an HTTP server.

The callback executes whenever the server receives a request.

**Step 3: Write Response**

```javascript
res.write("Hello from Node.js Server");
```

Writes data into the response body.

**Step 4: End Response**

```javascript
res.end();
```

Signals that the response is complete.

**Step 5: Listen on Port**

```javascript
server.listen(3000);
```

Starts listening for incoming connections on port 3000.

### Important: What is a Port?

A port is a logical communication endpoint used by applications on a computer.

Examples:

| Port | Common Use |
|---|---|
| 80 | HTTP |
| 443 | HTTPS |
| 3000 | Common development server port |
| 3306 | MySQL |
| 27017 | MongoDB |
| 5432 | PostgreSQL |
| 22 | SSH |

Port numbers are not permanently reserved for these applications; they are common conventions.

---

# 13. Understanding req and res

Let's inspect the incoming request.

```javascript
const http = require("node:http");

const server = http.createServer((req, res) => {
    console.log("Method:", req.method);

    console.log("URL:", req.url);

    console.log("Headers:", req.headers);

    console.log("HTTP Version:", req.httpVersion);

    res.end("Request received");
});

server.listen(3000);
```

Open:

```text
http://localhost:3000/users
```

You will see information about the incoming request in your terminal.

### Important req Properties

| Property | Description |
|---|---|
| `req.method` | HTTP method |
| `req.url` | Request URL path and query string |
| `req.headers` | Request headers |
| `req.httpVersion` | HTTP version |
| `req.socket` | Underlying socket |
| `req.url` | Requested path and query string |

### Important res Properties and Methods

| Property/Method | Purpose |
|---|---|
| `res.statusCode` | Sets response status code |
| `res.statusMessage` | Sets response status message |
| `res.setHeader()` | Sets a response header |
| `res.getHeader()` | Gets a response header |
| `res.writeHead()` | Sets status and headers |
| `res.write()` | Writes response body data |
| `res.end()` | Completes the response |

---

# 14. Handling Different Routes

In a real application, you need to handle different URLs.

For example:

```text
GET /              -> Home
GET /about         -> About
GET /users         -> Users
GET /products      -> Products
```

Let's implement these routes.

### Example

```javascript
const http = require("node:http");

const server = http.createServer((req, res) => {

    if (req.url === "/" && req.method === "GET") {
        res.end("Home Page");
    }

    else if (req.url === "/about" && req.method === "GET") {
        res.end("About Page");
    }

    else if (req.url === "/users" && req.method === "GET") {
        res.end("Users Page");
    }

    else if (req.url === "/products" && req.method === "GET") {
        res.end("Products Page");
    }

    else {
        res.statusCode = 404;

        res.end("Page Not Found");
    }

});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

### Why check both URL and Method?

Because the same URL can support different HTTP methods.

For example:

```text
GET    /api/users
POST   /api/users
GET    /api/users/101
PUT    /api/users/101
DELETE /api/users/101
```

Each request can perform a different operation.

### Important: Parse the URL Properly

Checking `req.url` directly can become problematic when query parameters are present.

For example:

```text
/api/users?page=2
```

The value of `req.url` is not equal to `/api/users`.

A better approach:

```javascript
const url = new URL(req.url, `http://${req.headers.host}`);

console.log(url.pathname);
console.log(url.searchParams.get("page"));
```

This separates the path from the query parameters.

---

# 15. Handling GET Requests

GET requests are used to retrieve data.

Let's create a small API that returns users.

### Example

```javascript
const http = require("node:http");

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
    },
    {
        id: 3,
        name: "Alex",
        email: "alex@example.com"
    }
];

const server = http.createServer((req, res) => {

    if (req.url === "/api/users" && req.method === "GET") {

        res.statusCode = 200;

        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify(users));

    } else {

        res.statusCode = 404;

        res.end("Not Found");
    }

});

server.listen(3000);
```

Open:

```text
http://localhost:3000/api/users
```

Response:

```json
[
    {
        "id": 1,
        "name": "John",
        "email": "john@example.com"
    },
    {
        "id": 2,
        "name": "David",
        "email": "david@example.com"
    },
    {
        "id": 3,
        "name": "Alex",
        "email": "alex@example.com"
    }
]
```

### Why use JSON.stringify()?

JavaScript objects are not directly sent as JSON text.

`JSON.stringify()` converts a JavaScript value into a JSON string.

```javascript
const user = {
    id: 1,
    name: "John"
};

const json = JSON.stringify(user);

console.log(json);
```

Output:

```json
{"id":1,"name":"John"}
```

---

# 16. Handling POST Requests

POST requests are commonly used to send data to the server.

In Node.js HTTP, the incoming request body is a readable stream.

This means you need to collect its chunks and process them.

### Example: Receive User Data

```javascript
const http = require("node:http");

const users = [];

const server = http.createServer((req, res) => {

    if (req.url === "/api/users" && req.method === "POST") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {

            try {
                const user = JSON.parse(body);

                users.push(user);

                res.statusCode = 201;

                res.setHeader("Content-Type", "application/json");

                res.end(JSON.stringify({
                    message: "User created successfully",
                    user
                }));

            } catch (error) {

                res.statusCode = 400;

                res.setHeader("Content-Type", "application/json");

                res.end(JSON.stringify({
                    message: "Invalid JSON"
                }));

            }

        });

    } else {

        res.statusCode = 404;

        res.end("Not Found");

    }

});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

### Test Using Postman

Method:

```text
POST
```

URL:

```text
http://localhost:3000/api/users
```

Body → raw → JSON:

```json
{
    "id": 4,
    "name": "Riyaz",
    "email": "riyaz@example.com"
}
```

Response:

```json
{
    "message": "User created successfully",
    "user": {
        "id": 4,
        "name": "Riyaz",
        "email": "riyaz@example.com"
    }
}
```

### Understanding req.on("data")

```javascript
req.on("data", (chunk) => {
    body += chunk;
});
```

The request body may arrive in multiple chunks.

Each chunk contains a portion of the incoming data.

We collect these chunks until the request finishes.

### Understanding req.on("end")

```javascript
req.on("end", () => {
    // Process complete request body
});
```

The `end` event indicates that the request body stream has finished.

Only after receiving the complete body should you parse the JSON.

### Important: Production Considerations

The example above is suitable for learning, but production applications should also:

- Limit request body size.
- Validate incoming data.
- Check the request content type.
- Handle malformed JSON.
- Handle request stream errors.
- Avoid assuming every request body is JSON.

We will cover validation and security in Phase 12.

---

# 17. Serving HTML and Static Files

Node.js can also serve HTML, CSS, JavaScript, and images.

Let's understand how.

## 17.1 Serving HTML

Create a file:

```text
index.html
```

Content:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Node.js Server</title>
</head>
<body>
    <h1>Hello from Node.js</h1>
    <p>This page is served by Node.js.</p>
</body>
</html>
```

### server.js

```javascript
const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((req, res) => {

    if (req.url === "/" && req.method === "GET") {

        fs.readFile("index.html", (err, data) => {

            if (err) {
                res.statusCode = 500;
                res.end("Unable to load page");
                return;
            }

            res.setHeader("Content-Type", "text/html");

            res.end(data);

        });

    } else {

        res.statusCode = 404;

        res.end("Not Found");

    }

});

server.listen(3000);
```

Open:

```text
http://localhost:3000
```

Your HTML page will be displayed.

## 17.2 Serving CSS

Suppose your project structure is:

```text
project/
│
├── server.js
│
└── public/
    ├── index.html
    └── style.css
```

### index.html

```html
<!DOCTYPE html>
<html>
<head>
    <title>Node.js Website</title>

    <link rel="stylesheet" href="/style.css">
</head>
<body>

    <h1>Welcome</h1>

</body>
</html>
```

### style.css

```css
body {
    background: #f5f5f5;
    font-family: Arial;
}

h1 {
    color: blue;
}
```

### server.js

```javascript
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const server = http.createServer((req, res) => {

    if (req.url === "/") {

        fs.readFile(
            path.join(__dirname, "public", "index.html"),
            (err, data) => {

                if (err) {
                    res.statusCode = 500;
                    res.end("Server Error");
                    return;
                }

                res.setHeader("Content-Type", "text/html");

                res.end(data);

            }
        );

    }

    else if (req.url === "/style.css") {

        fs.readFile(
            path.join(__dirname, "public", "style.css"),
            (err, data) => {

                if (err) {
                    res.statusCode = 500;
                    res.end("Server Error");
                    return;
                }

                res.setHeader("Content-Type", "text/css");

                res.end(data);

            }
        );

    }

    else {

        res.statusCode = 404;

        res.end("Not Found");

    }

});

server.listen(3000);
```

### Important

This example manually serves two static files.

In real applications, you should avoid manually writing separate file-reading logic for every asset.

Express.js provides static file middleware:

```javascript
app.use(express.static("public"));
```

We will study this in Phase 8.

---

# 18. Content-Type and MIME Types

When a server sends a response, it should specify the content type.

This tells the client how to interpret the response body.

The `Content-Type` header identifies the media type.

### Common MIME Types

| File Type | MIME Type |
|---|---|
| HTML | `text/html` |
| CSS | `text/css` |
| JavaScript | `text/javascript` |
| JSON | `application/json` |
| Plain Text | `text/plain` |
| PNG | `image/png` |
| JPEG | `image/jpeg` |
| SVG | `image/svg+xml` |
| PDF | `application/pdf` |
| XML | `application/xml` |
| MP3 | `audio/mpeg` |
| MP4 | `video/mp4` |

### Example

```javascript
res.setHeader("Content-Type", "application/json");

res.end(JSON.stringify({
    message: "Hello"
}));
```

### Why is Content-Type important?

Suppose the server sends:

```javascript
res.end("<h1>Hello</h1>");
```

If you do not specify the correct content type, the browser may not interpret the response as HTML as intended.

Correct:

```javascript
res.setHeader("Content-Type", "text/html");

res.end("<h1>Hello</h1>");
```

---

# 19. HTTP vs HTTPS

HTTP and HTTPS are protocols used for communication between clients and servers.

HTTPS is HTTP secured using TLS.

TLS stands for **Transport Layer Security**.

### HTTP

```text
http://example.com
```

HTTP does not provide transport encryption by itself.

### HTTPS

```text
https://example.com
```

HTTPS provides:

1. Encryption.
2. Data integrity.
3. Server authentication through certificates.

### Comparison

| Feature | HTTP | HTTPS |
|---|---|---|
| Full Form | Hypertext Transfer Protocol | HTTP Secure |
| Encryption | No built-in transport encryption | TLS encryption |
| Default Port | 80 | 443 |
| Security | Data can be exposed in transit | Protects data in transit |
| Certificate | Not required | TLS certificate required |
| URL | `http://` | `https://` |

### How Does HTTPS Work?

Simplified process:

1. Client connects to the server.
2. TLS handshake begins.
3. Server provides its certificate.
4. Client validates the certificate.
5. Client and server establish encryption keys.
6. HTTP communication continues through the encrypted connection.

### Creating an HTTPS Server in Node.js

Node.js provides a built-in `https` module.

```javascript
const https = require("node:https");
const fs = require("node:fs");

const options = {
    key: fs.readFileSync("private-key.pem"),

    cert: fs.readFileSync("certificate.pem")
};

const server = https.createServer(options, (req, res) => {

    res.writeHead(200, {
        "Content-Type": "text/plain"
    });

    res.end("Secure HTTPS Server");

});

server.listen(443, () => {
    console.log("HTTPS server running");
});
```

This requires a valid private key and certificate.

For local development, you can use a locally generated development certificate.

For production, use a properly issued certificate and configure TLS securely.

---

# 20. Building a Basic REST API Without Express

Now let's combine everything.

We will create a simple user management API using only Node.js built-in modules.

### Project Structure

```text
node-http-api/
│
├── server.js
│
└── package.json
```

Initialize the project:

```bash
npm init -y
```

### server.js

```javascript
const http = require("node:http");

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

function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {

    const url = new URL(
        req.url,
        `http://${req.headers.host || "localhost"}`
    );

    const pathname = url.pathname;

    // GET ALL USERS
    if (pathname === "/api/users" && req.method === "GET") {

        return sendJSON(res, 200, users);

    }

    // GET SINGLE USER
    if (
        pathname.startsWith("/api/users/") &&
        req.method === "GET"
    ) {

        const id = Number(pathname.split("/")[3]);

        const user = users.find((u) => u.id === id);

        if (!user) {
            return sendJSON(res, 404, {
                message: "User not found"
            });
        }

        return sendJSON(res, 200, user);

    }

    // CREATE USER
    if (pathname === "/api/users" && req.method === "POST") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {

            try {

                const data = JSON.parse(body);

                if (!data.name || !data.email) {
                    return sendJSON(res, 400, {
                        message: "Name and email are required"
                    });
                }

                const newUser = {
                    id: users.length
                        ? Math.max(...users.map((u) => u.id)) + 1
                        : 1,

                    name: data.name,

                    email: data.email
                };

                users.push(newUser);

                return sendJSON(res, 201, {
                    message: "User created successfully",
                    user: newUser
                });

            } catch (error) {

                return sendJSON(res, 400, {
                    message: "Invalid JSON"
                });

            }

        });

        return;

    }

    // DELETE USER
    if (
        pathname.startsWith("/api/users/") &&
        req.method === "DELETE"
    ) {

        const id = Number(pathname.split("/")[3]);

        const index = users.findIndex((u) => u.id === id);

        if (index === -1) {
            return sendJSON(res, 404, {
                message: "User not found"
            });
        }

        users.splice(index, 1);

        return sendJSON(res, 200, {
            message: "User deleted successfully"
        });

    }

    // ROUTE NOT FOUND
    sendJSON(res, 404, {
        message: "Route not found"
    });

});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
```

### Available API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/users` | Get all users |
| GET | `/api/users/1` | Get a specific user |
| POST | `/api/users` | Create a user |
| DELETE | `/api/users/1` | Delete a user |

### Test Using Postman

**1. Get all users**

```http
GET http://localhost:3000/api/users
```

**2. Get a specific user**

```http
GET http://localhost:3000/api/users/1
```

**3. Create a user**

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

**4. Delete a user**

```http
DELETE http://localhost:3000/api/users/1
```

### Limitations of This Project

This is a learning project, not a production-ready API.

It has several limitations:

- Data is stored in memory and disappears when the server restarts.
- There is no database integration.
- There is no authentication.
- There is no centralized error handling.
- Request body size is not limited.
- Input validation is basic.
- Routing is implemented manually.
- PUT and PATCH are not implemented.

We will gradually solve these problems in upcoming phases.

---

# 21. Important HTTP Concepts Summary

| Concept | Meaning |
|---|---|
| HTTP | Protocol for client-server communication |
| HTTPS | HTTP secured using TLS |
| Client | Application sending requests |
| Server | Application receiving and processing requests |
| Request | Message sent by client |
| Response | Message returned by server |
| Method | Defines intended operation |
| Status Code | Indicates request outcome |
| Header | Provides additional message information |
| Request Body | Data sent by the client |
| Query Parameter | Additional URL parameter |
| Route Parameter | Dynamic value in URL path |
| Content-Type | Identifies body media type |
| MIME Type | Standard media type identifier |
| Port | Logical communication endpoint |
| DNS | Resolves domain names to IP addresses |
| REST API | API designed around REST architectural constraints |

---

# 22. Interview Questions and Answers

### Q1. What is HTTP?

HTTP is an application-layer protocol used for communication between clients and servers.

### Q2. What is HTTPS?

HTTPS is HTTP secured using TLS, providing encryption, integrity, and server authentication.

### Q3. What is the difference between HTTP and HTTPS?

HTTP does not provide built-in transport encryption, whereas HTTPS uses TLS to protect communication.

### Q4. What is client-server architecture?

It is an architecture where a client requests services or resources from a server.

### Q5. What is a stateless protocol?

A stateless protocol does not automatically retain application-level state between requests. HTTP is stateless by default.

### Q6. What are HTTP methods?

HTTP methods define the intended operation for a request, such as retrieving, creating, updating, or deleting a resource.

### Q7. What is the difference between GET and POST?

GET is used to retrieve data, while POST is commonly used to submit data or create resources.

### Q8. What is the difference between PUT and PATCH?

PUT generally replaces a resource representation, whereas PATCH applies partial modifications.

### Q9. What is idempotency?

An operation is idempotent if repeating it has the same intended effect as performing it once.

### Q10. Which HTTP methods are idempotent?

GET, HEAD, PUT, DELETE, and OPTIONS are defined as idempotent. PATCH is not guaranteed to be idempotent.

### Q11. What is the difference between 401 and 403?

401 indicates missing or invalid authentication credentials. 403 indicates that the server refuses authorization.

### Q12. What is the difference between 200 and 201?

200 means the request succeeded. 201 means a resource was successfully created.

### Q13. What is the difference between 400 and 500?

400 indicates a client-side request error. 500 indicates an internal server error.

### Q14. What are HTTP headers?

Headers are key-value pairs that provide additional information about an HTTP request or response.

### Q15. What is Content-Type?

Content-Type identifies the media type of the message body.

### Q16. What is the difference between Content-Type and Accept?

Content-Type describes the body being sent. Accept specifies the response media types the client can accept.

### Q17. What is a request body?

The request body contains data sent from the client to the server.

### Q18. What are query parameters?

Query parameters are values included in the URL after the `?` character.

### Q19. What are route parameters?

Route parameters are dynamic values included in the URL path to identify resources.

### Q20. What is the difference between query parameters and route parameters?

Query parameters commonly provide filtering or optional information, while route parameters commonly identify specific resources.

### Q21. What is the Node.js HTTP module?

It is a built-in Node.js module that allows developers to create HTTP servers and handle HTTP requests and responses.

### Q22. What is http.createServer()?

It creates an HTTP server and accepts a callback that handles incoming requests.

### Q23. What are req and res?

- `req` represents the incoming request.
- `res` represents the outgoing server response.

### Q24. What is the purpose of res.end()?

It signals that the response is complete and optionally sends final response data.

### Q25. What is the purpose of JSON.stringify()?

It converts a JavaScript value into a JSON string.

### Q26. Why do we need to parse the request body?

Because incoming request data is received as a stream of chunks. Parsing converts the complete body into a usable JavaScript value.

### Q27. What is a MIME type?

A MIME type identifies the format of a resource, such as HTML, JSON, CSS, or an image.

### Q28. What is DNS?

DNS is the Domain Name System. It resolves domain names into IP addresses.

### Q29. What is a port?

A port is a logical communication endpoint used by applications to send and receive network traffic.

### Q30. Why do we use Express.js if Node.js already provides the HTTP module?

Express.js simplifies routing, middleware, request handling, response handling, and API development.

---

# 23. Phase 07 Cheat Sheet

| Task | Node.js API |
|---|---|
| Import HTTP | `require("node:http")` |
| Create Server | `http.createServer()` |
| Start Server | `server.listen()` |
| Stop Server | `server.close()` |
| Get Request Method | `req.method` |
| Get Request URL | `req.url` |
| Get Request Headers | `req.headers` |
| Set Status Code | `res.statusCode = 200` |
| Set Header | `res.setHeader()` |
| Write Response | `res.write()` |
| End Response | `res.end()` |
| Set Status + Headers | `res.writeHead()` |
| Parse URL | `new URL()` |
| Get Query Parameter | `url.searchParams.get()` |
| Read Request Body | `req.on("data")` |
| Detect Body Completion | `req.on("end")` |
| Convert Object to JSON | `JSON.stringify()` |
| Parse JSON | `JSON.parse()` |
| Create HTTPS Server | `https.createServer()` |

---

# 24. Phase 07 Completion Checklist

Before moving to Phase 8, make sure you can:

- [ ] Explain what HTTP is.
- [ ] Explain client-server architecture.
- [ ] Understand how a browser communicates with a server.
- [ ] Understand DNS lookup.
- [ ] Understand HTTP request structure.
- [ ] Understand HTTP response structure.
- [ ] Understand GET, POST, PUT, PATCH, and DELETE.
- [ ] Understand HEAD and OPTIONS.
- [ ] Understand safe and idempotent methods.
- [ ] Understand HTTP status code categories.
- [ ] Recognize common HTTP status codes.
- [ ] Understand request and response headers.
- [ ] Understand Content-Type vs Accept.
- [ ] Understand request bodies.
- [ ] Understand query parameters.
- [ ] Understand route parameters.
- [ ] Create a server using `http.createServer()`.
- [ ] Handle different routes.
- [ ] Handle GET requests.
- [ ] Handle POST requests.
- [ ] Parse JSON request bodies.
- [ ] Serve HTML and CSS files.
- [ ] Understand MIME types.
- [ ] Understand HTTP vs HTTPS.
- [ ] Build a basic REST API without Express.

## Practical Tasks to Complete

1. Create a basic HTTP server.
2. Create `/`, `/about`, and `/contact` routes.
3. Create a GET API that returns products.
4. Create a POST API that adds products.
5. Create a DELETE API that removes products.
6. Implement query-based filtering:

   ```text
   GET /api/products?category=electronics
   ```

7. Implement route-based resource retrieval:

   ```text
   GET /api/products/101
   ```

8. Serve an HTML page with CSS and JavaScript.
9. Test all endpoints using Postman.
10. Build a complete in-memory CRUD API using Node.js HTTP.

---

# What Comes Next?

## PHASE 08: Express.js Fundamentals

In Phase 8, we will learn Express.js, one of the most commonly used Node.js backend frameworks.

Topics will include:

1. What is Express.js?
2. Why Express.js?
3. Node.js HTTP vs Express.js.
4. Installing Express.
5. Creating an Express Server.
6. Routing.
7. Route Parameters.
8. Query Parameters.
9. Request and Response Objects.
10. Middleware.
11. Built-in Middleware.
12. Application-Level Middleware.
13. Router-Level Middleware.
14. Error-Handling Middleware.
15. Serving Static Files.
16. Handling JSON Requests.
17. Express Router.
18. Organizing Routes and Controllers.
19. Building a CRUD API with Express.

**Recommended focus before Phase 8:** Build at least one small CRUD API using the native Node.js HTTP module. Understanding how requests and responses work internally will make Express.js much easier to learn.