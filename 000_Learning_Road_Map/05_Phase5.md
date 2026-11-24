# PHASE 05: Asynchronous Programming in Node.js

**Level:** Beginner to Intermediate  
**Goal:** Understand how asynchronous operations work in JavaScript and Node.js, and learn to manage them using callbacks, Promises, and `async/await`.

---

## Topics Covered

1. Synchronous vs Asynchronous Programming
2. Blocking vs Non-Blocking Operations
3. Callbacks
4. Error-First Callback Pattern
5. Callback Hell
6. Promises
7. Promise States
8. Promise Chaining
9. Promise Methods (`all`, `allSettled`, `race`, `any`)
10. Async/Await
11. Error Handling with Async/Await
12. Sequential vs Parallel Execution
13. Common Asynchronous Programming Mistakes
14. Practical Projects
15. Interview Questions

---

# 1. Synchronous vs Asynchronous Programming

Before understanding asynchronous programming in Node.js, you must understand two execution models.

## 1.1 What is Synchronous Programming?

Synchronous programming means that code executes one statement at a time, in sequence.

The next statement does not execute until the current statement has completed.

### Example

```javascript
console.log("Task 1");

console.log("Task 2");

console.log("Task 3");
```

**Output:**

```text
Task 1
Task 2
Task 3
```

Execution happens in this order:

1. Execute Task 1.
2. Execute Task 2.
3. Execute Task 3.

Each statement completes before the next one starts.

### Another Example

```javascript
const fs = require("node:fs");

console.log("Reading file...");

const data = fs.readFileSync("data.txt", "utf-8");

console.log(data);

console.log("Program completed.");
```

Here, `readFileSync()` reads the file synchronously.

Node.js waits until the file-reading operation finishes before executing the next statement.

If the file is large or the disk is slow, the application may become unresponsive while waiting.

---

## 1.2 What is Asynchronous Programming?

Asynchronous programming allows certain operations to start without forcing the JavaScript execution flow to wait for them to finish.

The program can continue executing other work while the asynchronous operation is in progress.

When the operation completes, its result can be handled using a callback, Promise, or `async/await`.

### Example

```javascript
const fs = require("node:fs");

console.log("Reading file...");

fs.readFile("data.txt", "utf-8", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(data);
});

console.log("Program completed.");
```

**Possible output:**

```text
Reading file...
Program completed.
File content...
```

### Why does this happen?

1. Node.js starts reading the file.
2. The file-reading operation is handled asynchronously.
3. Node.js continues executing the remaining JavaScript code.
4. `Program completed.` gets printed.
5. Once the file is read, the callback is scheduled for execution.
6. The callback prints the file content.

**Important:** The file-reading operation does not block the main JavaScript execution flow.

---

## 1.3 Synchronous vs Asynchronous Comparison

| Feature | Synchronous | Asynchronous |
|---|---|---|
| Execution | Sequential | Can continue while operations are pending |
| Waiting | Blocks the current execution flow | Usually does not block the JS thread |
| Performance | Can be inefficient for I/O-heavy work | Better suited for I/O-heavy work |
| Complexity | Easier to understand | Requires async handling |
| Example | `readFileSync()` | `readFile()` |
| Common use | Small scripts, startup tasks | APIs, database queries, file operations |

### When should you use asynchronous operations?

Use asynchronous operations for:

- Reading and writing files.
- Database queries.
- HTTP requests.
- API calls.
- Network communication.
- Large I/O operations.

Synchronous operations can be useful for:

- Small command-line scripts.
- Simple startup configuration.
- Tasks where blocking is acceptable.

In a production Node.js server, avoid unnecessary synchronous operations in request-handling code.

---

# 2. Blocking vs Non-Blocking Operations

These terms are closely related to synchronous and asynchronous programming.

## 2.1 Blocking Operations

A blocking operation prevents the current JavaScript thread from continuing until the operation finishes.

### Example

```javascript
const fs = require("node:fs");

console.log("Start");

const data = fs.readFileSync("data.txt", "utf-8");

console.log("File read completed");

console.log("End");
```

The JavaScript thread cannot execute `File read completed` or `End` until the file has been read.

## 2.2 Non-Blocking Operations

A non-blocking operation allows the JavaScript thread to continue executing other work while the operation is pending.

### Example

```javascript
const fs = require("node:fs");

console.log("Start");

fs.readFile("data.txt", "utf-8", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log("File read completed");
});

console.log("End");
```

**Output:**

```text
Start
End
File read completed
```

### Important distinction

- **Synchronous/asynchronous** describes how an operation is coordinated with the program's execution.
- **Blocking/non-blocking** describes whether an operation prevents the current thread from doing other work.

In Node.js, asynchronous I/O APIs are generally designed to be non-blocking.

However, not every asynchronous-looking operation is necessarily non-blocking. For example, CPU-intensive JavaScript code still blocks the main JavaScript thread.

---

# 3. What is a Callback?

A callback is a function passed as an argument to another function so that it can be called later.

Callbacks are commonly used in Node.js for handling asynchronous operations.

### Basic Example

```javascript
function greet(name, callback) {
    console.log("Hello " + name);

    callback();
}

function sayGoodbye() {
    console.log("Goodbye!");
}

greet("Riyaz", sayGoodbye);
```

**Output:**

```text
Hello Riyaz
Goodbye!
```

Here:

- `sayGoodbye` is a callback function.
- It is passed to `greet()`.
- `greet()` calls the callback.

### Callback with Parameters

```javascript
function calculate(a, b, callback) {
    const result = a + b;

    callback(result);
}

function displayResult(value) {
    console.log("Result:", value);
}

calculate(10, 20, displayResult);
```

**Output:**

```text
Result: 30
```

### Anonymous Callback Function

You do not always need to define a separate callback function.

```javascript
function calculate(a, b, callback) {
    const result = a + b;

    callback(result);
}

calculate(10, 20, function (result) {
    console.log("Result:", result);
});
```

You can also use an arrow function:

```javascript
calculate(10, 20, (result) => {
    console.log("Result:", result);
});
```

---

## 3.1 Synchronous vs Asynchronous Callbacks

A callback is not automatically asynchronous.

It depends on when and how the function calls it.

### Synchronous Callback

```javascript
console.log("Start");

[1, 2, 3].forEach((number) => {
    console.log(number);
});

console.log("End");
```

**Output:**

```text
Start
1
2
3
End
```

The callback passed to `forEach()` executes synchronously.

### Asynchronous Callback

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Callback executed");
}, 1000);

console.log("End");
```

**Output:**

```text
Start
End
Callback executed
```

The callback executes later.

**Remember:** A callback is simply a function passed to another function. It can be synchronous or asynchronous.

---

# 4. Error-First Callback Pattern

Node.js traditionally uses an error-first callback convention for many callback-based APIs.

In this pattern, the first callback parameter represents an error.

The second parameter usually represents the result.

### Syntax

```javascript
function callback(err, result) {
    if (err) {
        // Handle error
        return;
    }

    // Handle successful result
}
```

### Example: Reading a File

```javascript
const fs = require("node:fs");

fs.readFile("data.txt", "utf-8", (err, data) => {
    if (err) {
        console.log("Error:", err.message);
        return;
    }

    console.log("File Content:", data);
});
```

### How does it work?

**If the operation succeeds:**

```javascript
err = null;
data = "Hello World";
```

**If the operation fails:**

```javascript
err = Error("ENOENT: no such file or directory");
data = undefined;
```

The exact error object depends on the failure.

### Why is the error-first pattern useful?

It provides a consistent way to handle errors in asynchronous operations.

For example:

```javascript
function getUser(userId, callback) {
    if (!userId) {
        callback(new Error("User ID is required"), null);
        return;
    }

    const user = {
        id: userId,
        name: "John"
    };

    callback(null, user);
}

getUser(101, (err, user) => {
    if (err) {
        console.log(err.message);
        return;
    }

    console.log(user);
});
```

**Output:**

```text
{ id: 101, name: 'John' }
```

---

# 5. What is Callback Hell?

Callback Hell occurs when multiple nested callbacks make code difficult to read, understand, debug, and maintain.

It is also called the **Pyramid of Doom** because the code gradually moves toward the right.

### Example

Imagine you are building an application that needs to:

1. Get a user.
2. Get the user's orders.
3. Get the details of the first order.
4. Get the payment details.
5. Display the final result.

Using nested callbacks:

```javascript
getUser(101, (err, user) => {
    if (err) {
        console.log(err);
        return;
    }

    getOrders(user.id, (err, orders) => {
        if (err) {
            console.log(err);
            return;
        }

        getOrderDetails(orders[0].id, (err, orderDetails) => {
            if (err) {
                console.log(err);
                return;
            }

            getPayment(orderDetails.paymentId, (err, payment) => {
                if (err) {
                    console.log(err);
                    return;
                }

                console.log({
                    user,
                    orders,
                    orderDetails,
                    payment
                });
            });
        });
    });
});
```

### Problems with Callback Hell

1. Code becomes deeply nested.
2. Readability decreases.
3. Error handling becomes repetitive.
4. Debugging becomes difficult.
5. Code maintenance becomes complicated.
6. Reusing logic becomes harder.

### How can we solve Callback Hell?

Modern JavaScript provides two major approaches:

- Promises
- Async/Await

We will understand both in the next sections.

---

# 6. What is a Promise?

A Promise is a JavaScript object that represents the eventual completion or failure of an asynchronous operation.

In simple words:

A Promise represents a value that may be available now, later, or never if the operation fails.

Promises help us manage asynchronous operations without deeply nested callbacks.

### Example

```javascript
const promise = new Promise((resolve, reject) => {
    const success = true;

    if (success) {
        resolve("Operation completed successfully");
    } else {
        reject("Operation failed");
    }
});

console.log(promise);
```

A Promise accepts an executor function with two parameters:

- `resolve`: Used to fulfill the Promise.
- `reject`: Used to reject the Promise.

### Promise Syntax

```javascript
const promise = new Promise((resolve, reject) => {
    // Perform an operation

    if (/* operation successful */) {
        resolve(result);
    } else {
        reject(error);
    }
});
```

### Example with setTimeout()

```javascript
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Data received");
    }, 2000);
});

promise.then((result) => {
    console.log(result);
});
```

**Output after approximately 2 seconds:**

```text
Data received
```

---

# 7. Promise States

A Promise has three possible states.

| State | Meaning |
|---|---|
| Pending | Initial state; operation is still in progress |
| Fulfilled | Operation completed successfully |
| Rejected | Operation failed |

### 7.1 Pending

The Promise has been created, but the operation has not completed.

```javascript
const promise = new Promise((resolve, reject) => {
    // No resolve or reject called yet
});

console.log(promise);
```

**Output:**

```text
Promise { <pending> }
```

### 7.2 Fulfilled

The operation completed successfully.

```javascript
const promise = new Promise((resolve, reject) => {
    resolve("Success");
});

console.log(promise);
```

### 7.3 Rejected

The operation failed.

```javascript
const promise = new Promise((resolve, reject) => {
    reject("Something went wrong");
});
```

### Important Rules

- A Promise can move from pending to fulfilled.
- A Promise can move from pending to rejected.
- Once fulfilled or rejected, its state cannot change.
- A settled Promise cannot become pending again.

**Fulfilled and rejected Promises are collectively called settled Promises.**

---

# 8. Handling Promises

JavaScript provides three important methods for handling Promises:

1. `.then()`
2. `.catch()`
3. `.finally()`

## 8.1 then()

The `.then()` method handles a successfully fulfilled Promise.

### Syntax

```javascript
promise.then(onFulfilled);
```

### Example

```javascript
const promise = new Promise((resolve, reject) => {
    resolve("Data received successfully");
});

promise.then((result) => {
    console.log(result);
});
```

**Output:**

```text
Data received successfully
```

You can also provide a rejection handler as the second argument:

```javascript
promise.then(
    (result) => {
        console.log(result);
    },
    (error) => {
        console.log(error);
    }
);
```

However, `.catch()` is generally preferred for rejection handling.

## 8.2 catch()

The `.catch()` method handles a rejected Promise.

### Example

```javascript
const promise = new Promise((resolve, reject) => {
    reject("Something went wrong");
});

promise.catch((error) => {
    console.log("Error:", error);
});
```

**Output:**

```text
Error: Something went wrong
```

## 8.3 finally()

The `.finally()` method executes after the Promise settles, regardless of whether it was fulfilled or rejected.

It is commonly used for cleanup operations.

### Example

```javascript
const promise = new Promise((resolve, reject) => {
    resolve("Operation successful");
});

promise
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        console.log("Operation completed");
    });
```

**Output:**

```text
Operation successful
Operation completed
```

### Practical Use Case: Loading Indicator

Imagine you are calling an API from your frontend.

You want to:

1. Show a loading indicator.
2. Fetch data.
3. Display the result or error.
4. Hide the loading indicator.

```javascript
fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => {
        console.log(users);
    })
    .catch((error) => {
        console.log("Error:", error);
    })
    .finally(() => {
        console.log("Loading completed");
    });
```

---

# 9. Promise Chaining

Promise chaining allows us to execute multiple asynchronous operations in sequence without deeply nesting callbacks.

The `.then()` method returns a new Promise.

This allows us to attach another `.then()` to the result.

### Example

```javascript
const promise = new Promise((resolve, reject) => {
    resolve(10);
});

promise
    .then((result) => {
        console.log(result);

        return result * 2;
    })
    .then((result) => {
        console.log(result);

        return result + 5;
    })
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });
```

**Output:**

```text
10
20
25
```

### How does Promise Chaining Work?

1. The first `.then()` receives `10`.
2. It returns `20`.
3. The next `.then()` receives `20`.
4. It returns `25`.
5. The final `.then()` receives `25`.

### Chaining with Asynchronous Operations

```javascript
function getUser() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: 101,
                name: "John"
            });
        }, 1000);
    });
}

function getOrders(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, userId },
                { id: 2, userId }
            ]);
        }, 1000);
    });
}

getUser()
    .then((user) => {
        console.log("User:", user);

        return getOrders(user.id);
    })
    .then((orders) => {
        console.log("Orders:", orders);
    })
    .catch((error) => {
        console.log("Error:", error);
    });
```

The second operation starts after the first operation completes.

### Important: Always Return Promises in a Chain

Consider this incorrect example:

```javascript
getUser()
    .then((user) => {
        getOrders(user.id);
    })
    .then((orders) => {
        console.log(orders);
    });
```

The first `.then()` does not return the Promise from `getOrders()`.

Therefore, the next `.then()` does not wait for the orders operation and receives `undefined`.

Correct version:

```javascript
getUser()
    .then((user) => {
        return getOrders(user.id);
    })
    .then((orders) => {
        console.log(orders);
    });
```

---

# 10. Promise Static Methods

JavaScript provides several static Promise methods for managing multiple asynchronous operations.

The most important ones are:

1. `Promise.resolve()`
2. `Promise.reject()`
3. `Promise.all()`
4. `Promise.allSettled()`
5. `Promise.race()`
6. `Promise.any()`

## 10.1 Promise.resolve()

Creates a fulfilled Promise with the provided value.

```javascript
const promise = Promise.resolve("Success");

promise.then((result) => {
    console.log(result);
});
```

**Output:**

```text
Success
```

## 10.2 Promise.reject()

Creates a rejected Promise with the provided reason.

```javascript
const promise = Promise.reject("Something went wrong");

promise.catch((error) => {
    console.log(error);
});
```

**Output:**

```text
Something went wrong
```

## 10.3 Promise.all()

`Promise.all()` runs multiple Promises concurrently and waits for all of them to fulfill.

It fulfills when every input Promise fulfills.

If any input Promise rejects, the returned Promise rejects with that rejection reason.

### Example

```javascript
const promise1 = Promise.resolve("Task 1 completed");

const promise2 = Promise.resolve("Task 2 completed");

const promise3 = Promise.resolve("Task 3 completed");

Promise.all([promise1, promise2, promise3])
    .then((results) => {
        console.log(results);
    })
    .catch((error) => {
        console.log(error);
    });
```

**Output:**

```text
[
    'Task 1 completed',
    'Task 2 completed',
    'Task 3 completed'
]
```

### Example with setTimeout()

```javascript
function task(name, time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`${name} completed`);
        }, time);
    });
}

Promise.all([
    task("Task 1", 3000),
    task("Task 2", 2000),
    task("Task 3", 1000)
])
    .then((results) => {
        console.log(results);
    });
```

**Output after approximately 3 seconds:**

```text
[
    'Task 1 completed',
    'Task 2 completed',
    'Task 3 completed'
]
```

Notice that the output order matches the input order, not the completion order.

### Important Points

- All operations are started without waiting for the previous one to finish.
- The result array preserves input order.
- It rejects when the first rejection is observed.
- It does not automatically cancel the remaining operations.

### When should you use Promise.all()?

Use it when multiple independent operations must all succeed.

For example:

- Fetching user profile data.
- Fetching notifications.
- Fetching account settings.

```javascript
const [profile, notifications, settings] = await Promise.all([
    getProfile(),
    getNotifications(),
    getSettings()
]);
```

---

## 10.4 Promise.allSettled()

`Promise.allSettled()` waits for all input Promises to settle, regardless of whether they fulfill or reject.

It always fulfills with an array of result objects, unless the iterable itself is invalid or cannot be processed.

### Example

```javascript
const promise1 = Promise.resolve("Task 1 successful");

const promise2 = Promise.reject("Task 2 failed");

const promise3 = Promise.resolve("Task 3 successful");

Promise.allSettled([promise1, promise2, promise3])
    .then((results) => {
        console.log(results);
    });
```

**Output:**

```javascript
[
    {
        status: "fulfilled",
        value: "Task 1 successful"
    },
    {
        status: "rejected",
        reason: "Task 2 failed"
    },
    {
        status: "fulfilled",
        value: "Task 3 successful"
    }
]
```

### When should you use Promise.allSettled()?

Use it when you want to collect the result of every operation, even if some operations fail.

Example:

Suppose you are uploading 10 files.

You want to know:

- Which files uploaded successfully?
- Which files failed?

`Promise.allSettled()` is useful for this situation.

---

## 10.5 Promise.race()

`Promise.race()` returns a Promise that settles as soon as the first input Promise settles.

It does not matter whether that first Promise fulfills or rejects.

### Example

```javascript
const promise1 = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Promise 1 completed");
    }, 3000);
});

const promise2 = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Promise 2 completed");
    }, 1000);
});

Promise.race([promise1, promise2])
    .then((result) => {
        console.log(result);
    });
```

**Output after approximately 1 second:**

```text
Promise 2 completed
```

### When should you use Promise.race()?

It can be useful for implementing a timeout mechanism.

```javascript
function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("Request timed out"));
        }, ms);
    });
}

Promise.race([
    fetch("https://jsonplaceholder.typicode.com/users"),
    timeout(5000)
])
    .then((response) => {
        console.log("Response received:", response.status);
    })
    .catch((error) => {
        console.log(error.message);
    });
```

**Important:** `Promise.race()` does not cancel the losing operation. The fetch request may continue running even after the timeout Promise wins.

For actual cancellation, use `AbortController`.

---

## 10.6 Promise.any()

`Promise.any()` fulfills as soon as the first input Promise fulfills.

It ignores earlier rejections while waiting for a successful result.

If all input Promises reject, it rejects with an `AggregateError`.

### Example

```javascript
const promise1 = Promise.reject("Server 1 failed");

const promise2 = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Server 2 successful");
    }, 2000);
});

const promise3 = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Server 3 successful");
    }, 1000);
});

Promise.any([promise1, promise2, promise3])
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });
```

**Output after approximately 1 second:**

```text
Server 3 successful
```

### When should you use Promise.any()?

Suppose your application has multiple backup servers.

You want to use the first server that responds successfully.

`Promise.any()` is useful for that scenario.

---

## 10.7 Promise Methods Comparison

| Method | Behavior | Result |
|---|---|---|
| `Promise.resolve()` | Creates a fulfilled Promise | Fulfilled Promise |
| `Promise.reject()` | Creates a rejected Promise | Rejected Promise |
| `Promise.all()` | Waits for all to fulfill | Array of values or rejection |
| `Promise.allSettled()` | Waits for all to settle | Array of status objects |
| `Promise.race()` | First Promise to settle wins | First fulfillment or rejection |
| `Promise.any()` | First Promise to fulfill wins | First fulfilled value or AggregateError |

### Important Difference: race() vs any()

| Feature | `Promise.race()` | `Promise.any()` |
|---|---|---|
| What wins? | First settled Promise | First fulfilled Promise |
| First rejection | Immediately rejects | Ignored while waiting |
| All rejected | Rejects based on first settlement | Rejects with AggregateError |
| Common use | Timeout or first response | First successful response |

---

# 11. What is Async/Await?

`async/await` is modern JavaScript syntax that makes asynchronous code easier to write and understand.

It is built on top of Promises.

It does not eliminate asynchronous execution. It provides a cleaner way to work with Promises.

## 11.1 async Keyword

The `async` keyword is used before a function declaration.

An async function always returns a Promise.

### Example

```javascript
async function greet() {
    return "Hello World";
}

const result = greet();

console.log(result);
```

**Output:**

```text
Promise { 'Hello World' }
```

Even though the function returns a normal string, JavaScript automatically wraps that value in a fulfilled Promise.

Equivalent code:

```javascript
function greet() {
    return Promise.resolve("Hello World");
}
```

### Async Arrow Function

```javascript
const greet = async () => {
    return "Hello World";
};

greet().then((result) => {
    console.log(result);
});
```

---

## 11.2 await Keyword

The `await` keyword pauses the execution of the surrounding async function until the Promise settles.

If the Promise fulfills, `await` evaluates to its fulfillment value.

If the Promise rejects, `await` throws the rejection reason.

### Example

```javascript
function getData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data received");
        }, 2000);
    });
}

async function displayData() {
    console.log("Start");

    const result = await getData();

    console.log(result);

    console.log("End");
}

displayData();
```

**Output:**

```text
Start
Data received
End
```

The function waits for `getData()` before executing the next statement inside `displayData()`.

### Important: Does await Block Node.js?

No.

`await` suspends the execution of the surrounding async function. It does not block the entire Node.js JavaScript thread while the awaited Promise is pending.

Other JavaScript work can continue.

### Example

```javascript
function getData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data received");
        }, 2000);
    });
}

async function displayData() {
    console.log("Inside function: Start");

    const result = await getData();

    console.log(result);

    console.log("Inside function: End");
}

console.log("Program Start");

displayData();

console.log("Program End");
```

**Output:**

```text
Program Start
Inside function: Start
Program End
Data received
Inside function: End
```

Notice that `Program End` executes while `displayData()` is waiting.

---

# 12. Error Handling with Async/Await

You can handle errors in async functions using `try...catch`.

### Example

```javascript
function getData() {
    return new Promise((resolve, reject) => {
        reject(new Error("Unable to fetch data"));
    });
}

async function displayData() {
    try {
        const result = await getData();

        console.log(result);
    } catch (error) {
        console.log("Error:", error.message);
    }
}

displayData();
```

**Output:**

```text
Error: Unable to fetch data
```

### How does it work?

- `try` contains code that may throw an error.
- If the awaited Promise fulfills, execution continues normally.
- If it rejects, the rejection is thrown at the `await` expression.
- `catch` handles the error.

### Example with Node.js File System

Using the `fs/promises` API:

```javascript
const fs = require("node:fs/promises");

async function readFile() {
    try {
        const data = await fs.readFile("data.txt", "utf-8");

        console.log(data);
    } catch (error) {
        console.log("File reading failed:", error.message);
    }
}

readFile();
```

### Handling Errors in Multiple Operations

```javascript
async function getUserData() {
    try {
        const user = await getUser();

        const orders = await getOrders(user.id);

        const payment = await getPayment(orders[0].id);

        console.log({
            user,
            orders,
            payment
        });

    } catch (error) {
        console.log("Error:", error.message);
    }
}

getUserData();
```

This is much easier to read than deeply nested callbacks.

---

# 13. Sequential vs Parallel Execution

This is one of the most important topics in asynchronous Node.js programming.

You should understand when to execute asynchronous operations sequentially and when to execute them concurrently.

## 13.1 Sequential Execution

Sequential execution means one operation starts after the previous operation completes.

### Example

```javascript
function task(name, time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`${name} completed`);

            resolve();
        }, time);
    });
}

async function runTasks() {
    await task("Task 1", 2000);

    await task("Task 2", 2000);

    await task("Task 3", 2000);

    console.log("All tasks completed");
}

runTasks();
```

**Output:**

```text
Task 1 completed
Task 2 completed
Task 3 completed
All tasks completed
```

**Total time:** Approximately 6 seconds.

Why?

- Task 1 takes 2 seconds.
- Task 2 starts after Task 1 finishes.
- Task 3 starts after Task 2 finishes.

### When should you use sequential execution?

Use sequential execution when the next operation depends on the previous operation's result.

Example:

```javascript
const user = await createUser();

const profile = await createProfile(user.id);

const account = await createAccount(profile.id);
```

Here, each operation requires information from the previous operation.

---

## 13.2 Parallel/Concurrent Execution

Concurrent execution means multiple asynchronous operations are started without waiting for each previous operation to complete.

In JavaScript, `Promise.all()` is commonly used for this.

### Example

```javascript
function task(name, time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`${name} completed`);

            resolve();
        }, time);
    });
}

async function runTasks() {
    await Promise.all([
        task("Task 1", 2000),
        task("Task 2", 2000),
        task("Task 3", 2000)
    ]);

    console.log("All tasks completed");
}

runTasks();
```

**Output:**

```text
Task 1 completed
Task 2 completed
Task 3 completed
All tasks completed
```

**Total time:** Approximately 2 seconds.

All three tasks start without waiting for one another.

### Sequential vs Concurrent Comparison

| Feature | Sequential | Concurrent |
|---|---|---|
| Execution | One after another | Multiple operations in progress |
| Dependency | Suitable for dependent tasks | Suitable for independent tasks |
| Total time | Usually higher | Often lower for I/O operations |
| Common technique | Multiple `await` statements | `Promise.all()` |
| Example | Create user, then profile | Fetch profile and notifications |

### Important: Async/Await Does Not Automatically Make Operations Concurrent

Consider:

```javascript
const user = await getUser();

const orders = await getOrders();

const settings = await getSettings();
```

These operations run sequentially.

If they are independent, start them first:

```javascript
const userPromise = getUser();

const ordersPromise = getOrders();

const settingsPromise = getSettings();

const [user, orders, settings] = await Promise.all([
    userPromise,
    ordersPromise,
    settingsPromise
]);
```

Or more concisely:

```javascript
const [user, orders, settings] = await Promise.all([
    getUser(),
    getOrders(),
    getSettings()
]);
```

**Remember:** Use sequential execution when operations depend on each other. Use concurrent execution when operations are independent.

Also, concurrency does not mean JavaScript is executing all those operations simultaneously on multiple CPU cores. It means multiple operations can be in progress at the same time. The underlying work may be handled by the operating system, libuv, or other runtime facilities.

---

# 14. Common Asynchronous Programming Mistakes

Understanding mistakes is just as important as understanding the correct syntax.

## 14.1 Forgetting await

Incorrect:

```javascript
async function getUserData() {
    const user = getUser();

    console.log(user);
}
```

If `getUser()` returns a Promise, `user` contains a Promise rather than the actual user data.

Correct:

```javascript
async function getUserData() {
    const user = await getUser();

    console.log(user);
}
```

## 14.2 Not Returning a Promise in a Chain

Incorrect:

```javascript
getUser()
    .then((user) => {
        getOrders(user.id);
    })
    .then((orders) => {
        console.log(orders);
    });
```

Correct:

```javascript
getUser()
    .then((user) => {
        return getOrders(user.id);
    })
    .then((orders) => {
        console.log(orders);
    });
```

## 14.3 Using await Inside forEach()

Incorrect:

```javascript
const users = [1, 2, 3];

users.forEach(async (id) => {
    const user = await getUser(id);

    console.log(user);
});

console.log("Completed");
```

`forEach()` does not wait for the Promises returned by its callback.

Therefore, `Completed` may print before all users are fetched.

### Correct Approach 1: Sequential Processing with for...of

```javascript
const users = [1, 2, 3];

async function processUsers() {
    for (const id of users) {
        const user = await getUser(id);

        console.log(user);
    }

    console.log("Completed");
}

processUsers();
```

### Correct Approach 2: Concurrent Processing with Promise.all()

```javascript
const users = [1, 2, 3];

async function processUsers() {
    const results = await Promise.all(
        users.map((id) => getUser(id))
    );

    console.log(results);

    console.log("Completed");
}

processUsers();
```

## 14.4 Not Handling Promise Rejections

Incorrect:

```javascript
async function getData() {
    const result = await fetchData();

    console.log(result);
}

getData();
```

If `fetchData()` rejects, the async function's returned Promise rejects too.

If nothing handles that rejection, it can become an unhandled rejection.

Correct:

```javascript
async function getData() {
    try {
        const result = await fetchData();

        console.log(result);
    } catch (error) {
        console.log(error.message);
    }
}

getData();
```

Alternatively, handle the returned Promise:

```javascript
getData().catch((error) => {
    console.log(error.message);
});
```

## 14.5 Sequentially Awaiting Independent Operations

Inefficient when operations are independent:

```javascript
const users = await getUsers();

const products = await getProducts();

const orders = await getOrders();
```

Better:

```javascript
const [users, products, orders] = await Promise.all([
    getUsers(),
    getProducts(),
    getOrders()
]);
```

## 14.6 Blocking the Event Loop with CPU-Heavy Work

Asynchronous I/O does not automatically make CPU-intensive JavaScript non-blocking.

Example:

```javascript
function heavyTask() {
    let result = 0;

    for (let i = 0; i < 10_000_000_000; i++) {
        result += i;
    }

    return result;
}
```

Calling this function blocks the main JavaScript thread while the loop runs.

For CPU-intensive tasks, consider:

- Worker Threads.
- Child Processes.
- Offloading work to another service.

These topics will be covered in later phases.

---

# 15. Understanding Microtasks and Macrotasks

You have already learned that asynchronous operations do not always execute immediately.

Now you need to understand how Promise callbacks are scheduled.

JavaScript uses different task queues and scheduling mechanisms.

Two important categories are:

1. Microtasks
2. Macrotasks (commonly called tasks)

## 15.1 Microtasks

Microtasks include:

- Promise `.then()` callbacks.
- Promise `.catch()` callbacks.
- Promise `.finally()` callbacks.
- Continuations after `await`.

Microtasks are processed after the current JavaScript execution completes and before the event loop moves on to the next task.

## 15.2 Macrotasks / Tasks

Common examples include:

- `setTimeout()` callbacks.
- `setInterval()` callbacks.
- Some I/O callbacks.

Node.js has its own event loop phases and additional scheduling mechanisms, which we will explore in Phase 6.

### Example

```javascript
console.log("Start");

setTimeout(() => {
    console.log("setTimeout");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise");
});

console.log("End");
```

**Output:**

```text
Start
End
Promise
setTimeout
```

### Why?

1. `Start` executes.
2. The timer callback is scheduled.
3. The Promise handler is scheduled as a microtask.
4. `End` executes.
5. The current JavaScript execution finishes.
6. The Promise microtask executes.
7. The timer callback executes when its timer is eligible and the event loop reaches the relevant phase.

**Important:** `setTimeout(callback, 0)` does not mean the callback executes immediately. It means the timer is eligible after the specified minimum delay, subject to event-loop scheduling.

### Promise Executor vs Promise Handler

Consider:

```javascript
console.log("Start");

const promise = new Promise((resolve) => {
    console.log("Promise executor");

    resolve("Success");
});

promise.then((result) => {
    console.log(result);
});

console.log("End");
```

**Output:**

```text
Start
Promise executor
End
Success
```

Why?

- The Promise executor runs synchronously when the Promise is created.
- The `.then()` handler runs asynchronously as a microtask after the current JavaScript execution completes.

This distinction is important for understanding Promises.

---

# 16. Practical Projects

Now apply what you have learned.

## Project 1: Asynchronous File Reader

**Objective:** Read multiple files asynchronously.

Requirements:

1. Create three text files.
2. Read all files using `fs/promises`.
3. Use `async/await`.
4. Handle errors using `try...catch`.
5. Display each file's content.

### Example Solution

```javascript
const fs = require("node:fs/promises");

async function readFiles() {
    try {
        const file1 = await fs.readFile("file1.txt", "utf-8");

        const file2 = await fs.readFile("file2.txt", "utf-8");

        const file3 = await fs.readFile("file3.txt", "utf-8");

        console.log(file1);
        console.log(file2);
        console.log(file3);

    } catch (error) {
        console.log("Error:", error.message);
    }
}

readFiles();
```

**Advanced task:** Modify the project to read all three files concurrently using `Promise.all()`.

---

## Project 2: API Data Fetcher

**Objective:** Fetch data from an external API.

Requirements:

1. Use Node.js `fetch()`.
2. Fetch users from an API.
3. Convert the response into JSON.
4. Handle HTTP errors.
5. Handle network errors.
6. Display user names and email addresses.

### Example Solution

```javascript
async function getUsers() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const users = await response.json();

        users.forEach((user) => {
            console.log({
                name: user.name,
                email: user.email
            });
        });

    } catch (error) {
        console.log("Error:", error.message);
    }
}

getUsers();
```

**Note:** Modern Node.js versions include a global `fetch()` API. You do not need to install a separate package for this example.

---

## Project 3: Concurrent Task Runner

**Objective:** Execute multiple independent asynchronous tasks concurrently.

Requirements:

1. Create five tasks.
2. Give each task a different execution time.
3. Execute all tasks using `Promise.all()`.
4. Display all results.
5. Measure total execution time.

### Example Solution

```javascript
function executeTask(taskName, time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`${taskName} completed`);
        }, time);
    });
}

async function runTasks() {
    console.time("Execution Time");

    try {
        const results = await Promise.all([
            executeTask("Task 1", 3000),
            executeTask("Task 2", 2000),
            executeTask("Task 3", 4000),
            executeTask("Task 4", 1000),
            executeTask("Task 5", 2500)
        ]);

        console.log(results);

    } catch (error) {
        console.log(error);

    } finally {
        console.timeEnd("Execution Time");
    }
}

runTasks();
```

Expected total execution time: Approximately 4 seconds.

---

## Project 4: Sequential vs Concurrent Execution

**Objective:** Understand the performance difference between sequential and concurrent execution.

Requirements:

1. Create three asynchronous tasks.
2. Each task should take approximately 2 seconds.
3. Run them sequentially.
4. Measure the total time.
5. Run them concurrently using `Promise.all()`.
6. Compare the execution times.

Expected results:

| Execution Type | Approximate Time |
|---|---:|
| Sequential | 6 seconds |
| Concurrent | 2 seconds |

---

# 17. Important Node.js Async APIs

You should recognize these APIs and their asynchronous interfaces.

| Module | API | Purpose |
|---|---|---|
| `fs` | `readFile()` | Read files asynchronously |
| `fs` | `writeFile()` | Write files asynchronously |
| `fs/promises` | `readFile()` | Read files using Promises |
| `fs/promises` | `writeFile()` | Write files using Promises |
| `http` | `createServer()` | Create an HTTP server |
| `crypto` | `pbkdf2()` | Password-based key derivation using a callback |
| `crypto` | `pbkdf2Sync()` | Synchronous password-based key derivation |
| `child_process` | `exec()` | Execute commands asynchronously |
| `child_process` | `execSync()` | Execute commands synchronously |

**Important:** An API's name and behavior matter. Some Node.js APIs provide synchronous and asynchronous versions, while others use event emitters, streams, callbacks, or Promises.

---

# 18. Interview Questions and Answers

### Q1. What is asynchronous programming?

Asynchronous programming allows an application to start an operation and continue executing other work while waiting for that operation to complete.

### Q2. What is the difference between synchronous and asynchronous programming?

Synchronous programming waits for the current operation to complete before continuing. Asynchronous programming allows other work to proceed while an asynchronous operation is pending.

### Q3. What is blocking I/O?

Blocking I/O prevents the current thread from continuing until the I/O operation completes.

### Q4. What is non-blocking I/O?

Non-blocking I/O allows the current thread to continue executing other work while the I/O operation is in progress.

### Q5. What is a callback function?

A callback is a function passed as an argument to another function so that it can be invoked by that function.

### Q6. Is every callback asynchronous?

No. A callback can execute synchronously or asynchronously depending on how the function invokes it.

### Q7. What is the error-first callback pattern?

It is a Node.js callback convention where the first argument represents an error and subsequent arguments represent successful results.

### Q8. What is Callback Hell?

Callback Hell occurs when multiple nested callbacks make code difficult to read and maintain.

### Q9. What is a Promise?

A Promise is an object representing the eventual completion or failure of an asynchronous operation.

### Q10. What are the three states of a Promise?

- Pending
- Fulfilled
- Rejected

### Q11. What is the difference between fulfilled and settled?

Fulfilled means the Promise completed successfully. Settled means the Promise is either fulfilled or rejected.

### Q12. What is the purpose of resolve() and reject()?

`resolve()` fulfills a Promise, while `reject()` rejects it.

### Q13. What is the difference between then() and catch()?

`.then()` handles fulfillment and can also accept a rejection handler. `.catch()` handles rejection.

### Q14. What is the purpose of finally()?

It executes after a Promise settles, regardless of whether it fulfilled or rejected.

### Q15. What is Promise chaining?

Promise chaining connects multiple asynchronous operations using successive `.then()` calls.

### Q16. What is Promise.all()?

It waits for all input Promises to fulfill. If one rejects, the returned Promise rejects.

### Q17. What is Promise.allSettled()?

It waits for all input Promises to settle and returns an array containing their fulfillment or rejection results.

### Q18. What is Promise.race()?

It settles with the result of the first input Promise that settles, whether fulfilled or rejected.

### Q19. What is Promise.any()?

It fulfills with the first fulfilled input Promise. If all inputs reject, it rejects with an `AggregateError`.

### Q20. What is async/await?

`async/await` is syntax built on Promises that makes asynchronous code easier to write and read.

### Q21. Does an async function always return a Promise?

Yes. An async function always returns a Promise.

### Q22. Can we use await without async?

In Node.js, `await` can be used inside async functions and in supported top-level module contexts. Top-level await is supported in ES modules, not ordinary CommonJS scripts.

### Q23. Does await block the entire Node.js application?

No. It suspends the surrounding async function while the awaited Promise is pending. Other JavaScript work can continue.

### Q24. What is the difference between sequential and concurrent execution?

Sequential execution starts the next operation after the previous one completes. Concurrent execution allows multiple operations to be in progress at the same time.

### Q25. Why should we avoid async callbacks inside forEach()?

Because `forEach()` does not wait for the Promises returned by its callback.

### Q26. What is a microtask?

A microtask is a scheduled unit of work, such as a Promise handler, that runs after the current JavaScript execution completes and before the event loop proceeds to another task.

### Q27. Does setTimeout(callback, 0) execute immediately?

No. It schedules the callback to run after the minimum timer delay, when the event loop can process it.

### Q28. Does Promise.all() cancel other Promises if one rejects?

No. It rejects its returned Promise, but the other operations continue unless they support and receive explicit cancellation.

### Q29. What is an unhandled Promise rejection?

It occurs when a Promise rejects and no rejection handler is attached to handle that rejection.

### Q30. How can you improve the performance of asynchronous code?

- Run independent operations concurrently.
- Avoid unnecessary synchronous I/O.
- Avoid blocking the event loop.
- Handle errors properly.
- Use suitable concurrency limits for large workloads.
- Use Worker Threads for CPU-intensive JavaScript tasks when appropriate.

---

# 19. Phase 05 Cheat Sheet

| Concept | Syntax |
|---|---|
| Callback | `function task(callback) { callback(); }` |
| Error-first callback | `(err, result) => {}` |
| Create Promise | `new Promise((resolve, reject) => {})` |
| Fulfill Promise | `resolve(value)` |
| Reject Promise | `reject(error)` |
| Handle success | `.then()` |
| Handle error | `.catch()` |
| Cleanup | `.finally()` |
| Async function | `async function getData() {}` |
| Await Promise | `await getData()` |
| Handle async error | `try { } catch (error) { }` |
| Run all concurrently | `Promise.all([])` |
| Wait for all results | `Promise.allSettled([])` |
| First settled Promise | `Promise.race([])` |
| First fulfilled Promise | `Promise.any([])` |
| Sequential loop | `for...of` with `await` |
| Concurrent array processing | `Promise.all(array.map(...))` |

---

# 20. Phase 05 Completion Checklist

Before moving to Phase 6, make sure you understand and can implement the following:

- [ ] Understand synchronous and asynchronous programming.
- [ ] Understand blocking and non-blocking operations.
- [ ] Understand callbacks.
- [ ] Understand synchronous vs asynchronous callbacks.
- [ ] Understand error-first callbacks.
- [ ] Understand Callback Hell.
- [ ] Create and use Promises.
- [ ] Understand Promise states.
- [ ] Use `.then()`, `.catch()`, and `.finally()`.
- [ ] Implement Promise chaining.
- [ ] Understand `Promise.resolve()` and `Promise.reject()`.
- [ ] Understand `Promise.all()`.
- [ ] Understand `Promise.allSettled()`.
- [ ] Understand `Promise.race()`.
- [ ] Understand `Promise.any()`.
- [ ] Write async functions.
- [ ] Use `await` correctly.
- [ ] Handle errors using `try...catch`.
- [ ] Understand sequential execution.
- [ ] Understand concurrent execution.
- [ ] Avoid common async programming mistakes.
- [ ] Understand the basics of microtasks and tasks.

## Practical Tasks to Complete

1. Create a program that reads three files using callbacks.
2. Rewrite the same program using Promises.
3. Rewrite it again using `async/await`.
4. Fetch users from an external API.
5. Fetch three independent API resources using `Promise.all()`.
6. Use `Promise.allSettled()` to handle multiple independent tasks.
7. Compare sequential and concurrent execution times.
8. Create a function that rejects after a timeout using `Promise.race()`.

---

## What Comes Next?

### PHASE 06: Event Loop & Node.js Architecture

In Phase 6, we will study how Node.js actually executes asynchronous operations internally.

Topics will include:

1. What is the Event Loop?
2. How the Event Loop works internally.
3. Call Stack.
4. Callback Queue and Task Queue.
5. Microtask Queue.
6. Node.js Event Loop Phases.
7. Timers Phase.
8. Pending Callbacks Phase.
9. Poll Phase.
10. Check Phase.
11. Close Callbacks Phase.
12. `process.nextTick()`.
13. `setImmediate()`.
14. `setTimeout()` vs `setImmediate()`.
15. libuv Thread Pool.
16. Event Loop blocking.
17. Practical execution-order examples.

**Recommended focus before Phase 6:** Make sure you can explain why `Promise` callbacks execute before `setTimeout()` callbacks in the earlier example. This concept is an important foundation for understanding the Node.js Event Loop.