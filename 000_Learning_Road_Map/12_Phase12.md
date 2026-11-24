# PHASE 12: Error Handling, Validation & Security in Node.js

**Level:** Intermediate to Advanced  
**Goal:** Learn how to handle application errors, validate incoming data, protect APIs against common attacks, and build secure, reliable backend applications.

## Topics Covered

1. What is Error Handling?
2. Types of Errors in Node.js
3. JavaScript Errors
4. Synchronous Error Handling
5. Asynchronous Error Handling
6. try/catch
7. Custom Error Classes
8. Centralized Error Handling
9. Express Error Middleware
10. Operational vs Programming Errors
11. Request Validation
12. Schema Validation
13. Joi
14. Zod
15. Express Validator
16. Input Sanitization
17. SQL Injection
18. NoSQL Injection
19. Cross-Site Scripting (XSS)
20. Cross-Site Request Forgery (CSRF)
21. CORS
22. Helmet
23. Rate Limiting
24. Brute-Force Protection
25. Password Security
26. Environment Variable Security
27. File Upload Security
28. API Security Best Practices
29. Production Error Logging
30. Building a Secure REST API

---

# PART 1: ERROR HANDLING

## 1. What is Error Handling?

Error handling is the process of detecting, managing, and responding to errors that occur during application execution.

Errors can occur for many reasons:

- Database connection failure.
- Invalid user input.
- Missing files.
- Network problems.
- Invalid authentication credentials.
- External API failures.
- Programming mistakes.

Suppose you are developing a user registration API.

A user sends:

```json
{
    "name": "John",
    "email": "john@example.com",
    "password": "123456"
}
```

But the email already exists in the database.

Your application should not crash.

Instead, it should return a meaningful response:

```json
{
    "success": false,
    "message": "Email already registered"
}
```

This is error handling.

### Why Is Error Handling Important?

1. Prevents unexpected application crashes.
2. Provides meaningful responses to clients.
3. Helps developers debug problems.
4. Improves application reliability.
5. Prevents sensitive information from being exposed.
6. Makes applications easier to maintain.

---

## 2. Types of Errors in Node.js

There are several categories of errors.

### 2.1 Syntax Errors

Syntax errors occur when JavaScript code violates language syntax rules.

Example:

```javascript
const name = "John"

console.log(name
```

The closing parenthesis is missing.

Result:

```text
SyntaxError: missing ) after argument list
```

These errors are generally detected when JavaScript parses the code.

### 2.2 Reference Errors

A ReferenceError occurs when JavaScript tries to access an identifier that cannot be resolved.

Example:

```javascript
console.log(userName);
```

If `userName` has not been declared in the relevant scope:

```text
ReferenceError: userName is not defined
```

### 2.3 Type Errors

A TypeError occurs when an operation is performed on a value that does not support that operation.

Example:

```javascript
const user = null;

console.log(user.name);
```

Result:

```text
TypeError: Cannot read properties of null
```

### 2.4 Range Errors

A RangeError occurs when a value is outside the permitted range.

Example:

```javascript
const numbers = new Array(-5);
```

Result:

```text
RangeError: Invalid array length
```

### 2.5 Custom Errors

Developers can create their own errors for application-specific situations.

Example:

```javascript
throw new Error("User not found");
```

Custom errors are useful when handling business logic.

### Error Summary

| Error Type | Meaning |
|---|---|
| SyntaxError | Invalid JavaScript syntax |
| ReferenceError | Invalid or unresolved variable reference |
| TypeError | Invalid operation on a value |
| RangeError | Value outside allowed range |
| Custom Error | Application-defined error |

---

## 3. Synchronous Error Handling

A synchronous operation executes immediately, and the next statement waits for it to finish.

Example:

```javascript
function divide(a, b) {

    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }

    return a / b;

}

const result = divide(10, 0);

console.log(result);
```

The function throws an error.

If the error is not handled, it can terminate the current execution flow.

### Using try/catch

```javascript
function divide(a, b) {

    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }

    return a / b;

}

try {

    const result = divide(10, 0);

    console.log(result);

} catch (error) {

    console.log("Error:", error.message);

}
```

Output:

```text
Error: Cannot divide by zero
```

### How try/catch Works

```text
       TRY BLOCK
           |
           v
     EXECUTE CODE
           |
      +----+----+
      |         |
      v         v
   SUCCESS    ERROR
      |         |
      v         v
   CONTINUE   CATCH BLOCK
                 |
                 v
             HANDLE ERROR
```

### Syntax

```javascript
try {

    // Code that may throw an error

} catch (error) {

    // Handle the error

} finally {

    // Optional cleanup code

}
```

---

## 4. Understanding finally

The `finally` block executes after the `try` and `catch` processing, regardless of whether an error occurred.

Example:

```javascript
try {

    console.log("Opening file");

    throw new Error("Something went wrong");

} catch (error) {

    console.log(error.message);

} finally {

    console.log("Cleanup operation");

}
```

Output:

```text
Opening file
Something went wrong
Cleanup operation
```

### When Is finally Useful?

- Closing database connections.
- Releasing resources.
- Clearing temporary data.
- Closing files.
- Resetting application state.

**Important:** A `finally` block normally executes even when a `return` statement is used in `try` or `catch`. However, a `return` or `throw` inside `finally` can override an earlier return or error. Avoid doing this unless specifically intended.

---

## 5. Asynchronous Error Handling

Asynchronous operations introduce additional error-handling requirements.

Consider reading a file:

```javascript
const fs = require("fs");

fs.readFile("data.txt", "utf8", (error, data) => {

    if (error) {

        console.log("Error:", error.message);

        return;

    }

    console.log(data);

});
```

Here, the error is passed to the callback.

This is known as the **error-first callback pattern**.

### Error-First Callback

The first callback argument represents the error.

```javascript
function callback(error, result) {

    if (error) {

        // Handle error

        return;

    }

    // Use result

}
```

Many Node.js callback APIs follow this convention.

### Why Does try/catch Not Work Here?

Consider:

```javascript
const fs = require("fs");

try {

    fs.readFile("missing.txt", "utf8", (error, data) => {

        if (error) {
            throw error;
        }

        console.log(data);

    });

} catch (error) {

    console.log("Caught:", error.message);

}
```

This does not catch the asynchronous callback error.

Why?

Because the callback executes later, after the outer `try/catch` has already finished.

The error occurs outside the synchronous execution of that `try` block.

Correct approach:

```javascript
const fs = require("fs");

fs.readFile("missing.txt", "utf8", (error, data) => {

    if (error) {

        console.log("Caught:", error.message);

        return;

    }

    console.log(data);

});
```

---

## 6. Error Handling with Promises

Promises provide `.catch()` for handling rejected operations.

Example:

```javascript
const fs = require("fs/promises");

fs.readFile("missing.txt", "utf8")

    .then((data) => {

        console.log(data);

    })

    .catch((error) => {

        console.log("Error:", error.message);

    });
```

### Promise Error Handling

```javascript
Promise.resolve("Success")

    .then((result) => {

        console.log(result);

    })

    .catch((error) => {

        console.log(error.message);

    });
```

If a promise rejects, the nearest applicable `.catch()` handles the rejection.

An error thrown inside a `.then()` callback also turns the returned promise into a rejection.

Example:

```javascript
Promise.resolve()

    .then(() => {

        throw new Error("Something failed");

    })

    .catch((error) => {

        console.log(error.message);

    });
```

---

## 7. Error Handling with async/await

`async/await` allows asynchronous code to be written in a synchronous-looking style.

Use `try/catch` to handle rejected promises.

Example:

```javascript
const fs = require("fs/promises");

async function readFile() {

    try {

        const data = await fs.readFile(
            "data.txt",
            "utf8"
        );

        console.log(data);

    } catch (error) {

        console.log("Error:", error.message);

    }

}

readFile();
```

### Handling Multiple Async Operations

```javascript
async function getUser() {

    try {

        const user = await findUser();

        const orders = await findOrders(user.id);

        return {
            user,
            orders
        };

    } catch (error) {

        console.log(error.message);

        throw error;

    }

}
```

### Important: Rethrowing Errors

Sometimes you want to log an error but allow another layer to handle it.

Use:

```javascript
catch (error) {

    console.log(error);

    throw error;

}
```

This passes the error to the caller.

Without `throw error`, the function may resolve with `undefined` after catching the error.

---

# PART 2: CUSTOM AND CENTRALIZED ERROR HANDLING

## 8. What Are Custom Error Classes?

A custom error class allows you to create application-specific errors.

Instead of writing generic errors everywhere:

```javascript
throw new Error("User not found");
```

You can create a reusable error class.

### Create AppError Class

File: `utils/AppError.js`

```javascript
class AppError extends Error {

    constructor(message, statusCode) {

        super(message);

        this.statusCode = statusCode;

        this.status = statusCode >= 500
            ? "error"
            : "fail";

        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);

    }

}

module.exports = AppError;
```

### Usage

```javascript
const AppError = require("./utils/AppError");

function getUser(userId) {

    const user = null;

    if (!user) {

        throw new AppError(
            "User not found",
            404
        );

    }

    return user;

}
```

Output:

```text
User not found
404
```

### Why Use Custom Error Classes?

- Consistent error structure.
- Easier centralized handling.
- Better separation of business logic.
- Easier to identify operational errors.
- Reusable across controllers and services.

---

## 9. What Is Centralized Error Handling?

Centralized error handling means handling application errors in one common location instead of repeating error-response logic throughout the application.

### Without Centralized Error Handling

```javascript
app.get("/users", async (req, res) => {

    try {

        // Database operation

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

app.get("/products", async (req, res) => {

    try {

        // Database operation

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});
```

The same error-handling logic is repeated.

### With Centralized Error Handling

Controllers pass errors to a common error middleware.

```text
       API REQUEST
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
         DATABASE
            |
            v
          ERROR
            |
            v
       NEXT(error)
            |
            v
   CENTRAL ERROR MIDDLEWARE
            |
            v
      JSON ERROR RESPONSE
```

This improves consistency and maintainability.

---

## 10. Express Error-Handling Middleware

Express provides a special middleware signature for handling errors.

```javascript
(err, req, res, next)
```

It has four parameters.

Example:

```javascript
function errorHandler(err, req, res, next) {

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({

        success: false,

        message: err.message || "Internal Server Error"

    });

}

module.exports = errorHandler;
```

### Register Error Middleware

File: `app.js`

```javascript
const express = require("express");

const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

app.get("/test", (req, res, next) => {

    next(new Error("Something went wrong"));

});

app.use(errorHandler);

module.exports = app;
```

### Important

Error-handling middleware should be registered after routes and other middleware that may pass errors to it.

### How Does next(error) Work?

```javascript
next(error);
```

When you pass an error to `next()`, Express skips normal middleware and routes and looks for error-handling middleware.

---

## 11. Express 4 vs Express 5 Async Error Handling

This is important when working with Express applications.

### Express 4

Express 4 does not automatically forward rejected promises from async route handlers to error middleware.

Example:

```javascript
app.get("/users", async (req, res, next) => {

    try {

        const users = await User.findAll();

        res.json(users);

    } catch (error) {

        next(error);

    }

});
```

You need to forward errors manually or use an async wrapper.

### Express 5

Express 5 automatically forwards rejected promises returned by async route handlers and middleware to error-handling middleware.

Example:

```javascript
app.get("/users", async (req, res) => {

    const users = await User.findAll();

    res.json(users);

});
```

If `User.findAll()` rejects, Express 5 forwards the error automatically.

**Remember:** Always know which Express version your project uses.

---

## 12. Create an Async Error Wrapper

Although Express 5 handles rejected promises automatically, an async wrapper is useful when working with Express 4 or when you want a consistent pattern.

File: `utils/asyncHandler.js`

```javascript
const asyncHandler = (fn) => {

    return (req, res, next) => {

        Promise.resolve(fn(req, res, next))
            .catch(next);

    };

};

module.exports = asyncHandler;
```

### Usage

```javascript
const asyncHandler = require("../utils/asyncHandler");

router.get(
    "/users",
    asyncHandler(async (req, res) => {

        const users = await User.findAll();

        res.json(users);

    })
);
```

Now rejected promises are forwarded to Express error middleware.

---

## 13. Operational Errors vs Programming Errors

This is an important backend architecture concept.

### Operational Errors

Operational errors are expected failures that may occur during normal application operation.

Examples:

- User not found.
- Invalid password.
- Database temporarily unavailable.
- File not found.
- External API timeout.
- Duplicate email address.

These errors should be handled gracefully.

### Programming Errors

Programming errors are caused by bugs or incorrect assumptions in the code.

Examples:

- Accessing properties of `undefined`.
- Incorrect variable names.
- Incorrect function arguments.
- Invalid application logic.
- Unexpected null values.

### Difference

| Operational Errors | Programming Errors |
|---|---|
| Expected runtime failures | Bugs in application code |
| Often recoverable | Usually require code correction |
| Can be handled gracefully | Should be investigated and fixed |
| Example: User not found | Example: Undefined variable |

### Important

Do not assume every error is operational.

Unexpected programming errors should be logged, investigated, and handled safely.

For serious process-level failures, applications should generally be restarted under a process manager after graceful shutdown rather than blindly continuing in an unknown state.

---

# PART 3: REQUEST VALIDATION

## 14. What Is Request Validation?

Request validation is the process of checking whether incoming data meets the application's requirements.

Suppose a registration API expects:

```json
{
    "name": "John",
    "email": "john@example.com",
    "password": "StrongPassword123"
}
```

But the user sends:

```json
{
    "name": "",
    "email": "invalid-email",
    "password": "123"
}
```

This data should be rejected.

### Why Is Validation Important?

1. Prevents invalid data from entering the database.
2. Improves data consistency.
3. Prevents many application errors.
4. Reduces security risks.
5. Makes API behavior predictable.

### Frontend vs Backend Validation

| Frontend Validation | Backend Validation |
|---|---|
| Improves user experience | Enforces application rules |
| Provides immediate feedback | Protects backend resources |
| Can be bypassed | Must always be enforced |
| Example: Required field check | Example: Email format and uniqueness |

**Important:** Never rely only on frontend validation.

An attacker can send requests directly using Postman, curl, or custom scripts.

---

## 15. Types of Validation

### 15.1 Required Field Validation

Checks whether a required field exists.

```javascript
if (!req.body.name) {

    return res.status(400).json({
        message: "Name is required"
    });

}
```

### 15.2 Type Validation

Checks the data type.

```javascript
if (typeof req.body.age !== "number") {

    return res.status(400).json({
        message: "Age must be a number"
    });

}
```

### 15.3 Length Validation

```javascript
if (req.body.name.length < 3) {

    return res.status(400).json({
        message: "Name must contain at least 3 characters"
    });

}
```

### 15.4 Format Validation

Checks whether data follows a required format.

Example:

```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(req.body.email)) {

    return res.status(400).json({
        message: "Invalid email format"
    });

}
```

This is a basic format check, not a guarantee that an email address exists or can receive messages.

### 15.5 Business Rule Validation

Checks application-specific conditions.

Example:

```javascript
if (req.body.quantity <= 0) {

    return res.status(400).json({
        message: "Quantity must be greater than zero"
    });

}
```

---

## 16. What Is Schema Validation?

Schema validation means defining a structure and rules for incoming data.

Example user schema:

```javascript
{
    name: "string",
    email: "valid email",
    password: "minimum 8 characters",
    age: "number"
}
```

A validation library checks whether the submitted object follows the schema.

### Why Use Schema Validation?

Instead of writing many `if` conditions manually, you can define reusable validation schemas.

Popular libraries:

1. Joi.
2. Zod.
3. Express Validator.
4. Yup.

---

## 17. Joi Validation

Joi is a JavaScript library used to validate JavaScript objects against defined schemas.

### Install

```bash
npm install joi
```

### Create Validation Schema

```javascript
const Joi = require("joi");

const userSchema = Joi.object({

    name: Joi.string()
        .min(3)
        .max(50)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(8)
        .required(),

    age: Joi.number()
        .integer()
        .min(18)
        .optional()

});
```

### Validate Data

```javascript
const userData = {

    name: "John",

    email: "john@example.com",

    password: "StrongPassword123",

    age: 25

};

const { error, value } = userSchema.validate(userData);

if (error) {

    console.log(error.details);

} else {

    console.log(value);

}
```

### Understanding Joi Methods

| Method | Purpose |
|---|---|
| `Joi.string()` | String validation |
| `Joi.number()` | Number validation |
| `Joi.boolean()` | Boolean validation |
| `Joi.array()` | Array validation |
| `Joi.object()` | Object validation |
| `.required()` | Field must be present |
| `.optional()` | Field may be absent |
| `.min()` | Minimum length or value |
| `.max()` | Maximum length or value |
| `.email()` | Email format validation |
| `.valid()` | Restricts allowed values |
| `.integer()` | Requires an integer |
| `.pattern()` | Validates against a regular expression |

### Create Joi Middleware

File: `middleware/validate.js`

```javascript
const validate = (schema) => {

    return (req, res, next) => {

        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {

            return res.status(400).json({

                success: false,

                message: "Validation failed",

                errors: error.details.map((detail) => detail.message)

            });

        }

        req.body = value;

        next();

    };

};

module.exports = validate;
```

### Use Validation Middleware

```javascript
const express = require("express");

const Joi = require("joi");

const validate = require("../middleware/validate");

const router = express.Router();

const registerSchema = Joi.object({

    name: Joi.string().min(3).max(50).required(),

    email: Joi.string().email().required(),

    password: Joi.string().min(8).required()

});

router.post(
    "/register",
    validate(registerSchema),
    registerController
);
```

### What Is abortEarly?

```javascript
abortEarly: false
```

By default, Joi stops at the first validation error.

With `abortEarly: false`, it collects multiple validation errors.

### What Is stripUnknown?

```javascript
stripUnknown: true
```

This removes unknown fields from the validated value.

For example:

```json
{
    "name": "John",
    "email": "john@example.com",
    "isAdmin": true
}
```

If `isAdmin` is not part of the schema, it can be stripped.

However, you should still explicitly assign trusted fields in your controller or service. Do not blindly spread user input into database operations.

---

## 18. Zod Validation

Zod is a TypeScript-first schema validation library.

It is also widely used in JavaScript projects.

### Install

```bash
npm install zod
```

### Define Schema

```javascript
const { z } = require("zod");

const userSchema = z.object({

    name: z.string()
        .min(3)
        .max(50),

    email: z.string()
        .email(),

    password: z.string()
        .min(8),

    age: z.number()
        .int()
        .min(18)
        .optional()

});
```

### Validate Data

```javascript
const userData = {

    name: "John",

    email: "john@example.com",

    password: "StrongPassword123",

    age: 25

};

const result = userSchema.safeParse(userData);

if (!result.success) {

    console.log(result.error.issues);

} else {

    console.log(result.data);

}
```

### parse() vs safeParse()

`parse()` throws a validation error when the data is invalid.

```javascript
const result = userSchema.parse(userData);
```

`safeParse()` returns a result object instead of throwing.

```javascript
const result = userSchema.safeParse(userData);
```

This makes `safeParse()` convenient for middleware.

### Create Zod Middleware

```javascript
const validate = (schema) => {

    return (req, res, next) => {

        const result = schema.safeParse(req.body);

        if (!result.success) {

            return res.status(400).json({

                success: false,

                message: "Validation failed",

                errors: result.error.issues

            });

        }

        req.body = result.data;

        next();

    };

};

module.exports = validate;
```

---

## 19. Express Validator

Express Validator is a validation and sanitization library designed for Express applications.

### Install

```bash
npm install express-validator
```

### Example

```javascript
const {
    body,
    validationResult
} = require("express-validator");

const validateRegister = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .isEmail()
        .withMessage("Invalid email"),

    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(400).json({

                success: false,

                errors: errors.array()

            });

        }

        next();

    }

];
```

Usage:

```javascript
router.post(
    "/register",
    validateRegister,
    registerController
);
```

### Joi vs Zod vs Express Validator

| Feature | Joi | Zod | Express Validator |
|---|---|---|---|
| Primary purpose | Schema validation | Schema validation | Express validation |
| TypeScript support | Good | Excellent | Good |
| Schema reuse | Yes | Yes | Yes |
| Express integration | Middleware required | Middleware required | Direct |
| Type inference | Limited compared with Zod | Strong | Limited |
| Best suited for | General validation | JS/TS applications | Express request validation |

**Recommendation:** Learn Joi and Zod first. Both are useful beyond Express applications.

---

# PART 4: INPUT SANITIZATION

## 20. What Is Input Sanitization?

Input sanitization means cleaning or normalizing input data according to application requirements.

Validation and sanitization are related but different.

### Validation

Checks whether input is acceptable.

Example:

```text
Email: john@example.com

Is this a valid email format?
```

### Sanitization

Transforms input into a normalized or safer representation.

Example:

```text
"  JOHN@EXAMPLE.COM  "

       |

       v

"john@example.com"
```

### Example

```javascript
const email = req.body.email
    .trim()
    .toLowerCase();
```

### Common Sanitization Operations

- Trimming unnecessary whitespace.
- Converting email addresses to lowercase where appropriate.
- Normalizing phone numbers.
- Removing unsupported characters where the business rule requires it.
- Escaping output in the correct context.

**Important:** Sanitization is not a replacement for parameterized SQL queries, output encoding, or proper security controls.

Do not blindly remove characters from every input field. For example, users may legitimately use special characters in names, messages, and passwords.

---

# PART 5: COMMON SECURITY ATTACKS

## 21. What Is SQL Injection?

SQL Injection is an attack in which an attacker manipulates SQL queries by supplying malicious input.

Suppose you have a login query:

```javascript
const query = `
    SELECT * FROM users
    WHERE email = '${email}'
    AND password = '${password}'
`;
```

This directly inserts user input into the SQL statement.

An attacker might submit specially crafted input that changes the meaning of the query.

### Why Is This Dangerous?

An attacker may be able to:

- Bypass login checks.
- Read unauthorized records.
- Modify database records.
- Delete database data.
- Access sensitive information.

### Incorrect Approach

```javascript
const query = `SELECT * FROM users WHERE email = '${email}'`;
```

### Correct Approach: Parameterized Queries

Using `mysql2`:

```javascript
const [users] = await db.execute(
    "SELECT * FROM users WHERE email = ?",
    [email]
);
```

The parameter is treated as data rather than SQL syntax.

### Sequelize Example

```javascript
const user = await User.findOne({

    where: {
        email: email
    }

});
```

For raw SQL with Sequelize:

```javascript
const { QueryTypes } = require("sequelize");

const users = await sequelize.query(

    "SELECT * FROM users WHERE email = :email",

    {
        replacements: {
            email
        },

        type: QueryTypes.SELECT
    }

);
```

### Important Rules

- Use parameterized queries.
- Avoid string concatenation for SQL.
- Validate user input.
- Restrict database permissions.
- Never assume ORM usage automatically makes every query safe.

**Remember:** Prepared statements protect values, but dynamic column names and SQL keywords generally require explicit allowlisting.

---

## 22. What Is NoSQL Injection?

NoSQL injection is an attack where malicious input manipulates queries in a NoSQL database.

For example, MongoDB uses query objects.

### Incorrect Example

```javascript
const user = await User.findOne({

    email: req.body.email,

    password: req.body.password

});
```

This example is unsafe as an authentication design because it treats the supplied password as a database query field rather than verifying a stored password hash.

An attacker may submit:

```json
{
    "email": "john@example.com",
    "password": {
        "$ne": null
    }
}
```

If the application passes this object directly into a MongoDB query, the `$ne` operator may change the query's meaning.

### Correct Approach

Retrieve the user using a validated scalar email and then compare the password using bcrypt.

```javascript
const bcrypt = require("bcrypt");

const user = await User.findOne({

    email: req.body.email

});

if (!user) {

    return res.status(401).json({
        message: "Invalid credentials"
    });

}

const isMatch = await bcrypt.compare(
    req.body.password,
    user.password
);

if (!isMatch) {

    return res.status(401).json({
        message: "Invalid credentials"
    });

}
```

Also validate the request schema and reject unexpected object values.

### Prevention

- Validate input types.
- Do not pass arbitrary request objects into queries.
- Avoid accepting user-supplied query operators.
- Use allowlisted query fields.
- Keep database access controlled.

---

## 23. What Is Cross-Site Scripting (XSS)?

XSS stands for Cross-Site Scripting.

It occurs when an attacker injects malicious scripts into content that is later executed in another user's browser.

### Example

Suppose a website allows users to submit comments.

A malicious user submits:

```html
<script>
    alert("XSS Attack");
</script>
```

If the website inserts this content into HTML without proper escaping, the browser may execute the script.

### Types of XSS

#### 1. Stored XSS

Malicious content is saved in a database and later displayed to other users.

Example:

```text
User submits malicious comment
          |
          v
Comment saved in database
          |
          v
Another user opens page
          |
          v
Malicious script executes
```

#### 2. Reflected XSS

Malicious input is immediately reflected in a server-generated response.

Example:

An application takes an untrusted URL parameter and inserts it into HTML without escaping.

#### 3. DOM-Based XSS

The vulnerability occurs when frontend JavaScript uses untrusted data in an unsafe DOM operation.

Example:

```javascript
document.getElementById("output").innerHTML =
    location.search;
```

This can be dangerous if attacker-controlled data is interpreted as HTML.

### Prevention

1. Use context-appropriate output encoding.
2. Avoid unsafe `innerHTML` operations.
3. Use safe DOM APIs such as `textContent`.
4. Sanitize HTML when rich HTML input is genuinely required.
5. Use Content Security Policy (CSP).
6. Keep frontend libraries updated.
7. Use framework escaping correctly.

### React Example

Generally safe:

```jsx
function Comment({ comment }) {

    return <p>{comment}</p>;

}
```

React escapes text values rendered through JSX.

Potentially dangerous:

```jsx
<div
    dangerouslySetInnerHTML={{
        __html: comment
    }}
/>
```

Only use this with properly sanitized HTML from an appropriate sanitizer.

---

## 24. What Is Cross-Site Request Forgery (CSRF)?

CSRF stands for Cross-Site Request Forgery.

It occurs when an attacker tricks a user's browser into sending an unwanted request to a website where the user is already authenticated.

### Example

Suppose a user is logged into a banking application.

The browser has a valid authentication cookie.

The user visits a malicious website.

That website attempts to trigger a request to the banking application.

If the browser automatically attaches the authentication cookie and the application has insufficient CSRF protection, the request may be accepted.

### CSRF Flow

```text
        USER LOGS INTO BANK
                |
                v
       BROWSER STORES COOKIE
                |
                v
       USER VISITS ATTACKER SITE
                |
                v
       MALICIOUS REQUEST CREATED
                |
                v
       BROWSER SENDS REQUEST
                |
                v
       COOKIE ATTACHED AUTOMATICALLY
                |
                v
       BANK RECEIVES REQUEST
                |
                v
       CSRF VULNERABILITY
```

### Prevention

1. Use CSRF tokens.
2. Configure SameSite cookies appropriately.
3. Validate Origin and Referer headers where appropriate.
4. Require appropriate content types.
5. Avoid state-changing operations through GET requests.
6. Use secure cookie configuration.

### What Is a CSRF Token?

A CSRF token is an unpredictable value used to verify that a state-changing request originated from an expected application context.

Example:

```text
Frontend:
    |
    v
Receives CSRF Token
    |
    v
Sends Token With Request
    |
    v
Backend Validates Token
    |
    v
Accept or Reject
```

A CSRF token is different from an authentication token.

### XSS vs CSRF

| XSS | CSRF |
|---|---|
| Injects malicious scripts | Tricks browser into making unwanted requests |
| Targets application content and script execution | Exploits authenticated browser requests |
| Can steal tokens or perform actions | Can perform actions using existing credentials |
| Output encoding and CSP help prevent it | CSRF tokens and cookie policies help prevent it |

---

# PART 6: API SECURITY

## 25. What Is CORS?

CORS stands for **Cross-Origin Resource Sharing**.

It is a browser security mechanism that controls whether frontend JavaScript from one origin can access resources from another origin.

### What Is an Origin?

An origin consists of:

```text
Protocol + Domain + Port
```

Example:

```text
Frontend:
http://localhost:3000

Backend:
http://localhost:5000
```

These are different origins because their ports are different.

### Example Problem

Your React application runs on:

```text
http://localhost:3000
```

Your Express backend runs on:

```text
http://localhost:5000
```

The browser may block frontend JavaScript from reading the backend response if the backend does not provide the required CORS headers.

### Install CORS

```bash
npm install cors
```

### Enable CORS

```javascript
const cors = require("cors");

app.use(cors());
```

This allows broad cross-origin access. It is generally not the right production configuration for an API containing private user data.

### Configure Specific Origins

```javascript
const cors = require("cors");

app.use(cors({

    origin: "http://localhost:3000",

    methods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
    ],

    allowedHeaders: [
        "Content-Type",
        "Authorization"
    ]

}));
```

### CORS with Cookies

If your frontend and backend use cookies across origins:

```javascript
app.use(cors({

    origin: "https://frontend.example.com",

    credentials: true

}));
```

Frontend request:

```javascript
fetch("https://api.example.com/profile", {

    credentials: "include"

});
```

Important:

- The server must specify an explicit allowed origin.
- `Access-Control-Allow-Credentials` must be enabled.
- A wildcard origin (`*`) cannot be used with credentialed CORS requests.
- Cookie `SameSite` and `Secure` settings must also permit the intended deployment arrangement.

### Does CORS Protect the Backend from All Requests?

No.

CORS is primarily enforced by browsers.

It does not prevent requests from Postman, curl, backend scripts, or other non-browser clients.

Authentication, authorization, and server-side validation are still necessary.

---

## 26. What Is Helmet?

Helmet is an Express middleware package that helps improve application security by setting HTTP response headers.

### Install

```bash
npm install helmet
```

### Use Helmet

```javascript
const helmet = require("helmet");

app.use(helmet());
```

Helmet configures several security-related HTTP headers.

Examples include:

- Content-Security-Policy.
- X-Content-Type-Options.
- Strict-Transport-Security.
- Referrer-Policy.
- X-Frame-Options.

The exact defaults depend on the installed Helmet version and configuration.

### Why Use Helmet?

It helps protect against certain browser-based attack classes and misconfigurations.

However, Helmet is not a complete security solution.

You still need:

- Authentication.
- Authorization.
- Input validation.
- Output encoding.
- CSRF protection.
- Secure database queries.
- HTTPS.

---

## 27. What Is Rate Limiting?

Rate limiting restricts how many requests a client can make within a specified time period.

Suppose an API allows:

```text
100 requests per minute
```

If a client exceeds that limit, the server can reject additional requests temporarily.

### Why Is Rate Limiting Important?

- Prevents excessive requests.
- Reduces brute-force attacks.
- Protects server resources.
- Helps reduce abuse.
- Controls API consumption.

### Install

```bash
npm install express-rate-limit
```

### Example

```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({

    windowMs: 60 * 1000,

    limit: 100,

    message: {
        success: false,
        message: "Too many requests. Please try again later."
    }

});

app.use(limiter);
```

This limits clients to 100 requests per minute under the configured rate-limiter behavior.

### Apply Rate Limiting to Login

```javascript
const loginLimiter = rateLimit({

    windowMs: 15 * 60 * 1000,

    limit: 5,

    message: {
        success: false,
        message: "Too many login attempts"
    }

});

app.use("/api/auth/login", loginLimiter);
```

### Important Production Considerations

- Use a shared store such as Redis when running multiple server instances.
- Configure proxy trust correctly when behind a reverse proxy.
- Choose limits based on endpoint sensitivity.
- Avoid relying only on IP addresses.
- Consider account-based throttling for login attempts.
- Avoid locking accounts permanently based only on failed attempts, because attackers could abuse that to deny service to legitimate users.

---

## 28. What Is Brute-Force Protection?

A brute-force attack attempts many possible passwords or credentials until one works.

Example:

```text
Attempt 1: password123
Attempt 2: 123456
Attempt 3: admin123
Attempt 4: qwerty
Attempt 5: ...
```

### Prevention

1. Rate-limit login endpoints.
2. Use strong password policies.
3. Implement temporary throttling.
4. Monitor suspicious login activity.
5. Use MFA where appropriate.
6. Protect password-reset endpoints.
7. Avoid revealing whether an account exists.

### What Is MFA?

MFA stands for Multi-Factor Authentication.

It requires users to provide more than one authentication factor.

Common factors:

- Something you know: Password.
- Something you have: Authenticator app or hardware security key.
- Something you are: Biometric characteristic.

Example:

```text
Email + Password
       |
       v
    Verify
       |
       v
  OTP / Security Key
       |
       v
  Login Successful
```

---

# PART 7: PASSWORD AND CONFIGURATION SECURITY

## 29. Password Security Best Practices

Password security is not limited to hashing.

Follow these rules:

1. Use a secure password hashing algorithm such as Argon2id or bcrypt.
2. Use an appropriate cost factor.
3. Never store plain-text passwords.
4. Never log passwords.
5. Never return password hashes through APIs.
6. Require sufficiently strong passwords.
7. Use MFA for sensitive accounts.
8. Rate-limit login attempts.
9. Use secure password-reset tokens.
10. Invalidate appropriate sessions after password changes.

### Example: Never Return Password

Incorrect:

```javascript
res.json(user);
```

If the database record includes a password hash, it may be exposed.

Better:

```javascript
res.json({

    id: user.id,

    name: user.name,

    email: user.email,

    role: user.role

});
```

Or explicitly exclude the password field in your database query or response serializer.

---

## 30. Environment Variable Security

Environment variables are used to configure applications without hardcoding sensitive values.

Example:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=secret
JWT_SECRET=very_long_secret
```

Read them using:

```javascript
process.env.JWT_SECRET
```

### Why Use Environment Variables?

- Separate configuration from source code.
- Keep credentials out of code.
- Support different environments.
- Simplify deployment configuration.

### Incorrect Approach

```javascript
const JWT_SECRET = "mysecret123";
```

This exposes secrets in source code.

### Correct Approach

```javascript
const JWT_SECRET = process.env.JWT_SECRET;
```

### .gitignore

Add:

```gitignore
.env
.env.*
!.env.example
node_modules/
```

### Create .env.example

```env
PORT=3000

DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=

JWT_SECRET=
```

This provides a configuration template without exposing actual secrets.

### Important

Environment variables are not automatically secure.

- Restrict access to production secrets.
- Use a secrets manager when appropriate.
- Rotate compromised credentials.
- Avoid printing environment variables in logs.
- Validate required configuration during application startup.

---

# PART 8: FILE UPLOAD SECURITY

## 31. What Is File Upload Security?

Many applications allow users to upload files.

Examples:

- Profile pictures.
- Documents.
- PDFs.
- Excel files.
- Product images.
- Videos.

File uploads create security risks if not handled carefully.

### Common Risks

1. Uploading malicious files.
2. Uploading executable scripts.
3. Uploading extremely large files.
4. Uploading files with misleading extensions.
5. Path traversal attacks.
6. Malware distribution.
7. Storage exhaustion.

### Install Multer

```bash
npm install multer
```

Multer is commonly used to handle `multipart/form-data` uploads in Express.

### Basic Upload Example

```javascript
const express = require("express");

const multer = require("multer");

const router = express.Router();

const upload = multer({

    dest: "uploads/"

});

router.post(
    "/upload",
    upload.single("file"),
    (req, res) => {

        res.json({

            success: true,

            message: "File uploaded successfully",

            file: req.file

        });

    }
);
```

### Important Production Security Measures

#### 1. Limit File Size

```javascript
const upload = multer({

    dest: "uploads/",

    limits: {

        fileSize: 5 * 1024 * 1024

    }

});
```

This sets a 5 MB file-size limit.

#### 2. Restrict File Types

Do not trust the filename extension or client-provided MIME type alone.

For example:

```javascript
const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp"
];
```

A secure implementation should inspect the actual file content using file-signature detection and validate it against the allowed types.

#### 3. Generate Server-Side Filenames

Do not use the original filename directly as the storage path.

Generate random filenames.

#### 4. Store Files Safely

Avoid storing user uploads in a publicly executable directory.

Use controlled storage such as:

- Amazon S3.
- Cloudinary.
- Private object storage.
- Dedicated file storage.

#### 5. Scan Files When Necessary

For applications handling sensitive documents, malware scanning may be appropriate.

---

# PART 9: API SECURITY BEST PRACTICES

## 32. API Security Checklist

When building a production backend, follow these practices.

| Security Area | Best Practice |
|---|---|
| Authentication | Secure authentication mechanism |
| Authorization | Verify user permissions |
| Passwords | Use bcrypt or Argon2id |
| Database | Parameterized queries |
| Input | Validate incoming data |
| Output | Encode untrusted content |
| HTTP | Use HTTPS |
| Cookies | HttpOnly, Secure, appropriate SameSite |
| CSRF | Implement protection for cookie-authenticated state-changing requests |
| XSS | Use safe output handling and CSP |
| CORS | Allow only trusted origins |
| Rate Limiting | Restrict excessive requests |
| Headers | Use Helmet |
| Secrets | Use environment variables or secret management |
| File Upload | Validate content and size |
| Logging | Avoid logging sensitive information |
| Errors | Hide internal implementation details |
| Dependencies | Keep packages updated |

---

# PART 10: PRODUCTION ERROR LOGGING

## 33. What Is Logging?

Logging is the process of recording application events.

Logs help developers understand what happened inside an application.

Example:

```javascript
console.log("Server started");

console.error("Database connection failed");
```

For small applications, console logging may be sufficient during development.

Production applications generally need structured logging.

### Common Log Levels

| Level | Meaning |
|---|---|
| `error` | Serious failures |
| `warn` | Potential problems |
| `info` | Important application events |
| `http` | HTTP request activity |
| `verbose` | Detailed operational information |
| `debug` | Debugging details |
| `silly` | Extremely detailed information |

### Popular Logging Libraries

- Winston.
- Pino.
- Morgan.

### Install Winston

```bash
npm install winston
```

### Basic Winston Logger

File: `utils/logger.js`

```javascript
const winston = require("winston");

const logger = winston.createLogger({

    level: "info",

    format: winston.format.combine(

        winston.format.timestamp(),

        winston.format.json()

    ),

    transports: [

        new winston.transports.Console()

    ]

});

module.exports = logger;
```

### Usage

```javascript
const logger = require("./utils/logger");

logger.info("Server started");

logger.warn("High memory usage");

logger.error("Database connection failed");
```

### Why Structured Logging?

Instead of:

```text
Something went wrong
```

Structured logs can contain:

```json
{
    "level": "error",
    "message": "Database connection failed",
    "timestamp": "2026-11-24T18:00:00.000Z"
}
```

This makes logs easier to search and analyze.

### Important Logging Rules

Never log:

- Passwords.
- Authentication tokens.
- API keys.
- Database credentials.
- Full payment-card details.
- Sensitive personal information.

Use request IDs or correlation IDs to trace requests across services.

---

# PART 11: COMPLETE SECURE REST API EXAMPLE

Now let's combine several concepts.

We will create a simple product API using:

- Node.js.
- Express.
- Joi.
- Helmet.
- CORS.
- Express Rate Limit.
- Centralized Error Handling.
- Custom Error Class.

This example uses an in-memory array so that we can focus on validation, error handling, and security middleware.

## 34. Project Structure

```text
secure-api/
│
├── src/
│   │
│   ├── controllers/
│   │   └── productController.js
│   │
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   ├── validate.js
│   │   └── notFound.js
│   │
│   ├── routes/
│   │   └── productRoutes.js
│   │
│   ├── schemas/
│   │   └── productSchema.js
│   │
│   ├── utils/
│   │   ├── AppError.js
│   │   └── asyncHandler.js
│   │
│   ├── app.js
│   │
│   └── server.js
│
├── .env
├── .gitignore
└── package.json
```

## 35. Install Packages

```bash
npm init -y
```

```bash
npm install express joi helmet cors express-rate-limit dotenv
```

## 36. Create Custom Error Class

File: `src/utils/AppError.js`

```javascript
class AppError extends Error {

    constructor(message, statusCode) {

        super(message);

        this.statusCode = statusCode;

        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);

    }

}

module.exports = AppError;
```

## 37. Create Async Handler

File: `src/utils/asyncHandler.js`

```javascript
const asyncHandler = (fn) => {

    return (req, res, next) => {

        Promise.resolve(fn(req, res, next))
            .catch(next);

    };

};

module.exports = asyncHandler;
```

## 38. Create Product Schema

File: `src/schemas/productSchema.js`

```javascript
const Joi = require("joi");

const productSchema = Joi.object({

    name: Joi.string()
        .min(3)
        .max(100)
        .required(),

    price: Joi.number()
        .positive()
        .required(),

    description: Joi.string()
        .max(500)
        .allow("")
        .optional(),

    category: Joi.string()
        .required()

});

module.exports = productSchema;
```

## 39. Create Validation Middleware

File: `src/middleware/validate.js`

```javascript
const AppError = require("../utils/AppError");

const validate = (schema) => {

    return (req, res, next) => {

        const { error, value } = schema.validate(req.body, {

            abortEarly: false,

            stripUnknown: true

        });

        if (error) {

            const messages = error.details.map(
                detail => detail.message
            );

            return next(
                new AppError(messages.join(", "), 400)
            );

        }

        req.body = value;

        next();

    };

};

module.exports = validate;
```

## 40. Create Product Controller

File: `src/controllers/productController.js`

```javascript
const AppError = require("../utils/AppError");

const asyncHandler = require("../utils/asyncHandler");

let products = [];

let nextId = 1;

// GET ALL PRODUCTS
exports.getProducts = asyncHandler(async (req, res) => {

    res.status(200).json({

        success: true,

        data: products

    });

});

// GET PRODUCT BY ID
exports.getProductById = asyncHandler(async (req, res, next) => {

    const product = products.find(
        item => item.id === Number(req.params.id)
    );

    if (!product) {

        return next(
            new AppError("Product not found", 404)
        );

    }

    res.status(200).json({

        success: true,

        data: product

    });

});

// CREATE PRODUCT
exports.createProduct = asyncHandler(async (req, res) => {

    const product = {

        id: nextId++,

        name: req.body.name,

        price: req.body.price,

        description: req.body.description || "",

        category: req.body.category

    };

    products.push(product);

    res.status(201).json({

        success: true,

        message: "Product created successfully",

        data: product

    });

});

// UPDATE PRODUCT
exports.updateProduct = asyncHandler(async (req, res, next) => {

    const product = products.find(
        item => item.id === Number(req.params.id)
    );

    if (!product) {

        return next(
            new AppError("Product not found", 404)
        );

    }

    Object.assign(product, req.body);

    res.status(200).json({

        success: true,

        message: "Product updated successfully",

        data: product

    });

});

// DELETE PRODUCT
exports.deleteProduct = asyncHandler(async (req, res, next) => {

    const index = products.findIndex(
        item => item.id === Number(req.params.id)
    );

    if (index === -1) {

        return next(
            new AppError("Product not found", 404)
        );

    }

    products.splice(index, 1);

    res.status(200).json({

        success: true,

        message: "Product deleted successfully"

    });

});
```

## 41. Create Product Routes

File: `src/routes/productRoutes.js`

```javascript
const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");

const validate = require("../middleware/validate");

const productSchema = require("../schemas/productSchema");

router.get("/", productController.getProducts);

router.get("/:id", productController.getProductById);

router.post(
    "/",
    validate(productSchema),
    productController.createProduct
);

router.put(
    "/:id",
    validate(productSchema),
    productController.updateProduct
);

router.delete(
    "/:id",
    productController.deleteProduct
);

module.exports = router;
```

## 42. Create Not Found Middleware

File: `src/middleware/notFound.js`

```javascript
const AppError = require("../utils/AppError");

function notFound(req, res, next) {

    next(
        new AppError("Route not found", 404)
    );

}

module.exports = notFound;
```

## 43. Create Central Error Handler

File: `src/middleware/errorHandler.js`

```javascript
const logger = require("../utils/logger");

function errorHandler(err, req, res, next) {

    const statusCode = err.statusCode || 500;

    if (statusCode >= 500) {

        logger.error(err.message, {
            stack: err.stack
        });

    } else {

        logger.warn(err.message);

    }

    res.status(statusCode).json({

        success: false,

        message: statusCode >= 500
            ? "Internal Server Error"
            : err.message

    });

}

module.exports = errorHandler;
```

For this example, create the `logger.js` file using the Winston implementation from Section 33 and install Winston:

```bash
npm install winston
```

## 44. Create app.js

File: `src/app.js`

```javascript
const express = require("express");

const helmet = require("helmet");

const cors = require("cors");

const rateLimit = require("express-rate-limit");

const productRoutes = require("./routes/productRoutes");

const notFound = require("./middleware/notFound");

const errorHandler = require("./middleware/errorHandler");

const app = express();

// SECURITY HEADERS
app.use(helmet());

// CORS
app.use(cors({

    origin: "http://localhost:3000"

}));

// JSON BODY PARSER
app.use(express.json({
    limit: "10kb"
}));

// RATE LIMITING
const limiter = rateLimit({

    windowMs: 60 * 1000,

    limit: 100

});

app.use(limiter);

// HEALTH CHECK
app.get("/health", (req, res) => {

    res.json({

        success: true,

        message: "API is running"

    });

});

// PRODUCT ROUTES
app.use("/api/products", productRoutes);

// NOT FOUND
app.use(notFound);

// CENTRAL ERROR HANDLER
app.use(errorHandler);

module.exports = app;
```

## 45. Create server.js

File: `src/server.js`

```javascript
require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});
```

### Run Application

```bash
node --watch src/server.js
```

### Test API

Create product:

```http
POST http://localhost:3000/api/products
```

Body:

```json
{
    "name": "Laptop",
    "price": 75000,
    "description": "Gaming laptop",
    "category": "Electronics"
}
```

Invalid request:

```json
{
    "name": "A",
    "price": -100,
    "category": ""
}
```

The validation middleware will reject this request.

### Important Limitations

This is a learning example, not a production-ready API.

Before production:

- Replace the in-memory array with a database.
- Validate route parameters.
- Add authentication and authorization.
- Configure CORS for actual trusted origins.
- Add proper logging and monitoring.
- Configure rate limiting with a shared store if running multiple instances.
- Add request-size and resource limits.
- Add security tests.
- Use a production process manager and deployment configuration.

---

# 46. Common Mistakes to Avoid

| Mistake | Correct Approach |
|---|---|
| Storing plain-text passwords | Hash passwords |
| Trusting frontend validation | Validate on backend |
| Using SQL string concatenation | Use parameterized queries |
| Passing request objects directly to database queries | Validate and select allowed fields |
| Exposing stack traces | Return safe error messages |
| Using `try/catch` around asynchronous callbacks and expecting it to catch later errors | Handle callback errors directly |
| Ignoring rejected promises | Use `.catch()` or `try/catch` |
| Allowing every CORS origin without considering requirements | Configure trusted origins |
| No rate limiting | Apply endpoint-specific limits |
| Trusting uploaded file extensions | Inspect file content |
| Logging credentials | Redact sensitive data |
| Using JWT payload as encrypted data | Remember signed JWT payloads are readable |
| Relying only on Helmet | Implement layered security |
| Ignoring CSRF in cookie-based authentication | Implement appropriate CSRF defenses |

---

# 47. Important Interview Questions and Answers

### Q1. What is error handling?

Error handling is the process of detecting, managing, and responding to application errors.

### Q2. What are the common types of JavaScript errors?

SyntaxError, ReferenceError, TypeError, RangeError, and custom errors.

### Q3. What is try/catch?

It is a JavaScript mechanism used to handle exceptions.

### Q4. What is the purpose of finally?

It executes after try/catch processing and is commonly used for cleanup.

### Q5. Why doesn't try/catch catch asynchronous callback errors?

Because the callback executes later, after the outer synchronous try/catch has finished.

### Q6. How do you handle errors in Promises?

Using `.catch()`.

### Q7. How do you handle errors with async/await?

Using try/catch.

### Q8. What is a custom error class?

A class that extends `Error` and provides application-specific error properties.

### Q9. What is centralized error handling?

Handling application errors through one common middleware or handler.

### Q10. What is Express error middleware?

Middleware with the signature `(err, req, res, next)`.

### Q11. What is the difference between Express 4 and Express 5 async error handling?

Express 5 automatically forwards rejected promises from async route handlers. Express 4 generally requires explicit forwarding or an async wrapper.

### Q12. What is the difference between operational and programming errors?

Operational errors are expected runtime failures, while programming errors are bugs in application code.

### Q13. What is request validation?

Checking whether incoming request data meets application requirements.

### Q14. What is schema validation?

Defining data structure and validation rules in a reusable schema.

### Q15. What is Joi?

A JavaScript schema validation library.

### Q16. What is Zod?

A TypeScript-first schema validation library.

### Q17. What is Express Validator?

A middleware-based validation and sanitization library for Express.

### Q18. What is the difference between validation and sanitization?

Validation checks whether data is acceptable. Sanitization transforms or normalizes data.

### Q19. What is SQL Injection?

An attack that manipulates SQL queries through malicious input.

### Q20. How can SQL Injection be prevented?

Using parameterized queries, validation, and restricted database permissions.

### Q21. What is NoSQL Injection?

An attack that manipulates NoSQL queries through malicious input.

### Q22. What is XSS?

Cross-Site Scripting is an attack where malicious scripts are injected into web content and executed in a user's browser.

### Q23. What are the three types of XSS?

Stored XSS, Reflected XSS, and DOM-Based XSS.

### Q24. What is CSRF?

An attack that tricks a user's browser into making an unwanted authenticated request.

### Q25. What is the difference between XSS and CSRF?

XSS injects malicious scripts into application content. CSRF exploits authenticated browser requests to perform unwanted actions.

### Q26. What is CORS?

Cross-Origin Resource Sharing is a browser mechanism that controls cross-origin access to resources.

### Q27. Does CORS protect an API from Postman requests?

No. CORS is primarily a browser-enforced mechanism.

### Q28. What is Helmet?

Helmet is Express middleware that configures security-related HTTP response headers.

### Q29. What is rate limiting?

Restricting the number of requests a client can make within a given time period.

### Q30. What is brute-force protection?

Measures designed to prevent attackers from repeatedly guessing credentials.

### Q31. What is MFA?

Multi-Factor Authentication requires more than one authentication factor.

### Q32. Why should we use environment variables?

To separate configuration and secrets from application source code.

### Q33. What is file upload validation?

Checking uploaded file size, type, content, and other constraints before accepting it.

### Q34. What is structured logging?

Recording application events in a consistent machine-readable format, often JSON.

### Q35. Why should we not expose stack traces in production?

They may reveal internal implementation details, file paths, dependencies, and sensitive information.

---

# 48. Phase 12 Cheat Sheet

### Error Handling

```javascript
try {

    // Risky operation

} catch (error) {

    console.error(error.message);

} finally {

    // Cleanup

}
```

### Async Error Handling

```javascript
async function getData() {

    try {

        return await fetchData();

    } catch (error) {

        throw error;

    }

}
```

### Express Error Middleware

```javascript
app.use((err, req, res, next) => {

    res.status(err.statusCode || 500).json({

        success: false,

        message: err.message || "Internal Server Error"

    });

});
```

### Joi Validation

```javascript
const schema = Joi.object({

    name: Joi.string().required(),

    email: Joi.string().email().required()

});
```

### SQL Injection Prevention

```javascript
const [users] = await db.execute(

    "SELECT * FROM users WHERE email = ?",

    [email]

);
```

### Helmet

```javascript
app.use(require("helmet")());
```

### CORS

```javascript
app.use(cors({

    origin: "https://example.com"

}));
```

### Rate Limiting

```javascript
app.use(rateLimit({

    windowMs: 60 * 1000,

    limit: 100

}));
```

### Winston

```javascript
logger.error("Something went wrong");

logger.warn("Warning");

logger.info("Application started");
```

---

# 49. Phase 12 Completion Checklist

Before moving to Phase 13, make sure you can:

- [ ] Understand error handling.
- [ ] Identify common JavaScript errors.
- [ ] Handle synchronous errors.
- [ ] Handle callback errors.
- [ ] Handle Promise rejections.
- [ ] Handle async/await errors.
- [ ] Use try/catch/finally.
- [ ] Create custom error classes.
- [ ] Implement centralized error handling.
- [ ] Understand Express error middleware.
- [ ] Understand Express 4 vs Express 5 error handling.
- [ ] Understand operational and programming errors.
- [ ] Implement request validation.
- [ ] Understand schema validation.
- [ ] Use Joi.
- [ ] Use Zod.
- [ ] Use Express Validator.
- [ ] Understand input sanitization.
- [ ] Understand SQL Injection.
- [ ] Prevent SQL Injection.
- [ ] Understand NoSQL Injection.
- [ ] Understand XSS.
- [ ] Understand CSRF.
- [ ] Understand CORS.
- [ ] Configure Helmet.
- [ ] Implement rate limiting.
- [ ] Understand brute-force protection.
- [ ] Secure passwords.
- [ ] Protect environment variables.
- [ ] Implement file upload restrictions.
- [ ] Use structured logging.
- [ ] Build a secure REST API.

---

# Practical Projects

| Project | Concepts to Practice |
|---|---|
| Centralized Error Handler | Custom errors, Express middleware |
| User Registration API | Joi, bcrypt, validation |
| Secure Login API | Authentication, rate limiting |
| Product Management API | CRUD, validation, error handling |
| File Upload API | Multer, file restrictions |
| Secure REST API | Helmet, CORS, rate limiting |
| Logging System | Winston, structured logs |
| Secure Backend Project | Combine all Phase 12 concepts |

---

# What Comes Next?

## PHASE 13: Advanced Node.js Concepts

In Phase 13, we will explore how Node.js works internally and learn advanced runtime capabilities.

Topics:

1. Node.js Architecture Deep Dive.
2. V8 Engine Internals.
3. Libuv Internals.
4. Event Loop Deep Dive.
5. EventEmitter.
6. Streams.
7. Readable Streams.
8. Writable Streams.
9. Duplex Streams.
10. Transform Streams.
11. Backpressure.
12. Buffers.
13. Binary Data Handling.
14. Child Processes.
15. `exec()`, `spawn()`, `fork()`.
16. Worker Threads.
17. Clustering.
18. Process Management.
19. Memory Management.
20. Garbage Collection.
21. Memory Leaks.
22. Caching.
23. Redis Fundamentals.
24. WebSockets.
25. Real-Time Communication.
26. Graceful Shutdown.
27. Performance Optimization.
28. Building Advanced Node.js Applications.

**Key takeaway from Phase 12:** A reliable backend does more than process successful requests. It validates incoming data, handles failures consistently, protects resources, and prevents unauthorized or malicious operations.