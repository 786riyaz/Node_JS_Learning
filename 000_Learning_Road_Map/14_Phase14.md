# PHASE 14: Testing, Performance & Deployment in Node.js

**Level:** Advanced  
**Goal:** Learn how to test Node.js applications, debug problems, measure performance, perform load testing, containerize applications, configure production servers, and deploy backend applications.

In previous phases, you learned how to build Node.js applications, create REST APIs, integrate databases, implement authentication, handle errors, and use advanced Node.js features.

Now you will learn how professional development teams test, optimize, deploy, and maintain backend applications in production.

## Topics Covered

### Testing
1. Software Testing Fundamentals
2. Types of Software Testing
3. Unit Testing
4. Integration Testing
5. End-to-End Testing
6. Test-Driven Development (TDD)
7. Jest
8. Node.js Built-in Test Runner
9. Supertest
10. Mocking and Spying
11. Test Coverage
12. API Testing

### Debugging & Performance
13. Debugging Node.js
14. Node.js Inspector
15. Chrome DevTools
16. Performance Profiling
17. CPU Profiling
18. Memory Profiling
19. Load Testing
20. Stress Testing
21. Artillery
22. Autocannon

### Deployment
23. Production Environment
24. PM2
25. Docker
26. Dockerfile
27. Docker Compose
28. Nginx
29. Reverse Proxy
30. Environment Configuration
31. CI/CD
32. GitHub Actions
33. AWS Deployment
34. VPS Deployment
35. Production Monitoring
36. Production Deployment Checklist

---

# PART 1: SOFTWARE TESTING FUNDAMENTALS

## 1. What Is Software Testing?

Software testing is the process of checking whether an application works as expected.

It involves executing application code, verifying results, and identifying defects.

Suppose you have created a user registration API.

Expected behavior:

- User can register with valid information.
- User cannot register with an invalid email.
- User cannot register with an existing email.
- Password must be hashed.
- User information must be saved in the database.

Testing verifies that these requirements are working correctly.

### Why Is Testing Important?

1. Finds bugs before production.
2. Prevents existing functionality from breaking.
3. Improves application reliability.
4. Reduces debugging costs.
5. Makes code easier to maintain.
6. Helps developers refactor confidently.
7. Improves application quality.

### Manual Testing vs Automated Testing

| Manual Testing | Automated Testing |
|---|---|
| Human manually tests functionality | Tests execute through code |
| Requires repetitive manual work | Can run repeatedly |
| Useful for exploratory testing | Useful for regression testing |
| Can be time-consuming | Faster for repeated test cases |
| Example: Testing API through Postman | Example: Testing API using Jest and Supertest |

Both approaches are useful in professional development.

---

## 2. Types of Software Testing

There are several types of testing.

The most important for backend development are:

1. Unit Testing.
2. Integration Testing.
3. End-to-End Testing.
4. Regression Testing.
5. Performance Testing.
6. Security Testing.

Let's understand each one.

### 2.1 Unit Testing

Unit testing means testing a small, isolated part of an application.

Examples:

- Testing a function.
- Testing a calculation.
- Testing a validation utility.
- Testing a password utility.

Example:

```javascript
function add(a, b) {

    return a + b;

}
```

Expected behavior:

```text
add(10, 20) = 30
```

A unit test checks this behavior.

### 2.2 Integration Testing

Integration testing verifies whether multiple application components work correctly together.

Example:

```text
API REQUEST
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
RESPONSE
```

An integration test might verify that:

- The API receives a request.
- The controller calls the service.
- The database saves the user.
- The API returns the correct response.

### 2.3 End-to-End Testing

End-to-end testing verifies a complete user workflow.

Example:

```text
USER REGISTRATION
        |
        v
USER LOGIN
        |
        v
GET PROFILE
        |
        v
UPDATE PROFILE
        |
        v
LOGOUT
```

It checks whether the complete flow works correctly.

### 2.4 Regression Testing

Regression testing ensures that new code changes have not broken existing functionality.

Example:

You update the login API.

You should verify that:

- Registration still works.
- Login still works.
- Password validation still works.
- Protected routes still work.

### 2.5 Performance Testing

Performance testing measures how an application behaves under different workloads.

Examples:

- How many requests can the API handle?
- How much memory does the server consume?
- How long does an API request take?
- What happens when 1,000 users access the application?

### 2.6 Security Testing

Security testing identifies vulnerabilities.

Examples:

- SQL injection.
- Authentication bypass.
- Authorization failures.
- XSS.
- CSRF.
- Insecure file uploads.

### Testing Pyramid

```text
                 /\
                /  \
               / E2E\
              /------\
             /        \
            /INTEGRATION\
           /------------\
          /              \
         /  UNIT TESTING  \
        /__________________\
```

A common testing strategy is:

- Many unit tests.
- A reasonable number of integration tests.
- Fewer end-to-end tests.

This is because unit tests are generally faster and easier to isolate.

---

# PART 2: UNIT TESTING

## 3. What Is Unit Testing?

Unit testing verifies individual functions or components independently.

Consider this function:

File: `utils/calculator.js`

```javascript
function add(a, b) {

    return a + b;

}

function subtract(a, b) {

    return a - b;

}

function multiply(a, b) {

    return a * b;

}

module.exports = {
    add,
    subtract,
    multiply
};
```

We want to test these functions.

Expected results:

```text
add(10, 20)       = 30
subtract(20, 10)  = 10
multiply(5, 5)    = 25
```

Instead of manually checking these results every time, we can automate the tests.

---

## 4. What Is Jest?

Jest is a JavaScript testing framework developed by Meta.

It is commonly used for:

- Unit testing.
- Integration testing.
- Mocking.
- Spying.
- Code coverage.

### Install Jest

```bash
npm install --save-dev jest
```

### Configure package.json

```json
{
    "scripts": {
        "test": "jest"
    }
}
```

### Project Structure

```text
project/
│
├── src/
│   └── utils/
│       └── calculator.js
│
├── tests/
│   └── calculator.test.js
│
└── package.json
```

Jest automatically discovers common test files ending with:

```text
.test.js
.spec.js
```

### Create Your First Test

File: `tests/calculator.test.js`

```javascript
const {
    add,
    subtract,
    multiply
} = require("../src/utils/calculator");

test("should add two numbers", () => {

    expect(add(10, 20)).toBe(30);

});

test("should subtract two numbers", () => {

    expect(subtract(20, 10)).toBe(10);

});

test("should multiply two numbers", () => {

    expect(multiply(5, 5)).toBe(25);

});
```

Run:

```bash
npm test
```

Expected result:

```text
PASS tests/calculator.test.js

✓ should add two numbers
✓ should subtract two numbers
✓ should multiply two numbers
```

### Understanding test()

```javascript
test("should add two numbers", () => {

    expect(add(10, 20)).toBe(30);

});
```

It has three important parts:

**1. Test name**

```javascript
"should add two numbers"
```

Describes what is being tested.

**2. Actual function**

```javascript
add(10, 20)
```

Executes the code.

**3. Expected result**

```javascript
.toBe(30)
```

Checks whether the actual result matches the expected result.

---

## 5. Important Jest Functions

### test()

Defines a test case.

```javascript
test("test description", () => {

    // Test code

});
```

### describe()

Groups related test cases.

```javascript
describe("Calculator", () => {

    test("addition", () => {

        expect(10 + 20).toBe(30);

    });

    test("subtraction", () => {

        expect(20 - 10).toBe(10);

    });

});
```

### expect()

Defines the expected result.

```javascript
expect(10 + 20).toBe(30);
```

### Common Jest Matchers

| Matcher | Purpose |
|---|---|
| `toBe()` | Strict equality |
| `toEqual()` | Deep equality |
| `toBeTruthy()` | Checks truthy value |
| `toBeFalsy()` | Checks falsy value |
| `toBeNull()` | Checks null |
| `toBeUndefined()` | Checks undefined |
| `toContain()` | Checks array/string inclusion |
| `toHaveLength()` | Checks length |
| `toThrow()` | Checks thrown error |
| `toHaveBeenCalled()` | Checks whether mock was called |
| `toHaveBeenCalledWith()` | Checks function arguments |

### toBe() vs toEqual()

Consider:

```javascript
const user1 = {
    name: "John"
};

const user2 = {
    name: "John"
};
```

This may fail:

```javascript
expect(user1).toBe(user2);
```

Because `toBe()` checks object identity.

This passes:

```javascript
expect(user1).toEqual(user2);
```

Because `toEqual()` checks the object's structure and values.

---

## 6. Testing Asynchronous Functions

Backend applications frequently use asynchronous functions.

Example:

```javascript
async function getUser() {

    return {
        id: 1,
        name: "John"
    };

}
```

### Test with async/await

```javascript
test("should return user", async () => {

    const user = await getUser();

    expect(user.name).toBe("John");

});
```

### Test Promise Rejection

```javascript
async function getUser() {

    throw new Error("User not found");

}
```

Test:

```javascript
test("should throw error", async () => {

    await expect(getUser()).rejects.toThrow(
        "User not found"
    );

});
```

### Important

Always return or await asynchronous operations in your tests.

Otherwise, the test runner may finish before the asynchronous operation completes.

---

## 7. Testing Error Conditions

Testing only successful operations is insufficient.

You should also test failure scenarios.

Example:

```javascript
function divide(a, b) {

    if (b === 0) {

        throw new Error("Cannot divide by zero");

    }

    return a / b;

}
```

Test:

```javascript
test("should throw error when dividing by zero", () => {

    expect(() => divide(10, 0))
        .toThrow("Cannot divide by zero");

});
```

The callback wrapper is important because `toThrow()` needs a function to execute.

---

# PART 3: INTEGRATION TESTING

## 8. What Is Integration Testing?

Integration testing verifies whether different parts of your application work together.

Consider a user registration API.

```text
CLIENT
  |
  v
EXPRESS ROUTE
  |
  v
VALIDATION MIDDLEWARE
  |
  v
CONTROLLER
  |
  v
SERVICE
  |
  v
DATABASE
```

An integration test can verify the complete flow from the HTTP request to the database operation.

### Example

Suppose your API provides:

```http
POST /api/users
```

Request:

```json
{
    "name": "John",
    "email": "john@example.com",
    "password": "StrongPassword123"
}
```

Expected response:

```json
{
    "success": true,
    "message": "User created successfully"
}
```

An integration test checks whether this flow behaves correctly.

---

## 9. What Is Supertest?

Supertest is a library used to test HTTP servers and APIs.

It allows you to send HTTP requests directly from your test code.

You can test:

- GET requests.
- POST requests.
- PUT requests.
- PATCH requests.
- DELETE requests.
- Response status codes.
- Response bodies.
- Headers.

### Install

```bash
npm install --save-dev supertest
```

### Create Express Application

File: `src/app.js`

```javascript
const express = require("express");

const app = express();

app.use(express.json());

app.get("/api/users", (req, res) => {

    res.status(200).json({

        success: true,

        data: [
            {
                id: 1,
                name: "John"
            }
        ]

    });

});

app.post("/api/users", (req, res) => {

    const { name, email } = req.body;

    if (!name || !email) {

        return res.status(400).json({

            success: false,

            message: "Name and email are required"

        });

    }

    res.status(201).json({

        success: true,

        message: "User created successfully",

        data: {
            name,
            email
        }

    });

});

module.exports = app;
```

### Important: Separate app.js and server.js

File: `src/server.js`

```javascript
const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});
```

Why separate these files?

Because tests can import `app.js` without automatically starting a network listener.

This makes testing easier.

### Create API Test

File: `tests/user.test.js`

```javascript
const request = require("supertest");

const app = require("../src/app");

describe("User API", () => {

    test("GET /api/users should return users", async () => {

        const response = await request(app)
            .get("/api/users");

        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);

        expect(response.body.data).toHaveLength(1);

    });

    test("POST /api/users should create user", async () => {

        const response = await request(app)
            .post("/api/users")
            .send({

                name: "John",

                email: "john@example.com"

            });

        expect(response.statusCode).toBe(201);

        expect(response.body.success).toBe(true);

    });

    test("POST /api/users should reject invalid data", async () => {

        const response = await request(app)
            .post("/api/users")
            .send({

                name: ""

            });

        expect(response.statusCode).toBe(400);

    });

});
```

Run:

```bash
npm test
```

### Important

This example uses in-memory response data.

For real database integration tests, you should use an isolated test database and clean up test records between tests.

Never run destructive integration tests against your production database.

---

# PART 4: END-TO-END TESTING

## 10. What Is End-to-End Testing?

End-to-end testing verifies a complete application workflow from the user's perspective.

For example, in an e-commerce application:

```text
USER
 |
 v
REGISTER
 |
 v
LOGIN
 |
 v
BROWSE PRODUCTS
 |
 v
ADD TO CART
 |
 v
CHECKOUT
 |
 v
PLACE ORDER
 |
 v
ORDER CONFIRMATION
```

An E2E test verifies that the complete flow works.

### Tools for E2E Testing

- Playwright.
- Cypress.
- Selenium.

### What Is Playwright?

Playwright is an automation and end-to-end testing framework.

It can automate:

- Chromium.
- Firefox.
- WebKit.

It supports:

- Browser automation.
- UI testing.
- API testing.
- Screenshots.
- Video recording.
- Cross-browser testing.

You have previously worked with Playwright for browser automation. The same tool can also be used to build automated tests for web applications.

### Install Playwright

```bash
npm init playwright@latest
```

### Example Playwright Test

File: `tests/example.spec.js`

```javascript
const { test, expect } = require("@playwright/test");

test("homepage should load", async ({ page }) => {

    await page.goto("http://localhost:3000");

    await expect(page).toHaveTitle(/Home/);

});
```

Run:

```bash
npx playwright test
```

Run with browser visible:

```bash
npx playwright test --headed
```

Open test report:

```bash
npx playwright show-report
```

---

# PART 5: TEST-DRIVEN DEVELOPMENT

## 11. What Is TDD?

TDD stands for Test-Driven Development.

It is a software development approach in which tests are written before the implementation code.

### TDD Cycle

```text
       WRITE TEST
           |
           v
        RED
           |
           v
      WRITE CODE
           |
           v
        GREEN
           |
           v
      REFACTOR CODE
           |
           v
        REPEAT
```

### Step 1: Red

Write a test for functionality that does not exist yet.

```javascript
test("should add two numbers", () => {

    expect(add(10, 20)).toBe(30);

});
```

The test fails because `add()` is not implemented.

### Step 2: Green

Write the minimum implementation.

```javascript
function add(a, b) {

    return a + b;

}
```

Now the test passes.

### Step 3: Refactor

Improve the implementation without changing its expected behavior.

### Benefits of TDD

- Encourages testable code.
- Helps clarify requirements.
- Detects errors early.
- Supports safer refactoring.
- Provides executable documentation.

---

# PART 6: NODE.JS BUILT-IN TEST RUNNER

## 12. What Is the Node.js Test Runner?

Node.js provides a built-in testing module:

```javascript
node:test
```

You do not need to install Jest to use it.

### Example

File: `calculator.test.js`

```javascript
const test = require("node:test");

const assert = require("node:assert");

function add(a, b) {

    return a + b;

}

test("addition should return correct result", (t) => {

    assert.strictEqual(add(10, 20), 30);

});
```

Run:

```bash
node --test
```

### Common Assertion Methods

| Method | Purpose |
|---|---|
| `assert.strictEqual()` | Strict equality |
| `assert.deepStrictEqual()` | Deep equality |
| `assert.ok()` | Checks truthy value |
| `assert.throws()` | Checks synchronous exception |
| `assert.rejects()` | Checks Promise rejection |
| `assert.match()` | Checks string against regular expression |

### Jest vs Node.js Test Runner

| Feature | Jest | Node.js Test Runner |
|---|---|---|
| Installation | External package | Built into Node.js |
| Test execution | Yes | Yes |
| Assertions | Built-in matchers | `node:assert` |
| Mocking | Built-in utilities | `node:test` mocking support |
| Coverage | Supported | Supported through Node.js coverage tooling |
| Ecosystem | Large | Native Node.js tooling |

Both are useful. Learn at least one testing framework deeply.

---

# PART 7: MOCKING AND SPYING

## 13. What Is Mocking?

Mocking means replacing a real dependency with a controlled fake implementation during testing.

Suppose your controller sends an email after user registration.

You do not want to send an actual email every time you run a test.

Instead, you can mock the email service.

### Real Implementation

```javascript
async function sendEmail(email, message) {

    // Connect to email provider.

    // Send actual email.

}
```

### Mock Implementation

```javascript
const sendEmail = jest.fn().mockResolvedValue(true);
```

Now the test can verify the behavior without sending an actual email.

### Example

```javascript
test("should call email service", async () => {

    const sendEmail = jest.fn().mockResolvedValue(true);

    await sendEmail(
        "john@example.com",
        "Welcome"
    );

    expect(sendEmail).toHaveBeenCalled();

    expect(sendEmail).toHaveBeenCalledWith(
        "john@example.com",
        "Welcome"
    );

});
```

### Common Mock Functions

| Function | Purpose |
|---|---|
| `jest.fn()` | Create mock function |
| `jest.mock()` | Mock a module |
| `mockReturnValue()` | Set synchronous return value |
| `mockResolvedValue()` | Set resolved Promise value |
| `mockRejectedValue()` | Set rejected Promise |
| `mockImplementation()` | Provide custom implementation |

### What Is Spying?

Spying means monitoring an existing function to check whether it was called and how it was called.

Example:

```javascript
const user = {

    getName() {

        return "John";

    }

};

const spy = jest.spyOn(user, "getName");

user.getName();

expect(spy).toHaveBeenCalled();

spy.mockRestore();
```

### Mocking vs Spying

| Mocking | Spying |
|---|---|
| Replaces or controls behavior | Monitors function calls |
| Often used to isolate dependencies | Often used to inspect existing behavior |
| Can provide fake responses | Can track calls and arguments |

---

# PART 8: TEST COVERAGE

## 14. What Is Test Coverage?

Test coverage measures how much of your source code is executed by tests.

It helps identify code paths that may not be tested.

### Types of Coverage

1. Statement Coverage.
2. Branch Coverage.
3. Function Coverage.
4. Line Coverage.

### 1. Statement Coverage

Measures how many executable statements were executed.

### 2. Branch Coverage

Measures whether different decision branches were executed.

Example:

```javascript
function checkAge(age) {

    if (age >= 18) {

        return "Adult";

    }

    return "Minor";

}
```

Testing only:

```javascript
checkAge(25);
```

does not cover the minor branch.

You also need:

```javascript
checkAge(15);
```

### 3. Function Coverage

Measures how many functions were called by tests.

### 4. Line Coverage

Measures how many executable lines were executed.

### Run Jest Coverage

```bash
npx jest --coverage
```

Example report:

```text
File             | % Stmts | % Branch | % Funcs | % Lines
-----------------|---------|----------|---------|--------
calculator.js    | 100     | 100      | 100     | 100
userService.js   | 80      | 60       | 75      | 80
```

### Is 100% Coverage Always Required?

No.

High coverage does not automatically mean high-quality tests.

A test can execute code without checking whether it behaves correctly.

Focus on meaningful test cases and important business logic.

---

# PART 9: DEBUGGING NODE.JS

## 15. What Is Debugging?

Debugging is the process of identifying, analyzing, and fixing errors in software.

Suppose an API returns:

```json
{
    "success": false,
    "message": "Internal Server Error"
}
```

You need to determine:

- Where did the error occur?
- Which function caused it?
- What was the input?
- Was the database operation successful?
- Which line needs correction?

That is debugging.

### Common Debugging Techniques

1. Console logging.
2. Breakpoints.
3. Stack traces.
4. Debugger tools.
5. Performance profiling.
6. Memory profiling.
7. Request tracing.

---

## 16. Using console Methods

### console.log()

```javascript
console.log("User created");
```

### console.error()

```javascript
console.error("Database error");
```

### console.warn()

```javascript
console.warn("Deprecated function");
```

### console.table()

```javascript
const users = [

    {
        id: 1,
        name: "John"
    },

    {
        id: 2,
        name: "David"
    }

];

console.table(users);
```

### console.time()

Measures execution time.

```javascript
console.time("calculation");

let total = 0;

for (let i = 0; i < 1000000; i++) {

    total += i;

}

console.timeEnd("calculation");
```

### console.trace()

Displays the current call stack.

```javascript
console.trace("Execution trace");
```

---

## 17. What Is a Stack Trace?

A stack trace shows the sequence of function calls leading to an error.

Example:

```text
Error: User not found

    at getUser (userService.js:10:11)

    at getUserController (userController.js:15:20)

    at Layer.handleRequest (express/lib/router/layer.js)
```

This tells you:

- Error occurred inside `getUser`.
- It was called by `getUserController`.
- The request passed through Express.

Stack traces are extremely useful for debugging.

---

## 18. Using the Node.js Debugger

Node.js provides built-in debugging support through the Inspector protocol.

Start your application with:

```bash
node --inspect app.js
```

To pause execution at the beginning:

```bash
node --inspect-brk app.js
```

Node.js typically prints a debugging URL similar to:

```text
Debugger listening on ws://127.0.0.1:9229/...
```

You can connect using Chrome DevTools or another compatible debugger.

### What Is a Breakpoint?

A breakpoint pauses code execution at a particular line.

Example:

```javascript
function calculateTotal(price, quantity) {

    const total = price * quantity;

    debugger;

    return total;

}
```

When debugging is attached, execution pauses at:

```javascript
debugger;
```

### Why Use Breakpoints?

You can:

- Inspect variables.
- Check function arguments.
- Execute code step by step.
- Inspect the call stack.
- Identify incorrect values.
- Understand execution flow.

---

## 19. Debugging with VS Code

Visual Studio Code includes a built-in JavaScript debugger.

### Steps

1. Open your Node.js project.
2. Open the Run and Debug panel.
3. Select the Node.js launch configuration.
4. Add breakpoints.
5. Start debugging.
6. Inspect variables and call stacks.

### Example launch.json

File:

```text
.vscode/launch.json
```

Configuration:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Node.js",
            "program": "${workspaceFolder}/src/server.js"
        }
    ]
}
```

This is especially useful when debugging larger Express applications.

---

# PART 10: PERFORMANCE PROFILING

## 20. What Is Performance Profiling?

Performance profiling means analyzing how much time and resources an application uses.

It helps identify performance bottlenecks.

Examples:

- Slow database queries.
- CPU-intensive functions.
- High memory usage.
- Event loop delays.
- Expensive JSON processing.
- Excessive network requests.

### Common Profiling Areas

| Profiling Type | What It Measures |
|---|---|
| CPU Profiling | CPU usage and execution time |
| Memory Profiling | Memory allocation and retention |
| I/O Profiling | File and network operations |
| Event Loop Profiling | Event-loop delays |
| Database Profiling | Query execution time |

### What Is a Performance Bottleneck?

A performance bottleneck is a component that limits overall application performance.

Example:

```text
CLIENT
  |
  v
EXPRESS API
  |
  v
DATABASE QUERY
  |
  v
SLOW RESPONSE
```

If the database query takes 5 seconds, optimizing the controller's 2 milliseconds of processing will not significantly improve the response time.

---

## 21. CPU Profiling

CPU profiling helps identify which functions consume the most CPU time.

Node.js provides CPU profiling through its Inspector and V8 profiling capabilities.

Start:

```bash
node --cpu-prof app.js
```

After the process exits, Node.js generates a CPU profile file.

You can inspect this profile using compatible profiling tools such as Chrome DevTools.

### What Does CPU Profiling Show?

- Function execution time.
- Frequently executed functions.
- Expensive code paths.
- Hot functions.
- CPU-intensive operations.

### What Is a Hot Function?

A hot function is a function that executes frequently or consumes significant CPU resources.

Optimizing hot functions can improve application performance.

---

## 22. Memory Profiling

Memory profiling helps identify:

- Memory leaks.
- Large objects.
- Unexpected object retention.
- Excessive allocations.
- Heap growth.

### Generate Heap Snapshot

Start Node.js with Inspector:

```bash
node --inspect app.js
```

Connect using Chrome DevTools.

Open the Memory panel and take a heap snapshot.

### What Is a Heap Snapshot?

A heap snapshot captures the objects and their references in the V8 heap at a particular moment.

It helps identify objects that remain in memory unexpectedly.

### Common Memory Profiling Metrics

- Heap used.
- Heap allocated.
- Retained size.
- Shallow size.
- Object count.
- Allocation timeline.

---

# PART 11: LOAD TESTING AND STRESS TESTING

## 23. What Is Load Testing?

Load testing measures application performance under an expected workload.

Suppose your application normally handles:

```text
500 concurrent users
```

You want to know whether it can handle that workload.

Load testing helps answer this question.

### Load Testing Metrics

| Metric | Meaning |
|---|---|
| Requests per second | Number of requests handled per second |
| Response time | Time taken to process a request |
| Latency | Delay experienced by a request |
| Throughput | Amount of work completed per unit time |
| Error rate | Percentage of failed requests |
| CPU usage | CPU consumption |
| Memory usage | Memory consumption |

### Example

Suppose your API receives:

```text
1000 requests
```

And:

```text
950 successful
50 failed
```

Error rate:

```text
50 / 1000 × 100 = 5%
```

The API has a 5% error rate for that test.

---

## 24. What Is Stress Testing?

Stress testing measures how an application behaves beyond its expected workload.

Example:

```text
Normal Load:       100 Users

Load Test:         500 Users

Stress Test:       5000 Users
```

The goal is to identify:

- Breaking points.
- Resource exhaustion.
- Failure behavior.
- Recovery behavior.
- Performance degradation.

### Load Testing vs Stress Testing

| Load Testing | Stress Testing |
|---|---|
| Tests expected workload | Tests beyond expected workload |
| Measures normal performance | Finds system limits |
| Checks stability | Checks failure behavior |
| Example: 500 users | Example: 5,000 users |

---

## 25. What Is Autocannon?

Autocannon is a Node.js HTTP benchmarking tool.

It can generate HTTP requests to measure server performance.

### Install

```bash
npm install -g autocannon
```

### Run Benchmark

```bash
autocannon http://localhost:3000
```

### Specify Connections

```bash
autocannon -c 100 -d 30 http://localhost:3000
```

Parameters:

- `-c 100`: 100 concurrent connections.
- `-d 30`: Run for 30 seconds.

### Example Output

```text
Running 30s test @ http://localhost:3000

100 connections

Stat       2.5%   50%    97.5%
Latency    2 ms   5 ms   20 ms

Req/Sec    5000   6000   7000

Requests/sec: 6000
```

Actual results depend on your server and machine.

### Important

Benchmarking tools can overload a server.

Only test systems you own or are explicitly authorized to test.

---

## 26. What Is Artillery?

Artillery is a load-testing tool that supports realistic traffic scenarios.

It is useful for testing:

- REST APIs.
- WebSocket applications.
- User journeys.
- Multiple endpoints.
- Different traffic patterns.

### Install

```bash
npm install -g artillery
```

### Create Test File

File: `load-test.yml`

```yaml
config:
  target: "http://localhost:3000"
  phases:
    - duration: 60
      arrivalRate: 10

scenarios:
  - name: "Get users"
    flow:
      - get:
          url: "/api/users"
```

### Run Test

```bash
artillery run load-test.yml
```

### Understanding Configuration

```yaml
duration: 60
```

Test duration in seconds.

```yaml
arrivalRate: 10
```

The configured arrival rate is 10 new virtual users per second.

This is not necessarily the same as 10 concurrent users.

### Why Use Artillery?

It allows you to simulate user behavior rather than sending only repeated requests to one endpoint.

---

# PART 12: PRODUCTION ENVIRONMENT

## 27. What Is a Production Environment?

A production environment is where your application is deployed and used by real users.

Most applications have three common environments.

### 1. Development

Used during development.

Example:

```text
localhost:3000
```

### 2. Testing / Staging

Used to verify changes before production.

Example:

```text
staging.example.com
```

### 3. Production

Used by actual users.

Example:

```text
example.com
```

### Environment Comparison

| Development | Staging | Production |
|---|---|---|
| Local development | Pre-production testing | Live application |
| Debugging enabled | Production-like setup | Optimized setup |
| Test data | Staging data | Real user data |
| Frequent changes | Controlled changes | Carefully deployed changes |

### Why Separate Environments?

- Prevent accidental production changes.
- Test new features safely.
- Use different credentials.
- Verify deployments before release.
- Isolate test data.

---

## 28. Production Configuration

Production applications should use proper configuration.

Example:

```env
NODE_ENV=production

PORT=3000

DB_HOST=localhost
DB_USER=app_user
DB_PASSWORD=strong_password
DB_NAME=production_db

JWT_SECRET=strong_secret
```

Read:

```javascript
const PORT = process.env.PORT || 3000;

const NODE_ENV = process.env.NODE_ENV;
```

### Important

`NODE_ENV` is a conventional environment variable.

Many Node.js libraries use it to determine their behavior, but Node.js does not automatically change all application behavior when you set it.

Never commit actual production credentials to GitHub.

---

# PART 13: PM2

## 29. What Is PM2?

PM2 is a process manager for Node.js applications.

It helps run applications in the background and manage their lifecycle.

### Why Use PM2?

Suppose you run:

```bash
node server.js
```

If the terminal closes or the application crashes, the process may stop.

PM2 helps manage application processes.

Features include:

- Background execution.
- Automatic restart.
- Log management.
- Process monitoring.
- Startup configuration.
- Cluster mode.

### Install PM2

```bash
npm install -g pm2
```

### Start Application

```bash
pm2 start server.js
```

### Give Application a Name

```bash
pm2 start server.js --name my-api
```

### List Processes

```bash
pm2 list
```

### Monitor Application

```bash
pm2 monit
```

### View Logs

```bash
pm2 logs
```

Specific application:

```bash
pm2 logs my-api
```

### Restart

```bash
pm2 restart my-api
```

### Stop

```bash
pm2 stop my-api
```

### Delete

```bash
pm2 delete my-api
```

### Save Process List

```bash
pm2 save
```

### Configure Startup

```bash
pm2 startup
```

PM2 prints a platform-specific command. Execute the generated command to configure startup integration.

### Start in Cluster Mode

```bash
pm2 start server.js -i max
```

This starts multiple application instances according to PM2's available CPU information.

### PM2 Ecosystem File

File: `ecosystem.config.js`

```javascript
module.exports = {

    apps: [

        {

            name: "my-api",

            script: "./src/server.js",

            instances: "max",

            exec_mode: "cluster",

            watch: false,

            env: {

                NODE_ENV: "development"

            },

            env_production: {

                NODE_ENV: "production"

            }

        }

    ]

};
```

Start:

```bash
pm2 start ecosystem.config.js --env production
```

**Important:** Cluster mode requires stateless application design or shared storage for sessions and other cross-process state.

---

# PART 14: DOCKER

## 30. What Is Docker?

Docker is a platform used to package applications and their dependencies into containers.

A container provides an isolated environment in which an application can run.

### Problem Without Docker

Suppose your application works on your laptop.

But on the production server:

- Node.js version is different.
- Dependencies are missing.
- System libraries are different.
- Environment configuration differs.

This can create deployment problems.

### Docker Solution

Docker packages the application with the required runtime and dependencies.

### Docker Architecture

```text
           DOCKER IMAGE
                |
                v
         CREATE CONTAINER
                |
                v
        RUN NODE.JS APP
                |
                v
          APPLICATION
```

### What Is a Container?

A container is an isolated runtime environment created from an image.

### What Is an Image?

A Docker image is a packaged, immutable template used to create containers.

### Image vs Container

| Image | Container |
|---|---|
| Template | Running or stopped instance |
| Used to create containers | Created from an image |
| Immutable by design | Has a writable container layer |
| Example: Node.js app image | Example: Running Node.js container |

---

## 31. Install Docker

Install Docker Desktop on Windows or macOS.

Official website:

[Docker Desktop](https://www.docker.com/products/docker-desktop/?utm_source=chatgpt.com)

For Linux, Docker Engine can be installed using the official installation instructions.

Verify installation:

```bash
docker --version
```

Check running containers:

```bash
docker ps
```

Check all containers:

```bash
docker ps -a
```

---

## 32. What Is a Dockerfile?

A Dockerfile is a text file containing instructions for building a Docker image.

### Example Project

```text
node-app/
│
├── src/
│   └── server.js
│
├── package.json
├── package-lock.json
└── Dockerfile
```

### Create Dockerfile

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 3000

CMD ["node", "src/server.js"]
```

### Understanding Dockerfile Instructions

#### FROM

```dockerfile
FROM node:22-alpine
```

Defines the base image.

#### WORKDIR

```dockerfile
WORKDIR /app
```

Sets the working directory inside the container.

#### COPY

```dockerfile
COPY package*.json ./
```

Copies package files into the container.

#### RUN

```dockerfile
RUN npm ci --omit=dev
```

Installs production dependencies using the lockfile.

#### EXPOSE

```dockerfile
EXPOSE 3000
```

Documents the port the application listens on.

It does not automatically publish the port to the host.

#### CMD

```dockerfile
CMD ["node", "src/server.js"]
```

Defines the default command to execute when the container starts.

---

## 33. Build Docker Image

Run:

```bash
docker build -t node-api .
```

Parameters:

- `docker build`: Builds an image.
- `-t node-api`: Assigns an image name.
- `.`: Uses the current directory as the build context.

Check images:

```bash
docker images
```

### Run Container

```bash
docker run -p 3000:3000 node-api
```

### What Does -p Mean?

```bash
-p 3000:3000
```

The format is:

```text
HOST_PORT:CONTAINER_PORT
```

It maps host port 3000 to container port 3000.

### Run in Background

```bash
docker run -d -p 3000:3000 --name my-api node-api
```

### View Logs

```bash
docker logs my-api
```

### Stop Container

```bash
docker stop my-api
```

### Remove Container

```bash
docker rm my-api
```

---

## 34. What Is .dockerignore?

`.dockerignore` specifies files and directories that should be excluded from the Docker build context.

Example:

```text
node_modules
.git
.env
npm-debug.log
coverage
```

### Why Is It Important?

- Reduces build context size.
- Prevents unnecessary files from being copied.
- Avoids accidentally including local dependencies.
- Helps prevent secrets from entering the image.

**Important:** Excluding `.env` from the image does not automatically provide runtime secrets. Pass secrets through an appropriate deployment configuration or secret manager.

---

# PART 15: DOCKER COMPOSE

## 35. What Is Docker Compose?

Docker Compose is a tool used to define and manage multi-container applications.

Suppose your backend needs:

- Node.js.
- MongoDB.
- Redis.

Without Docker Compose, you need to manage each container separately.

Docker Compose lets you define these services in one configuration file.

### Architecture

```text
          DOCKER COMPOSE
                 |
       +---------+---------+
       |         |         |
       v         v         v
    NODE.JS   MONGODB    REDIS
    CONTAINER CONTAINER CONTAINER
```

### Create docker-compose.yml

```yaml
services:

  app:

    build: .

    ports:
      - "3000:3000"

    environment:
      NODE_ENV: development
      MONGO_URL: mongodb://mongo:27017/mydb
      REDIS_URL: redis://redis:6379

    depends_on:
      - mongo
      - redis

  mongo:

    image: mongo:8

    volumes:
      - mongo_data:/data/db

  redis:

    image: redis:7-alpine

volumes:

  mongo_data:
```

### Run Services

```bash
docker compose up
```

Run in background:

```bash
docker compose up -d
```

Stop:

```bash
docker compose down
```

View services:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs
```

### What Is a Docker Volume?

A volume stores persistent data outside a container's writable layer.

Example:

```yaml
volumes:
  - mongo_data:/data/db
```

This allows MongoDB data to persist when the container is recreated.

### What Is depends_on?

It controls service startup ordering.

However, it does not necessarily mean the dependency is ready to accept connections.

For production-like setups, use health checks and appropriate application-level retry logic.

---

# PART 16: NGINX AND REVERSE PROXY

## 36. What Is Nginx?

Nginx is a web server that is commonly used as:

- Reverse proxy.
- Static file server.
- Load balancer.
- TLS termination point.
- HTTP caching layer.

### Why Do We Need Nginx?

Suppose your Node.js application runs on:

```text
localhost:3000
```

You want users to access:

```text
https://example.com
```

Nginx can receive public requests and forward them to Node.js.

### Architecture

```text
             INTERNET
                 |
                 v
             NGINX
                 |
                 v
           NODE.JS SERVER
                 |
                 v
              DATABASE
```

### What Is a Reverse Proxy?

A reverse proxy receives requests from clients and forwards them to backend servers.

Clients communicate with the proxy rather than directly with the internal application server.

### Benefits

1. Centralized HTTPS termination.
2. Load balancing.
3. Static file serving.
4. Request routing.
5. Security controls.
6. Connection management.

---

## 37. Configure Nginx for Node.js

Suppose your Node.js server runs on port 3000.

Create an Nginx server configuration:

```nginx
server {

    listen 80;

    server_name example.com www.example.com;

    location / {

        proxy_pass http://127.0.0.1:3000;

        proxy_http_version 1.1;

        proxy_set_header Host $host;

        proxy_set_header X-Real-IP $remote_addr;

        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        proxy_set_header X-Forwarded-Proto $scheme;

    }

}
```

### Explanation

```nginx
listen 80;
```

Nginx listens on HTTP port 80.

```nginx
server_name example.com;
```

Specifies the domain.

```nginx
proxy_pass http://127.0.0.1:3000;
```

Forwards requests to Node.js.

```nginx
proxy_set_header Host $host;
```

Preserves the original host header.

```nginx
proxy_set_header X-Real-IP $remote_addr;
```

Passes the client's connection IP information.

### Important Security Note

Configure Express's `trust proxy` setting carefully when using Nginx or another trusted proxy.

Incorrect proxy trust settings can affect client IP detection, secure cookies, and rate limiting.

---

## 38. What Is Load Balancing?

Load balancing distributes incoming requests across multiple backend servers.

Example:

```text
             CLIENTS
                |
                v
              NGINX
                |
       +--------+--------+
       |        |        |
       v        v        v
    SERVER 1 SERVER 2 SERVER 3
```

### Nginx Load Balancing Example

```nginx
upstream node_backend {

    server 127.0.0.1:3001;

    server 127.0.0.1:3002;

    server 127.0.0.1:3003;

}

server {

    listen 80;

    server_name example.com;

    location / {

        proxy_pass http://node_backend;

    }

}
```

Nginx distributes requests across the configured servers according to its load-balancing method.

---

# PART 17: ENVIRONMENT CONFIGURATION

## 39. Development vs Production Configuration

A professional application should not use the same configuration everywhere.

Example:

Development:

```env
NODE_ENV=development

PORT=3000

DB_HOST=localhost

DB_NAME=development_db
```

Production:

```env
NODE_ENV=production

PORT=3000

DB_HOST=production-db.internal

DB_NAME=production_db
```

### Why Separate Configurations?

- Different databases.
- Different API endpoints.
- Different credentials.
- Different logging levels.
- Different security settings.

### Validate Environment Variables

Do not allow an application to start with missing critical configuration.

Example:

```javascript
const requiredEnv = [

    "DB_HOST",

    "DB_USER",

    "DB_PASSWORD",

    "DB_NAME"

];

for (const key of requiredEnv) {

    if (!process.env[key]) {

        throw new Error(
            `Missing environment variable: ${key}`
        );

    }

}
```

This helps detect configuration problems during startup.

---

# PART 18: CI/CD

## 40. What Is CI/CD?

CI/CD stands for:

- Continuous Integration.
- Continuous Delivery.
- Continuous Deployment.

These practices automate the process of testing and releasing software.

### Continuous Integration (CI)

Developers frequently merge code changes into a shared repository.

Automated checks run whenever code changes.

Examples:

- Install dependencies.
- Run linting.
- Run unit tests.
- Run integration tests.
- Build the application.

### Continuous Delivery

The application is automatically prepared for release.

A production deployment may still require manual approval.

### Continuous Deployment

Every change that successfully passes the configured pipeline is automatically deployed to production.

### CI/CD Workflow

```text
       DEVELOPER WRITES CODE
                |
                v
          PUSH TO GITHUB
                |
                v
          GITHUB ACTIONS
                |
       +--------+--------+
       |        |        |
       v        v        v
    INSTALL   LINT    TESTS
       |        |        |
       +--------+--------+
                |
                v
           BUILD APP
                |
                v
          DEPLOYMENT
                |
                v
            PRODUCTION
```

### Benefits

- Faster releases.
- Automated testing.
- Fewer manual errors.
- Consistent deployment.
- Earlier bug detection.
- Improved development workflow.

---

# PART 19: GITHUB ACTIONS

## 41. What Is GitHub Actions?

GitHub Actions is an automation platform integrated into GitHub.

It can automate:

- Testing.
- Building.
- Deployment.
- Code quality checks.
- Release workflows.
- Scheduled tasks.

### Important Terms

| Term | Meaning |
|---|---|
| Workflow | Automated process |
| Event | Trigger for workflow |
| Job | Group of steps |
| Step | Individual task |
| Action | Reusable automation component |
| Runner | Machine that executes workflow |

### Create GitHub Actions Workflow

Project structure:

```text
project/
│
├── src/
├── tests/
├── package.json
└── .github/
    └── workflows/
        └── node.yml
```

File:

`.github/workflows/node.yml`

```yaml
name: Node.js CI

on:
  push:
    branches:
      - main

  pull_request:
    branches:
      - main

jobs:

  test:

    runs-on: ubuntu-latest

    steps:

      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test
```

### What Happens?

When you push code to `main`:

1. GitHub detects the push.
2. A workflow starts.
3. The repository is checked out.
4. Node.js is installed.
5. Dependencies are installed.
6. Tests are executed.
7. GitHub displays the result.

### What Is npm ci?

`npm ci` installs dependencies from `package-lock.json`.

It is designed for clean, reproducible dependency installation, especially in automated environments.

It generally removes an existing `node_modules` directory before installation.

### Store Secrets in GitHub

Go to:

```text
GitHub Repository
      |
      v
Settings
      |
      v
Secrets and variables
      |
      v
Actions
```

Add required secrets there.

Access them inside workflows using:

```yaml
${{ secrets.SECRET_NAME }}
```

Never hardcode production credentials in workflow files.

---

# PART 20: AWS DEPLOYMENT

## 42. What Is AWS?

AWS stands for Amazon Web Services.

It provides cloud infrastructure and managed services.

Common AWS services used in Node.js applications:

| AWS Service | Purpose |
|---|---|
| EC2 | Virtual servers |
| S3 | Object/file storage |
| RDS | Managed relational databases |
| DocumentDB | Managed document database compatible with MongoDB APIs, with compatibility differences |
| ElastiCache | Managed caching |
| Lambda | Serverless functions |
| CloudFront | Content delivery network |
| Route 53 | DNS |
| CloudWatch | Monitoring and logs |
| ECR | Container image registry |
| ECS | Container orchestration |
| Secrets Manager | Secret management |

### Typical AWS Architecture

```text
              USERS
                |
                v
            ROUTE 53
                |
                v
           CLOUDFRONT
                |
                v
          LOAD BALANCER
                |
                v
              EC2
                |
        +-------+-------+
        |       |       |
        v       v       v
      NODE    REDIS   DATABASE
      SERVER  CACHE    RDS
```

This is an example architecture; the exact components depend on the application's requirements.

---

## 43. Deploy Node.js on EC2

EC2 provides virtual servers in the cloud.

### Step 1: Create EC2 Instance

1. Open AWS Management Console.
2. Navigate to EC2.
3. Launch an instance.
4. Choose an appropriate Linux AMI.
5. Select instance type.
6. Configure storage.
7. Configure security groups.
8. Launch the instance.

### Step 2: Connect to Server

For Linux instances, SSH can be used.

```bash
ssh -i your-key.pem ubuntu@YOUR_SERVER_IP
```

The username depends on the selected AMI.

### Step 3: Install Node.js

Use an appropriate installation method for the selected Linux distribution.

Verify:

```bash
node -v

npm -v
```

### Step 4: Install Git

On Ubuntu:

```bash
sudo apt update

sudo apt install git -y
```

### Step 5: Clone Project

```bash
git clone YOUR_REPOSITORY_URL
```

### Step 6: Install Dependencies

```bash
cd your-project

npm ci
```

### Step 7: Configure Environment Variables

Create a production `.env` file or inject configuration through a secure deployment mechanism.

### Step 8: Start Application

```bash
npm start
```

For production, use a process manager such as PM2 or a container orchestration system.

### Step 9: Configure Nginx

Install Nginx and configure it as a reverse proxy to your Node.js application.

### Step 10: Configure HTTPS

Use a trusted TLS certificate.

For many Nginx deployments, Let's Encrypt with Certbot is a common option.

### Step 11: Configure Security Groups

Only expose the ports required by your architecture.

A common arrangement:

| Port | Purpose |
|---|---|
| 22 | SSH administration |
| 80 | HTTP |
| 443 | HTTPS |
| 3000 | Node.js internal application port |

Ideally, public users access the application through ports 80 and 443, while the Node.js port remains private or bound to localhost.

---

# PART 21: VPS DEPLOYMENT

## 44. What Is a VPS?

VPS stands for Virtual Private Server.

A VPS provides a virtualized server environment with allocated resources.

You can install:

- Node.js.
- MongoDB.
- MySQL.
- Nginx.
- Redis.
- PM2.
- Docker.

### Typical VPS Architecture

```text
             INTERNET
                 |
                 v
              NGINX
                 |
                 v
            NODE.JS API
                 |
        +--------+--------+
        |                 |
        v                 v
      MYSQL             REDIS
```

### Deploy Using Git

```bash
git clone YOUR_REPOSITORY_URL

cd your-project

npm ci

npm start
```

For production:

```bash
pm2 start src/server.js --name my-api
```

### Configure Nginx

Forward requests to the internal Node.js port.

### Configure Firewall

On Ubuntu with UFW:

```bash
sudo ufw allow OpenSSH

sudo ufw allow 80

sudo ufw allow 443

sudo ufw enable
```

### Important

Do not expose database ports publicly unless there is a specific, carefully secured reason.

For example, MySQL port 3306 should normally be accessible only from trusted application hosts or private networks.

---

# PART 22: PRODUCTION MONITORING

## 45. What Is Production Monitoring?

Production monitoring means continuously observing application health and performance.

It helps identify problems before they seriously affect users.

### What Should You Monitor?

| Metric | Why It Matters |
|---|---|
| CPU Usage | Detects high processor consumption |
| Memory Usage | Identifies memory pressure and leaks |
| Request Latency | Measures API responsiveness |
| Error Rate | Detects failures |
| Requests per Second | Measures traffic |
| Database Connections | Detects connection exhaustion |
| Disk Usage | Prevents storage exhaustion |
| Event Loop Lag | Detects blocked JavaScript execution |
| Uptime | Measures service availability |

### Popular Monitoring Tools

- Prometheus.
- Grafana.
- AWS CloudWatch.
- Datadog.
- New Relic.
- Sentry.

### What Is Prometheus?

Prometheus is an open-source monitoring and metrics collection system.

It collects time-series metrics from configured targets.

### What Is Grafana?

Grafana is a visualization and monitoring platform.

It can display metrics through dashboards and alerts.

### What Is Sentry?

Sentry is an error monitoring platform that helps developers identify and investigate application exceptions.

### Monitoring Architecture

```text
          NODE.JS APPLICATION
                  |
                  v
             METRICS
                  |
                  v
             PROMETHEUS
                  |
                  v
               GRAFANA
                  |
                  v
              DASHBOARD
```

---

## 46. What Are Health Checks?

Health checks are endpoints or mechanisms used to determine whether an application or its dependencies are functioning correctly.

Example:

```javascript
app.get("/health", (req, res) => {

    res.status(200).json({

        status: "healthy"

    });

});
```

### Liveness Check

Determines whether the application process is running.

### Readiness Check

Determines whether the application is ready to receive traffic.

For example, an application might be running but unable to connect to its database.

In that situation:

- Liveness may be healthy.
- Readiness may be unhealthy.

### Example Readiness Endpoint

```javascript
app.get("/ready", async (req, res) => {

    try {

        await sequelize.authenticate();

        res.status(200).json({

            status: "ready"

        });

    } catch (error) {

        res.status(503).json({

            status: "not ready"

        });

    }

});
```

In production, avoid exposing detailed internal dependency information to unauthenticated users.

---

# PART 23: IMPORTANT DEPLOYMENT CONCEPTS

## 47. What Is Horizontal Scaling?

Horizontal scaling means adding more application instances or servers.

Example:

```text
BEFORE

       NODE.JS SERVER
             |
             v
          DATABASE
```

After scaling:

```text
             NGINX
               |
       +-------+-------+
       |       |       |
       v       v       v
    SERVER  SERVER  SERVER
       |       |       |
       +-------+-------+
               |
               v
            DATABASE
```

### Advantages

- Increased capacity.
- Better availability.
- Distributed workload.
- Improved fault isolation.

### Challenges

- Shared session storage.
- Cache consistency.
- Load balancing.
- Distributed logging.
- Database connection management.

---

## 48. What Is Vertical Scaling?

Vertical scaling means increasing the resources of an existing server.

For example:

```text
Before:

2 CPU Cores
4 GB RAM

After:

8 CPU Cores
16 GB RAM
```

### Horizontal vs Vertical Scaling

| Horizontal Scaling | Vertical Scaling |
|---|---|
| Add more servers | Upgrade existing server |
| Distributes workload | Increases individual server capacity |
| More complex architecture | Usually simpler |
| Better potential fault isolation | Single-server limits remain |
| Example: 3 EC2 instances | Example: Upgrade EC2 instance type |

---

## 49. What Is Zero-Downtime Deployment?

Zero-downtime deployment aims to release a new application version without interrupting service availability.

Common strategies include:

### Rolling Deployment

Gradually replace old instances with new instances.

### Blue-Green Deployment

Maintain two environments:

- Blue: Current production version.
- Green: New version.

After validating Green, traffic is switched to it.

### Canary Deployment

Release a new version to a small percentage of users first.

If everything works correctly, gradually increase traffic.

### Deployment Comparison

| Strategy | Description |
|---|---|
| Rolling | Gradually replace instances |
| Blue-Green | Switch between two environments |
| Canary | Release to a small percentage first |

---

# PART 24: COMPLETE PROJECT — TEST, BUILD AND DEPLOY A NODE.JS API

## 50. Project Overview

Now let's combine the major Phase 14 concepts into one practical workflow.

We will use:

- Node.js.
- Express.
- Jest.
- Supertest.
- Docker.
- PM2.
- Nginx.

### Project Structure

```text
node-production-api/
│
├── src/
│   ├── controllers/
│   │   └── userController.js
│   │
│   ├── routes/
│   │   └── userRoutes.js
│   │
│   ├── middleware/
│   │   └── errorHandler.js
│   │
│   ├── app.js
│   └── server.js
│
├── tests/
│   └── user.test.js
│
├── .github/
│   └── workflows/
│       └── node.yml
│
├── Dockerfile
├── .dockerignore
├── ecosystem.config.js
├── package.json
└── .env
```

### Step 1: Install Dependencies

```bash
npm init -y

npm install express dotenv helmet

npm install --save-dev jest supertest
```

### Step 2: Create User Controller

File: `src/controllers/userController.js`

```javascript
let users = [];

let nextId = 1;

exports.getUsers = (req, res) => {

    res.status(200).json({

        success: true,

        data: users

    });

};

exports.createUser = (req, res) => {

    const { name, email } = req.body;

    if (!name || !email) {

        return res.status(400).json({

            success: false,

            message: "Name and email are required"

        });

    }

    const user = {

        id: nextId++,

        name,

        email

    };

    users.push(user);

    res.status(201).json({

        success: true,

        data: user

    });

};
```

### Step 3: Create Routes

File: `src/routes/userRoutes.js`

```javascript
const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", userController.getUsers);

router.post("/", userController.createUser);

module.exports = router;
```

### Step 4: Create app.js

File: `src/app.js`

```javascript
const express = require("express");

const helmet = require("helmet");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(helmet());

app.use(express.json());

app.get("/health", (req, res) => {

    res.status(200).json({

        status: "healthy"

    });

});

app.use("/api/users", userRoutes);

module.exports = app;
```

### Step 5: Create server.js

File: `src/server.js`

```javascript
require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});
```

### Step 6: Configure Jest

In `package.json`:

```json
{
    "scripts": {
        "start": "node src/server.js",
        "dev": "node --watch src/server.js",
        "test": "jest --runInBand"
    }
}
```

### Step 7: Write API Tests

File: `tests/user.test.js`

```javascript
const request = require("supertest");

const app = require("../src/app");

describe("User API", () => {

    test("GET /api/users should return 200", async () => {

        const response = await request(app)
            .get("/api/users");

        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);

    });

    test("POST /api/users should create user", async () => {

        const response = await request(app)
            .post("/api/users")
            .send({

                name: "John",

                email: "john@example.com"

            });

        expect(response.statusCode).toBe(201);

        expect(response.body.data.name).toBe("John");

    });

    test("POST /api/users should reject missing fields", async () => {

        const response = await request(app)
            .post("/api/users")
            .send({

                name: ""

            });

        expect(response.statusCode).toBe(400);

    });

});
```

**Note:** This is a simplified example. The in-memory data is shared across tests in the same process, so a larger test suite should include setup and cleanup to keep tests independent.

### Step 8: Test Application

```bash
npm test
```

### Step 9: Create Dockerfile

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY src ./src

EXPOSE 3000

CMD ["node", "src/server.js"]
```

### Step 10: Create .dockerignore

```text
node_modules
.git
.env
coverage
```

### Step 11: Build Image

```bash
docker build -t node-production-api .
```

### Step 12: Run Container

```bash
docker run -d \
    --name node-api \
    -p 3000:3000 \
    --restart unless-stopped \
    node-production-api
```

On Windows PowerShell, you can execute the command on one line:

```powershell
docker run -d --name node-api -p 3000:3000 --restart unless-stopped node-production-api
```

### Step 13: Check Logs

```bash
docker logs node-api
```

### Step 14: Configure Nginx

Forward requests from your domain to:

```text
http://127.0.0.1:3000
```

### Step 15: Configure HTTPS

Install and configure a trusted TLS certificate.

### Step 16: Configure CI

Use GitHub Actions to run tests whenever code is pushed.

This completes a basic automated testing and containerized deployment workflow.

**Production note:** This learning project does not yet implement database persistence, authentication, authorization, full input validation, secrets management, or production-grade shutdown handling. Add these before exposing a real application to users.

---

# PART 25: COMMON INTERVIEW QUESTIONS

## 51. Testing Interview Questions

**Q1. What is software testing?**

Software testing is the process of verifying whether an application works according to requirements.

**Q2. What is unit testing?**

Testing individual functions or components independently.

**Q3. What is integration testing?**

Testing whether multiple components work correctly together.

**Q4. What is end-to-end testing?**

Testing a complete application workflow from the user's perspective.

**Q5. What is regression testing?**

Testing existing functionality after code changes to ensure nothing has broken.

**Q6. What is Jest?**

A JavaScript testing framework used for unit and integration testing.

**Q7. What is Supertest?**

A library used to test HTTP endpoints and Express applications.

**Q8. What is mocking?**

Replacing real dependencies with controlled fake implementations during tests.

**Q9. What is spying?**

Monitoring function calls and their arguments.

**Q10. What is test coverage?**

A measurement of how much source code is executed by tests.

**Q11. What is TDD?**

Test-Driven Development is a practice where tests are written before implementation code.

**Q12. What is the testing pyramid?**

A strategy emphasizing many unit tests, fewer integration tests, and relatively few end-to-end tests.

## 52. Debugging and Performance Questions

**Q13. What is debugging?**

The process of identifying and fixing software defects.

**Q14. What is a stack trace?**

A record of the function call sequence that led to an error.

**Q15. What is a breakpoint?**

A debugging instruction that pauses code execution at a specified location.

**Q16. What is CPU profiling?**

Analyzing CPU consumption to identify expensive functions and operations.

**Q17. What is memory profiling?**

Analyzing memory allocation and retention to identify leaks and excessive memory usage.

**Q18. What is load testing?**

Testing application performance under expected workloads.

**Q19. What is stress testing?**

Testing application behavior beyond expected workloads to identify its limits.

**Q20. What is throughput?**

The amount of work or number of requests processed in a given period.

## 53. Deployment Questions

**Q21. What is PM2?**

A process manager for Node.js applications.

**Q22. What is Docker?**

A platform used to package and run applications in containers.

**Q23. What is a Docker image?**

A packaged template used to create containers.

**Q24. What is a Docker container?**

An isolated running or stopped instance created from an image.

**Q25. What is a Dockerfile?**

A text file containing instructions for building a Docker image.

**Q26. What is Docker Compose?**

A tool for defining and managing multi-container applications.

**Q27. What is Nginx?**

A web server commonly used as a reverse proxy, static file server, and load balancer.

**Q28. What is a reverse proxy?**

A server that receives client requests and forwards them to backend servers.

**Q29. What is load balancing?**

Distributing incoming requests across multiple backend instances.

**Q30. What is CI/CD?**

Practices and automation pipelines used to test, build, and release software.

**Q31. What is GitHub Actions?**

A GitHub automation platform used to run workflows for CI/CD and other tasks.

**Q32. What is horizontal scaling?**

Adding more servers or application instances.

**Q33. What is vertical scaling?**

Increasing the resources of an existing server.

**Q34. What is graceful shutdown?**

Stopping an application safely while handling active requests and releasing resources.

**Q35. What is production monitoring?**

Continuously observing application health, performance, and errors.

---

# PART 26: PHASE 14 CHEAT SHEET

### Run Jest

```bash
npm test
```

### Run Jest Coverage

```bash
npx jest --coverage
```

### Run Node.js Test Runner

```bash
node --test
```

### Run Playwright

```bash
npx playwright test
```

### Debug Node.js

```bash
node --inspect app.js
```

### Debug from Start

```bash
node --inspect-brk app.js
```

### CPU Profile

```bash
node --cpu-prof app.js
```

### Load Testing

```bash
autocannon -c 100 -d 30 http://localhost:3000
```

### Artillery

```bash
artillery run load-test.yml
```

### PM2

```bash
pm2 start server.js

pm2 list

pm2 logs

pm2 restart all

pm2 stop all

pm2 monit
```

### Docker

```bash
docker build -t my-api .

docker run -d -p 3000:3000 my-api

docker ps

docker logs my-api

docker stop my-api
```

### Docker Compose

```bash
docker compose up -d

docker compose ps

docker compose logs

docker compose down
```

### GitHub

```bash
git add .

git commit -m "Add tests"

git push origin main
```

---

# PART 27: PHASE 14 COMPLETION CHECKLIST

Before moving to Phase 15, make sure you can:

### Testing

- [ ] Understand software testing.
- [ ] Understand unit testing.
- [ ] Understand integration testing.
- [ ] Understand end-to-end testing.
- [ ] Understand regression testing.
- [ ] Understand TDD.
- [ ] Install and configure Jest.
- [ ] Write unit tests.
- [ ] Test asynchronous functions.
- [ ] Test error conditions.
- [ ] Use Supertest.
- [ ] Write API integration tests.
- [ ] Understand Playwright.
- [ ] Understand mocking and spying.
- [ ] Measure test coverage.
- [ ] Use the Node.js built-in test runner.

### Debugging and Performance

- [ ] Debug Node.js applications.
- [ ] Understand stack traces.
- [ ] Use breakpoints.
- [ ] Use Node.js Inspector.
- [ ] Use VS Code debugging.
- [ ] Understand CPU profiling.
- [ ] Understand memory profiling.
- [ ] Understand load testing.
- [ ] Understand stress testing.
- [ ] Use Autocannon.
- [ ] Use Artillery.

### Deployment

- [ ] Understand production environments.
- [ ] Configure environment variables.
- [ ] Use PM2.
- [ ] Understand Docker.
- [ ] Create Dockerfiles.
- [ ] Build Docker images.
- [ ] Run Docker containers.
- [ ] Use Docker Compose.
- [ ] Understand Docker volumes.
- [ ] Configure Nginx.
- [ ] Understand reverse proxies.
- [ ] Understand load balancing.
- [ ] Understand CI/CD.
- [ ] Configure GitHub Actions.
- [ ] Deploy Node.js applications on AWS.
- [ ] Deploy applications on VPS.
- [ ] Understand production monitoring.
- [ ] Configure health checks.
- [ ] Understand horizontal scaling.
- [ ] Understand vertical scaling.
- [ ] Understand zero-downtime deployment.

---

# What Comes Next?

# PHASE 15: PRODUCTION-LEVEL BACKEND DEVELOPMENT

This is the final phase of the Node.js roadmap.

In this phase, we will combine everything learned in Phases 1–14 and build a professional backend architecture.

### Topics Covered

1. Production Backend Architecture.
2. Advanced Project Structure.
3. Layered Architecture.
4. Controller-Service-Repository Pattern.
5. SOLID Principles.
6. Design Patterns in Node.js.
7. Dependency Injection.
8. Database Architecture.
9. Database Transactions.
10. Database Indexing and Optimization.
11. Advanced Authentication.
12. Role-Based Access Control (RBAC).
13. Permission-Based Authorization.
14. Multi-Tenant Architecture.
15. API Versioning.
16. API Documentation with Swagger/OpenAPI.
17. Background Job Architecture.
18. Message Queues.
19. Redis Advanced Concepts.
20. Distributed Systems Fundamentals.
21. Microservices Architecture.
22. Monolithic vs Microservices.
23. Inter-Service Communication.
24. Event-Driven Architecture.
25. WebSocket Architecture.
26. Centralized Logging.
27. Monitoring and Observability.
28. Production Security.
29. Scalability and High Availability.
30. Complete Production-Level Backend Project.

**Key takeaway from Phase 14:** Writing backend code is only one part of software development. Professional applications also require automated testing, debugging, performance measurement, reliable deployment, monitoring, and operational management.