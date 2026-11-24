# PHASE 15: PRODUCTION-LEVEL BACKEND DEVELOPMENT

**Level:** Advanced / Professional  
**Goal:** Learn how to design, develop, secure, scale, and maintain production-ready Node.js backend applications using professional software architecture and engineering practices.

You have now covered the fundamentals of Node.js, asynchronous programming, Express, REST APIs, databases, authentication, security, testing, performance, and deployment.

In this final phase, we will combine those concepts into a complete backend engineering workflow.

The focus is not simply on writing APIs. It is on understanding **how to architect a backend application that can be maintained, tested, secured, and scaled as the project grows.**

---

# COURSE CONTENT

## Topics Covered

### Architecture & Design
1. Production Backend Architecture
2. Monolithic Architecture
3. Layered Architecture
4. Controller-Service-Repository Pattern
5. SOLID Principles
6. Design Patterns
7. Dependency Injection
8. Clean Architecture
9. Domain-Driven Design Fundamentals

### Database Architecture
10. Database Architecture
11. Database Transactions
12. Database Indexing
13. Database Query Optimization
14. Database Connection Pooling
15. Database Migration Strategies
16. Database Replication and Sharding

### Authentication & Authorization
17. Advanced Authentication
18. Role-Based Access Control (RBAC)
19. Permission-Based Authorization
20. Multi-Tenant Architecture
21. API Keys and Service Authentication

### API Engineering
22. API Versioning
23. API Documentation with Swagger/OpenAPI
24. API Pagination and Filtering
25. API Rate Limiting
26. Idempotency
27. API Compatibility and Deprecation

### Background Processing
28. Background Jobs
29. Message Queues
30. Redis Advanced Concepts
31. Scheduled Jobs and Cron
32. Event-Driven Architecture

### Advanced Backend Architecture
33. Distributed Systems Fundamentals
34. Microservices Architecture
35. Monolithic vs Microservices
36. Inter-Service Communication
37. API Gateway
38. Service Discovery
39. Distributed Transactions
40. Eventual Consistency
41. Saga Pattern

### Real-Time Systems
42. WebSocket Architecture
43. Socket.IO
44. Real-Time Notifications
45. Scaling WebSocket Applications

### Production Engineering
46. Centralized Logging
47. Monitoring and Observability
48. Distributed Tracing
49. Production Security
50. Scalability and High Availability
51. Disaster Recovery
52. Complete Production-Level Backend Project

---

# PART 1: PRODUCTION BACKEND ARCHITECTURE

## 1. What Is Production-Level Backend Development?

Production-level backend development means building backend applications that can reliably handle real-world users, data, traffic, failures, and changing business requirements.

A beginner backend might look like:

```text
project/
│
├── server.js
├── routes.js
├── controller.js
└── database.js
```

This structure might work for a small application.

However, imagine the application grows and contains:

- 100 API endpoints.
- 50 database tables.
- Multiple user roles.
- Payment integration.
- Email notifications.
- File uploads.
- Background jobs.
- Multiple developers.

Managing everything in a few files becomes difficult.

A production backend needs proper separation of responsibilities.

### Important Characteristics

| Characteristic | Description |
|---|---|
| Maintainability | Easy to modify and maintain |
| Scalability | Can handle increasing workloads |
| Reliability | Continues working correctly |
| Security | Protects application and user data |
| Testability | Supports automated testing |
| Extensibility | New features can be added easily |
| Observability | Problems can be identified and investigated |
| Performance | Uses resources efficiently |

---

## 2. Understanding Backend Architecture

Backend architecture describes how different parts of an application are organized and communicate with each other.

Consider an e-commerce backend.

Its responsibilities include:

- User management.
- Authentication.
- Product management.
- Cart management.
- Orders.
- Payments.
- Inventory.
- Notifications.

A possible architecture:

```text
                  CLIENT
                    |
                    v
                API SERVER
                    |
          +---------+---------+
          |         |         |
          v         v         v
        AUTH     PRODUCT    ORDER
        MODULE   MODULE     MODULE
          |         |         |
          +---------+---------+
                    |
                    v
                DATABASE
                    |
          +---------+---------+
          |                   |
          v                   v
        REDIS              STORAGE
        CACHE              SERVICE
```

Each module handles a specific business responsibility.

This is easier to maintain than placing all business logic inside one controller.

---

# PART 2: MONOLITHIC ARCHITECTURE

## 3. What Is a Monolithic Application?

A monolithic application is an application where multiple business functionalities are developed and deployed as a single application.

For example:

```text
             E-COMMERCE APPLICATION
                       |
        +--------------+--------------+
        |              |              |
        v              v              v
      USERS          PRODUCTS        ORDERS
        |              |              |
        +--------------+--------------+
                       |
                       v
                    DATABASE
```

All modules run within one application deployment.

### Example Project Structure

```text
ecommerce/
│
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── products/
│   │   ├── cart/
│   │   ├── orders/
│   │   └── payments/
│   │
│   ├── config/
│   ├── middleware/
│   ├── database/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
└── package.json
```

### Advantages

1. Easy to develop initially.
2. Simple deployment.
3. Easier debugging.
4. Straightforward function calls between modules.
5. Usually simpler local development.
6. Transactions across modules can be easier when they share a database.

### Disadvantages

1. Application can become difficult to maintain if poorly structured.
2. Entire application is often deployed together.
3. A problem in one area can affect the whole process.
4. Independent scaling of individual modules is limited.
5. Large codebases can become difficult for teams to manage.

### Important

A monolithic application is not necessarily poorly designed.

A well-structured modular monolith can be an excellent architecture for many production systems.

---

# PART 3: LAYERED ARCHITECTURE

## 4. What Is Layered Architecture?

Layered architecture divides an application into different layers, where each layer has a specific responsibility.

A common Node.js backend uses:

1. Route Layer.
2. Controller Layer.
3. Service Layer.
4. Repository Layer.
5. Database Layer.

### Architecture Diagram

```text
              CLIENT REQUEST
                    |
                    v
               ROUTE LAYER
                    |
                    v
             CONTROLLER LAYER
                    |
                    v
               SERVICE LAYER
                    |
                    v
             REPOSITORY LAYER
                    |
                    v
               DATABASE
```

Let's understand each layer.

### 4.1 Route Layer

Responsible for defining API endpoints and attaching middleware.

Example:

```javascript
router.post(
    "/users",
    validateUser,
    userController.createUser
);
```

The route decides which controller should handle the request.

### 4.2 Controller Layer

Responsible for handling HTTP requests and responses.

Example:

```javascript
exports.createUser = async (req, res, next) => {

    try {

        const user = await userService.createUser(req.body);

        res.status(201).json({

            success: true,

            data: user

        });

    } catch (error) {

        next(error);

    }

};
```

The controller should not contain complex business logic or direct database queries.

### 4.3 Service Layer

Contains business logic.

Example:

```javascript
exports.createUser = async (userData) => {

    const existingUser = await userRepository.findByEmail(
        userData.email
    );

    if (existingUser) {

        throw new Error("Email already exists");

    }

    return await userRepository.create(userData);

};
```

The service decides how the business operation should work.

### 4.4 Repository Layer

Responsible for database operations.

Example:

```javascript
const { User } = require("../models");

exports.findByEmail = async (email) => {

    return await User.findOne({

        where: {
            email
        }

    });

};

exports.create = async (userData) => {

    return await User.create(userData);

};
```

The repository hides database implementation details from the service.

### 4.5 Database Layer

Contains database configuration, connections, models, and migrations.

Example:

```javascript
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql"
    }
);

module.exports = sequelize;
```

### Why Use Layers?

Suppose you want to change from MySQL to PostgreSQL.

If database queries are scattered throughout controllers and services, changing the database becomes difficult.

With a repository layer, you can isolate many database-specific changes inside the repository and database infrastructure.

However, changing databases still requires reviewing data types, SQL behavior, migrations, transactions, and other database-specific details.

---

# PART 4: CONTROLLER-SERVICE-REPOSITORY PATTERN

## 5. Understanding the Pattern

This is one of the most important patterns in professional backend development.

It separates three major responsibilities:

| Component | Responsibility |
|---|---|
| Controller | HTTP request and response |
| Service | Business logic |
| Repository | Database operations |

### Example: Get User by ID

**Route:**

```javascript
router.get("/:id", userController.getUserById);
```

**Controller:**

```javascript
exports.getUserById = async (req, res, next) => {

    try {

        const user = await userService.getUserById(
            req.params.id
        );

        res.status(200).json({

            success: true,

            data: user

        });

    } catch (error) {

        next(error);

    }

};
```

**Service:**

```javascript
exports.getUserById = async (id) => {

    const user = await userRepository.findById(id);

    if (!user) {

        throw new Error("User not found");

    }

    return user;

};
```

**Repository:**

```javascript
exports.findById = async (id) => {

    return await User.findByPk(id);

};
```

### Request Flow

```text
GET /api/users/10
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
    REPOSITORY
        |
        v
     DATABASE
        |
        v
    REPOSITORY
        |
        v
     SERVICE
        |
        v
    CONTROLLER
        |
        v
     RESPONSE
```

### Important Rules

**Controller:**
- Read request parameters.
- Call service methods.
- Return HTTP responses.
- Pass errors to error middleware.

**Service:**
- Apply business rules.
- Coordinate repositories.
- Manage business transactions when needed.
- Avoid depending directly on Express request and response objects.

**Repository:**
- Perform database operations.
- Encapsulate query logic.
- Avoid HTTP response handling.

These are architectural conventions rather than strict language rules.

---

# PART 5: SOLID PRINCIPLES

## 6. What Are SOLID Principles?

SOLID is a collection of five object-oriented design principles.

They help developers create maintainable and extensible software.

SOLID stands for:

| Letter | Principle |
|---|---|
| S | Single Responsibility Principle |
| O | Open/Closed Principle |
| L | Liskov Substitution Principle |
| I | Interface Segregation Principle |
| D | Dependency Inversion Principle |

Let's understand each.

## 6.1 Single Responsibility Principle (SRP)

A class or module should have one primary responsibility.

Bad example:

```javascript
class User {

    createUser() {

        // Create user in database

    }

    sendEmail() {

        // Send email

    }

    generatePDF() {

        // Generate PDF

    }

}
```

This class handles multiple unrelated responsibilities.

Better:

```javascript
class UserService {

    createUser() {

        // User creation logic

    }

}

class EmailService {

    sendEmail() {

        // Email logic

    }

}

class PDFService {

    generatePDF() {

        // PDF generation logic

    }

}
```

Now each class has a focused responsibility.

## 6.2 Open/Closed Principle (OCP)

Software components should be open for extension but closed for modification.

Meaning:

You should be able to add new behavior without repeatedly changing existing stable code.

Example:

Suppose your application supports different payment methods.

A simple implementation:

```javascript
function processPayment(type, amount) {

    if (type === "card") {

        // Card payment

    } else if (type === "upi") {

        // UPI payment

    } else if (type === "wallet") {

        // Wallet payment

    }

}
```

As payment methods increase, this function becomes difficult to maintain.

A more extensible approach:

```javascript
class CardPayment {

    pay(amount) {

        console.log("Card payment:", amount);

    }

}

class UpiPayment {

    pay(amount) {

        console.log("UPI payment:", amount);

    }

}

class WalletPayment {

    pay(amount) {

        console.log("Wallet payment:", amount);

    }

}
```

You can add another payment implementation without modifying existing ones.

## 6.3 Liskov Substitution Principle (LSP)

Objects of a subtype should be usable wherever the parent type is expected without breaking the expected behavior.

Example:

If a function expects a payment processor, every supported payment processor should fulfill the expected payment contract.

A subtype should not unexpectedly violate the behavior promised by its parent abstraction.

## 6.4 Interface Segregation Principle (ISP)

Clients should not be forced to depend on methods they do not need.

JavaScript does not have traditional interfaces in the same way as TypeScript, but the principle still applies.

Bad design:

```javascript
class Machine {

    print() {}

    scan() {}

    fax() {}

}
```

A simple printer may not support scanning or faxing.

Better:

```javascript
class Printer {

    print() {}

}

class Scanner {

    scan() {}

}

class FaxMachine {

    fax() {}

}
```

Each component depends only on the functionality it needs.

## 6.5 Dependency Inversion Principle (DIP)

High-level business logic should depend on abstractions rather than concrete implementation details.

Example:

A payment service should not be tightly coupled to one specific payment provider.

Instead, it should depend on a payment interface or agreed contract.

```javascript
class PaymentService {

    constructor(paymentProvider) {

        this.paymentProvider = paymentProvider;

    }

    async process(amount) {

        return await this.paymentProvider.pay(amount);

    }

}
```

Usage:

```javascript
const paymentProvider = {

    async pay(amount) {

        return {

            success: true,

            amount

        };

    }

};

const paymentService = new PaymentService(paymentProvider);

paymentService.process(500);
```

You can replace the payment provider without rewriting the business service.

### SOLID Summary

| Principle | Main Idea |
|---|---|
| SRP | One primary responsibility |
| OCP | Extend behavior without modifying stable code |
| LSP | Subtypes should preserve expected behavior |
| ISP | Small, focused interfaces |
| DIP | Depend on abstractions, not concrete implementations |

---

# PART 6: DESIGN PATTERNS

## 7. What Are Design Patterns?

Design patterns are reusable solutions to commonly occurring software design problems.

They are not ready-made code that must always be copied.

They are approaches that help organize software.

Important patterns used in Node.js:

1. Singleton.
2. Factory.
3. Strategy.
4. Observer.
5. Adapter.
6. Repository.
7. Dependency Injection.

### 7.1 Singleton Pattern

Ensures that a particular module or object has one shared instance within a given application context.

Example: Database connection.

```javascript
class Database {

    constructor() {

        if (Database.instance) {

            return Database.instance;

        }

        this.connected = false;

        Database.instance = this;

    }

    connect() {

        this.connected = true;

        console.log("Database connected");

    }

}

module.exports = new Database();
```

Usage:

```javascript
const db = require("./database");

db.connect();
```

Node.js caches CommonJS modules, so requiring the same module by the same resolved filename generally returns the cached export.

A singleton is useful for shared infrastructure, but it should not become a global container for unrelated business state.

### 7.2 Factory Pattern

Creates objects without requiring calling code to know all the construction details.

Example:

```javascript
class CardPayment {

    pay() {

        return "Card payment";

    }

}

class UpiPayment {

    pay() {

        return "UPI payment";

    }

}

function createPayment(type) {

    if (type === "card") {

        return new CardPayment();

    }

    if (type === "upi") {

        return new UpiPayment();

    }

    throw new Error("Unsupported payment type");

}
```

Usage:

```javascript
const payment = createPayment("card");

console.log(payment.pay());
```

### 7.3 Strategy Pattern

Allows interchangeable algorithms or behaviors.

Example:

```javascript
const strategies = {

    percentageDiscount(amount) {

        return amount * 0.10;

    },

    fixedDiscount() {

        return 100;

    }

};

function calculateDiscount(amount, strategy) {

    return strategies[strategy](amount);

}
```

Usage:

```javascript
console.log(
    calculateDiscount(1000, "percentageDiscount")
);
```

### 7.4 Observer Pattern

Allows one object to notify multiple subscribers when an event occurs.

Node.js provides the `EventEmitter` class for event-based communication.

Example:

```javascript
const EventEmitter = require("node:events");

const eventBus = new EventEmitter();

eventBus.on("userRegistered", (user) => {

    console.log("Send welcome email:", user.email);

});

eventBus.on("userRegistered", (user) => {

    console.log("Create user analytics:", user.id);

});

eventBus.emit("userRegistered", {

    id: 1,

    email: "john@example.com"

});
```

### 7.5 Adapter Pattern

Allows incompatible interfaces to work together.

Example:

Your application expects:

```javascript
paymentProvider.pay(amount);
```

But an external payment SDK exposes:

```javascript
externalProvider.createTransaction({
    amount
});
```

An adapter translates between them.

```javascript
class PaymentAdapter {

    constructor(externalProvider) {

        this.externalProvider = externalProvider;

    }

    async pay(amount) {

        return await this.externalProvider.createTransaction({

            amount

        });

    }

}
```

### Why Design Patterns Matter

They help with:

- Reusability.
- Maintainability.
- Extensibility.
- Separation of concerns.
- Testability.

However, do not introduce design patterns unnecessarily. Simple code is often better than unnecessary abstraction.

---

# PART 7: DEPENDENCY INJECTION

## 8. What Is Dependency Injection?

Dependency Injection (DI) is a technique in which a component receives the dependencies it needs from outside rather than creating them internally.

### Without Dependency Injection

```javascript
class UserService {

    constructor() {

        this.emailService = new EmailService();

    }

}
```

Problem:

`UserService` is tightly coupled to `EmailService`.

Changing or testing the email implementation becomes harder.

### With Dependency Injection

```javascript
class UserService {

    constructor(emailService) {

        this.emailService = emailService;

    }

    async register(user) {

        await this.emailService.sendEmail(user.email);

    }

}
```

Usage:

```javascript
const emailService = new EmailService();

const userService = new UserService(emailService);
```

Now the dependency is provided from outside.

### Benefits

1. Easier unit testing.
2. Lower coupling.
3. Better flexibility.
4. Easier replacement of implementations.
5. Better separation of responsibilities.

### Dependency Injection vs Dependency Inversion

These are related but different concepts.

| Dependency Injection | Dependency Inversion |
|---|---|
| A technique | A design principle |
| Supplies dependencies externally | Defines how modules should depend on abstractions |
| Example: Constructor injection | Example: Service depends on payment contract |

---

# PART 8: CLEAN ARCHITECTURE

## 9. What Is Clean Architecture?

Clean Architecture is an architectural approach that separates business rules from external technologies.

The main idea:

**Business logic should not depend directly on frameworks, databases, or external services.**

### Architecture Diagram

```text
           FRAMEWORKS & DRIVERS
        +--------------------------+
        | Express | MySQL | Redis  |
        +--------------------------+
                    |
                    v
            INTERFACE ADAPTERS
        +--------------------------+
        | Controllers | Repositories|
        +--------------------------+
                    |
                    v
             APPLICATION LAYER
        +--------------------------+
        | Use Cases | Services     |
        +--------------------------+
                    |
                    v
                DOMAIN
        +--------------------------+
        | Entities | Business Rules|
        +--------------------------+
```

### 9.1 Domain Layer

Contains core business concepts and rules.

Example:

```javascript
class Order {

    constructor(items) {

        this.items = items;

    }

    calculateTotal() {

        return this.items.reduce((total, item) => {

            return total + item.price * item.quantity;

        }, 0);

    }

}
```

This business logic does not depend on Express or MySQL.

### 9.2 Application Layer

Contains use cases that coordinate domain operations.

Example:

```javascript
class CreateOrderUseCase {

    constructor(orderRepository) {

        this.orderRepository = orderRepository;

    }

    async execute(orderData) {

        const order = new Order(orderData.items);

        const total = order.calculateTotal();

        return await this.orderRepository.create({

            items: orderData.items,

            total

        });

    }

}
```

### 9.3 Interface Adapters

Convert external data into the format required by application logic.

Examples:

- Controllers.
- Presenters.
- Repository implementations.
- Request mappers.

### 9.4 Frameworks and Drivers

External infrastructure.

Examples:

- Express.
- MySQL.
- MongoDB.
- Redis.
- AWS.
- External payment APIs.

### Dependency Rule

Dependencies should point inward.

```text
Frameworks → Adapters → Application → Domain
```

The domain should not import Express or Sequelize.

### Why Is Clean Architecture Useful?

It makes the application:

- Easier to test.
- Less dependent on frameworks.
- Easier to refactor.
- Easier to maintain.
- More flexible when infrastructure changes.

**Important:** Clean Architecture can introduce additional files and abstractions. Use it when the complexity of the application justifies it.

---

# PART 9: DOMAIN-DRIVEN DESIGN FUNDAMENTALS

## 10. What Is Domain-Driven Design?

Domain-Driven Design (DDD) is an approach to designing software around the business domain and its rules.

Suppose you are building an e-commerce application.

Its domain includes:

- Customers.
- Products.
- Inventory.
- Orders.
- Payments.
- Shipping.

DDD encourages developers to understand these business concepts before designing the software.

### Important DDD Terms

**1. Entity**

An object with a unique identity.

Example:

```text
User ID: 101
```

Even if the user's name changes, the identity remains the same.

**2. Value Object**

An object defined by its values rather than identity.

Example:

```javascript
const address = {

    city: "Ahmedabad",

    state: "Gujarat",

    country: "India"

};
```

Two addresses with identical values may be considered equivalent in the domain.

**3. Aggregate**

A group of related domain objects treated as a consistency boundary.

Example:

An order aggregate might contain:

- Order.
- Order items.
- Shipping details.

**4. Aggregate Root**

The main entity through which an aggregate is modified.

For example, an `Order` may be the aggregate root. Changes to its items should be performed through the order's business operations.

**5. Repository**

An abstraction that provides access to aggregates or domain objects.

**6. Bounded Context**

A boundary within which a particular domain model and its terminology have a defined meaning.

For example:

```text
E-COMMERCE SYSTEM

+------------------+
| CUSTOMER CONTEXT |
+------------------+

+------------------+
| ORDER CONTEXT    |
+------------------+

+------------------+
| PAYMENT CONTEXT  |
+------------------+

+------------------+
| INVENTORY CONTEXT|
+------------------+
```

The concept of a product or customer may have different responsibilities in different contexts.

---

# PART 10: DATABASE ARCHITECTURE

## 11. Understanding Production Database Design

A production application requires more than basic database CRUD operations.

You must understand:

- Data modeling.
- Relationships.
- Constraints.
- Transactions.
- Indexing.
- Query optimization.
- Connection pooling.
- Migrations.
- Backup and recovery.

### Example E-Commerce Database

```text
USERS
  |
  | 1:M
  |
ORDERS
  |
  | 1:M
  |
ORDER_ITEMS
  |
  | M:1
  |
PRODUCTS
```

Possible tables:

**users**

| id | name | email |
|---|---|---|
| 1 | John | john@example.com |

**products**

| id | name | price |
|---|---|---|
| 101 | Laptop | 50000 |

**orders**

| id | user_id | total |
|---|---|---|
| 1001 | 1 | 50000 |

**order_items**

| id | order_id | product_id | quantity |
|---|---|---|---|
| 1 | 1001 | 101 | 1 |

### Why Proper Database Design Matters

Poor database design can cause:

- Duplicate data.
- Inconsistent records.
- Slow queries.
- Difficult maintenance.
- Data integrity problems.

---

# PART 11: DATABASE TRANSACTIONS

## 12. What Is a Database Transaction?

A transaction is a group of database operations treated as one logical unit of work.

Suppose a user places an order.

The application needs to:

1. Create an order.
2. Create order items.
3. Reduce product inventory.
4. Record payment status.

What happens if the order is created but inventory reduction fails?

You may end up with inconsistent data.

Transactions help prevent this.

### ACID Properties

ACID stands for:

| Property | Meaning |
|---|---|
| Atomicity | All operations succeed or the transaction is rolled back |
| Consistency | Database constraints and rules remain satisfied |
| Isolation | Concurrent transactions are controlled according to the isolation level |
| Durability | Committed changes survive failures according to database guarantees |

### Example Using Sequelize

```javascript
const { sequelize, Order, OrderItem, Product } = require("../models");

async function createOrder(userId, items) {

    return await sequelize.transaction(async (transaction) => {

        const order = await Order.create({

            userId,

            status: "pending"

        }, {

            transaction

        });

        for (const item of items) {

            const product = await Product.findByPk(item.productId, {

                transaction,

                lock: transaction.LOCK.UPDATE

            });

            if (!product || product.stock < item.quantity) {

                throw new Error("Insufficient inventory");

            }

            await product.update({

                stock: product.stock - item.quantity

            }, {

                transaction

            });

            await OrderItem.create({

                orderId: order.id,

                productId: product.id,

                quantity: item.quantity,

                price: product.price

            }, {

                transaction

            });

        }

        return order;

    });

}
```

### What Happens?

If all operations succeed:

```text
COMMIT
```

If an error occurs:

```text
ROLLBACK
```

The transaction callback automatically commits when it completes successfully and rolls back when it throws.

### Important

Transactions should be kept reasonably short.

Avoid performing slow external API calls, such as payment-provider requests, while holding database locks.

Payment workflows often need a more advanced design using payment states, idempotency, and asynchronous confirmation.

---

# PART 12: DATABASE INDEXING

## 13. What Is Database Indexing?

An index is a database structure that helps locate records more efficiently.

Without an index, a database may need to scan many rows to find matching data.

Example:

```sql
SELECT *
FROM users
WHERE email = 'john@example.com';
```

If the table contains millions of records and there is no suitable index, the database may examine many rows.

### Create Index

```sql
CREATE INDEX idx_users_email
ON users(email);
```

Now the database can use the index to locate matching records more efficiently.

### Unique Index

```sql
CREATE UNIQUE INDEX idx_users_email_unique
ON users(email);
```

This also prevents duplicate indexed values.

### Composite Index

A composite index contains multiple columns.

```sql
CREATE INDEX idx_orders_user_status
ON orders(user_id, status);
```

It can help queries such as:

```sql
SELECT *
FROM orders
WHERE user_id = 10
AND status = 'completed';
```

### Important: Column Order Matters

An index on:

```text
(user_id, status)
```

is generally useful for queries filtering by:

- `user_id`
- `user_id` and `status`

It may not be equally useful for queries filtering only by `status`.

This relates to the leftmost-prefix principle in MySQL's B-tree indexes.

### Advantages

- Faster lookups.
- Better filtering.
- Improved joins.
- Faster sorting in suitable cases.

### Disadvantages

- Requires additional storage.
- Slows some write operations.
- Requires maintenance.
- Too many indexes can reduce performance.

### Check Query Execution Plan

```sql
EXPLAIN
SELECT *
FROM users
WHERE email = 'john@example.com';
```

`EXPLAIN` helps you understand how the database plans to execute a query.

---

# PART 13: DATABASE QUERY OPTIMIZATION

## 14. What Is Query Optimization?

Query optimization means improving database queries to reduce execution time and resource usage.

### Common Optimization Techniques

**1. Avoid SELECT \***

Instead of:

```sql
SELECT *
FROM users;
```

Use:

```sql
SELECT id, name, email
FROM users;
```

Retrieve only the columns you need.

**2. Use Appropriate Indexes**

Index frequently filtered and joined columns when query analysis supports it.

**3. Avoid N+1 Queries**

Suppose you retrieve 100 orders and then execute one additional query for each order to retrieve its items.

Total queries:

```text
1 + 100 = 101 queries
```

This is the N+1 query problem.

Use joins, eager loading, or batched queries where appropriate.

**4. Use Pagination**

Instead of retrieving all records:

```sql
SELECT *
FROM users;
```

Use:

```sql
SELECT *
FROM users
LIMIT 20 OFFSET 0;
```

**5. Analyze Execution Plans**

Use:

```sql
EXPLAIN
```

or, where appropriate:

```sql
EXPLAIN ANALYZE
```

### ORM Optimization

With Sequelize, avoid loading unnecessary associations.

Example:

```javascript
const users = await User.findAll({

    attributes: ["id", "name", "email"],

    limit: 20,

    offset: 0

});
```

For associations:

```javascript
const users = await User.findAll({

    include: [

        {

            model: Order,

            attributes: ["id", "total"]

        }

    ]

});
```

Understand the SQL generated by your ORM. An ORM does not automatically make queries efficient.

---

# PART 14: DATABASE CONNECTION POOLING

## 15. What Is Connection Pooling?

Connection pooling means maintaining a reusable collection of database connections.

Without pooling:

```text
REQUEST 1 → CREATE CONNECTION → QUERY → CLOSE

REQUEST 2 → CREATE CONNECTION → QUERY → CLOSE

REQUEST 3 → CREATE CONNECTION → QUERY → CLOSE
```

Creating a new connection for every request can be expensive.

With pooling:

```text
             CONNECTION POOL
             +-------------+
             | Connection 1|
             | Connection 2|
             | Connection 3|
             | Connection 4|
             +-------------+
                    |
             REUSE CONNECTIONS
                    |
                    v
                 QUERIES
```

### Benefits

- Reduces connection creation overhead.
- Reuses existing connections.
- Controls concurrent database connections.
- Improves application efficiency.

### Sequelize Example

```javascript
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {

        host: process.env.DB_HOST,

        dialect: "mysql",

        pool: {

            max: 10,

            min: 0,

            acquire: 30000,

            idle: 10000

        }

    }
);
```

### Important

Suppose you run 5 application instances.

Each instance has a maximum pool size of 10.

Potential maximum database connections:

```text
5 × 10 = 50 connections
```

Your total connection budget must account for all application instances, workers, administrative connections, and other database clients.

---

# PART 15: DATABASE MIGRATIONS

## 16. What Is a Database Migration?

A migration is a version-controlled change to database structure or data.

Suppose you need to add a new column:

```text
users
-----
id
name
email
```

New requirement:

```text
users
-----
id
name
email
phone
```

Instead of manually modifying every environment, create a migration.

### Example SQL Migration

```sql
ALTER TABLE users
ADD COLUMN phone VARCHAR(20);
```

### Why Use Migrations?

- Track database changes.
- Maintain consistency between environments.
- Support team development.
- Reproduce database structure.
- Control schema evolution.

### Sequelize Migration Example

Create migration using Sequelize CLI:

```bash
npx sequelize-cli migration:generate --name add-phone-to-users
```

Example migration:

```javascript
"use strict";

module.exports = {

    async up(queryInterface, Sequelize) {

        await queryInterface.addColumn(
            "users",
            "phone",
            {

                type: Sequelize.STRING(20),

                allowNull: true

            }
        );

    },

    async down(queryInterface) {

        await queryInterface.removeColumn(
            "users",
            "phone"
        );

    }

};
```

### up() vs down()

| Method | Purpose |
|---|---|
| `up()` | Applies the migration |
| `down()` | Reverses the migration |

Run migrations:

```bash
npx sequelize-cli db:migrate
```

Undo last migration:

```bash
npx sequelize-cli db:migrate:undo
```

**Production warning:** A migration rollback may not restore deleted data. For risky schema changes, use backups and a carefully planned migration strategy.

---

# PART 16: REPLICATION AND SHARDING

## 17. What Is Database Replication?

Replication means maintaining copies of data across multiple database servers.

Example:

```text
             PRIMARY DATABASE
                    |
                    |
              REPLICATION
                    |
          +---------+---------+
          |                   |
          v                   v
       REPLICA 1           REPLICA 2
```

### Primary Database

Usually handles writes.

### Replica Database

Can serve read queries, depending on database configuration and consistency requirements.

### Benefits

- Improves read scalability.
- Supports high availability.
- Provides additional copies of data.

### Important

Replication does not automatically guarantee immediate consistency.

A read replica may lag behind the primary.

If a user updates a record and immediately reads from a lagging replica, the old value may be returned.

---

## 18. What Is Database Sharding?

Sharding means distributing data across multiple database servers using a partitioning strategy.

Example:

```text
DATABASE CLUSTER

SHARD 1: USERS 1–100000

SHARD 2: USERS 100001–200000

SHARD 3: USERS 200001–300000
```

This is a simplified example using ranges.

Real sharding strategies may use:

- User ID.
- Geographic region.
- Hash of a key.
- Tenant ID.

### Replication vs Sharding

| Replication | Sharding |
|---|---|
| Copies data | Distributes data |
| Often improves read availability | Distributes storage and workload |
| Multiple copies of records | Different partitions contain different records |
| Useful for high availability | Useful for very large datasets |

---

# PART 17: ADVANCED AUTHENTICATION

## 19. Advanced Authentication Concepts

In Phase 11, you learned:

- Authentication.
- Authorization.
- Password hashing.
- JWT.
- Refresh tokens.
- Cookies.
- RBAC.
- OAuth 2.0.
- OpenID Connect.

Now let's understand additional production concepts.

### 19.1 Token Rotation

Token rotation means replacing a refresh token with a new one when it is used.

Example:

```text
REFRESH TOKEN A
       |
       v
TOKEN REFRESH REQUEST
       |
       v
VALIDATE TOKEN A
       |
       v
REVOKE TOKEN A
       |
       v
ISSUE TOKEN B
```

If an old refresh token is reused after rotation, the server can detect possible token theft and revoke the affected token family.

### 19.2 Token Revocation

Token revocation means invalidating a token before its natural expiry.

This may require:

- A token denylist.
- A refresh-token database.
- Token versioning.
- Short-lived access tokens.
- Session management.

### 19.3 Device and Session Management

Applications may allow users to see their active sessions.

Example:

| Device | Last Active | Status |
|---|---|---|
| Chrome - Windows | Today | Active |
| Android App | Yesterday | Active |
| Firefox - Linux | 5 days ago | Active |

Users can revoke individual sessions.

### 19.4 Password Reset Security

A secure password reset workflow should:

1. Accept a reset request.
2. Generate a cryptographically secure random token.
3. Store only a hash of the token.
4. Send the token through a trusted communication channel.
5. Set a short expiry.
6. Allow the token to be used only once.
7. Invalidate existing sessions when appropriate.

Avoid revealing whether an email address exists.

---

# PART 18: ROLE-BASED ACCESS CONTROL

## 20. What Is RBAC?

RBAC stands for Role-Based Access Control.

It grants permissions based on user roles.

Example:

```text
USER
  |
  +---- ADMIN
  |
  +---- MANAGER
  |
  +---- CUSTOMER
```

Each role has different permissions.

### Example

| Permission | Admin | Manager | Customer |
|---|---|---|---|
| View products | Yes | Yes | Yes |
| Create products | Yes | Yes | No |
| Delete products | Yes | No | No |
| Manage users | Yes | No | No |
| Place orders | Yes | Yes | Yes |
| View own orders | Yes | Yes | Yes |

### Database Structure

A flexible RBAC system might contain:

```text
USERS
  |
  | M:1
  |
ROLES
  |
  | M:N
  |
ROLE_PERMISSIONS
  |
  | M:1
  |
PERMISSIONS
```

Tables:

```text
users
roles
permissions
user_roles
role_permissions
```

### Authorization Middleware

```javascript
function authorize(requiredPermission) {

    return (req, res, next) => {

        const permissions = req.user?.permissions || [];

        if (!permissions.includes(requiredPermission)) {

            return res.status(403).json({

                success: false,

                message: "Forbidden"

            });

        }

        next();

    };

}
```

Usage:

```javascript
router.delete(
    "/products/:id",
    authenticate,
    authorize("product:delete"),
    productController.deleteProduct
);
```

### Important

Authentication middleware must run before authorization middleware.

Also, never rely only on role information supplied by the client.

The server must derive trusted authorization information from validated credentials and server-side data.

---

# PART 19: MULTI-TENANT ARCHITECTURE

## 21. What Is Multi-Tenancy?

Multi-tenancy is an architecture where one application serves multiple customers or organizations.

Each organization is called a tenant.

Example: A SaaS CRM application.

```text
             CRM APPLICATION
                    |
          +---------+---------+
          |         |         |
          v         v         v
       COMPANY A COMPANY B COMPANY C
          |         |         |
          v         v         v
       THEIR DATA THEIR DATA THEIR DATA
```

Each company uses the same application but should access only its own data.

### Example Database

```text
organizations
-------------
id
name
```

```text
users
-----
id
organization_id
name
email
```

```text
projects
--------
id
organization_id
name
```

### Example Query

```javascript
const projects = await Project.findAll({

    where: {

        organizationId: req.user.organizationId

    }

});
```

### Why Is Tenant Isolation Important?

Suppose Company A sends a request asking for projects belonging to Company B.

The backend must prevent that access.

Tenant filtering must be enforced server-side across every relevant data-access path.

### Common Multi-Tenant Models

**1. Shared Database, Shared Schema**

All tenants use the same tables.

Tenant ID identifies the owner.

**2. Shared Database, Separate Schema**

Each tenant has a separate database schema.

**3. Separate Database per Tenant**

Each tenant has its own database.

### Comparison

| Model | Isolation | Complexity |
|---|---|---|
| Shared schema | Lower | Lower |
| Separate schema | Higher | Medium |
| Separate database | Higher | Higher |

### Important Security Rule

Never trust `organizationId` or `tenantId` directly from the request body.

Derive the tenant identity from an authenticated and authorized context.

---

# PART 20: API KEYS AND SERVICE AUTHENTICATION

## 22. What Is an API Key?

An API key is a credential used to identify and authorize an application or integration.

Example:

```http
GET /api/products
X-API-Key: your_api_key
```

### Common Use Cases

- External API integrations.
- Server-to-server communication.
- Developer access.
- Third-party applications.

### Secure API Key Practices

1. Generate keys using cryptographically secure randomness.
2. Store only a hash of the key where practical.
3. Show the full key only when created.
4. Support expiration.
5. Support revocation.
6. Apply rate limits.
7. Associate keys with scopes or permissions.
8. Never place secret API keys in frontend JavaScript.

### API Key vs JWT

| API Key | JWT |
|---|---|
| Usually opaque credential | Structured token |
| Often identifies an application | Can represent user or service claims |
| Requires server-side lookup in many designs | Can be verified cryptographically |
| Common for integrations | Common for user authentication |

Neither automatically provides authorization. The application must enforce permissions.

---

# PART 21: API VERSIONING

## 23. What Is API Versioning?

API versioning allows you to introduce changes without unexpectedly breaking existing clients.

Suppose you currently have:

```http
GET /api/users
```

Later, the response structure changes.

Old clients expect:

```json
{
    "name": "John"
}
```

New clients expect:

```json
{
    "firstName": "John",
    "lastName": "Doe"
}
```

If you change the existing response without compatibility planning, old clients may break.

Versioning helps manage this.

### Common API Versioning Strategies

**1. URI Versioning**

```http
GET /api/v1/users
```

```http
GET /api/v2/users
```

**2. Header Versioning**

```http
Accept: application/vnd.myapp.v2+json
```

**3. Query Parameter Versioning**

```http
GET /api/users?version=2
```

### Which Is Best?

URI versioning is straightforward and widely used.

Header versioning can be useful when versioning is part of content negotiation.

The best strategy depends on client requirements and API governance.

### Recommended Practices

- Avoid unnecessary breaking changes.
- Maintain backward compatibility where possible.
- Document changes.
- Provide a deprecation period.
- Communicate migration timelines.

---

# PART 22: SWAGGER AND OPENAPI

## 24. What Is API Documentation?

API documentation describes how developers can interact with an API.

It explains:

- Endpoints.
- HTTP methods.
- Parameters.
- Request bodies.
- Response formats.
- Status codes.
- Authentication requirements.

### What Is OpenAPI?

OpenAPI is a specification for describing HTTP APIs in a machine-readable format.

### What Is Swagger?

Swagger is a collection of tools used to work with OpenAPI specifications.

Popular tools include:

- Swagger UI.
- Swagger Editor.
- Swagger Codegen.

### Install Swagger UI for Express

```bash
npm install swagger-ui-express
```

### Example OpenAPI Specification

```javascript
const swaggerDocument = {

    openapi: "3.0.0",

    info: {

        title: "User API",

        version: "1.0.0",

        description: "User management API"

    },

    servers: [

        {

            url: "http://localhost:3000"

        }

    ],

    paths: {

        "/api/users": {

            get: {

                summary: "Get all users",

                responses: {

                    "200": {

                        description: "Users retrieved successfully"

                    }

                }

            }

        }

    }

};

module.exports = swaggerDocument;
```

### Configure Express

```javascript
const swaggerUi = require("swagger-ui-express");

const swaggerDocument = require("./swagger");

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);
```

Open:

```text
http://localhost:3000/api-docs
```

### Why Use Swagger?

- API documentation.
- Interactive API testing.
- Better frontend/backend collaboration.
- Easier onboarding.
- Easier integration with external developers.

Avoid exposing internal or sensitive API documentation publicly unless intended.

---

# PART 23: API PAGINATION AND FILTERING

## 25. What Is Pagination?

Pagination divides a large dataset into smaller groups.

Suppose your database contains 100,000 products.

Returning all products in one response is inefficient.

Instead, return a limited number per request.

### Offset Pagination

Request:

```http
GET /api/products?page=2&limit=20
```

Calculation:

```javascript
const page = 2;

const limit = 20;

const offset = (page - 1) * limit;
```

Result:

```text
OFFSET = 20
LIMIT = 20
```

### Sequelize Example

```javascript
const products = await Product.findAndCountAll({

    limit: 20,

    offset: 20,

    order: [["id", "ASC"]]

});
```

### Cursor Pagination

Cursor pagination uses a reference to the last returned record.

Example:

```http
GET /api/products?limit=20&cursor=120
```

A simplified SQL example:

```sql
SELECT *
FROM products
WHERE id > 120
ORDER BY id ASC
LIMIT 20;
```

### Offset vs Cursor Pagination

| Offset | Cursor |
|---|---|
| Simple to implement | More complex |
| Supports page numbers | Uses continuation tokens |
| Can become slower for deep pages | Often efficient for large datasets |
| Can be unstable when records change | More stable with suitable ordering |

For cursor pagination, use a deterministic ordering and a cursor that represents all necessary sort fields, especially when the sort key is not unique.

### Filtering

Example:

```http
GET /api/products?category=electronics
```

### Sorting

```http
GET /api/products?sortBy=price&order=asc
```

### Searching

```http
GET /api/products?search=laptop
```

### Important Security Rule

Never directly place arbitrary user-supplied column names or SQL fragments into queries.

Use allowlists for sortable and filterable fields.

---

# PART 24: IDEMPOTENCY

## 26. What Is Idempotency?

An operation is idempotent if repeating it produces the same intended final effect as performing it once.

This is particularly important for payment and order APIs.

Suppose a user clicks the payment button twice because the network is slow.

Without idempotency, the application may create two payment transactions.

### Idempotency Key

The client sends a unique key:

```http
POST /api/payments
Idempotency-Key: 8d5a7e-example-key
```

The backend stores the key and the result associated with it.

If the same key is received again, the server returns the previous result rather than creating another payment operation.

### Simplified Flow

```text
PAYMENT REQUEST
       |
       v
CHECK IDEMPOTENCY KEY
       |
       +----------------+
       |                |
       v                v
   KEY EXISTS       KEY NOT FOUND
       |                |
       v                v
RETURN SAVED       PROCESS PAYMENT
   RESULT               |
                        v
                  STORE RESULT
                        |
                        v
                  RETURN RESULT
```

### Important

Idempotency key handling must be atomic.

A simple lookup followed by an insert can race when two identical requests arrive simultaneously.

Use database uniqueness constraints and transaction-safe processing.

Also define what happens when a request with the same key is retried with a different payload.

---

# PART 25: BACKGROUND JOBS

## 27. What Are Background Jobs?

A background job is work executed outside the immediate HTTP request-response lifecycle.

Suppose a user registers.

The application needs to:

1. Save user information.
2. Send a welcome email.
3. Generate a PDF.
4. Notify an administrator.

Sending all these operations synchronously can increase API response time.

Instead, the application can process some operations in the background.

### Architecture

```text
           USER REQUEST
                |
                v
           EXPRESS API
                |
                v
           SAVE USER
                |
                v
          ADD BACKGROUND JOB
                |
                v
          RETURN RESPONSE

                 |
                 v

           JOB PROCESSOR
                 |
       +---------+---------+
       |         |         |
       v         v         v
     EMAIL     PDF      NOTIFICATION
```

### Advantages

- Faster API responses.
- Better workload separation.
- Retry support.
- Improved reliability for asynchronous tasks.
- Better resource management.

### Common Background Tasks

- Sending emails.
- Generating reports.
- Processing images.
- Exporting Excel files.
- Sending notifications.
- Processing uploaded documents.
- Synchronizing external data.

---

# PART 26: MESSAGE QUEUES

## 28. What Is a Message Queue?

A message queue is a communication mechanism that allows producers to send messages and consumers to process them asynchronously.

### Main Components

**Producer:** Creates messages.

**Queue:** Stores messages until they are processed.

**Consumer:** Receives and processes messages.

### Architecture

```text
        PRODUCER
            |
            v
       MESSAGE QUEUE
            |
            v
         CONSUMER
            |
            v
       PROCESS MESSAGE
```

### Example

An order is created.

Instead of sending an email directly inside the order API, the application publishes a message:

```json
{
    "event": "order.created",
    "orderId": 1001,
    "userId": 10
}
```

A consumer processes this message and sends the confirmation email.

### Popular Message Queue Systems

- RabbitMQ.
- Apache Kafka.
- Redis-based queues.
- Amazon SQS.
- Google Cloud Pub/Sub.

### Message Queue vs Event Bus

A message queue typically distributes work to consumers.

An event bus distributes events to interested subscribers.

In practice, some systems provide both messaging and event-streaming capabilities.

---

# PART 27: REDIS ADVANCED CONCEPTS

## 29. What Is Redis?

Redis is an in-memory data store that supports different data structures.

It is commonly used for:

- Caching.
- Sessions.
- Rate limiting.
- Job queues.
- Real-time data.
- Distributed coordination.

### Common Redis Data Types

| Data Type | Example |
|---|---|
| String | `SET name John` |
| List | `LPUSH tasks task1` |
| Set | `SADD users 1` |
| Hash | `HSET user:1 name John` |
| Sorted Set | `ZADD scores 100 user1` |
| Stream | Event/message stream |

### 29.1 Caching

Suppose your API repeatedly fetches product information.

Without cache:

```text
REQUEST
   |
   v
DATABASE
   |
   v
RESPONSE
```

With cache:

```text
REQUEST
   |
   v
REDIS CACHE
   |
   +------ CACHE HIT ------> RESPONSE
   |
   +------ CACHE MISS
               |
               v
            DATABASE
               |
               v
          STORE IN CACHE
               |
               v
            RESPONSE
```

### Example

```javascript
async function getProduct(id) {

    const cacheKey = `product:${id}`;

    const cachedProduct = await redis.get(cacheKey);

    if (cachedProduct) {

        return JSON.parse(cachedProduct);

    }

    const product = await Product.findByPk(id);

    if (product) {

        await redis.set(
            cacheKey,
            JSON.stringify(product),
            "EX",
            300
        );

    }

    return product;

}
```

This example assumes a Redis client that supports the shown command signature. Redis client APIs vary by library and version.

### 29.2 Cache Invalidation

Suppose a product price changes.

The old cached product may remain available.

You need to invalidate or update the cache.

Example:

```javascript
await Product.update(
    { price: 60000 },
    { where: { id: 10 } }
);

await redis.del("product:10");
```

### 29.3 Cache-Aside Pattern

The application:

1. Checks the cache.
2. Reads from the database on a cache miss.
3. Stores the result in cache.
4. Returns the result.

### 29.4 Redis Pub/Sub

Redis Pub/Sub allows publishers to send messages to subscribers.

Example use cases:

- Notifications.
- Real-time events.
- Simple inter-process communication.

However, Pub/Sub messages are not durable. If a subscriber is disconnected, it may miss messages.

For durable message processing, consider Redis Streams or a dedicated message broker.

---

# PART 28: SCHEDULED JOBS AND CRON

## 30. What Is a Cron Job?

A cron job is a scheduled task that executes at defined times or intervals.

Examples:

- Send daily reports.
- Delete expired temporary files.
- Generate monthly invoices.
- Clean old sessions.
- Synchronize data every hour.

### Cron Expression

A standard five-field cron expression:

```text
* * * * *
| | | | |
| | | | +--- Day of week
| | | +----- Month
| | +------- Day of month
| +--------- Hour
+----------- Minute
```

Example:

```text
0 9 * * *
```

Runs daily at 9:00 AM.

```text
*/5 * * * *
```

Runs every 5 minutes.

### Using node-cron

Install:

```bash
npm install node-cron
```

Example:

```javascript
const cron = require("node-cron");

cron.schedule("0 9 * * *", () => {

    console.log("Daily report generation started");

});
```

### Important Production Consideration

If you run multiple application instances, each instance may execute the same scheduled task.

For example:

```text
SERVER 1 → CRON JOB
SERVER 2 → CRON JOB
SERVER 3 → CRON JOB
```

This could generate three duplicate reports.

Use a dedicated scheduler, distributed locking, or another single-execution mechanism when a scheduled task must run only once across the deployment.

---

# PART 29: EVENT-DRIVEN ARCHITECTURE

## 31. What Is Event-Driven Architecture?

Event-driven architecture (EDA) is an architectural approach in which components communicate by producing and consuming events.

An event represents something that has already happened.

Examples:

- User registered.
- Order created.
- Payment completed.
- Product updated.
- Invoice generated.

### Architecture

```text
           ORDER SERVICE
                 |
                 v
           ORDER CREATED
                 |
                 v
              EVENT
                 |
       +---------+---------+
       |         |         |
       v         v         v
    EMAIL     INVENTORY  ANALYTICS
   SERVICE     SERVICE    SERVICE
```

The order service does not need to directly call every other service.

Instead, it publishes an event.

Interested consumers process it.

### Event vs Command

| Event | Command |
|---|---|
| Describes something that happened | Requests something to happen |
| Usually written in past tense | Usually written as an instruction |
| `OrderCreated` | `CreateOrder` |
| Multiple consumers may subscribe | Usually has a specific intended handler |

### Benefits

- Loose coupling.
- Independent consumers.
- Easier integration.
- Asynchronous processing.
- Extensibility.

### Challenges

- Event ordering.
- Duplicate delivery.
- Eventual consistency.
- Retry handling.
- Distributed debugging.

---

# PART 30: DISTRIBUTED SYSTEMS FUNDAMENTALS

## 32. What Is a Distributed System?

A distributed system consists of multiple independent computers or services that communicate over a network to perform a larger task.

Example:

```text
           CLIENT
              |
              v
          API GATEWAY
              |
      +-------+-------+
      |       |       |
      v       v       v
    AUTH   ORDER   PRODUCT
   SERVICE SERVICE SERVICE
      |       |       |
      v       v       v
     DB      DB      DB
```

Each service can run independently.

### Why Use Distributed Systems?

- Independent scaling.
- Service isolation.
- Team autonomy.
- Independent deployments.
- Different technology choices.

### Challenges

- Network failures.
- Partial failures.
- Data consistency.
- Service discovery.
- Distributed tracing.
- Retry handling.
- Message duplication.

### Important Concept: Network Calls Can Fail

In a monolithic application, a function call happens inside the same process.

In a distributed application, communication happens over a network.

Network communication introduces:

- Latency.
- Timeouts.
- Connection failures.
- Partial responses.
- Duplicate requests.
- Service unavailability.

Never assume that another service will always respond successfully.

---

# PART 31: MICROSERVICES ARCHITECTURE

## 33. What Are Microservices?

Microservices architecture structures an application as multiple independently deployable services.

Each service owns a specific business capability.

Example:

```text
              CLIENT
                 |
                 v
             API GATEWAY
                 |
       +---------+---------+
       |         |         |
       v         v         v
     AUTH      PRODUCT    ORDER
    SERVICE    SERVICE   SERVICE
       |         |         |
       v         v         v
      DB        DB        DB
```

### Example Responsibilities

**Auth Service**
- Registration.
- Login.
- Token management.

**Product Service**
- Product CRUD.
- Categories.
- Inventory information.

**Order Service**
- Order creation.
- Order status.
- Order history.

**Payment Service**
- Payment processing.
- Refunds.
- Payment verification.

### Important Principle

A microservice should own its business data.

Other services should generally interact through its API or events rather than directly modifying its database tables.

### Advantages

1. Independent deployment.
2. Independent scaling.
3. Team ownership.
4. Technology flexibility.
5. Fault isolation when designed correctly.

### Disadvantages

1. Operational complexity.
2. Distributed debugging.
3. Network communication overhead.
4. Data consistency challenges.
5. More infrastructure.
6. More complicated testing.

---

## 34. Monolith vs Microservices

| Monolithic Architecture | Microservices Architecture |
|---|---|
| One application deployment | Multiple service deployments |
| Usually simpler initially | More operational complexity |
| Easier in-process communication | Network-based communication |
| Often shared database | Services commonly own separate data |
| Scaling the whole application may be necessary | Services can be scaled independently |
| Easier local setup | More complex local setup |

### Which Should You Choose?

For most small and medium applications, start with a well-structured modular monolith.

Move to microservices when there is a clear requirement, such as:

- Independent scaling.
- Independent team ownership.
- Different availability requirements.
- Independent deployment needs.
- Strong business boundaries.

Microservices are not automatically faster, cheaper, or easier to maintain.

---

# PART 32: INTER-SERVICE COMMUNICATION

## 35. How Do Microservices Communicate?

There are two major approaches.

### 1. Synchronous Communication

One service sends a request and waits for a response.

Example:

```text
ORDER SERVICE
      |
      v
PAYMENT SERVICE
      |
      v
PAYMENT RESPONSE
      |
      v
ORDER SERVICE
```

Common technologies:

- HTTP/REST.
- gRPC.

### 2. Asynchronous Communication

A service publishes a message or event and does not wait for every consumer to finish processing it.

Example:

```text
ORDER SERVICE
      |
      v
 MESSAGE BROKER
      |
      v
NOTIFICATION SERVICE
```

Common technologies:

- RabbitMQ.
- Kafka.
- Redis Streams.
- Amazon SQS.

### REST vs gRPC

| REST | gRPC |
|---|---|
| Commonly uses HTTP and JSON | Uses HTTP/2 and Protocol Buffers by default |
| Human-readable payloads | Compact binary payloads |
| Broad browser compatibility | Browser use typically needs gRPC-Web or a gateway |
| Simple API integration | Strong service-to-service RPC model |

### When to Use REST?

- Public APIs.
- Frontend/backend communication.
- Simple service integration.
- Broad compatibility.

### When to Use gRPC?

- Internal service communication.
- Strongly defined service contracts.
- Streaming requirements.
- Efficient binary serialization.

---

# PART 33: API GATEWAY

## 36. What Is an API Gateway?

An API Gateway is an entry point through which clients access backend services.

Instead of exposing every microservice directly, clients communicate with the gateway.

### Architecture

```text
                CLIENT
                   |
                   v
               API GATEWAY
                   |
          +--------+--------+
          |        |        |
          v        v        v
         AUTH    PRODUCT   ORDER
        SERVICE  SERVICE  SERVICE
```

### Responsibilities

- Request routing.
- Authentication.
- Rate limiting.
- Request validation.
- Logging.
- Response aggregation.
- API version handling.

### Example

Client request:

```http
GET /api/products/10
```

Gateway forwards it to:

```http
http://product-service:4001/products/10
```

The client does not need to know the internal service address.

### Important

An API gateway should not become a place where all business logic is implemented.

Business logic belongs in the appropriate domain service.

---

# PART 34: SERVICE DISCOVERY

## 37. What Is Service Discovery?

Service discovery is the process of identifying the network location of services in a distributed system.

Suppose you have:

```text
PRODUCT SERVICE

Instance 1: 10.0.0.10:4001

Instance 2: 10.0.0.11:4001

Instance 3: 10.0.0.12:4001
```

How does the order service know where to send requests?

Service discovery helps solve this problem.

### Common Approaches

**1. Static Configuration**

Service addresses are configured manually.

**2. DNS-Based Discovery**

Services are accessed through DNS names.

**3. Service Registry**

A registry stores service instances and their addresses.

Popular infrastructure includes:

- Kubernetes Services.
- Consul.
- Cloud provider service discovery.

---

# PART 35: DISTRIBUTED TRANSACTIONS

## 38. What Is a Distributed Transaction?

A distributed transaction involves multiple services or databases participating in one logical business operation.

Suppose a customer places an order.

The system needs to:

1. Create order.
2. Reserve inventory.
3. Process payment.
4. Confirm order.

These operations may happen in different services and databases.

A single traditional database transaction generally cannot atomically cover all these independent services.

### Why Is It Difficult?

Consider:

```text
ORDER SERVICE       PAYMENT SERVICE
      |                    |
      v                    v
 CREATE ORDER        PROCESS PAYMENT
      |                    |
      v                    v
 SUCCESS                FAILED
```

Now the system has an order without successful payment.

You need a strategy to handle this situation.

### Common Approaches

- Saga Pattern.
- Outbox Pattern.
- Compensating Transactions.
- Idempotent Consumers.
- Eventual Consistency.

---

# PART 36: EVENTUAL CONSISTENCY

## 39. What Is Eventual Consistency?

Eventual consistency means that distributed data may temporarily differ but is expected to converge when updates are successfully propagated and processed.

Example:

A customer places an order.

Immediately:

```text
ORDER SERVICE: ORDER CREATED

INVENTORY SERVICE: NOT UPDATED YET
```

A short time later:

```text
ORDER SERVICE: ORDER CREATED

INVENTORY SERVICE: INVENTORY RESERVED
```

The system becomes consistent after asynchronous processing.

### Why Use Eventual Consistency?

Distributed systems often prioritize availability and independent service operation over immediate consistency across every component.

### Important

Eventual consistency is not permission to ignore failed updates.

Systems must include:

- Retries.
- Monitoring.
- Error handling.
- Reconciliation.
- Duplicate processing protection.

---

# PART 37: SAGA PATTERN

## 40. What Is the Saga Pattern?

The Saga Pattern manages a distributed business transaction through a sequence of local transactions.

Each step has a corresponding compensating action.

### Example: Order Placement

```text
CREATE ORDER
     |
     v
RESERVE INVENTORY
     |
     v
PROCESS PAYMENT
     |
     v
CONFIRM ORDER
```

Suppose payment fails.

The system may perform compensating actions:

```text
PAYMENT FAILED
      |
      v
RELEASE INVENTORY
      |
      v
CANCEL ORDER
```

### Types of Saga

**1. Choreography**

Services communicate through events.

There is no central coordinator controlling every step.

**2. Orchestration**

A central orchestrator coordinates the workflow.

### Choreography Example

```text
ORDER CREATED
      |
      v
INVENTORY SERVICE
      |
      v
INVENTORY RESERVED
      |
      v
PAYMENT SERVICE
      |
      v
PAYMENT COMPLETED
      |
      v
ORDER CONFIRMED
```

### Orchestration Example

```text
         SAGA ORCHESTRATOR
                 |
        +--------+--------+
        |        |        |
        v        v        v
      ORDER  INVENTORY  PAYMENT
     SERVICE  SERVICE   SERVICE
```

### Important

A compensating action is not always a perfect rollback.

For example, a completed external payment may require a refund rather than erasing the payment record.

---

# PART 38: OUTBOX PATTERN

## 41. What Is the Transactional Outbox Pattern?

The Outbox Pattern helps solve the dual-write problem.

Suppose the order service must:

1. Save an order in the database.
2. Publish an `OrderCreated` event to a message broker.

Problem:

The database operation may succeed while message publishing fails.

Or message publishing may succeed while the database transaction fails.

This creates inconsistent state.

### Solution

Store the order and the event in the same database transaction.

```text
DATABASE TRANSACTION
        |
        +------------------+
        |                  |
        v                  v
    SAVE ORDER        SAVE OUTBOX EVENT
        |                  |
        +------------------+
                 |
                 v
              COMMIT
                 |
                 v
          OUTBOX PROCESSOR
                 |
                 v
           MESSAGE BROKER
```

### Example Outbox Table

```text
outbox_events
-------------
id
event_type
payload
created_at
published_at
```

An independent worker reads unpublished events and publishes them.

After successful publication, it marks them as published.

### Why Is This Important?

It makes database persistence and event creation atomic.

However, the worker may publish an event more than once if it crashes after publishing but before marking the event as published.

Therefore, consumers must be idempotent.

---

# PART 39: WEBSOCKET ARCHITECTURE

## 42. What Is WebSocket?

WebSocket is a communication protocol that provides a persistent, full-duplex connection between a client and server.

Unlike ordinary HTTP request-response communication, either side can send messages over the established connection.

### HTTP vs WebSocket

| HTTP | WebSocket |
|---|---|
| Request-response model | Full-duplex communication |
| Commonly separate requests | Persistent connection |
| Client usually initiates requests | Both sides can send messages |
| Suitable for normal APIs | Suitable for real-time communication |

### Common Use Cases

- Chat applications.
- Live notifications.
- Multiplayer games.
- Real-time dashboards.
- Collaborative editing.
- Live tracking.

### WebSocket Lifecycle

```text
CLIENT
  |
  v
HTTP UPGRADE REQUEST
  |
  v
WEBSOCKET HANDSHAKE
  |
  v
PERSISTENT CONNECTION
  |
  v
BIDIRECTIONAL MESSAGES
  |
  v
CONNECTION CLOSED
```

---

# PART 40: SOCKET.IO

## 43. What Is Socket.IO?

Socket.IO is a real-time communication library for client-server applications.

It commonly uses WebSocket when available and can fall back to HTTP long-polling.

It provides additional features such as:

- Event-based messaging.
- Rooms.
- Namespaces.
- Reconnection.
- Acknowledgements.
- Broadcasting.

### Install

```bash
npm install socket.io
```

### Server Example

```javascript
const express = require("express");

const http = require("node:http");

const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {

    cors: {

        origin: "http://localhost:3000"

    }

});

io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    socket.on("message", (data) => {

        console.log("Message:", data);

        io.emit("message", data);

    });

    socket.on("disconnect", () => {

        console.log("User disconnected");

    });

});

server.listen(4000, () => {

    console.log("Socket server running on port 4000");

});
```

### Client Example

Install the client:

```bash
npm install socket.io-client
```

Client code:

```javascript
const { io } = require("socket.io-client");

const socket = io("http://localhost:4000");

socket.on("connect", () => {

    console.log("Connected:", socket.id);

});

socket.emit("message", {

    text: "Hello from client"

});

socket.on("message", (data) => {

    console.log("Received:", data);

});
```

### Important

Socket.IO is not the same protocol as raw WebSocket.

A Socket.IO client cannot directly communicate with a server implementing only the standard WebSocket protocol.

---

# PART 41: REAL-TIME NOTIFICATIONS

## 44. What Is a Real-Time Notification System?

A real-time notification system delivers messages to connected users without requiring them to repeatedly refresh a page.

Example:

A user receives a new message.

The server sends a notification:

```json
{
    "type": "new_message",
    "message": "You received a new message",
    "senderId": 10
}
```

### Architecture

```text
            USER A
               |
               v
          CHAT SERVER
               |
               v
          NOTIFICATION
               |
               v
            USER B
```

### Socket.IO Rooms

Rooms allow you to group connections.

Example:

```javascript
socket.join(`user:${userId}`);
```

Send notification to a particular user:

```javascript
io.to(`user:${userId}`).emit("notification", {

    message: "You received a new message"

});
```

### Important Security Considerations

- Authenticate socket connections.
- Authorize room membership.
- Validate incoming events.
- Apply message rate limits.
- Avoid trusting client-supplied user IDs.
- Avoid exposing sensitive data to unauthorized connections.

---

# PART 42: SCALING WEBSOCKET APPLICATIONS

## 45. What Happens When You Have Multiple Servers?

Suppose your application runs on three servers.

```text
             LOAD BALANCER
                    |
          +---------+---------+
          |         |         |
          v         v         v
       SERVER 1 SERVER 2 SERVER 3
```

User A connects to Server 1.

User B connects to Server 2.

If Server 1 sends a local Socket.IO event, Server 2 does not automatically know about it.

### Solution: Shared Adapter

Socket.IO supports adapters that coordinate communication between multiple server instances.

A Redis adapter is a common option.

### Architecture

```text
           SOCKET SERVER 1
                  |
                  |
                REDIS
                  |
                  |
           SOCKET SERVER 2
```

This allows events to be distributed between Socket.IO server instances.

### Important

For deployments using HTTP long-polling, load-balancer configuration and sticky sessions may be required.

Using WebSocket transport exclusively changes some of these requirements, but also removes the fallback transport.

---

# PART 43: CENTRALIZED LOGGING

## 46. What Is Centralized Logging?

Centralized logging means collecting logs from multiple application instances into one central system.

Suppose your backend runs on three servers.

Without centralized logging:

```text
SERVER 1 → LOCAL LOGS

SERVER 2 → LOCAL LOGS

SERVER 3 → LOCAL LOGS
```

You need to inspect each server separately.

With centralized logging:

```text
SERVER 1
SERVER 2
SERVER 3
    |
    v
LOG COLLECTION
    |
    v
CENTRAL LOGGING SYSTEM
```

### Popular Tools

- ELK Stack.
- OpenSearch.
- Grafana Loki.
- Datadog.
- Splunk.

### What Is ELK?

ELK commonly refers to:

- Elasticsearch.
- Logstash.
- Kibana.

These tools can be used to collect, index, search, and visualize logs.

### Structured Logging

Instead of:

```javascript
console.log("User created successfully");
```

Use structured logs:

```javascript
logger.info({

    event: "user.created",

    userId: 101,

    timestamp: new Date().toISOString()

});
```

### Why Structured Logging?

It makes logs easier to:

- Search.
- Filter.
- Aggregate.
- Analyze.
- Correlate.

### Important Security Rule

Never log:

- Passwords.
- Access tokens.
- Refresh tokens.
- API secrets.
- Full payment credentials.
- Unnecessary personal information.

---

# PART 44: MONITORING AND OBSERVABILITY

## 47. What Is Observability?

Observability is the ability to understand the internal state of a system by examining its outputs.

The three commonly discussed pillars are:

1. Logs.
2. Metrics.
3. Traces.

### 47.1 Logs

Describe individual events.

Example:

```text
User login failed
```

### 47.2 Metrics

Numerical measurements collected over time.

Examples:

- CPU usage.
- Request rate.
- Error rate.
- Memory usage.
- Response latency.

### 47.3 Traces

Show how a request travels through multiple services.

Example:

```text
API GATEWAY
     |
     v
AUTH SERVICE
     |
     v
ORDER SERVICE
     |
     v
PAYMENT SERVICE
```

A distributed trace can show how much time each service consumed.

### Monitoring vs Observability

| Monitoring | Observability |
|---|---|
| Watches known conditions | Helps investigate unknown problems |
| Uses dashboards and alerts | Uses logs, metrics, and traces |
| Often checks predefined thresholds | Supports deeper system investigation |

---

# PART 45: DISTRIBUTED TRACING

## 48. What Is Distributed Tracing?

Distributed tracing follows a request as it travels through multiple services.

Suppose a user places an order.

```text
CLIENT
  |
  v
API GATEWAY
  |
  v
ORDER SERVICE
  |
  v
INVENTORY SERVICE
  |
  v
PAYMENT SERVICE
```

If the request takes 5 seconds, distributed tracing helps identify where the time was spent.

### Important Terms

**Trace:** The complete journey of a request.

**Span:** One operation within a trace.

**Trace ID:** Identifier shared across the trace.

**Span ID:** Identifier for an individual span.

### Example

```text
TRACE ID: abc123

API GATEWAY       100 ms

ORDER SERVICE     200 ms

INVENTORY         500 ms

PAYMENT SERVICE  3000 ms
```

Now you can identify the payment service as the major bottleneck.

### OpenTelemetry

OpenTelemetry is an open-source observability framework.

It supports:

- Traces.
- Metrics.
- Logs.
- Instrumentation.
- Exporting telemetry data.

Official documentation:

[OpenTelemetry Documentation](https://opentelemetry.io/docs/?utm_source=chatgpt.com)

---

# PART 46: PRODUCTION SECURITY

## 49. Production Security Checklist

Security must be implemented across every application layer.

### Application Security

- Validate all incoming requests.
- Use parameterized SQL queries.
- Avoid exposing stack traces.
- Implement authentication.
- Enforce authorization.
- Apply rate limiting.
- Configure secure CORS policies.
- Use security headers.
- Protect against XSS and CSRF.
- Validate uploaded files.

### Authentication Security

- Hash passwords using an appropriate password-hashing algorithm.
- Use short-lived access tokens where suitable.
- Rotate refresh tokens.
- Secure cookies.
- Implement session revocation.
- Protect password reset workflows.
- Use MFA where appropriate.

### Database Security

- Use least-privilege database accounts.
- Restrict network access.
- Encrypt network connections.
- Encrypt backups.
- Avoid exposing database ports publicly.
- Use prepared statements.
- Audit sensitive operations.

### Infrastructure Security

- Use HTTPS.
- Secure SSH access.
- Configure firewalls.
- Store secrets securely.
- Patch operating systems.
- Monitor server activity.
- Back up important data.

### Dependency Security

Check dependencies:

```bash
npm audit
```

Check outdated packages:

```bash
npm outdated
```

Update carefully:

```bash
npm update
```

Do not blindly apply every suggested update in production without testing compatibility.

---

# PART 47: SCALABILITY AND HIGH AVAILABILITY

## 50. What Is Scalability?

Scalability is the ability of a system to handle increasing workloads by adding resources or improving resource utilization.

### Scalability Types

**Vertical Scaling**

Increase the resources of one server.

**Horizontal Scaling**

Add more servers or application instances.

### What Is High Availability?

High availability means designing systems to remain accessible despite failures.

Example:

```text
             LOAD BALANCER
                    |
          +---------+---------+
          |         |         |
          v         v         v
        APP 1     APP 2     APP 3
          |         |         |
          +---------+---------+
                    |
                    v
             HIGH AVAILABILITY
```

### Important Techniques

- Multiple application instances.
- Health checks.
- Load balancing.
- Database replication.
- Backups.
- Failover strategies.
- Monitoring.
- Graceful shutdown.
- Disaster recovery.

### Availability Calculation

Availability is commonly calculated as:

```text
Availability =
(Uptime / Total Time) × 100
```

For example:

```text
99.9% availability
```

means approximately 0.1% of the measurement period was unavailable.

For a 30-day month:

```text
43.2 minutes downtime
```

This is an approximation; actual service-level calculations depend on measurement definitions and exclusions.

---

# PART 48: DISASTER RECOVERY

## 51. What Is Disaster Recovery?

Disaster recovery is the process of restoring systems and data after a serious failure.

Possible incidents:

- Database corruption.
- Accidental data deletion.
- Server failure.
- Ransomware.
- Cloud region outage.
- Infrastructure misconfiguration.

### Important Terms

**RPO — Recovery Point Objective**

The maximum acceptable amount of data loss measured in time.

Example:

```text
RPO = 1 hour
```

This means the recovery strategy aims to limit data loss to approximately one hour of changes.

**RTO — Recovery Time Objective**

The target time within which the system should be restored.

Example:

```text
RTO = 2 hours
```

This means the system should be restored within approximately two hours.

### RPO vs RTO

| RPO | RTO |
|---|---|
| Focuses on data loss | Focuses on downtime |
| How much data can be lost? | How long can recovery take? |
| Example: 1 hour | Example: 2 hours |

### Backup Strategy

A production database backup strategy should consider:

- Automated backups.
- Backup retention.
- Off-site storage.
- Encryption.
- Point-in-time recovery.
- Restore testing.
- Access control.

**Important:** A backup is only useful if it can actually be restored. Test restoration procedures regularly.

---

# PART 49: COMPLETE PRODUCTION BACKEND PROJECT

## 52. Project: Production-Ready E-Commerce Backend

Now let's combine the concepts from the entire Node.js roadmap.

We will design an e-commerce backend that can support:

- Multiple users.
- Administrators.
- Product management.
- Categories.
- Shopping carts.
- Orders.
- Payments.
- Inventory.
- Notifications.
- Background processing.
- Real-time updates.

### Technology Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Backend Framework | Express.js |
| Language | JavaScript / TypeScript |
| Database | MySQL |
| ORM | Sequelize |
| Cache | Redis |
| Authentication | JWT + Refresh Tokens |
| Validation | Zod |
| Testing | Jest + Supertest |
| Real-time | Socket.IO |
| Queue | BullMQ |
| API Documentation | Swagger/OpenAPI |
| Logging | Pino |
| Containerization | Docker |
| Reverse Proxy | Nginx |
| Process Management | PM2 or container orchestration |
| CI/CD | GitHub Actions |
| Deployment | AWS / VPS |

This is one possible stack. Production applications do not need every technology listed.

### 52.1 Complete Project Structure

```text
ecommerce-backend/
│
├── src/
│   │
│   ├── config/
│   │   ├── database.js
│   │   ├── redis.js
│   │   ├── env.js
│   │   └── logger.js
│   │
│   ├── modules/
│   │   │
│   │   ├── auth/
│   │   │   ├── auth.routes.js
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   ├── auth.repository.js
│   │   │   └── auth.validation.js
│   │   │
│   │   ├── users/
│   │   │   ├── user.routes.js
│   │   │   ├── user.controller.js
│   │   │   ├── user.service.js
│   │   │   ├── user.repository.js
│   │   │   └── user.validation.js
│   │   │
│   │   ├── products/
│   │   │   ├── product.routes.js
│   │   │   ├── product.controller.js
│   │   │   ├── product.service.js
│   │   │   ├── product.repository.js
│   │   │   └── product.validation.js
│   │   │
│   │   ├── categories/
│   │   │
│   │   ├── cart/
│   │   │
│   │   ├── orders/
│   │   │
│   │   ├── payments/
│   │   │
│   │   └── notifications/
│   │
│   ├── middleware/
│   │   ├── authenticate.js
│   │   ├── authorize.js
│   │   ├── validate.js
│   │   ├── errorHandler.js
│   │   └── requestLogger.js
│   │
│   ├── database/
│   │   ├── models/
│   │   ├── migrations/
│   │   └── seeders/
│   │
│   ├── jobs/
│   │   ├── email.job.js
│   │   └── invoice.job.js
│   │
│   ├── queues/
│   │   └── email.queue.js
│   │
│   ├── events/
│   │   └── order.events.js
│   │
│   ├── sockets/
│   │   └── socket.js
│   │
│   ├── utils/
│   │
│   ├── docs/
│   │
│   ├── app.js
│   └── server.js
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .env.example
├── package.json
└── README.md
```

This is a suggested modular structure, not a mandatory standard. Organize files according to the project's complexity.

---

## 52.2 Main Modules

### Authentication Module

Responsibilities:

- Register.
- Login.
- Logout.
- Refresh token.
- Password reset.
- Email verification.
- Session management.

### User Module

Responsibilities:

- User profile.
- Update profile.
- Manage addresses.
- User administration.

### Product Module

Responsibilities:

- Create products.
- Update products.
- Delete products.
- Get products.
- Search products.
- Filter products.

### Category Module

Responsibilities:

- Create categories.
- Update categories.
- Manage category hierarchy.

### Cart Module

Responsibilities:

- Add product to cart.
- Update quantity.
- Remove product.
- Get cart.
- Calculate totals.

### Order Module

Responsibilities:

- Create order.
- Get order details.
- Update order status.
- Cancel order.
- Order history.

### Payment Module

Responsibilities:

- Initiate payment.
- Verify payment.
- Process webhooks.
- Handle refunds.
- Store payment records.

### Notification Module

Responsibilities:

- Email notifications.
- Real-time notifications.
- Order notifications.
- Payment notifications.

---

## 52.3 API Endpoint Design

### Authentication APIs

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/v1/auth/register` | Register |
| POST | `/api/v1/auth/login` | Login |
| POST | `/api/v1/auth/logout` | Logout |
| POST | `/api/v1/auth/refresh` | Refresh token |
| POST | `/api/v1/auth/forgot-password` | Request password reset |
| POST | `/api/v1/auth/reset-password` | Reset password |

### User APIs

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/v1/users/me` | Get own profile |
| PATCH | `/api/v1/users/me` | Update own profile |
| GET | `/api/v1/users` | List users |
| GET | `/api/v1/users/:id` | Get user |
| DELETE | `/api/v1/users/:id` | Delete user |

### Product APIs

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/v1/products` | Get products |
| GET | `/api/v1/products/:id` | Get product |
| POST | `/api/v1/products` | Create product |
| PATCH | `/api/v1/products/:id` | Update product |
| DELETE | `/api/v1/products/:id` | Delete product |

### Cart APIs

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/v1/cart` | Get cart |
| POST | `/api/v1/cart/items` | Add item |
| PATCH | `/api/v1/cart/items/:id` | Update item |
| DELETE | `/api/v1/cart/items/:id` | Remove item |

### Order APIs

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/v1/orders` | Create order |
| GET | `/api/v1/orders` | Get own orders |
| GET | `/api/v1/orders/:id` | Get order |
| PATCH | `/api/v1/orders/:id/cancel` | Cancel order |

### Payment APIs

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/v1/payments` | Initiate payment |
| GET | `/api/v1/payments/:id` | Get payment |
| POST | `/api/v1/payments/webhook` | Payment provider webhook |

---

## 52.4 Production Request Flow

Suppose a customer places an order.

```text
              CLIENT
                 |
                 v
          POST /api/v1/orders
                 |
                 v
           AUTHENTICATION
                 |
                 v
             VALIDATION
                 |
                 v
             CONTROLLER
                 |
                 v
              SERVICE
                 |
        +--------+--------+
        |                 |
        v                 v
    INVENTORY          ORDER
    VALIDATION         REPOSITORY
        |                 |
        +--------+--------+
                 |
                 v
             DATABASE
                 |
                 v
             COMMIT
                 |
                 v
          OUTBOX EVENT
                 |
                 v
           BACKGROUND JOB
                 |
       +---------+---------+
       |                   |
       v                   v
   SEND EMAIL          NOTIFICATION
```

The payment workflow may require an additional state machine and asynchronous provider confirmation.

---

## 52.5 Example Order Service

```javascript
class OrderService {

    constructor({
        orderRepository,
        productRepository,
        sequelize
    }) {

        this.orderRepository = orderRepository;

        this.productRepository = productRepository;

        this.sequelize = sequelize;

    }

    async createOrder(userId, items) {

        return await this.sequelize.transaction(async (transaction) => {

            let total = 0;

            const orderItems = [];

            for (const item of items) {

                const product = await this.productRepository.findById(
                    item.productId,
                    transaction
                );

                if (!product) {

                    throw new Error("Product not found");

                }

                if (product.stock < item.quantity) {

                    throw new Error("Insufficient stock");

                }

                total += product.price * item.quantity;

                orderItems.push({

                    productId: product.id,

                    quantity: item.quantity,

                    price: product.price

                });

                await this.productRepository.reduceStock(
                    product.id,
                    item.quantity,
                    transaction
                );

            }

            return await this.orderRepository.create({

                userId,

                total,

                status: "pending",

                items: orderItems

            }, transaction);

        });

    }

}

module.exports = OrderService;
```

**Important:** This is illustrative. Production inventory updates should use atomic conditional updates or appropriate row locks to prevent two concurrent orders from overselling the same inventory. The repository must ensure every operation uses the same transaction.

---

# PART 50: FINAL BACKEND ENGINEERING CHECKLIST

## 53. Architecture

- [ ] Understand monolithic architecture.
- [ ] Understand layered architecture.
- [ ] Implement controller-service-repository pattern.
- [ ] Understand SOLID principles.
- [ ] Understand design patterns.
- [ ] Implement dependency injection.
- [ ] Understand Clean Architecture.
- [ ] Understand DDD fundamentals.
- [ ] Design modular backend applications.

## 54. Database

- [ ] Design relational databases.
- [ ] Implement transactions.
- [ ] Understand ACID properties.
- [ ] Create indexes.
- [ ] Optimize queries.
- [ ] Avoid N+1 queries.
- [ ] Configure connection pooling.
- [ ] Implement migrations.
- [ ] Understand replication.
- [ ] Understand sharding.

## 55. Authentication and Authorization

- [ ] Implement secure authentication.
- [ ] Implement refresh-token rotation.
- [ ] Implement session management.
- [ ] Implement RBAC.
- [ ] Implement permission-based authorization.
- [ ] Understand multi-tenancy.
- [ ] Implement API key authentication.

## 56. API Engineering

- [ ] Implement API versioning.
- [ ] Generate Swagger documentation.
- [ ] Implement pagination.
- [ ] Implement filtering and sorting.
- [ ] Implement idempotency.
- [ ] Maintain backward compatibility.

## 57. Background Processing

- [ ] Implement background jobs.
- [ ] Understand message queues.
- [ ] Use Redis.
- [ ] Implement caching.
- [ ] Implement cache invalidation.
- [ ] Implement scheduled jobs.
- [ ] Understand event-driven architecture.

## 58. Distributed Systems

- [ ] Understand distributed systems.
- [ ] Understand microservices.
- [ ] Compare monolith and microservices.
- [ ] Implement inter-service communication.
- [ ] Understand API gateways.
- [ ] Understand service discovery.
- [ ] Understand distributed transactions.
- [ ] Understand eventual consistency.
- [ ] Understand Saga Pattern.
- [ ] Understand Outbox Pattern.

## 59. Real-Time Systems

- [ ] Understand WebSocket.
- [ ] Implement Socket.IO.
- [ ] Implement real-time notifications.
- [ ] Implement rooms.
- [ ] Authenticate socket connections.
- [ ] Understand WebSocket scaling.

## 60. Production Engineering

- [ ] Implement centralized logging.
- [ ] Understand observability.
- [ ] Monitor application metrics.
- [ ] Understand distributed tracing.
- [ ] Implement production security.
- [ ] Understand high availability.
- [ ] Understand disaster recovery.
- [ ] Understand RPO and RTO.

---

# FINAL INTERVIEW REVISION

Here are 20 important questions to check your understanding of production backend development.

| # | Interview Question |
|---|---|
| 1 | What is the difference between monolithic and microservices architecture? |
| 2 | What is layered architecture? |
| 3 | Explain the controller-service-repository pattern. |
| 4 | What are SOLID principles? |
| 5 | What is dependency injection? |
| 6 | What is Clean Architecture? |
| 7 | What is Domain-Driven Design? |
| 8 | What is a database transaction? |
| 9 | Explain ACID properties. |
| 10 | What is database indexing? |
| 11 | What is connection pooling? |
| 12 | What is database replication? |
| 13 | What is multi-tenant architecture? |
| 14 | What is API versioning? |
| 15 | What is idempotency? |
| 16 | What is a message queue? |
| 17 | What is event-driven architecture? |
| 18 | Explain the Saga Pattern. |
| 19 | What is eventual consistency? |
| 20 | What is distributed tracing? |

---

# WHAT YOU HAVE COMPLETED

You have now completed the complete 15-phase Node.js roadmap.

| Phase | Topic | Level |
|---|---|---|
| 1 | Introduction to Node.js | Beginner |
| 2 | Node.js Environment & NPM | Beginner |
| 3 | Node.js Core Modules | Beginner |
| 4 | File System & Path Handling | Beginner |
| 5 | Asynchronous Programming | Intermediate |
| 6 | Event Loop & Node.js Architecture | Intermediate |
| 7 | HTTP & Web Server Fundamentals | Intermediate |
| 8 | Express.js Fundamentals | Intermediate |
| 9 | REST APIs & Backend Architecture | Intermediate |
| 10 | Database Integration | Intermediate |
| 11 | Authentication & Authorization | Advanced |
| 12 | Error Handling, Validation & Security | Advanced |
| 13 | Advanced Node.js Concepts | Advanced |
| 14 | Testing, Performance & Deployment | Advanced |
| 15 | Production-Level Backend Development | Professional |

## Recommended Practical Projects

To turn this knowledge into practical backend engineering skills, build these projects:

| Project | Concepts You Will Practice |
|---|---|
| Expense Tracker API | CRUD, authentication, SQL, validation |
| Blog API | Relationships, authorization, pagination |
| E-Commerce Backend | Orders, payments, inventory, transactions |
| Chat Application | WebSockets, Socket.IO, Redis |
| Job Processing System | Queues, workers, retries |
| Multi-Tenant CRM | RBAC, tenant isolation, database architecture |
| File Processing API | Streams, uploads, background jobs |
| Production SaaS Backend | Architecture, testing, CI/CD, monitoring |

**My recommendation:** Build the E-Commerce Backend first, using a modular monolith architecture. It will help you connect almost every important Node.js concept into one realistic application. After that, you can explore microservices by extracting selected modules into independent services.

**The roadmap is complete. The next step is practical implementation: building a production-style backend from an empty project to deployment.**