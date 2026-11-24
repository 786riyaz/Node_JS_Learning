# PHASE 01: Introduction to Node.js
**Level:** Beginner  
**Goal:** Understand Node.js fundamentals, architecture, execution environment, and how JavaScript works outside the browser.

This phase is divided into 3 sections:

1. Node.js Fundamentals
2. Node.js Architecture
3. Installation and Setup

Let's start with complete English notes.

---

# SECTION 1: Node.js Fundamentals

## 1. What is Node.js?

**Definition:**

Node.js is an open-source, cross-platform JavaScript runtime environment that allows developers to execute JavaScript code outside a web browser.

Traditionally, JavaScript was primarily used inside web browsers to make web pages interactive. Node.js allows us to use JavaScript for backend development, command-line tools, automation, and other applications.

**Example:**

JavaScript in a browser:

```javascript
console.log("Hello from Browser!");
```

JavaScript in Node.js:

```javascript
console.log("Hello from Node.js!");
```

Both execute JavaScript, but they run in different environments.

**Important Points:**
- Node.js is not a programming language.
- Node.js is not a JavaScript framework.
- Node.js is a JavaScript runtime environment.
- Node.js allows JavaScript to run outside browsers.
- Node.js is commonly used for backend development.

---

## 2. Why Was Node.js Created?

Before Node.js, JavaScript was primarily executed inside web browsers.

If developers wanted to build a backend application, they generally needed another programming language, such as:

- PHP
- Java
- Python
- Ruby
- C#

Node.js made it possible to use JavaScript on both the frontend and backend.

**Example:**

Without Node.js:

```text
Frontend             Backend
---------            ---------
HTML                 PHP
CSS                  PHP
JavaScript           MySQL
```

With Node.js:

```text
Frontend             Backend
---------            ---------
HTML                 Node.js
CSS                  Express.js
JavaScript           MongoDB
```

### Why Node.js Became Popular

1. JavaScript can be used for frontend and backend development.
2. It provides asynchronous, non-blocking I/O.
3. It is suitable for handling many concurrent connections.
4. It has a large package ecosystem through NPM.
5. It supports real-time applications.
6. It has a large developer community.

---

## 3. What Problems Does Node.js Solve?

Node.js helps developers build applications that handle multiple operations efficiently.

Consider a web application where 1,000 users send requests to a server.

The server might need to:

- Read data from a database.
- Read files.
- Communicate with external APIs.
- Process user requests.
- Send responses.

Traditional blocking operations can make a server wait until an operation finishes before proceeding.

Node.js uses non-blocking I/O to allow other work to proceed while certain operations are waiting for completion.

**Example:**

Imagine a restaurant:

**Blocking approach:**

A waiter takes an order and waits in the kitchen until the food is ready. Only then does the waiter serve another customer.

**Non-blocking approach:**

A waiter takes an order, sends it to the kitchen, and serves other customers while the food is being prepared.

Node.js primarily follows the second approach for I/O operations.

---

## 4. What is a JavaScript Runtime Environment?

**Definition:**

A JavaScript Runtime Environment is an environment that provides everything required to execute JavaScript code.

A runtime environment generally includes:

- JavaScript Engine.
- Memory Management.
- Execution Environment.
- APIs and supporting libraries.
- Mechanisms for handling asynchronous operations.

JavaScript itself does not provide all the functionality required to interact with the operating system or browser.

The runtime environment provides additional capabilities.

### Examples of JavaScript Runtime Environments

1. Browser Runtime (Chrome, Firefox, Edge).
2. Node.js Runtime.
3. Deno Runtime.
4. Bun Runtime.

### Browser Runtime

A browser provides JavaScript with browser-specific APIs.

Examples:

```javascript
console.log(window);

document.getElementById("heading");

localStorage.setItem("name", "Riyaz");

setTimeout(() => {
    console.log("Hello");
}, 1000);
```

### Node.js Runtime

Node.js provides APIs for interacting with the operating system.

Examples:

```javascript
console.log(process.version);

const fs = require("fs");

fs.writeFileSync("hello.txt", "Hello Node.js");
```

**Important:** `window` and `document` are browser APIs. They are not available in a normal Node.js environment.

---

## 5. Is Node.js a Programming Language?

No.

Node.js is not a programming language.

JavaScript is the programming language, and Node.js is the runtime environment that executes JavaScript outside the browser.

| JavaScript | Node.js |
|---|---|
| Programming language | Runtime environment |
| Defines syntax and language features | Provides execution environment |
| Can run in different environments | Executes JavaScript outside browsers |
| Supports variables, functions, classes, etc. | Provides APIs such as fs, http, and path |

---

## 6. Is Node.js a Framework?

No.

Node.js is a runtime environment, not a framework.

A framework provides an organized structure and tools for building applications.

For example:

| Technology | Category |
|---|---|
| JavaScript | Programming Language |
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| NestJS | Backend Framework |
| Fastify | Web Framework |
| React | Frontend Library |
| Next.js | React Framework |

### Relationship Between Node.js and Express.js

Express.js runs on Node.js.

```text
        Your Application
               |
               v
           Express.js
               |
               v
            Node.js
               |
               v
          Operating System
               |
               v
             Hardware
```

Express.js uses Node.js capabilities to handle HTTP requests and responses.

---

## 7. What is V8 JavaScript Engine?

**Definition:**

V8 is an open-source JavaScript and WebAssembly engine developed by Google.

It is responsible for executing JavaScript code by compiling and optimizing it into machine code.

V8 is used by:

- Google Chrome.
- Node.js.
- Other applications that embed V8.

### How Does V8 Work?

Consider this JavaScript code:

```javascript
const a = 10;
const b = 20;

console.log(a + b);
```

The general execution process:

1. V8 receives JavaScript code.
2. It parses the code.
3. It generates an internal representation.
4. It compiles and executes the code.
5. It can optimize frequently executed code.
6. The result is produced.

### Important V8 Concepts

- Parsing.
- Abstract Syntax Tree (AST).
- Ignition Interpreter.
- Bytecode.
- TurboFan Compiler.
- Just-In-Time (JIT) Compilation.
- Garbage Collection.

We will explore the internal execution process in more detail when studying Node.js architecture.

---

## 8. JavaScript in Browser vs JavaScript in Node.js

This is one of the most important concepts.

JavaScript is the same programming language, but the runtime environments provide different APIs.

| Feature | Browser | Node.js |
|---|---|---|
| JavaScript Engine | V8 (Chrome), SpiderMonkey (Firefox), etc. | V8 |
| DOM | Available | Not available by default |
| window | Available | Not available by default |
| document | Available | Not available by default |
| File System | Restricted browser APIs | Full filesystem APIs subject to OS permissions |
| HTTP Server | Not normally available | Available |
| Local Storage | Available | Not built in |
| process | Not normally available | Available |
| Browser Events | Available | Not available as browser APIs |
| NPM Packages | Can use browser-compatible packages | Can use Node-compatible packages |

### Example: Browser JavaScript

```javascript
document.querySelector("h1").innerText = "Hello";
```

This works because the browser provides the DOM API.

### Example: Node.js JavaScript

```javascript
const fs = require("fs");

fs.writeFileSync("data.txt", "Hello World");
```

This works because Node.js provides the File System API.

**Remember:**

JavaScript is the language. The runtime determines which additional APIs are available.

---

# SECTION 2: Node.js Architecture

## 9. What is Node.js Architecture?

Node.js architecture describes how Node.js executes JavaScript, manages asynchronous operations, handles I/O, and processes multiple requests.

Its major components include:

1. V8 Engine.
2. Node.js APIs.
3. libuv.
4. Event Loop.
5. Thread Pool.
6. Operating System.

### Simplified Architecture

```text
          JavaScript Code
                 |
                 v
            V8 Engine
                 |
                 v
          Node.js APIs
                 |
                 v
              libuv
                 |
          +------+------+
          |             |
          v             v
      Event Loop    Thread Pool
          |             |
          +------+------+
                 |
                 v
          Operating System
```

This is a simplified conceptual diagram, not the exact internal execution pipeline for every operation.

We will understand each component separately.

---

## 10. What is libuv?

**Definition:**

libuv is a cross-platform C library used by Node.js to provide asynchronous I/O operations, event loop functionality, and thread pool management.

In simple terms, libuv helps Node.js handle asynchronous operations efficiently.

### Responsibilities of libuv

1. Event Loop implementation.
2. Asynchronous I/O.
3. Thread Pool management.
4. File System operations.
5. Networking support.
6. Timer management.
7. Cross-platform support.

### Example

```javascript
const fs = require("fs");

console.log("Start");

fs.readFile("data.txt", "utf8", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(data);
});

console.log("End");
```

Output:

```text
Start
End
File Content
```

Why?

Because `fs.readFile()` performs an asynchronous operation.

Node.js can continue executing other JavaScript code while the file operation is being completed.

When the operation completes, its callback is scheduled for execution.

---

## 11. What is the Event Loop?

**Definition:**

The Event Loop is a mechanism that allows Node.js to handle asynchronous operations and execute their callbacks when they are ready.

It is an important part of Node.js architecture.

### Example

```javascript
console.log("1");

setTimeout(() => {
    console.log("2");
}, 1000);

console.log("3");
```

Output:

```text
1
3
2
```

### Why Does This Happen?

Step 1:

```javascript
console.log("1");
```

Executes immediately.

Step 2:

```javascript
setTimeout(() => {
    console.log("2");
}, 1000);
```

Schedules a timer.

Step 3:

```javascript
console.log("3");
```

Executes immediately without waiting for the timer.

Step 4:

After the timer becomes eligible, the callback executes.

Output:

```text
1
3
2
```

We will study Event Loop phases, microtasks, macrotasks, and execution order in Phase 6.

---

## 12. What is the Call Stack?

**Definition:**

The Call Stack is a data structure used by the JavaScript engine to keep track of function execution.

It follows the LIFO principle:

**LIFO = Last In, First Out.**

### Example

```javascript
function first() {
    console.log("First");

    second();
}

function second() {
    console.log("Second");

    third();
}

function third() {
    console.log("Third");
}

first();
```

Output:

```text
First
Second
Third
```

### How the Call Stack Works

Initially:

```text
Call Stack: Empty
```

After calling `first()`:

```text
| first() |
-----------
```

After calling `second()`:

```text
| second() |
| first()  |
------------
```

After calling `third()`:

```text
| third()  |
| second() |
| first()  |
------------
```

When `third()` finishes, it is removed.

Then `second()` is removed.

Finally, `first()` is removed.

The Call Stack becomes empty.

---

## 13. What is a Callback Queue?

**Definition:**

A callback queue is a queue where callbacks waiting to execute are placed after their associated asynchronous operations become ready.

For example:

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Timer");
}, 0);

console.log("End");
```

Output:

```text
Start
End
Timer
```

The timer callback does not interrupt the currently executing JavaScript code.

After the current synchronous code finishes, the Event Loop can process the eligible timer callback.

**Important:** Node.js has multiple queues and scheduling mechanisms, so the callback queue is a simplified general concept.

---

## 14. What is a Thread Pool?

**Definition:**

A Thread Pool is a collection of worker threads used by libuv to perform certain operations outside the main JavaScript thread.

For example:

- Some File System operations.
- Certain DNS operations.
- Some cryptographic operations.
- Compression operations.

By default, libuv uses a thread pool with four worker threads.

Its size can be configured using:

```text
UV_THREADPOOL_SIZE
```

### Example

```javascript
const crypto = require("crypto");

console.log("Start");

crypto.pbkdf2(
    "password",
    "salt",
    100000,
    64,
    "sha512",
    (err, key) => {
        if (err) throw err;

        console.log("Hash Generated");
    }
);

console.log("End");
```

Output:

```text
Start
End
Hash Generated
```

The expensive cryptographic operation is handled asynchronously using the underlying thread pool.

---

## 15. Is Node.js Single-Threaded or Multi-Threaded?

This is a very common interview question.

**Answer:**

Node.js executes JavaScript callbacks on a single main thread by default, but its underlying architecture uses multiple threads for certain operations.

For example:

- Main Thread: Executes JavaScript.
- Thread Pool: Handles certain asynchronous operations.
- Worker Threads: Allow developers to execute JavaScript in separate threads.
- Operating System: Handles many networking operations.

### Simplified Diagram

```text
              Node.js Process
                     |
          +----------+----------+
          |                     |
          v                     v
      Main Thread          Thread Pool
          |                     |
          v                     v
     JavaScript             Worker Tasks
     Execution              File System
     Event Loop              Crypto
                             Compression
```

### Single-Threaded vs Multi-Threaded

| Single-Threaded | Multi-Threaded |
|---|---|
| One execution thread | Multiple execution threads |
| Simpler execution model | Parallel execution is possible |
| JavaScript normally runs on one main thread | Multiple threads can execute JavaScript or other work |
| CPU-heavy work can block the main thread | Work can be distributed across threads |

---

## 16. Blocking vs Non-Blocking Operations

### Blocking Operation

A blocking operation prevents further JavaScript execution on the current thread until that operation completes.

Example:

```javascript
const fs = require("fs");

console.log("Start");

const data = fs.readFileSync("data.txt", "utf8");

console.log(data);

console.log("End");
```

Output:

```text
Start
File Content
End
```

The next statement waits for the file reading operation to finish.

### Non-Blocking Operation

A non-blocking operation allows JavaScript to continue executing while the operation is in progress.

Example:

```javascript
const fs = require("fs");

console.log("Start");

fs.readFile("data.txt", "utf8", (err, data) => {
    if (err) throw err;

    console.log(data);
});

console.log("End");
```

Output:

```text
Start
End
File Content
```

### Difference

| Blocking | Non-Blocking |
|---|---|
| Waits for operation completion | Does not wait synchronously |
| Prevents further execution on the current thread | Allows other work to continue |
| Can reduce concurrency | Supports higher concurrency |
| Example: readFileSync() | Example: readFile() |

---

## 17. Synchronous vs Asynchronous Operations

These terms are related to execution behavior.

### Synchronous

Operations execute sequentially. The next statement waits until the current operation finishes.

```javascript
console.log("A");

console.log("B");

console.log("C");
```

Output:

```text
A
B
C
```

### Asynchronous

An operation can complete later, allowing other code to execute in the meantime.

```javascript
console.log("A");

setTimeout(() => {
    console.log("B");
}, 1000);

console.log("C");
```

Output:

```text
A
C
B
```

**Important distinction:**

Synchronous/asynchronous describes how an operation is coordinated.

Blocking/non-blocking describes whether it prevents further execution on the current thread.

---

# SECTION 3: Installation and Setup

## 18. Installing Node.js

Node.js can be installed from its official website.

Official website:

https://nodejs.org/

You will generally see two versions:

### LTS (Long-Term Support)

- Recommended for most developers.
- Receives long-term maintenance.
- Suitable for production applications.
- More stable choice for learning.

### Current

- Contains newer features.
- Receives the latest updates.
- Useful for testing new Node.js functionality.

**Recommendation:** Use the latest LTS release for learning and production development.

---

## 19. Checking Node.js Installation

Open your terminal or Command Prompt.

Check Node.js version:

```bash
node -v
```

Check NPM version:

```bash
npm -v
```

Example output:

```text
v24.x.x
11.x.x
```

Your actual version may differ.

---

## 20. What is Node.js REPL?

**Definition:**

REPL stands for:

- R = Read
- E = Evaluate
- P = Print
- L = Loop

Node.js REPL is an interactive environment that allows developers to execute JavaScript commands directly in the terminal.

### Start REPL

```bash
node
```

Now execute:

```javascript
10 + 20
```

Output:

```text
30
```

Another example:

```javascript
const name = "Riyaz";

console.log(name);
```

Output:

```text
Riyaz
```

### Exit REPL

```bash
.exit
```

Or press:

```text
Ctrl + C (twice)
```

---

## 21. Running JavaScript Files Using Node.js

Create a file:

```text
index.js
```

Write:

```javascript
const name = "Node.js";

console.log(`Hello ${name}`);
```

Open the terminal in the project directory.

Execute:

```bash
node index.js
```

Output:

```text
Hello Node.js
```

Congratulations! You have executed JavaScript outside the browser.

---

# 8. Practical Exercises

Complete these exercises before moving to Phase 2.

### Exercise 1: Basic Node.js

Create an `index.js` file.

Print:

```text
My First Node.js Application
```

### Exercise 2: JavaScript Execution

Create variables:

```javascript
const name = "Your Name";
const age = 25;
const profession = "Backend Developer";
```

Print all information using template literals.

### Exercise 3: Browser vs Node.js

Try executing:

```javascript
console.log(window);
```

Then try:

```javascript
console.log(process.version);
```

Understand why one works and the other does not.

### Exercise 4: Synchronous vs Asynchronous

Execute this code and predict its output before running it:

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Inside Timeout");
}, 0);

console.log("End");
```

### Exercise 5: Call Stack

Understand the execution order:

```javascript
function one() {
    console.log("One");

    two();
}

function two() {
    console.log("Two");

    three();
}

function three() {
    console.log("Three");
}

one();
```

---

# 9. Phase 1 Interview Questions

Prepare answers to these questions:

1. What is Node.js?
2. Is Node.js a programming language?
3. Is Node.js a framework?
4. Why was Node.js created?
5. What is a JavaScript Runtime Environment?
6. What is V8 Engine?
7. What is the difference between JavaScript and Node.js?
8. What is libuv?
9. What is the Event Loop?
10. What is the Call Stack?
11. What is a Callback Queue?
12. What is a Thread Pool?
13. Is Node.js single-threaded or multi-threaded?
14. What is the difference between blocking and non-blocking operations?
15. What is the difference between synchronous and asynchronous operations?
16. What is REPL?
17. What is the difference between Browser JavaScript and Node.js?

---

# 10. Phase 1 Completion Checklist

Before moving to Phase 2, make sure you understand:

- [ ] What Node.js is.
- [ ] Why Node.js was created.
- [ ] JavaScript Runtime Environment.
- [ ] V8 JavaScript Engine.
- [ ] Browser vs Node.js.
- [ ] Node.js Architecture.
- [ ] libuv.
- [ ] Event Loop fundamentals.
- [ ] Call Stack.
- [ ] Callback Queue.
- [ ] Thread Pool.
- [ ] Single-threaded vs Multi-threaded.
- [ ] Blocking vs Non-Blocking.
- [ ] Synchronous vs Asynchronous.
- [ ] Installing Node.js.
- [ ] Using Node.js REPL.
- [ ] Executing JavaScript files.

**Phase 1 is complete when you can explain these concepts in your own words and demonstrate them with code.**

### Recommended next step

Complete the five practical exercises and revise the interview questions. Once you're comfortable, we'll move to:

**PHASE 02: Node.js Environment & NPM**

There we will cover NPM, package.json, package-lock.json, node_modules, dependencies, devDependencies, Nodemon, dotenv, environment variables, and project configuration in detail.