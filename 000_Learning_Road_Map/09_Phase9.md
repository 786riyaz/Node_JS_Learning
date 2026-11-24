# PHASE 09: REST APIs & Backend Architecture

**Level:** Intermediate  
**Goal:** Understand REST architectural principles, design professional APIs, organize backend code using scalable architecture patterns, and build maintainable REST APIs using Node.js and Express.js.

---

## Topics Covered

1. What is an API?
2. What is REST?
3. REST Architecture
4. REST Constraints
5. REST vs RESTful API
6. Resource-Based API Design
7. REST API Naming Conventions
8. CRUD Operations in REST
9. HTTP Methods in REST
10. HTTP Status Codes in REST
11. Request and Response Structure
12. API Response Standards
13. API Versioning
14. Pagination
15. Filtering
16. Sorting
17. Searching
18. Controller-Service-Model Architecture
19. Separation of Concerns
20. Dependency Management
21. Environment-Based Configuration
22. API Documentation
23. Postman Collections
24. Building a Structured REST API
25. Interview Questions

---

# 1. What is an API?

API stands for **Application Programming Interface**.

An API is an interface that allows two software applications to communicate with each other.

In simple words:

An API defines how one application can request functionality or data from another application.

### Example: Weather Application

Suppose you are developing a weather application.

You want to display the current temperature of Ahmedabad.

Instead of collecting weather information yourself, you can use a weather API.

```text
       WEATHER APPLICATION
               |
               |
          API Request
               |
               v
        WEATHER API SERVER
               |
               |
        Retrieve Weather Data
               |
               v
          API Response
               |
               v
       WEATHER APPLICATION
               |
               |
        Display Temperature
```

Example API request:

```http
GET /api/weather?city=Ahmedabad
```

Example API response:

```json
{
    "city": "Ahmedabad",
    "temperature": 32,
    "humidity": 45,
    "condition": "Sunny"
}
```

Your application receives the response and displays it to the user.

### Real-World API Examples

| Application | API Usage |
|---|---|
| Google Maps | Location and map data |
| Payment Gateway | Payment processing |
| Weather Application | Weather information |
| E-commerce Website | Products and orders |
| WhatsApp | Messaging functionality |
| Authentication Service | User authentication |
| Cloudinary | Image uploads and management |

### Important

An API is not necessarily a web API.

APIs can exist in:

- Operating systems.
- Programming libraries.
- Databases.
- Web applications.
- Hardware interfaces.

In Node.js backend development, we primarily work with **Web APIs**, especially HTTP-based APIs.

---

# 2. What is REST?

REST stands for **Representational State Transfer**.

It is an architectural style for designing network-based applications.

REST was introduced by Roy Fielding in his doctoral dissertation in 2000.

REST provides architectural constraints that help developers design scalable, maintainable, and interoperable web services.

### Simple Definition

REST is an architectural style in which resources are identified by URLs and manipulated through representations using standard HTTP semantics.

### Example

Suppose you are developing a user management application.

You can expose these endpoints:

```http
GET    /api/users
GET    /api/users/101
POST   /api/users
PUT    /api/users/101
PATCH  /api/users/101
DELETE /api/users/101
```

Each endpoint represents a user-related resource.

The HTTP method defines the intended operation.

### What is a Resource?

A resource is any identifiable piece of information or entity exposed by an API.

Examples:

- Users.
- Products.
- Orders.
- Categories.
- Payments.
- Reviews.
- Employees.

For example:

```text
/api/users
/api/products
/api/orders
/api/categories
```

Each URL identifies a resource collection.

A specific resource can be identified using an ID:

```text
/api/users/101
/api/products/501
/api/orders/9001
```

---

# 3. REST Architecture

REST is based on a set of architectural constraints.

These constraints define how a RESTful system should be designed.

The six primary REST constraints are:

1. Client-Server Architecture.
2. Statelessness.
3. Cacheability.
4. Uniform Interface.
5. Layered System.
6. Code on Demand (Optional).

Let's understand each one.

## 3.1 Client-Server Architecture

The client and server should have separate responsibilities.

**Client:**
- Displays the user interface.
- Collects user input.
- Sends API requests.
- Displays API responses.

**Server:**
- Processes requests.
- Executes business logic.
- Communicates with databases.
- Returns responses.

Example:

```text
        REACT FRONTEND
              |
              |
          API REQUEST
              |
              v
       EXPRESS BACKEND
              |
              |
        BUSINESS LOGIC
              |
              v
          DATABASE
              |
              |
         API RESPONSE
              |
              v
        REACT FRONTEND
```

This separation allows frontend and backend applications to evolve independently.

## 3.2 Statelessness

Each request must contain the information necessary for the server to understand and process it.

The server should not depend on stored client session state from previous requests to interpret the current request.

Example:

```http
GET /api/profile
Authorization: Bearer abc123
```

The request contains an authentication token.

The server can validate that token to identify the user.

It does not need to rely on remembering the previous login request.

**Important:** Statelessness does not mean the server cannot store data.

The server can maintain:

- Database records.
- Application configuration.
- Caches.
- Shared business data.

It means client-specific request context should be supplied with each request rather than relying on server-side conversational session state.

## 3.3 Cacheability

Responses should indicate whether they can be cached.

Caching reduces unnecessary requests and improves performance.

Example:

```http
Cache-Control: public, max-age=3600
```

This indicates that a response may be cached by shared caches for up to one hour.

Another example:

```http
Cache-Control: no-store
```

This instructs caches not to store the response.

Common caching-related headers:

| Header | Purpose |
|---|---|
| `Cache-Control` | Defines caching rules |
| `ETag` | Identifies a particular resource representation |
| `Last-Modified` | Indicates when a resource was modified |
| `Expires` | Provides an expiration date |

We will discuss performance and caching considerations in later phases.

## 3.4 Uniform Interface

A uniform interface means resources are accessed and manipulated through a consistent interface.

Important concepts include:

- Resource identification through URLs.
- Resource manipulation through representations.
- Self-descriptive messages.
- Hypermedia as the engine of application state (HATEOAS).

Example:

```http
GET /api/users/101
```

Response:

```json
{
    "id": 101,
    "name": "John",
    "email": "john@example.com"
}
```

The resource is identified by its URL, and its representation is returned as JSON.

## 3.5 Layered System

A REST architecture can contain multiple layers between the client and the final server.

For example:

```text
          CLIENT
             |
             v
        LOAD BALANCER
             |
             v
         API GATEWAY
             |
             v
       EXPRESS SERVER
             |
             v
        CACHE LAYER
             |
             v
         DATABASE
```

The client does not necessarily know which layers process its request.

Each layer can have its own responsibilities.

## 3.6 Code on Demand (Optional)

A server may optionally provide executable code to the client.

For example, a server can send JavaScript code that a browser executes.

This is an optional REST constraint.

---

# 4. REST vs RESTful API

These terms are closely related but not identical.

| REST | RESTful API |
|---|---|
| Architectural style | API that follows REST constraints |
| Defines architectural principles | Implements those principles |
| Introduced by Roy Fielding | Describes an implementation |
| Not a programming language | Not a programming language |

### Example

Consider:

```http
GET /getAllUsers
POST /createUser
GET /getUserById/101
```

These endpoints may work, but their design is action-oriented.

A resource-oriented design would be:

```http
GET    /users
POST   /users
GET    /users/101
PUT    /users/101
DELETE /users/101
```

The second design is more consistent with common REST API conventions.

**Important:** Following naming conventions alone does not make an API fully RESTful. A RESTful API should respect the relevant architectural constraints.

---

# 5. Resource-Based API Design

In REST, URLs should generally represent resources rather than actions.

### Incorrect Approach

```http
GET /getUsers
POST /createUser
POST /updateUser
GET /deleteUser/101
```

Problems:

- URLs contain action names.
- HTTP methods are not used consistently.
- Resource identification is unclear.

### Better Approach

```http
GET    /users
GET    /users/101
POST   /users
PUT    /users/101
PATCH  /users/101
DELETE /users/101
```

Here:

- `/users` represents the user collection.
- `/users/101` represents one specific user.
- HTTP methods describe the intended operations.

### Resource Hierarchy

Suppose an e-commerce application has users, orders, and products.

A possible API structure:

```text
/api/users
/api/users/101
/api/users/101/orders
/api/users/101/orders/5001

/api/products
/api/products/501

/api/orders
/api/orders/5001
```

### Nested Resources

Nested resources represent relationships between resources.

Example:

```http
GET /api/users/101/orders
```

This retrieves orders associated with user 101.

Another example:

```http
GET /api/orders/5001/items
```

This retrieves items belonging to order 5001.

**Important:** Avoid unnecessarily deep nesting.

For example:

```text
/users/101/orders/5001/items/20/reviews/5
```

Deep nesting can make APIs difficult to maintain.

---

# 6. REST API Naming Conventions

Follow consistent naming conventions when designing APIs.

## Rule 1: Use Nouns Instead of Verbs

Prefer:

```http
GET /users
```

Avoid:

```http
GET /getUsers
```

## Rule 2: Use Plural Nouns for Collections

Prefer:

```http
/users
/products
/orders
```

This is a common convention, not a strict REST requirement.

## Rule 3: Use HTTP Methods for Operations

Prefer:

```http
POST /users
```

Avoid:

```http
POST /createUser
```

## Rule 4: Use Consistent Naming

Prefer:

```http
/api/user-profiles
/api/order-items
```

Avoid mixing:

```http
/api/userProfiles
/api/order_items
/api/order-items
```

## Rule 5: Use Lowercase URLs

Prefer:

```http
/api/users
/api/user-profiles
```

Avoid:

```http
/api/Users
/api/UserProfiles
```

## Rule 6: Use Query Parameters for Filtering

Prefer:

```http
GET /products?category=electronics
```

Avoid:

```http
GET /getElectronicsProducts
```

## Rule 7: Use Route Parameters for Specific Resources

```http
GET /users/101
GET /products/501
GET /orders/9001
```

### Naming Convention Summary

| Requirement | Recommended |
|---|---|
| Collection | `/users` |
| Single resource | `/users/101` |
| Nested resource | `/users/101/orders` |
| Filtering | `/products?category=electronics` |
| Pagination | `/users?page=2&limit=10` |
| Sorting | `/products?sort=price` |
| Searching | `/users?search=john` |

---

# 7. CRUD Operations in REST

CRUD stands for:

- Create.
- Read.
- Update.
- Delete.

These are the four basic operations used in data management.

Let's understand how CRUD maps to HTTP methods.

| CRUD Operation | HTTP Method | Endpoint |
|---|---|---|
| Create | POST | `/api/users` |
| Read All | GET | `/api/users` |
| Read One | GET | `/api/users/:id` |
| Update Entire Resource | PUT | `/api/users/:id` |
| Update Partially | PATCH | `/api/users/:id` |
| Delete | DELETE | `/api/users/:id` |

### Example: Create User

Request:

```http
POST /api/users
Content-Type: application/json
```

Body:

```json
{
    "name": "John",
    "email": "john@example.com"
}
```

Response:

```http
201 Created
```

```json
{
    "success": true,
    "message": "User created successfully",
    "data": {
        "id": 101,
        "name": "John",
        "email": "john@example.com"
    }
}
```

### Example: Get User

Request:

```http
GET /api/users/101
```

Response:

```json
{
    "success": true,
    "data": {
        "id": 101,
        "name": "John",
        "email": "john@example.com"
    }
}
```

### Example: Update User

Request:

```http
PATCH /api/users/101
Content-Type: application/json
```

Body:

```json
{
    "name": "John Smith"
}
```

Response:

```json
{
    "success": true,
    "message": "User updated successfully"
}
```

### Example: Delete User

Request:

```http
DELETE /api/users/101
```

Response:

```http
204 No Content
```

A 204 response does not contain a response body.

---

# 8. HTTP Methods in REST

Let's understand the important HTTP semantics in more detail.

| Method | Purpose | Safe | Idempotent |
|---|---|---|---|
| GET | Retrieve resource | Yes | Yes |
| POST | Submit or create resource | No | Generally no |
| PUT | Replace resource | No | Yes |
| PATCH | Partially modify resource | No | Not guaranteed |
| DELETE | Remove resource | No | Yes |

### PUT vs PATCH

This is especially important.

Suppose the existing user is:

```json
{
    "id": 101,
    "name": "John",
    "email": "john@example.com",
    "age": 25
}
```

**PUT Request:**

```http
PUT /api/users/101
```

Body:

```json
{
    "name": "David",
    "email": "david@example.com",
    "age": 30
}
```

PUT generally replaces the resource representation with the supplied representation.

**PATCH Request:**

```http
PATCH /api/users/101
```

Body:

```json
{
    "name": "David"
}
```

PATCH modifies only the specified part, according to the patch format and API implementation.

### Important

HTTP does not require every PUT request to contain every database field. The server defines the accepted resource representation and validation rules.

However, when designing APIs, use PUT for replacement semantics and PATCH for partial modification semantics.

---

# 9. HTTP Status Codes in REST APIs

Status codes communicate the outcome of an API request.

### Success Responses

| Status | Meaning | Example |
|---|---|---|
| 200 | OK | Successful GET or update |
| 201 | Created | Resource created |
| 202 | Accepted | Background processing accepted |
| 204 | No Content | Successful deletion |

### Client Error Responses

| Status | Meaning | Example |
|---|---|---|
| 400 | Bad Request | Malformed or invalid request |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | User does not exist |
| 405 | Method Not Allowed | Unsupported method |
| 409 | Conflict | Duplicate email |
| 415 | Unsupported Media Type | Unsupported content type |
| 422 | Unprocessable Content | Validation error |
| 429 | Too Many Requests | Rate limit exceeded |

### Server Error Responses

| Status | Meaning | Example |
|---|---|---|
| 500 | Internal Server Error | Unexpected application error |
| 502 | Bad Gateway | Invalid upstream response |
| 503 | Service Unavailable | Server temporarily unavailable |
| 504 | Gateway Timeout | Upstream server timeout |

### Practical Examples

**Successful request:**

```javascript
res.status(200).json({
    success: true,
    message: "Data fetched successfully"
});
```

**Resource created:**

```javascript
res.status(201).json({
    success: true,
    message: "User created successfully"
});
```

**Resource not found:**

```javascript
res.status(404).json({
    success: false,
    message: "User not found"
});
```

**Validation error:**

```javascript
res.status(422).json({
    success: false,
    message: "Validation failed"
});
```

---

# 10. Request and Response Structure

A well-designed API should have a consistent request and response structure.

## 10.1 Request Structure

Example:

```http
POST /api/users HTTP/1.1
Content-Type: application/json
Authorization: Bearer token123
```

Body:

```json
{
    "name": "John",
    "email": "john@example.com"
}
```

A request may contain:

- HTTP method.
- URL.
- Headers.
- Query parameters.
- Route parameters.
- Request body.

## 10.2 Response Structure

Example:

```json
{
    "success": true,
    "message": "User created successfully",
    "data": {
        "id": 101,
        "name": "John",
        "email": "john@example.com"
    }
}
```

A consistent response format makes frontend integration easier.

---

# 11. API Response Standards

There is no single mandatory JSON response envelope for all REST APIs.

However, maintaining a consistent application-level response format is a good practice.

### Recommended Success Response

```json
{
    "success": true,
    "message": "Users fetched successfully",
    "data": [
        {
            "id": 1,
            "name": "John"
        },
        {
            "id": 2,
            "name": "David"
        }
    ]
}
```

### Recommended Error Response

```json
{
    "success": false,
    "message": "User not found",
    "error": {
        "code": "USER_NOT_FOUND"
    }
}
```

### Validation Error Response

```json
{
    "success": false,
    "message": "Validation failed",
    "errors": [
        {
            "field": "email",
            "message": "Email is required"
        },
        {
            "field": "name",
            "message": "Name must contain at least 3 characters"
        }
    ]
}
```

### Why Use a Consistent Response Format?

Suppose your frontend receives responses from different APIs.

Without consistency:

```json
{
    "users": []
}
```

Another endpoint:

```json
{
    "result": []
}
```

Another endpoint:

```json
{
    "data": []
}
```

The frontend needs different handling logic.

With consistency:

```json
{
    "success": true,
    "data": []
}
```

The frontend can use a predictable response structure.

### Important: Do Not Put Everything in the Response Body

Use HTTP status codes correctly.

For example, avoid returning HTTP 200 for every error.

Incorrect:

```javascript
res.status(200).json({
    success: false,
    message: "User not found"
});
```

Better:

```javascript
res.status(404).json({
    success: false,
    message: "User not found"
});
```

---

# 12. API Versioning

API versioning allows you to introduce changes without unexpectedly breaking existing clients.

Suppose you have an API:

```http
GET /api/users
```

Many applications already depend on it.

Now you want to change the response format.

If you modify the existing API in an incompatible way, existing frontend applications may stop working.

API versioning helps manage this.

### Common Versioning Strategies

1. URI versioning.
2. Query parameter versioning.
3. Custom header versioning.
4. Media type versioning.

## 12.1 URI Versioning

The version is included in the URL.

Example:

```http
GET /api/v1/users
GET /api/v2/users
```

This is a common and easy-to-understand approach.

### Express Example

```javascript
app.get("/api/v1/users", (req, res) => {
    res.json({
        version: "v1",
        users: []
    });
});

app.get("/api/v2/users", (req, res) => {
    res.json({
        version: "v2",
        data: []
    });
});
```

## 12.2 Query Parameter Versioning

Example:

```http
GET /api/users?version=1
```

Another version:

```http
GET /api/users?version=2
```

This is possible, but less commonly preferred for public REST APIs.

## 12.3 Header Versioning

The version is included in a custom request header.

Example:

```http
GET /api/users
API-Version: 2
```

## 12.4 Media Type Versioning

The version is specified through the `Accept` header.

Example:

```http
Accept: application/vnd.example.v2+json
```

### Versioning Comparison

| Strategy | Example |
|---|---|
| URI | `/api/v1/users` |
| Query | `/api/users?version=1` |
| Header | `API-Version: 1` |
| Media Type | `application/vnd.example.v1+json` |

### Recommended Approach

For most beginner and intermediate projects, URI versioning is simple and practical:

```text
/api/v1/users
/api/v1/products
/api/v1/orders
```

---

# 13. Pagination

Pagination divides large datasets into smaller portions.

Suppose your database contains 10,000 users.

Returning all users in one response is inefficient.

Instead, return a limited number of records per request.

### Without Pagination

```http
GET /api/users
```

Response may contain 10,000 users.

Problems:

- Large response size.
- More database work.
- Increased network transfer.
- More memory usage.
- Slower frontend rendering.

### With Pagination

```http
GET /api/users?page=1&limit=10
```

This requests the first 10 users.

### Important Parameters

| Parameter | Meaning |
|---|---|
| `page` | Requested page number |
| `limit` | Number of records per page |
| `offset` | Number of records to skip |

### Pagination Formula

```text
offset = (page - 1) * limit
```

Example:

```text
page = 3
limit = 10

offset = (3 - 1) * 10

offset = 20
```

The database skips 20 records and returns the next 10.

### Express Example

```javascript
app.get("/users", (req, res) => {

    const page = Math.max(
        1,
        Number.parseInt(req.query.page, 10) || 1
    );

    const limit = Math.min(
        100,
        Math.max(
            1,
            Number.parseInt(req.query.limit, 10) || 10
        )
    );

    const offset = (page - 1) * limit;

    const users = [
        { id: 1, name: "John" },
        { id: 2, name: "David" },
        { id: 3, name: "Alex" },
        { id: 4, name: "Robert" },
        { id: 5, name: "Michael" }
    ];

    const paginatedUsers = users.slice(
        offset,
        offset + limit
    );

    res.json({
        success: true,
        data: paginatedUsers,
        pagination: {
            page,
            limit,
            totalRecords: users.length,
            totalPages: Math.ceil(users.length / limit)
        }
    });

});
```

### Example Request

```http
GET /users?page=2&limit=2
```

Response:

```json
{
    "success": true,
    "data": [
        {
            "id": 3,
            "name": "Alex"
        },
        {
            "id": 4,
            "name": "Robert"
        }
    ],
    "pagination": {
        "page": 2,
        "limit": 2,
        "totalRecords": 5,
        "totalPages": 3
    }
}
```

### Offset-Based vs Cursor-Based Pagination

**Offset-based:**

```http
GET /users?page=2&limit=10
```

Uses a page number or offset.

Advantages:
- Easy to implement.
- Easy to navigate to a specific page.

Disadvantages:
- Large offsets can become expensive.
- Records changing during pagination can cause duplicates or omissions.

**Cursor-based:**

```http
GET /users?limit=10&cursor=eyJpZCI6MTAwfQ
```

Uses a cursor to identify where the next page should begin.

Advantages:
- Often more efficient for large datasets.
- Better for frequently changing datasets.
- Useful for infinite scrolling.

Disadvantages:
- More complex to implement.
- Direct navigation to arbitrary page numbers is less convenient.

---

# 14. Filtering

Filtering allows clients to retrieve records matching specific conditions.

### Example

Suppose you have products:

```json
[
    {
        "id": 1,
        "name": "Laptop",
        "category": "electronics",
        "price": 75000
    },
    {
        "id": 2,
        "name": "Mobile",
        "category": "electronics",
        "price": 25000
    },
    {
        "id": 3,
        "name": "Chair",
        "category": "furniture",
        "price": 5000
    }
]
```

You want only electronics products.

Request:

```http
GET /api/products?category=electronics
```

### Express Example

```javascript
const products = [
    {
        id: 1,
        name: "Laptop",
        category: "electronics",
        price: 75000
    },
    {
        id: 2,
        name: "Mobile",
        category: "electronics",
        price: 25000
    },
    {
        id: 3,
        name: "Chair",
        category: "furniture",
        price: 5000
    }
];

app.get("/products", (req, res) => {

    const { category } = req.query;

    let result = [...products];

    if (category) {
        result = result.filter(
            product => product.category === category
        );
    }

    res.json({
        success: true,
        data: result
    });

});
```

### Multiple Filters

Request:

```http
GET /api/products?category=electronics&minPrice=20000&maxPrice=80000
```

Example:

```javascript
app.get("/products", (req, res) => {

    const {
        category,
        minPrice,
        maxPrice
    } = req.query;

    let result = [...products];

    if (category) {
        result = result.filter(
            p => p.category === category
        );
    }

    if (minPrice !== undefined) {
        result = result.filter(
            p => p.price >= Number(minPrice)
        );
    }

    if (maxPrice !== undefined) {
        result = result.filter(
            p => p.price <= Number(maxPrice)
        );
    }

    res.json({
        success: true,
        data: result
    });

});
```

**Important:** Validate numeric query parameters. `Number()` can produce `NaN`, and unvalidated values may result in incorrect filtering.

---

# 15. Sorting

Sorting allows clients to control the order of returned records.

Example:

```http
GET /api/products?sort=price
```

You can support ascending and descending order.

Common convention:

```http
GET /api/products?sort=price&order=asc
```

Descending:

```http
GET /api/products?sort=price&order=desc
```

### Express Example

```javascript
app.get("/products", (req, res) => {

    const {
        sort = "id",
        order = "asc"
    } = req.query;

    const allowedFields = [
        "id",
        "name",
        "price"
    ];

    if (!allowedFields.includes(sort)) {
        return res.status(400).json({
            success: false,
            message: "Invalid sort field"
        });
    }

    if (!["asc", "desc"].includes(order)) {
        return res.status(400).json({
            success: false,
            message: "Invalid sort order"
        });
    }

    const result = [...products].sort((a, b) => {

        const comparison =
            typeof a[sort] === "string"
                ? a[sort].localeCompare(b[sort])
                : a[sort] - b[sort];

        return order === "asc"
            ? comparison
            : -comparison;

    });

    res.json({
        success: true,
        data: result
    });

});
```

### Why Validate Sort Fields?

Suppose you allow arbitrary database column names from user input.

This can create security and query-construction problems.

Always allow only explicitly supported sorting fields.

---

# 16. Searching

Searching allows clients to find records based on keywords.

Example:

```http
GET /api/users?search=john
```

This searches for users whose names or emails contain `john`.

### Express Example

```javascript
const users = [
    {
        id: 1,
        name: "John Smith",
        email: "john@example.com"
    },
    {
        id: 2,
        name: "David",
        email: "david@example.com"
    },
    {
        id: 3,
        name: "John Doe",
        email: "johndoe@example.com"
    }
];

app.get("/users", (req, res) => {

    const search = req.query.search?.trim().toLowerCase();

    let result = [...users];

    if (search) {
        result = result.filter(user =>
            user.name.toLowerCase().includes(search) ||
            user.email.toLowerCase().includes(search)
        );
    }

    res.json({
        success: true,
        data: result
    });

});
```

Request:

```http
GET /users?search=john
```

Response:

```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "name": "John Smith",
            "email": "john@example.com"
        },
        {
            "id": 3,
            "name": "John Doe",
            "email": "johndoe@example.com"
        }
    ]
}
```

### Search vs Filtering

| Searching | Filtering |
|---|---|
| Finds records matching a keyword or query | Restricts records using specific conditions |
| Often uses text matching | Often uses exact or range matching |
| Example: `?search=john` | Example: `?category=electronics` |

---

# 17. Controller-Service-Model Architecture

This is one of the most important backend architecture patterns.

As backend applications grow, putting everything inside route handlers or controllers becomes difficult.

A better approach is to separate responsibilities.

A common architecture uses:

1. Routes.
2. Controllers.
3. Services.
4. Models.
5. Database.

### Architecture Flow

```text
          CLIENT
             |
             v
           ROUTE
             |
             v
         CONTROLLER
             |
             v
          SERVICE
             |
             v
           MODEL
             |
             v
          DATABASE
```

Let's understand each layer.

## 17.1 Routes

Routes define API endpoints and connect them to controllers.

Example:

```javascript
router.get("/", userController.getUsers);

router.post("/", userController.createUser);
```

Routes should generally remain lightweight.

## 17.2 Controllers

Controllers handle HTTP-related responsibilities.

They generally:

- Read request parameters.
- Read request body.
- Call services.
- Set status codes.
- Send responses.

Example:

```javascript
exports.getUsers = async (req, res, next) => {
    try {

        const users = await userService.getAllUsers();

        res.status(200).json({
            success: true,
            data: users
        });

    } catch (error) {
        next(error);
    }
};
```

## 17.3 Services

Services contain business logic.

Examples:

- Registering users.
- Calculating order totals.
- Applying discounts.
- Processing payments.
- Checking business rules.

Example:

```javascript
exports.getAllUsers = async () => {
    return await User.findAll();
};
```

Here, `User.findAll()` is an illustrative ORM operation. The actual implementation depends on your database and ORM.

## 17.4 Models

Models represent application data and commonly define how the application interacts with database records.

For example, a Sequelize model may define:

- Table name.
- Columns.
- Data types.
- Validations.
- Relationships.

Example:

```javascript
const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const User = sequelize.define("User", {

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }

});

module.exports = User;
```

We will cover database models and integration in Phase 10.

### Why Separate These Layers?

| Layer | Responsibility |
|---|---|
| Route | Defines endpoints |
| Controller | Handles HTTP request and response |
| Service | Implements business logic |
| Model | Represents and accesses data |
| Database | Stores persistent data |

### Example of Poor Architecture

```javascript
app.post("/orders", async (req, res) => {

    const user = await User.findByPk(req.body.userId);

    const products = await Product.findAll();

    // Calculate order total

    // Check inventory

    // Apply discounts

    // Create order

    // Update stock

    // Send response

});
```

This mixes many responsibilities into one route handler.

### Better Architecture

```text
routes/
    orderRoutes.js

controllers/
    orderController.js

services/
    orderService.js

models/
    Order.js
    Product.js
    User.js
```

The controller calls the service, and the service handles business operations.

---

# 18. Separation of Concerns

Separation of Concerns (SoC) is a software design principle.

It means dividing an application into separate components, where each component has a clear responsibility.

### Example

Consider a user registration API.

Without separation of concerns:

```javascript
app.post("/register", async (req, res) => {

    // Validate input

    // Check whether email exists

    // Hash password

    // Create user

    // Send email

    // Generate token

    // Send response

});
```

This route contains too much logic.

With separation of concerns:

```text
Route
  |
  v
Controller
  |
  v
Validation Middleware
  |
  v
User Service
  |
  v
User Model
  |
  v
Database
```

Each layer performs a specific responsibility.

### Benefits

1. Better maintainability.
2. Better readability.
3. Easier testing.
4. Code reusability.
5. Easier debugging.
6. Better scalability.

---

# 19. Dependency Management

Dependency management means organizing and controlling the packages and modules an application depends on.

There are two important concepts:

1. Dependencies.
2. Dependency Injection.

## 19.1 Dependencies

A dependency is an external package or internal module required by another module.

Example:

```javascript
const express = require("express");
```

Here, Express is a dependency.

Another example:

```javascript
const userService = require("../services/userService");
```

Here, the controller depends on the user service.

## 19.2 Dependency Injection (DI)

Dependency Injection is a design pattern in which dependencies are provided to a component rather than created directly inside it.

### Without Dependency Injection

```javascript
const database = require("../config/db");

function getUsers() {
    return database.query("SELECT * FROM users");
}
```

The function directly imports and depends on the database module.

### With Dependency Injection

```javascript
function createUserService(database) {

    return {
        getUsers() {
            return database.query("SELECT * FROM users");
        }
    };

}

module.exports = createUserService;
```

Usage:

```javascript
const database = require("../config/db");

const createUserService = require("./userService");

const userService = createUserService(database);
```

### Why Use Dependency Injection?

- Easier unit testing.
- Easier replacement of dependencies.
- Reduced tight coupling.
- Better modularity.

### Important

Dependency Injection is a design pattern, not a mandatory Express feature.

For small applications, direct imports are often sufficient.

---

# 20. Environment-Based Configuration

Backend applications need different configurations for different environments.

Common environments:

1. Development.
2. Testing.
3. Production.

### Example

Development:

```text
PORT=3000
NODE_ENV=development
DATABASE_URL=mysql://localhost:3306/dev_db
```

Production:

```text
PORT=8080
NODE_ENV=production
DATABASE_URL=production_database_connection
```

Testing:

```text
PORT=4000
NODE_ENV=test
DATABASE_URL=test_database_connection
```

### Access Environment Variables

```javascript
console.log(process.env.NODE_ENV);

console.log(process.env.PORT);
```

### Using dotenv

Install:

```bash
npm install dotenv
```

Create `.env`:

```env
PORT=3000
NODE_ENV=development
```

At the top of your application entry point:

```javascript
require("dotenv").config();
```

Now:

```javascript
const PORT = process.env.PORT || 3000;
```

### Example server.js

```javascript
require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

### Important Security Rules

- Never commit `.env` files containing secrets.
- Add `.env` to `.gitignore`.
- Keep a `.env.example` file with placeholder values.
- Never expose database passwords in frontend code.
- Use environment variables for deployment configuration.

### Example .env.example

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=your_database_connection
JWT_SECRET=your_secret_key
```

---

# 21. API Documentation

API documentation describes how developers can use your API.

It generally includes:

- Endpoint URL.
- HTTP method.
- Required headers.
- Query parameters.
- Route parameters.
- Request body.
- Response structure.
- Status codes.
- Authentication requirements.

### Example API Documentation

#### Endpoint: Get All Users

```http
GET /api/v1/users
```

**Description:** Returns a list of users.

**Headers:**

```http
Authorization: Bearer <token>
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| page | Number | No | Page number |
| limit | Number | No | Records per page |
| search | String | No | Search users |

**Success Response:**

Status:

```http
200 OK
```

Body:

```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "name": "John"
        }
    ]
}
```

**Error Response:**

```json
{
    "success": false,
    "message": "Unauthorized"
}
```

### Common API Documentation Tools

- Swagger UI
- Postman
- Redoc

### OpenAPI Specification

OpenAPI is a standard specification for describing HTTP APIs.

It allows developers to document:

- Paths.
- HTTP methods.
- Parameters.
- Request bodies.
- Responses.
- Authentication schemes.
- Schemas.

An OpenAPI document can be written in YAML or JSON.

Example:

```yaml
openapi: 3.0.3

info:
  title: User API
  version: 1.0.0

paths:
  /users:
    get:
      summary: Get all users

      responses:
        "200":
          description: Successful response
```

---

# 22. Postman Collections

Postman is an API development and testing tool.

It allows developers to send HTTP requests and inspect responses.

You can test:

- GET requests.
- POST requests.
- PUT requests.
- PATCH requests.
- DELETE requests.
- Headers.
- Query parameters.
- Request bodies.
- Authentication.

### What is a Collection?

A Postman Collection is a group of saved API requests.

Example:

```text
User Management API
│
├── Users
│   ├── Get All Users
│   ├── Get User By ID
│   ├── Create User
│   ├── Update User
│   └── Delete User
│
└── Authentication
    ├── Register
    ├── Login
    └── Logout
```

### What are Environments?

Environments allow you to store reusable variables.

Example:

Development:

```text
baseUrl = http://localhost:3000
```

Production:

```text
baseUrl = https://api.example.com
```

Then your requests can use:

```text
{{baseUrl}}/api/v1/users
```

This makes switching between environments easier.

---

# 23. Building a Structured REST API

Now let's build a structured user API using Express.js.

This project will introduce:

- API versioning.
- Routes.
- Controllers.
- Services.
- Middleware.
- Pagination.
- Searching.
- Filtering.
- Sorting.
- Centralized error handling.

We will use in-memory data so that we can focus on backend architecture. Database integration comes in Phase 10.

## 23.1 Project Structure

```text
rest-api/
│
├── src/
│   │
│   ├── controllers/
│   │   └── userController.js
│   │
│   ├── services/
│   │   └── userService.js
│   │
│   ├── routes/
│   │   └── userRoutes.js
│   │
│   ├── middleware/
│   │   ├── logger.js
│   │   └── errorHandler.js
│   │
│   ├── data/
│   │   └── users.js
│   │
│   └── app.js
│
├── server.js
│
├── .env
├── .gitignore
└── package.json
```

## 23.2 Initialize Project

```bash
npm init -y
```

Install dependencies:

```bash
npm install express dotenv
```

## 23.3 Create Sample Data

File: `src/data/users.js`

```javascript
const users = [
    {
        id: 1,
        name: "John",
        email: "john@example.com",
        age: 25,
        status: "active"
    },
    {
        id: 2,
        name: "David",
        email: "david@example.com",
        age: 30,
        status: "active"
    },
    {
        id: 3,
        name: "Alex",
        email: "alex@example.com",
        age: 22,
        status: "inactive"
    },
    {
        id: 4,
        name: "Robert",
        email: "robert@example.com",
        age: 28,
        status: "active"
    }
];

module.exports = users;
```

## 23.4 Create Service

File: `src/services/userService.js`

```javascript
const users = require("../data/users");

exports.getAllUsers = (query) => {

    let result = [...users];

    const {
        search,
        status,
        sort = "id",
        order = "asc"
    } = query;

    // SEARCH
    if (search) {

        const keyword = search.toLowerCase();

        result = result.filter(user =>
            user.name.toLowerCase().includes(keyword) ||
            user.email.toLowerCase().includes(keyword)
        );

    }

    // FILTER
    if (status) {

        result = result.filter(
            user => user.status === status
        );

    }

    // SORT
    const allowedFields = [
        "id",
        "name",
        "age"
    ];

    if (!allowedFields.includes(sort)) {
        throw new Error("Invalid sort field");
    }

    if (!["asc", "desc"].includes(order)) {
        throw new Error("Invalid sort order");
    }

    result.sort((a, b) => {

        const comparison =
            typeof a[sort] === "string"
                ? a[sort].localeCompare(b[sort])
                : a[sort] - b[sort];

        return order === "asc"
            ? comparison
            : -comparison;

    });

    // PAGINATION
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

    const totalRecords = result.length;

    const paginatedUsers = result.slice(
        offset,
        offset + limit
    );

    return {
        users: paginatedUsers,

        pagination: {
            page,
            limit,
            totalRecords,
            totalPages: Math.ceil(totalRecords / limit)
        }
    };

};

exports.getUserById = (id) => {

    return users.find(user => user.id === id);

};

exports.createUser = (data) => {

    const newUser = {
        id: users.length
            ? Math.max(...users.map(user => user.id)) + 1
            : 1,

        name: data.name,

        email: data.email,

        age: data.age,

        status: data.status || "active"
    };

    users.push(newUser);

    return newUser;

};

exports.updateUser = (id, data) => {

    const user = users.find(user => user.id === id);

    if (!user) {
        return null;
    }

    Object.assign(user, data);

    return user;

};

exports.deleteUser = (id) => {

    const index = users.findIndex(
        user => user.id === id
    );

    if (index === -1) {
        return null;
    }

    return users.splice(index, 1)[0];

};
```

**Important:** This is a learning implementation. A production service should also validate pagination and filter values, enforce unique email addresses, and use database queries rather than loading every record into memory.

## 23.5 Create Controller

File: `src/controllers/userController.js`

```javascript
const userService = require("../services/userService");

// GET ALL USERS
exports.getUsers = (req, res, next) => {

    try {

        const result = userService.getAllUsers(req.query);

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
exports.getUserById = (req, res, next) => {

    try {

        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID"
            });
        }

        const user = userService.getUserById(id);

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
exports.createUser = (req, res, next) => {

    try {

        const { name, email, age } = req.body;

        if (!name || !email || age === undefined) {
            return res.status(400).json({
                success: false,
                message: "Name, email and age are required"
            });
        }

        const user = userService.createUser({
            name,
            email,
            age
        });

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
exports.updateUser = (req, res, next) => {

    try {

        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID"
            });
        }

        const user = userService.updateUser(id, req.body);

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
exports.deleteUser = (req, res, next) => {

    try {

        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID"
            });
        }

        const user = userService.deleteUser(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: user
        });

    } catch (error) {
        next(error);
    }

};
```

## 23.6 Create Routes

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

**Note:** For a real API, PUT and PATCH should have clearly defined replacement and partial-update semantics. They should not automatically share the same update behavior unless that behavior is deliberately designed and documented.

## 23.7 Create Logger Middleware

File: `src/middleware/logger.js`

```javascript
function logger(req, res, next) {

    console.log(
        `${new Date().toISOString()} ${req.method} ${req.originalUrl}`
    );

    next();

}

module.exports = logger;
```

## 23.8 Create Error Middleware

File: `src/middleware/errorHandler.js`

```javascript
function errorHandler(err, req, res, next) {

    console.error(err);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: statusCode === 500
            ? "Internal Server Error"
            : err.message
    });

}

module.exports = errorHandler;
```

## 23.9 Create app.js

File: `src/app.js`

```javascript
const express = require("express");

const userRoutes = require("./routes/userRoutes");

const logger = require("./middleware/logger");

const errorHandler = require("./middleware/errorHandler");

const app = express();

// Built-in middleware
app.use(express.json());

// Custom middleware
app.use(logger);

// Health check
app.get("/health", (req, res) => {

    res.status(200).json({
        success: true,
        message: "API is running"
    });

});

// Versioned API routes
app.use("/api/v1/users", userRoutes);

// 404 Handler
app.use((req, res) => {

    res.status(404).json({
        success: false,
        message: "Route not found"
    });

});

// Error Handler
app.use(errorHandler);

module.exports = app;
```

## 23.10 Create server.js

File: `server.js`

```javascript
require("dotenv").config();

const app = require("./src/app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});
```

## 23.11 Create .env

```env
PORT=3000
NODE_ENV=development
```

## 23.12 Create .gitignore

```text
node_modules
.env
```

## 23.13 Update package.json Scripts

```json
{
    "scripts": {
        "start": "node server.js",
        "dev": "node --watch server.js"
    }
}
```

Run:

```bash
npm run dev
```

---

# 24. Testing the Structured REST API

Now let's test all endpoints using Postman.

### 1. Health Check

```http
GET http://localhost:3000/health
```

Response:

```json
{
    "success": true,
    "message": "API is running"
}
```

### 2. Get All Users

```http
GET http://localhost:3000/api/v1/users
```

### 3. Get User By ID

```http
GET http://localhost:3000/api/v1/users/1
```

### 4. Create User

```http
POST http://localhost:3000/api/v1/users
```

Body:

```json
{
    "name": "Riyaz",
    "email": "riyaz@example.com",
    "age": 25
}
```

### 5. Update User

```http
PUT http://localhost:3000/api/v1/users/1
```

Body:

```json
{
    "name": "John Smith",
    "email": "johnsmith@example.com",
    "age": 30
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

### 8. Filter Users

```http
GET http://localhost:3000/api/v1/users?status=active
```

### 9. Sort Users

```http
GET http://localhost:3000/api/v1/users?sort=age&order=desc
```

### 10. Pagination

```http
GET http://localhost:3000/api/v1/users?page=1&limit=2
```

### 11. Combine Multiple Parameters

```http
GET http://localhost:3000/api/v1/users?search=john&status=active&sort=name&order=asc&page=1&limit=10
```

This demonstrates how a professional API can support multiple query options.

---

# 25. Important Backend Architecture Concepts Summary

| Concept | Meaning |
|---|---|
| API | Interface for communication between software systems |
| Web API | API exposed over web protocols |
| REST | Architectural style for network-based applications |
| RESTful API | API that follows REST constraints |
| Resource | Entity or information exposed through an API |
| Endpoint | URL and HTTP method combination used to access functionality |
| CRUD | Create, Read, Update, Delete |
| Statelessness | Each request contains the context needed to process it |
| Cacheability | Ability to cache responses |
| API Versioning | Managing different API versions |
| Pagination | Dividing results into smaller pages |
| Filtering | Restricting results using conditions |
| Sorting | Ordering results |
| Searching | Finding records using keywords |
| Controller | Handles HTTP requests and responses |
| Service | Contains business logic |
| Model | Represents application data and database interaction |
| Middleware | Processes requests during the request-response lifecycle |
| Separation of Concerns | Dividing responsibilities into separate components |
| Dependency Injection | Providing dependencies to components |
| OpenAPI | Specification for describing HTTP APIs |

---

# 26. Interview Questions and Answers

### Q1. What is an API?

An API is an interface that allows different software applications or components to communicate with each other.

### Q2. What is a Web API?

A Web API is an API exposed over web protocols, commonly HTTP or HTTPS.

### Q3. What is REST?

REST is an architectural style for designing network-based applications.

### Q4. Who introduced REST?

Roy Fielding introduced REST in his doctoral dissertation in 2000.

### Q5. What are REST constraints?

The six primary REST constraints are:

1. Client-Server.
2. Statelessness.
3. Cacheability.
4. Uniform Interface.
5. Layered System.
6. Code on Demand (optional).

### Q6. What is a RESTful API?

A RESTful API is an API that follows REST architectural constraints.

### Q7. What is a resource in REST?

A resource is an identifiable entity or piece of information exposed through an API.

### Q8. What is an endpoint?

An endpoint is an API access point, commonly identified by a URL and HTTP method.

### Q9. What is the difference between REST and RESTful?

REST is an architectural style, while RESTful describes an implementation that follows its constraints.

### Q10. Why do REST APIs use HTTP methods?

HTTP methods communicate the intended operation on a resource.

### Q11. What is the difference between PUT and PATCH?

PUT generally replaces a resource representation, while PATCH partially modifies a resource.

### Q12. What is idempotency?

An operation is idempotent if repeating it has the same intended effect as performing it once.

### Q13. Is POST idempotent?

POST is generally not idempotent, although an API can implement application-level idempotency using mechanisms such as idempotency keys.

### Q14. Why is HTTP stateless?

HTTP is designed so that each request can be processed independently without requiring the server to remember the previous request's client-specific state.

### Q15. What is API versioning?

API versioning allows developers to maintain multiple API versions while introducing changes without breaking existing clients.

### Q16. What are common API versioning strategies?

- URI versioning.
- Query parameter versioning.
- Header versioning.
- Media type versioning.

### Q17. What is pagination?

Pagination divides a large dataset into smaller portions and returns a limited number of records per request.

### Q18. What is offset-based pagination?

It uses an offset and limit to skip records and retrieve a particular portion of a dataset.

### Q19. What is cursor-based pagination?

It uses a cursor to identify where the next page should begin.

### Q20. What is the difference between filtering and searching?

Filtering restricts records using specific conditions, while searching finds records matching a keyword or search query.

### Q21. What is sorting?

Sorting organizes records in a particular order, such as ascending or descending.

### Q22. What is a controller?

A controller handles HTTP requests, invokes the necessary application logic, and sends responses.

### Q23. What is a service layer?

The service layer contains business logic and reusable application operations.

### Q24. What is a model?

A model represents application data and commonly defines how the application interacts with database records.

### Q25. What is Controller-Service-Model architecture?

It is an application architecture pattern that separates HTTP handling, business logic, and data access.

### Q26. What is Separation of Concerns?

It is a software design principle that divides an application into components with distinct responsibilities.

### Q27. What is Dependency Injection?

Dependency Injection is a design pattern in which dependencies are provided to a component rather than created directly inside it.

### Q28. Why should we use environment variables?

They allow applications to use different configuration values across development, testing, and production environments.

### Q29. What is OpenAPI?

OpenAPI is a specification for describing HTTP APIs in a machine-readable format.

### Q30. What is HATEOAS?

HATEOAS stands for Hypermedia as the Engine of Application State. It is a REST constraint in which API responses provide links that guide clients toward available actions and related resources.

---

# 27. Phase 09 Cheat Sheet

| Task | Example |
|---|---|
| Get collection | `GET /api/users` |
| Get resource | `GET /api/users/101` |
| Create resource | `POST /api/users` |
| Replace resource | `PUT /api/users/101` |
| Partial update | `PATCH /api/users/101` |
| Delete resource | `DELETE /api/users/101` |
| API versioning | `/api/v1/users` |
| Search | `/api/users?search=john` |
| Filter | `/api/users?status=active` |
| Sort | `/api/users?sort=name&order=asc` |
| Pagination | `/api/users?page=1&limit=10` |
| Nested resource | `/api/users/101/orders` |
| Controller | Handles HTTP request/response |
| Service | Contains business logic |
| Model | Represents data and database access |
| API documentation | OpenAPI / Swagger |
| Error handling | Centralized error middleware |

---

# 28. Phase 09 Completion Checklist

Before moving to Phase 10, make sure you can:

- [ ] Explain what an API is.
- [ ] Explain what REST is.
- [ ] Understand REST architectural constraints.
- [ ] Understand REST vs RESTful API.
- [ ] Understand resources and endpoints.
- [ ] Design resource-based URLs.
- [ ] Follow REST API naming conventions.
- [ ] Map CRUD operations to HTTP methods.
- [ ] Understand HTTP method semantics.
- [ ] Select appropriate HTTP status codes.
- [ ] Design consistent API responses.
- [ ] Understand API versioning.
- [ ] Implement pagination.
- [ ] Implement filtering.
- [ ] Implement sorting.
- [ ] Implement searching.
- [ ] Understand Controller-Service-Model architecture.
- [ ] Understand Separation of Concerns.
- [ ] Understand Dependency Injection.
- [ ] Configure environment variables.
- [ ] Understand OpenAPI documentation.
- [ ] Create Postman collections.
- [ ] Build a structured REST API.

## Practical Tasks to Complete

1. Design a REST API for a user management system.
2. Design a REST API for an e-commerce application.
3. Implement API versioning using `/api/v1`.
4. Implement pagination.
5. Implement search functionality.
6. Implement filtering using multiple query parameters.
7. Implement sorting with field validation.
8. Separate routes, controllers, and services.
9. Implement centralized error handling.
10. Document all API endpoints.
11. Create a Postman collection.
12. Build a complete product management REST API.

---

# What Comes Next?

## PHASE 10: Database Integration

In Phase 10, we will learn how to connect Node.js applications with databases and perform database operations.

Topics will include:

1. What is a Database?
2. SQL vs NoSQL.
3. Relational Databases.
4. Non-Relational Databases.
5. MySQL Integration with Node.js.
6. MongoDB Integration with Node.js.
7. Database Drivers.
8. Connection Management.
9. Connection Pooling.
10. CRUD Operations with MySQL.
11. CRUD Operations with MongoDB.
12. SQL Queries.
13. MongoDB Queries.
14. What is ORM?
15. What is ODM?
16. Sequelize ORM.
17. Mongoose ODM.
18. Database Models.
19. Relationships.
20. One-to-One Relationships.
21. One-to-Many Relationships.
22. Many-to-Many Relationships.
23. Database Transactions.
24. Database Indexing.
25. Database Connection Error Handling.
26. Building a Database-Driven REST API.

**Recommended focus before Phase 10:** Make sure you understand the flow:

```text
Client
  |
  v
Route
  |
  v
Middleware
  |
  v
Controller
  |
  v
Service
  |
  v
Model
  |
  v
Database
```

This architecture will become especially important when we start integrating MySQL, MongoDB, Sequelize, and Mongoose.