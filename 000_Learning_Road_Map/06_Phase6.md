# PHASE 06: Event Loop & Node.js Architecture

**Level:** Intermediate  
**Goal:** Understand how Node.js handles asynchronous operations internally, how the Event Loop works, how callbacks are scheduled, and how Node.js manages concurrency despite JavaScript running primarily on a single main thread.

---

## Topics Covered

1. Node.js Runtime Architecture
2. What is the Event Loop?
3. JavaScript Call Stack
4. Callback Queue
5. Microtask Queue
6. Node.js Event Loop Phases
7. Timers Phase
8. Pending Callbacks Phase
9. Poll Phase
10. Check Phase
11. Close Callbacks Phase
12. `process.nextTick()`
13. `setImmediate()`
14. `setTimeout()` vs `setImmediate()`
15. libuv Thread Pool
16. Event Loop Blocking
17. Worker Threads
18. Practical Execution-Order Examples
19. Interview Questions

---

# 1. Node.js Runtime Architecture

Before understanding the Event Loop, you need to understand the major components that make Node.js work.

Node.js is not just the V8 JavaScript engine. It is a complete runtime environment consisting of several components.

## 1.1 Main Components

| Component | Responsibility |
|---|---|
| V8 Engine | Executes JavaScript code |
| Node.js APIs | Provide functionality such as file handling, networking, and processes |
| libuv | Provides the Event Loop, asynchronous I/O support, and thread pool |
| Event Loop | Coordinates execution of scheduled callbacks |
| Thread Pool | Executes certain operations outside the main JavaScript thread |
| Operating System | Handles system-level operations such as networking and file access |

### Architecture Overview

```text
                  NODE.JS APPLICATION
                          |
                          |
                    JavaScript Code
                          |
                          |
                     V8 Engine
                          |
                          |
                  Node.js Runtime APIs
                          |
                          |
                        libuv
                          |
              +-----------+-----------+
              |                       |
              |                       |
          Event Loop              Thread Pool
              |                       |
              |                       |
       Async I/O Callbacks       Background Tasks
              |                       |
              +-----------+-----------+
                          |
                          |
                    Operating System
```

This is a simplified conceptual architecture. Actual operations may use operating-system facilities directly or be handled through libuv's thread pool.

---

## 1.2 What is V8?

V8 is an open-source JavaScript engine developed by Google.

It is responsible for executing JavaScript code.

Its major responsibilities include:

- Parsing JavaScript.
- Compiling JavaScript.
- Optimizing frequently executed code.
- Executing JavaScript.
- Managing memory.
- Garbage collection.

**Important:** V8 does not provide Node.js APIs such as `fs`, `http`, or `process`.

Those capabilities are provided by Node.js itself.

## 1.3 What is libuv?

libuv is a multi-platform C library used by Node.js.

It provides important runtime functionality, including:

- Event Loop implementation.
- Asynchronous I/O support.
- Thread pool management.
- Timers.
- Networking support.
- File-system operations.

### Why does Node.js need libuv?

JavaScript itself does not provide a complete system-level API for handling files, networking, and operating-system operations.

Node.js uses libuv to provide many of these capabilities.

For example:

When you execute:

```javascript
const fs = require("node:fs");

fs.readFile("data.txt", "utf-8", (err, data) => {
    console.log(data);
});
```

The simplified execution process is:

1. JavaScript calls `fs.readFile()`.
2. Node.js receives the request.
3. The operation is handled using the underlying runtime and operating-system facilities.
4. The main JavaScript thread continues executing other code.
5. When the operation completes, its callback becomes eligible for execution.
6. The Event Loop eventually executes the callback.

**Important:** Not every asynchronous operation uses the libuv thread pool. For example, network I/O commonly uses operating-system networking facilities.

---

# 2. What is the Event Loop?

The Event Loop is one of the most important concepts in Node.js.

The Event Loop is a mechanism that coordinates the execution of JavaScript callbacks and asynchronous operations.

It allows Node.js to handle many I/O operations without creating a separate JavaScript thread for every request.

### Simple Definition

The Event Loop continuously checks whether scheduled callbacks are ready to execute and processes them when the JavaScript execution thread is available.

### Why do we need the Event Loop?

Consider a Node.js server receiving 1000 requests.

Suppose each request requires:

- Reading data from a database.
- Reading a file.
- Calling an external API.
- Sending a response.

If Node.js waited synchronously for every operation, requests would block one another.

Instead, Node.js can initiate asynchronous operations and continue handling other work.

When the operations complete, their callbacks are scheduled for execution.

### Event Loop Conceptual Flow

```text
             JavaScript Execution
                     |
                     |
                 Call Stack
                     |
                     |
              Async Operation
                     |
                     |
              Node.js / libuv
                     |
                     |
             Operation Pending
                     |
                     |
              Operation Complete
                     |
                     |
             Callback Scheduled
                     |
                     |
                Event Loop
                     |
                     |
              Callback Executed
```

### Important

The Event Loop does not execute JavaScript callbacks in parallel.

JavaScript callbacks normally execute one at a time on the main JavaScript thread.

The Event Loop decides when a callback can execute.

The underlying asynchronous operation may be handled by the operating system or a background thread.

---

# 3. What is the Call Stack?

The Call Stack is a data structure used by the JavaScript engine to keep track of function execution.

It follows the **LIFO principle**:

**Last In, First Out.**

The last function added to the stack is the first one removed.

### Example

```javascript
function first() {
    console.log("First function");
}

function second() {
    first();

    console.log("Second function");
}

function third() {
    second();

    console.log("Third function");
}

third();
```

**Output:**

```text
First function
Second function
Third function
```

### How does the Call Stack work?

Execution starts with:

```javascript
third();
```

The Call Stack changes like this:

**Step 1:**

```text
| third() |
```

**Step 2:**

`third()` calls `second()`.

```text
| second() |
| third()  |
```

**Step 3:**

`second()` calls `first()`.

```text
| first()  |
| second() |
| third()  |
```

**Step 4:**

`first()` completes and is removed.

```text
| second() |
| third()  |
```

**Step 5:**

`second()` completes and is removed.

```text
| third() |
```

**Step 6:**

`third()` completes.

```text
Empty Call Stack
```

### Why is the Call Stack important?

JavaScript executes synchronous code using the Call Stack.

A callback cannot execute while the current JavaScript execution is occupying the thread.

The callback must wait until the stack is available.

---

# 4. Callback Queue and Microtask Queue

Node.js uses different scheduling mechanisms for callbacks.

Two important concepts are:

1. Task queues, commonly called macrotask queues.
2. Microtask queues.

Node.js also has a special `process.nextTick()` queue.

## 4.1 Task Queue

A task queue holds callbacks that are ready to execute.

Examples include callbacks scheduled through:

- `setTimeout()`
- `setInterval()`
- `setImmediate()`
- Certain I/O operations

However, Node.js does not use one simple FIFO callback queue for all these callbacks.

Instead, callbacks are processed through different Event Loop phases.

We will study these phases shortly.

## 4.2 Microtask Queue

Microtasks are high-priority scheduled operations that are processed between ordinary JavaScript execution tasks.

Common examples include:

- Promise `.then()` callbacks.
- Promise `.catch()` callbacks.
- Promise `.finally()` callbacks.
- Continuations after `await`.

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
2. `setTimeout()` schedules a timer callback.
3. `Promise.resolve().then()` schedules a microtask.
4. `End` executes.
5. The current JavaScript execution finishes.
6. Promise microtasks are processed.
7. The Event Loop later processes the eligible timer callback.

### Important Rule

In typical Node.js execution:

- Synchronous JavaScript executes first.
- `process.nextTick()` callbacks are processed before Promise microtasks.
- Promise microtasks are processed before the Event Loop proceeds to another phase.

There are additional details around microtask processing in Node.js, which we will examine below.

---

# 5. Node.js Event Loop Phases

This is the most important section of Phase 6.

Unlike the simplified browser Event Loop model, Node.js has a specific Event Loop structure implemented by libuv.

The Event Loop has several phases.

## 5.1 Event Loop Phases

The major phases are:

1. Timers
2. Pending Callbacks
3. Idle, Prepare
4. Poll
5. Check
6. Close Callbacks

### Event Loop Diagram

```text
             +----------------------+
             |        Timers        |
             +----------------------+
                       |
                       v
             +----------------------+
             |   Pending Callbacks  |
             +----------------------+
                       |
                       v
             +----------------------+
             |    Idle / Prepare    |
             +----------------------+
                       |
                       v
             +----------------------+
             |        Poll          |
             +----------------------+
                       |
                       v
             +----------------------+
             |        Check         |
             +----------------------+
                       |
                       v
             +----------------------+
             |    Close Callbacks   |
             +----------------------+
                       |
                       |
                       +-----------> Repeat
```

This is a simplified diagram.

**Important:** `Idle` and `Prepare` are internal libuv phases, primarily used internally by Node.js. Application developers usually focus on the other five phases.

Let's understand each phase.

---

# 6. Timers Phase

The Timers phase executes callbacks scheduled using:

- `setTimeout()`
- `setInterval()`

### Example: setTimeout()

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Timer executed");
}, 1000);

console.log("End");
```

**Output:**

```text
Start
End
Timer executed
```

### How does it work?

1. `Start` executes.
2. Node.js schedules the timer.
3. `End` executes.
4. The timer becomes eligible after approximately 1000 milliseconds.
5. When the Event Loop reaches the timers phase and can process it, the callback executes.

### Important: Does setTimeout() Guarantee Exact Timing?

No.

Consider:

```javascript
setTimeout(() => {
    console.log("Executed");
}, 1000);
```

This means the callback will not execute before the specified minimum delay, but it may execute later.

The actual timing depends on:

- Current JavaScript execution.
- Event Loop activity.
- Other scheduled callbacks.
- Operating-system scheduling.

### setInterval()

`setInterval()` schedules a callback to execute repeatedly at approximately the specified interval.

```javascript
let count = 0;

const interval = setInterval(() => {
    count++;

    console.log("Count:", count);

    if (count === 5) {
        clearInterval(interval);
    }
}, 1000);
```

**Output:**

```text
Count: 1
Count: 2
Count: 3
Count: 4
Count: 5
```

### clearTimeout() and clearInterval()

These methods cancel scheduled timers.

```javascript
const timer = setTimeout(() => {
    console.log("This will not execute");
}, 3000);

clearTimeout(timer);
```

```javascript
const interval = setInterval(() => {
    console.log("Running...");
}, 1000);

setTimeout(() => {
    clearInterval(interval);
}, 5000);
```

### Common Use Cases

- Scheduling delayed operations.
- Repeating tasks.
- Implementing simple polling.
- Cleaning up temporary resources.

For reliable production scheduling, especially across server restarts, use a dedicated job scheduler or external queue rather than relying only on `setInterval()`.

---

# 7. Pending Callbacks Phase

The Pending Callbacks phase executes certain system-level callbacks deferred from previous operations.

These callbacks are generally related to specific types of system errors and operations.

For example:

- Certain TCP errors.
- Some deferred system-level callbacks.

### Example Concept

Suppose a network operation encounters a particular system-level error.

Node.js may defer handling that callback until the Pending Callbacks phase.

You generally do not schedule callbacks directly into this phase using an ordinary JavaScript API.

### Important

Do not confuse this phase with the general callback queue.

Node.js has different phases, each responsible for specific callback categories.

---

# 8. Poll Phase

The Poll phase is one of the most important Event Loop phases.

It handles many I/O-related callbacks.

Examples include:

- File-system callbacks.
- Network-related callbacks.
- Some asynchronous I/O operations.

The Poll phase also determines whether the Event Loop should wait for additional I/O events or continue to another phase.

### Example

```javascript
const fs = require("node:fs");

console.log("Start");

fs.readFile("data.txt", "utf-8", (err, data) => {
    if (err) {
        console.log(err.message);
        return;
    }

    console.log("File read completed");
});

console.log("End");
```

**Possible output:**

```text
Start
End
File read completed
```

The file-reading callback is handled through the runtime's I/O mechanisms and is processed when eligible in the Event Loop.

### What happens when there are no callbacks in the Poll phase?

Depending on the state of the Event Loop:

- Node.js may wait for I/O events.
- It may continue to the Check phase if there are callbacks scheduled with `setImmediate()`.
- It may proceed to other phases when required.

### Why is Poll important?

Most Node.js server applications perform a significant amount of I/O work.

Examples:

- Receiving HTTP requests.
- Communicating with databases.
- Reading files.
- Communicating with external services.

The Poll phase is central to processing many of these operations.

---

# 9. Check Phase

The Check phase executes callbacks scheduled using:

```javascript
setImmediate()
```

### Example

```javascript
console.log("Start");

setImmediate(() => {
    console.log("setImmediate executed");
});

console.log("End");
```

**Output:**

```text
Start
End
setImmediate executed
```

### What is setImmediate()?

`setImmediate()` schedules a callback to execute during the Check phase of the Event Loop.

### Why do we need setImmediate()?

It allows developers to schedule work to execute after the current Poll phase completes.

It is useful when you want to defer execution without using a timer delay.

### Example

```javascript
const fs = require("node:fs");

fs.readFile("data.txt", () => {
    setImmediate(() => {
        console.log("setImmediate callback");
    });

    setTimeout(() => {
        console.log("setTimeout callback");
    }, 0);
});
```

In this I/O callback context, `setImmediate()` is scheduled for the Check phase following Poll processing.

It will execute before the zero-delay timer callback in this example.

---

# 10. Close Callbacks Phase

The Close Callbacks phase executes callbacks related to closed handles or resources.

Examples include:

- Socket close events.
- Some handle cleanup callbacks.

### Example

```javascript
const net = require("node:net");

const server = net.createServer();

server.on("connection", (socket) => {
    socket.end("Hello");

    socket.on("close", () => {
        console.log("Socket closed");
    });
});

server.listen(3000, () => {
    console.log("Server listening on port 3000");

    const client = net.createConnection(3000);

    client.on("data", (data) => {
        console.log(data.toString());
    });

    client.on("end", () => {
        server.close();
    });
});
```

This example demonstrates socket and server lifecycle events.

The socket's `close` event is associated with resource closure. The exact callback scheduling depends on the underlying handle and runtime behavior.

---

# 11. process.nextTick()

`process.nextTick()` is a special Node.js scheduling mechanism.

It schedules a callback to run immediately after the current JavaScript operation completes, before the Event Loop continues to its next phase.

### Syntax

```javascript
process.nextTick(callback);
```

### Example

```javascript
console.log("Start");

process.nextTick(() => {
    console.log("nextTick");
});

console.log("End");
```

**Output:**

```text
Start
End
nextTick
```

### Why does it execute before setTimeout()?

Consider:

```javascript
console.log("Start");

setTimeout(() => {
    console.log("setTimeout");
}, 0);

process.nextTick(() => {
    console.log("nextTick");
});

console.log("End");
```

**Output:**

```text
Start
End
nextTick
setTimeout
```

### Execution Order

1. `Start` executes.
2. The timer is scheduled.
3. `process.nextTick()` schedules a next-tick callback.
4. `End` executes.
5. The next-tick queue is processed.
6. The Event Loop proceeds to process the eligible timer.

### Important: process.nextTick() vs Promise.then()

In Node.js CommonJS execution:

```javascript
console.log("Start");

Promise.resolve().then(() => {
    console.log("Promise");
});

process.nextTick(() => {
    console.log("nextTick");
});

console.log("End");
```

**Output:**

```text
Start
End
nextTick
Promise
```

Node.js processes the `process.nextTick()` queue before Promise microtasks at this boundary.

### Can process.nextTick() cause problems?

Yes.

Consider:

```javascript
function repeat() {
    process.nextTick(repeat);
}

repeat();

console.log("Hello");
```

The repeated next-tick callbacks can prevent the Event Loop from progressing to other phases.

This is called **starvation**.

### When should you use process.nextTick()?

It is useful for scheduling a callback immediately after the current operation.

However, avoid recursively scheduling large numbers of next-tick callbacks.

For many ordinary deferred operations, `setImmediate()` may be more appropriate.

---

# 12. setImmediate()

`setImmediate()` schedules a callback to execute in the Check phase.

### Syntax

```javascript
setImmediate(callback);
```

### Example

```javascript
console.log("Start");

setImmediate(() => {
    console.log("Immediate callback");
});

console.log("End");
```

**Output:**

```text
Start
End
Immediate callback
```

### setImmediate() vs process.nextTick()

| Feature | `process.nextTick()` | `setImmediate()` |
|---|---|---|
| Scheduling | Next-tick queue | Check phase |
| Execution | After current operation | During Check phase |
| Before next Event Loop phase? | Yes | No |
| Can starve the Event Loop? | Yes, if recursively scheduled | Less likely to do so |
| Common purpose | Run immediately after current operation | Defer work to a later Event Loop phase |

### Example

```javascript
console.log("Start");

setImmediate(() => {
    console.log("setImmediate");
});

process.nextTick(() => {
    console.log("nextTick");
});

console.log("End");
```

**Output:**

```text
Start
End
nextTick
setImmediate
```

---

# 13. setTimeout() vs setImmediate()

This is a very common Node.js interview question.

Both functions schedule callbacks, but they use different Event Loop mechanisms.

| Feature | setTimeout() | setImmediate() |
|---|---|---|
| Purpose | Schedule callback after a minimum delay | Schedule callback in Check phase |
| Event Loop phase | Timers | Check |
| Delay | Accepts milliseconds | No delay argument |
| Exact execution time | Not guaranteed | Not guaranteed relative to all other callbacks |
| Common use | Delayed execution | Defer execution after Poll |

## 13.1 Example: Outside an I/O Callback

```javascript
setTimeout(() => {
    console.log("Timeout");
}, 0);

setImmediate(() => {
    console.log("Immediate");
});
```

**Possible output:**

```text
Timeout
Immediate
```

Or:

```text
Immediate
Timeout
```

The ordering is not guaranteed when these are scheduled from the main module.

The result can depend on the Event Loop state and timing.

## 13.2 Example: Inside an I/O Callback

```javascript
const fs = require("node:fs");

fs.readFile("data.txt", () => {
    setTimeout(() => {
        console.log("Timeout");
    }, 0);

    setImmediate(() => {
        console.log("Immediate");
    });
});
```

**Expected output:**

```text
Immediate
Timeout
```

Why?

1. The file-reading callback executes during I/O processing.
2. `setImmediate()` schedules work for the Check phase.
3. `setTimeout()` schedules a timer.
4. The Check phase callback executes before the timer is processed in this situation.

### Interview Tip

Remember this rule:

- Outside an I/O callback, the order between `setTimeout(..., 0)` and `setImmediate()` is not guaranteed.
- Inside an I/O callback, `setImmediate()` normally executes before `setTimeout(..., 0)`.

---

# 14. libuv Thread Pool

Now let's understand another important part of Node.js architecture.

The libuv Thread Pool is a collection of background threads used for certain operations.

It allows some operations to execute without blocking the main JavaScript thread.

### What is the default thread pool size?

The default libuv thread pool size is:

```text
4
```

You can configure it using:

```text
UV_THREADPOOL_SIZE
```

For example:

**Windows CMD:**

```cmd
set UV_THREADPOOL_SIZE=8
node index.js
```

**PowerShell:**

```powershell
$env:UV_THREADPOOL_SIZE=8
node index.js
```

**Linux/macOS:**

```bash
UV_THREADPOOL_SIZE=8 node index.js
```

Set this before starting Node.js.

## 14.1 Which Operations Use the Thread Pool?

Common examples include:

| Operation | Thread Pool |
|---|---|
| Many file-system operations | Yes |
| `crypto.pbkdf2()` | Yes |
| `crypto.scrypt()` | Yes |
| `zlib` compression operations | Yes |
| `dns.lookup()` | Yes |
| `fetch()` network requests | Generally no |
| TCP networking | Generally no |

**Important:** Some DNS APIs use different mechanisms. For example, `dns.lookup()` commonly uses the thread pool, while DNS resolver methods such as `dns.resolve()` use asynchronous network queries.

## 14.2 How Does the Thread Pool Work?

Consider this code:

```javascript
const crypto = require("node:crypto");

console.log("Start");

crypto.pbkdf2(
    "password",
    "salt",
    100000,
    64,
    "sha512",
    (err, derivedKey) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log("Password hashing completed");
    }
);

console.log("End");
```

**Possible output:**

```text
Start
End
Password hashing completed
```

### Execution Process

1. JavaScript calls `crypto.pbkdf2()`.
2. Node.js submits the expensive operation to the libuv thread pool.
3. The main JavaScript thread continues executing.
4. The background thread performs the cryptographic operation.
5. When it completes, its callback becomes eligible for execution.
6. The Event Loop executes the callback.

### Important Difference

The following two operations are different:

```javascript
crypto.pbkdf2();
```

```javascript
crypto.pbkdf2Sync();
```

- `pbkdf2()` uses an asynchronous callback-based API.
- `pbkdf2Sync()` blocks the JavaScript thread until the operation completes.

---

# 15. Event Loop Blocking

The Event Loop is responsible for processing callbacks.

If JavaScript performs a long-running synchronous operation, the Event Loop cannot process other JavaScript callbacks until that operation finishes.

This is called **Event Loop Blocking**.

### Example

```javascript
console.log("Start");

function heavyTask() {
    let result = 0;

    for (let i = 0; i < 5_000_000_000; i++) {
        result += i;
    }

    console.log("Heavy task completed");
}

setTimeout(() => {
    console.log("Timer executed");
}, 1000);

heavyTask();

console.log("End");
```

**Possible output:**

```text
Start
Heavy task completed
End
Timer executed
```

Even though the timer was scheduled for one second, it could not execute while the main JavaScript thread was busy running `heavyTask()`.

### Why is Event Loop Blocking dangerous?

Imagine a Node.js server receiving 100 requests.

One request triggers a CPU-heavy synchronous operation.

While that operation is executing:

- Other JavaScript callbacks cannot execute.
- Other request handlers may be delayed.
- Response times increase.
- The server becomes less responsive.

### How can you avoid Event Loop Blocking?

1. Avoid unnecessary synchronous APIs.
2. Avoid long-running loops on the main thread.
3. Use asynchronous I/O APIs.
4. Use Worker Threads for CPU-intensive JavaScript.
5. Use Child Processes for separate process execution.
6. Offload heavy computations to background services when appropriate.

---

# 16. Worker Threads

Node.js primarily executes JavaScript on a main thread.

However, it supports additional JavaScript threads using the `worker_threads` module.

Worker Threads are useful for CPU-intensive JavaScript tasks.

### When should you use Worker Threads?

Examples:

- Image processing.
- Large mathematical calculations.
- Data transformation.
- CPU-heavy parsing.
- Computational algorithms.

### When should you not use Worker Threads?

They are generally unnecessary for ordinary asynchronous I/O operations such as:

- Reading files.
- Calling APIs.
- Database queries.
- Network requests.

These operations already have asynchronous mechanisms.

## 16.1 Basic Worker Thread Example

Create two files.

### File 1: main.js

```javascript
const { Worker } = require("node:worker_threads");

console.log("Main thread started");

const worker = new Worker("./worker.js");

worker.on("message", (result) => {
    console.log("Result from worker:", result);
});

worker.on("error", (error) => {
    console.log("Worker error:", error);
});

worker.on("exit", (code) => {
    console.log("Worker exited with code:", code);
});

console.log("Main thread continues");
```

### File 2: worker.js

```javascript
const { parentPort } = require("node:worker_threads");

let result = 0;

for (let i = 0; i < 1_000_000_000; i++) {
    result += i;
}

parentPort.postMessage(result);
```

### Execution

1. `main.js` starts.
2. A Worker Thread is created.
3. The worker executes `worker.js`.
4. The main thread continues executing.
5. The worker performs the calculation.
6. The worker sends the result using `parentPort.postMessage()`.
7. The main thread receives the result using the `message` event.

### Important Worker Thread Concepts

| API | Purpose |
|---|---|
| `Worker` | Creates a worker thread |
| `parentPort` | Communication channel between worker and parent |
| `postMessage()` | Sends data between threads |
| `worker.on("message")` | Receives messages from a worker |
| `worker.on("error")` | Handles worker errors |
| `worker.on("exit")` | Handles worker termination |

### Main Thread vs Worker Thread

| Feature | Main Thread | Worker Thread |
|---|---|---|
| Purpose | Handles application JavaScript and Event Loop | Executes additional JavaScript |
| CPU-heavy work | Can block the Event Loop | Can run independently |
| Communication | Direct execution | Message passing or shared memory |
| Best use | Request handling and orchestration | CPU-intensive calculations |

**Note:** Worker Threads have their own JavaScript execution environments and Event Loops. They are not simply additional callbacks running on the main thread.

---

# 17. Practical Execution-Order Examples

These examples are particularly important for interviews and debugging.

Try to predict the output before reading the answer.

## Example 1: Synchronous Code and setTimeout()

```javascript
console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

console.log("C");
```

**Output:**

```text
A
C
B
```

**Explanation:**

Synchronous JavaScript executes first. The timer callback executes later.

---

## Example 2: Promise and setTimeout()

```javascript
console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

Promise.resolve().then(() => {
    console.log("C");
});

console.log("D");
```

**Output:**

```text
A
D
C
B
```

**Explanation:**

1. `A` executes.
2. Timer is scheduled.
3. Promise microtask is scheduled.
4. `D` executes.
5. Promise microtask executes.
6. Timer callback executes.

---

## Example 3: process.nextTick() and Promise

```javascript
console.log("A");

Promise.resolve().then(() => {
    console.log("B");
});

process.nextTick(() => {
    console.log("C");
});

console.log("D");
```

**Output in a CommonJS script:**

```text
A
D
C
B
```

**Explanation:**

In this CommonJS example, Node.js processes the next-tick queue before Promise microtasks.

---

## Example 4: Nested Promise and process.nextTick()

```javascript
console.log("Start");

Promise.resolve().then(() => {
    console.log("Promise 1");

    process.nextTick(() => {
        console.log("Next Tick 2");
    });
});

process.nextTick(() => {
    console.log("Next Tick 1");

    Promise.resolve().then(() => {
        console.log("Promise 2");
    });
});

console.log("End");
```

**Output in a CommonJS script:**

```text
Start
End
Next Tick 1
Promise 1
Promise 2
Next Tick 2
```

**Explanation:**

1. Synchronous code executes.
2. `Next Tick 1` runs.
3. Its Promise handler is scheduled.
4. The previously scheduled `Promise 1` handler runs.
5. `Promise 2` runs.
6. `Next Tick 2` runs after the Promise microtask checkpoint completes.

This example demonstrates that scheduling from inside a microtask can produce a different ordering than scheduling from the main synchronous execution.

---

## Example 5: setImmediate() and setTimeout()

```javascript
setTimeout(() => {
    console.log("Timeout");
}, 0);

setImmediate(() => {
    console.log("Immediate");
});
```

**Output:**

The order is not guaranteed when scheduled from the main module.

Possible output:

```text
Timeout
Immediate
```

Or:

```text
Immediate
Timeout
```

---

## Example 6: setImmediate() Inside an I/O Callback

```javascript
const fs = require("node:fs");

fs.readFile("data.txt", () => {
    setTimeout(() => {
        console.log("Timeout");
    }, 0);

    setImmediate(() => {
        console.log("Immediate");
    });
});
```

**Expected output:**

```text
Immediate
Timeout
```

**Explanation:**

The I/O callback schedules:

- A timer for the Timers phase.
- An immediate callback for the Check phase.

The Check phase callback executes first in this situation.

---

## Example 7: Blocking the Event Loop

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Timer");
}, 0);

for (let i = 0; i < 1_000_000_000; i++) {
    // Blocking operation
}

console.log("End");
```

**Output:**

```text
Start
End
Timer
```

The timer callback cannot execute while the synchronous loop is blocking the main JavaScript thread.

---

# 18. Important Node.js Architecture Concepts

Let's summarize some important distinctions.

## 18.1 Event Loop vs Thread Pool

| Feature | Event Loop | Thread Pool |
|---|---|---|
| Purpose | Coordinates callback execution | Executes certain operations in background threads |
| Main responsibility | Scheduling and dispatching callbacks | Performing selected background work |
| JavaScript execution | Main JS thread | Background threads handle supported work |
| Example | Processing a timer callback | Executing `crypto.pbkdf2()` |
| Managed by | libuv | libuv |

## 18.2 V8 vs libuv

| Feature | V8 | libuv |
|---|---|---|
| Type | JavaScript engine | C library |
| Main responsibility | Execute JavaScript | Event Loop and asynchronous I/O support |
| Compilation | Yes | No |
| Garbage collection | Yes | No |
| Thread pool | No | Yes |
| Event Loop | No | Yes |

## 18.3 Single Thread vs Multi-Thread

A common misconception is that Node.js is completely single-threaded.

That is not accurate.

A better explanation is:

- JavaScript application code normally executes on the main JavaScript thread.
- The Node.js runtime uses additional threads for certain operations.
- The operating system handles many asynchronous I/O operations.
- Worker Threads allow applications to execute JavaScript on additional threads.

---

# 19. Common Mistakes and Misconceptions

### Mistake 1: Node.js is completely single-threaded.

**Correct:** JavaScript normally runs on a main thread, but Node.js and its underlying runtime use additional threads and operating-system facilities.

### Mistake 2: Every asynchronous operation uses the Thread Pool.

**Correct:** Many asynchronous network operations use operating-system networking facilities rather than the libuv thread pool.

### Mistake 3: The Event Loop executes JavaScript in parallel.

**Correct:** The main JavaScript Event Loop executes JavaScript callbacks one at a time.

### Mistake 4: setTimeout(callback, 0) executes immediately.

**Correct:** It schedules a callback after a minimum delay. Actual execution depends on Event Loop scheduling.

### Mistake 5: setImmediate() always executes before setTimeout().

**Correct:** Their ordering is not guaranteed when scheduled from the main module. Inside an I/O callback, `setImmediate()` normally executes first.

### Mistake 6: Promise callbacks execute before process.nextTick().

**Correct:** In typical Node.js CommonJS execution, next-tick callbacks are processed before Promise microtasks at the relevant checkpoint.

### Mistake 7: Worker Threads are required for database queries.

**Correct:** Database drivers generally provide asynchronous I/O. Worker Threads are primarily useful for CPU-intensive JavaScript work.

### Mistake 8: Increasing UV_THREADPOOL_SIZE always improves performance.

**Correct:** A larger thread pool can help certain workloads, but it can also increase resource contention. Measure performance before changing it.

---

# 20. Phase 06 Cheat Sheet

| Concept | Meaning |
|---|---|
| V8 | JavaScript engine |
| libuv | Event Loop and asynchronous I/O library |
| Call Stack | Tracks currently executing functions |
| Event Loop | Coordinates callback execution |
| Thread Pool | Handles selected background operations |
| Microtask | Promise handler or similar scheduled work |
| `process.nextTick()` | Schedules a next-tick callback |
| `setTimeout()` | Schedules a timer callback |
| `setInterval()` | Repeatedly schedules timer callbacks |
| `setImmediate()` | Schedules a Check-phase callback |
| Timers Phase | Executes eligible timer callbacks |
| Pending Callbacks | Executes certain deferred system callbacks |
| Poll Phase | Handles many I/O callbacks |
| Check Phase | Executes `setImmediate()` callbacks |
| Close Callbacks | Handles certain resource-close callbacks |
| Worker Threads | Execute JavaScript on additional threads |
| Event Loop Blocking | Prevents the Event Loop from processing other callbacks |

---

# 21. Interview Questions and Answers

### Q1. What is the Event Loop in Node.js?

The Event Loop is a mechanism that coordinates the execution of scheduled callbacks and allows Node.js to handle asynchronous operations without blocking the main JavaScript thread.

### Q2. Why does Node.js need an Event Loop?

It allows Node.js to handle multiple I/O operations efficiently without creating a separate JavaScript thread for every operation.

### Q3. What is V8?

V8 is Google's open-source JavaScript engine used by Node.js to execute JavaScript code.

### Q4. What is libuv?

libuv is a C library that provides Node.js with the Event Loop, thread pool, timers, and asynchronous I/O support.

### Q5. What is the Call Stack?

The Call Stack is a LIFO data structure that tracks currently executing functions.

### Q6. Is Node.js single-threaded?

JavaScript application code normally executes on a single main thread, but Node.js uses additional threads and operating-system facilities for certain operations.

### Q7. What are the phases of the Node.js Event Loop?

The major phases are:

1. Timers.
2. Pending Callbacks.
3. Idle and Prepare.
4. Poll.
5. Check.
6. Close Callbacks.

### Q8. What happens in the Timers phase?

Eligible callbacks scheduled using `setTimeout()` and `setInterval()` are executed.

### Q9. What happens in the Poll phase?

The Poll phase handles many I/O-related callbacks and manages waiting for I/O events.

### Q10. What happens in the Check phase?

Callbacks scheduled using `setImmediate()` are executed.

### Q11. What is the Pending Callbacks phase?

It executes certain system-level callbacks deferred from previous operations.

### Q12. What is the Close Callbacks phase?

It handles callbacks related to closed resources, such as socket close events.

### Q13. What is the difference between setTimeout() and setImmediate()?

`setTimeout()` schedules a callback for the Timers phase after a minimum delay. `setImmediate()` schedules a callback for the Check phase.

### Q14. What is process.nextTick()?

It schedules a callback to execute after the current JavaScript operation completes, before the Event Loop continues to its next phase.

### Q15. What is the difference between process.nextTick() and Promise.then()?

`process.nextTick()` uses Node.js's next-tick queue, while Promise handlers use the microtask queue. Node.js processes the next-tick queue before Promise microtasks at the relevant checkpoint.

### Q16. What is the libuv Thread Pool?

It is a collection of background threads used for selected operations such as many file-system operations, cryptographic operations, compression, and `dns.lookup()`.

### Q17. What is the default libuv Thread Pool size?

The default size is 4 threads.

### Q18. How can you change the Thread Pool size?

Set the `UV_THREADPOOL_SIZE` environment variable before starting Node.js.

### Q19. Which Node.js operations commonly use the Thread Pool?

Examples include:

- Many file-system operations.
- `crypto.pbkdf2()`.
- `crypto.scrypt()`.
- Some zlib operations.
- `dns.lookup()`.

### Q20. Does fetch() use the libuv Thread Pool?

Generally, no. Network operations such as fetch commonly use operating-system networking facilities.

### Q21. What is Event Loop Blocking?

It occurs when long-running synchronous JavaScript prevents the Event Loop from processing other callbacks.

### Q22. How can you prevent Event Loop Blocking?

Use asynchronous APIs, avoid CPU-heavy synchronous operations on the main thread, and move CPU-intensive work to Worker Threads or separate processes.

### Q23. What are Worker Threads?

Worker Threads allow Node.js applications to execute JavaScript in additional threads.

### Q24. When should you use Worker Threads?

Use them for CPU-intensive JavaScript tasks such as image processing, mathematical calculations, and large data transformations.

### Q25. What is the difference between Worker Threads and the libuv Thread Pool?

Worker Threads execute JavaScript code in separate JavaScript environments. The libuv Thread Pool performs selected background operations for Node.js APIs.

### Q26. Why can process.nextTick() cause starvation?

Because recursively scheduling next-tick callbacks can prevent the Event Loop from progressing to other phases.

### Q27. Does setTimeout(callback, 0) guarantee immediate execution?

No. It schedules a callback after the minimum timer delay, subject to Event Loop scheduling.

### Q28. Why is Node.js suitable for I/O-intensive applications?

Because its non-blocking I/O model allows it to handle many operations concurrently without requiring a separate JavaScript thread for every request.

### Q29. Can Node.js handle CPU-intensive tasks?

Yes, but CPU-intensive JavaScript can block the main Event Loop. Worker Threads or separate processes can be used to handle such tasks.

### Q30. What is the difference between concurrency and parallelism?

- **Concurrency:** Multiple tasks make progress during overlapping periods.
- **Parallelism:** Multiple tasks execute simultaneously, typically on different CPU cores.

Node.js supports concurrency through asynchronous I/O and parallel execution through mechanisms such as Worker Threads and Child Processes.

---

# 22. Practical Tasks

Complete these exercises before moving to Phase 7.

## Task 1: Understand Execution Order

Predict the output:

```javascript
console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

Promise.resolve().then(() => {
    console.log("C");
});

process.nextTick(() => {
    console.log("D");
});

console.log("E");
```

**Expected output in a CommonJS script:**

```text
A
E
D
C
B
```

## Task 2: Compare setImmediate() and setTimeout()

Create a program that:

1. Schedules `setTimeout()`.
2. Schedules `setImmediate()`.
3. Runs the program multiple times.
4. Observes the execution order.

Then repeat the experiment inside an `fs.readFile()` callback.

## Task 3: Understand Event Loop Blocking

Create a program that:

1. Schedules a timer for one second.
2. Runs a CPU-intensive loop.
3. Prints the start and end timestamps.
4. Observes how much later the timer executes.

## Task 4: Understand Thread Pool

Use `crypto.pbkdf2()` to execute multiple password-based key derivation operations.

Requirements:

1. Execute four operations concurrently.
2. Measure execution time.
3. Change `UV_THREADPOOL_SIZE`.
4. Compare the results.
5. Explain why increasing the thread pool size may or may not improve performance.

## Task 5: Worker Threads

Build a small application that:

1. Accepts a number from the user.
2. Performs a CPU-intensive calculation in a Worker Thread.
3. Sends the result back to the main thread.
4. Displays the result.
5. Handles worker errors.

---

# 23. Phase 06 Completion Checklist

Before moving to Phase 7, make sure you understand:

- [ ] Node.js runtime architecture.
- [ ] V8 JavaScript engine.
- [ ] libuv.
- [ ] Event Loop.
- [ ] Call Stack.
- [ ] Callback Queue.
- [ ] Microtask Queue.
- [ ] Node.js Event Loop phases.
- [ ] Timers phase.
- [ ] Pending Callbacks phase.
- [ ] Poll phase.
- [ ] Check phase.
- [ ] Close Callbacks phase.
- [ ] `process.nextTick()`.
- [ ] `setImmediate()`.
- [ ] `setTimeout()` vs `setImmediate()`.
- [ ] libuv Thread Pool.
- [ ] `UV_THREADPOOL_SIZE`.
- [ ] Event Loop Blocking.
- [ ] Worker Threads.
- [ ] Concurrency vs Parallelism.

---

## What Comes Next?

### PHASE 07: HTTP & Web Server Fundamentals

In Phase 7, we will learn how Node.js communicates over HTTP and how to build a web server without Express.js.

Topics will include:

1. What is HTTP?
2. Client-Server Architecture.
3. Request and Response Lifecycle.
4. HTTP Methods (GET, POST, PUT, PATCH, DELETE).
5. HTTP Status Codes.
6. HTTP Headers.
7. Request Body.
8. Query Parameters.
9. Route Parameters.
10. HTTP Module in Node.js.
11. Creating an HTTP Server.
12. Handling Different Routes.
13. Handling GET and POST Requests.
14. Parsing JSON Request Bodies.
15. Serving HTML and Static Files.
16. Content-Type and MIME Types.
17. HTTP vs HTTPS.
18. Building a Basic REST API Without Express.

**Recommended focus before Phase 7:** Make sure you understand the difference between the Event Loop, Call Stack, and Thread Pool. These three concepts are fundamental to understanding how Node.js handles multiple incoming HTTP requests.