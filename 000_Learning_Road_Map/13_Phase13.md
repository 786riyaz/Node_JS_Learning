# PHASE 13: Advanced Node.js Concepts

**Level:** Advanced  
**Goal:** Understand Node.js internals, streams, buffers, processes, worker threads, clustering, memory management, caching, WebSockets, and performance optimization.

In previous phases, you learned how to build backend applications using Node.js and Express. Now we will explore how Node.js works internally and how to build applications that can handle large workloads efficiently.

## Topics Covered

1. Node.js Architecture Deep Dive
2. V8 Engine Internals
3. Libuv Internals
4. Event Loop Deep Dive
5. EventEmitter
6. Streams
7. Readable Streams
8. Writable Streams
9. Duplex Streams
10. Transform Streams
11. Backpressure
12. Buffers
13. Binary Data Handling
14. Child Processes
15. `exec()`, `spawn()`, and `fork()`
16. Worker Threads
17. Clustering
18. Process Management
19. Memory Management
20. Garbage Collection
21. Memory Leaks
22. Caching
23. Redis Fundamentals
24. WebSockets
25. Real-Time Communication
26. Graceful Shutdown
27. Performance Optimization
28. Advanced Node.js Project

---

# PART 1: NODE.JS ARCHITECTURE DEEP DIVE

## 1. How Does Node.js Work Internally?

Node.js is a JavaScript runtime built around several important components.

Its architecture includes:

1. V8 JavaScript Engine.
2. Node.js APIs.
3. Libuv.
4. Event Loop.
5. Thread Pool.
6. Operating System.

Let's understand each component.

### Node.js Architecture

```text
              NODE.JS APPLICATION
                       |
                       v
              JAVASCRIPT CODE
                       |
                       v
                NODE.JS APIs
                       |
             +---------+---------+
             |                   |
             v                   v
         V8 ENGINE            LIBUV
             |                   |
             |             +-----+------+
             |             |            |
             |             v            v
             |         EVENT LOOP    THREAD POOL
             |             |            |
             |             |            |
             +-------------+------------+
                           |
                           v
                   OPERATING SYSTEM
```

### 1. V8 Engine

V8 is Google's open-source JavaScript engine.

It is responsible for executing JavaScript.

Responsibilities:

- Parsing JavaScript.
- Compiling JavaScript.
- Executing JavaScript.
- Memory management.
- Garbage collection.
- Optimizing JavaScript execution.

Node.js uses V8 to execute JavaScript outside the browser.

### 2. Node.js APIs

Node.js provides built-in APIs that allow JavaScript to interact with system resources.

Examples:

```javascript
const fs = require("fs");
const path = require("path");
const http = require("http");
const crypto = require("crypto");
```

These APIs allow developers to:

- Read and write files.
- Create HTTP servers.
- Access environment variables.
- Perform cryptographic operations.
- Manage processes.
- Work with streams.

### 3. Libuv

Libuv is a cross-platform C library used by Node.js.

It provides:

- Event loop implementation.
- Asynchronous I/O support.
- Thread pool.
- File system operations.
- Networking support.
- Timers.
- Cross-platform abstractions.

### 4. Event Loop

The event loop coordinates asynchronous callbacks and allows Node.js to handle many operations without blocking the JavaScript execution thread.

### 5. Thread Pool

Libuv maintains a thread pool for certain operations.

The default thread pool size is:

```text
4 threads
```

It can be configured using:

```bash
UV_THREADPOOL_SIZE=8 node app.js
```

On Windows PowerShell:

```powershell
$env:UV_THREADPOOL_SIZE=8
node app.js
```

Common operations that use the thread pool include:

- Many filesystem operations.
- Certain DNS operations.
- Some cryptographic operations.
- Compression operations.

**Important:** Network I/O is generally handled through operating-system asynchronous mechanisms rather than being delegated to the libuv thread pool.

---

## 2. V8 Engine Internals

V8 is responsible for executing JavaScript code.

Let's understand its basic execution process.

### JavaScript Execution Flow

```text
       JAVASCRIPT SOURCE CODE
                  |
                  v
                PARSER
                  |
                  v
          ABSTRACT SYNTAX TREE
                  |
                  v
             BYTECODE
                  |
                  v
           IGNITION INTERPRETER
                  |
                  v
        OPTIMIZING COMPILER
                  |
                  v
             MACHINE CODE
```

### 1. Parser

The parser analyzes JavaScript source code and checks its syntax.

Example:

```javascript
const name = "John";

console.log(name);
```

The parser understands the structure of this code.

### 2. Abstract Syntax Tree (AST)

An Abstract Syntax Tree represents the structure of the source code.

For example:

```javascript
const total = 10 + 20;
```

The AST represents:

```text
Variable Declaration
       |
       v
    total
       |
       v
   Addition
    /    \
   10    20
```

### 3. Ignition

Ignition is V8's interpreter.

It converts JavaScript into bytecode and executes it.

### 4. TurboFan

TurboFan is V8's optimizing compiler.

It optimizes frequently executed code paths into machine code.

### What Is JIT Compilation?

JIT stands for Just-In-Time Compilation.

It means code can be compiled during execution instead of being fully compiled ahead of time.

V8 uses interpretation and optimization techniques to improve JavaScript execution performance.

### Why Is V8 Important?

V8 makes JavaScript execution efficient and provides the foundation for Node.js runtime performance.

---

# PART 2: EVENTEMITTER

## 3. What Is EventEmitter?

EventEmitter is a class provided by Node.js through the `events` module.

It implements the event-driven programming pattern.

In this pattern:

- An event is created.
- Listeners subscribe to the event.
- The event is emitted.
- Registered listeners execute.

### Real-World Example

Imagine a notification system.

```text
          USER REGISTERS
                |
                v
          USER_REGISTERED
                |
        +-------+-------+
        |       |       |
        v       v       v
       EMAIL  LOGGING  ANALYTICS
       EVENT   EVENT     EVENT
```

One event can trigger multiple listeners.

### Import EventEmitter

CommonJS:

```javascript
const EventEmitter = require("events");
```

ES Modules:

```javascript
import EventEmitter from "node:events";
```

### Create an EventEmitter

```javascript
const EventEmitter = require("events");

const emitter = new EventEmitter();
```

### Register an Event Listener

```javascript
emitter.on("userRegistered", () => {

    console.log("User registered successfully");

});
```

### Emit an Event

```javascript
emitter.emit("userRegistered");
```

Output:

```text
User registered successfully
```

### Complete Example

```javascript
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("orderPlaced", () => {

    console.log("Order received");

});

emitter.emit("orderPlaced");
```

---

## 4. Passing Data Through Events

You can pass arguments while emitting events.

```javascript
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("userRegistered", (user) => {

    console.log("New User:", user.name);

    console.log("Email:", user.email);

});

emitter.emit("userRegistered", {

    id: 1,

    name: "John",

    email: "john@example.com"

});
```

Output:

```text
New User: John
Email: john@example.com
```

---

## 5. EventEmitter Methods

| Method | Purpose |
|---|---|
| `on()` | Register an event listener |
| `addListener()` | Register an event listener |
| `once()` | Register a listener that executes once |
| `emit()` | Trigger an event |
| `off()` | Remove a specific listener |
| `removeListener()` | Remove a specific listener |
| `removeAllListeners()` | Remove listeners for an event |
| `listenerCount()` | Count listeners |
| `eventNames()` | Get registered event names |

### once()

The listener executes only once.

```javascript
emitter.once("login", () => {

    console.log("User logged in");

});

emitter.emit("login");

emitter.emit("login");
```

Output:

```text
User logged in
```

The second emission does not execute the listener.

### off()

```javascript
function welcome() {

    console.log("Welcome");

}

emitter.on("login", welcome);

emitter.off("login", welcome);
```

The listener is removed.

### listenerCount()

```javascript
console.log(
    emitter.listenerCount("login")
);
```

### Important: EventEmitter Is Synchronous by Default

Example:

```javascript
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("test", () => {

    console.log("Event executed");

});

console.log("Start");

emitter.emit("test");

console.log("End");
```

Output:

```text
Start
Event executed
End
```

Listeners execute synchronously in registration order unless the listener itself schedules asynchronous work.

### Special Error Event

EventEmitter treats the event name `"error"` specially.

If an EventEmitter emits an `"error"` event without a registered error listener, Node.js throws the error.

Example:

```javascript
emitter.on("error", (error) => {

    console.log("Error:", error.message);

});

emitter.emit("error", new Error("Something went wrong"));
```

### When Should You Use EventEmitter?

- Notification systems.
- Order-processing events.
- Application lifecycle events.
- Logging systems.
- Background task coordination.
- Custom application events.

**Important:** EventEmitter is useful for communication within a Node.js process. For communication between separate services, consider message brokers such as RabbitMQ, Kafka, or Redis Pub/Sub.

---

# PART 3: STREAMS

## 6. What Are Streams?

Streams are objects used to process data continuously in chunks instead of loading the entire data into memory.

This is one of the most important concepts in advanced Node.js.

### Understand the Problem

Suppose you have a video file of 5 GB.

You want to read that file.

### Without Streams

```javascript
const fs = require("fs");

const data = fs.readFileSync("video.mp4");

console.log(data);
```

This loads the entire file into memory.

Potential problems:

- High memory consumption.
- Slow initial processing.
- Application instability.
- Out-of-memory errors.

### With Streams

```javascript
const fs = require("fs");

const stream = fs.createReadStream("video.mp4");

stream.on("data", (chunk) => {

    console.log("Received chunk:", chunk.length);

});

stream.on("end", () => {

    console.log("File reading completed");

});
```

Instead of loading the entire file, Node.js reads it in chunks.

### Stream Flow

```text
             LARGE FILE
                  |
                  v
            READ STREAM
                  |
          +-------+-------+
          |       |       |
          v       v       v
        CHUNK  CHUNK   CHUNK
          1      2       3
          |      |       |
          +------+-------+
                 |
                 v
             PROCESS DATA
```

### Advantages of Streams

1. Lower memory consumption.
2. Efficient large-file processing.
3. Better data-flow control.
4. Can begin processing before the entire resource is available.
5. Useful for networking and real-time applications.

---

## 7. Types of Streams

Node.js provides four major stream types.

1. Readable Streams.
2. Writable Streams.
3. Duplex Streams.
4. Transform Streams.

Let's understand each one.

---

## 8. Readable Streams

A Readable Stream represents a source from which data can be read.

Examples:

- Reading a file.
- Receiving an HTTP request body.
- Reading data from a network connection.
- Reading data from standard input.

### Create Readable Stream

```javascript
const fs = require("fs");

const readableStream = fs.createReadStream("data.txt", {

    encoding: "utf8",

    highWaterMark: 16

});

readableStream.on("data", (chunk) => {

    console.log("Chunk:", chunk);

});

readableStream.on("end", () => {

    console.log("Reading completed");

});

readableStream.on("error", (error) => {

    console.log(error.message);

});
```

### What Is highWaterMark?

`highWaterMark` controls the internal buffering threshold for a stream.

For a file Readable Stream, it generally specifies the maximum number of bytes to buffer per read operation.

Example:

```javascript
highWaterMark: 1024
```

This represents a buffer threshold of approximately 1 KB.

It does not guarantee that every chunk will always have exactly that size.

### Readable Stream Events

| Event | Meaning |
|---|---|
| `data` | Data chunk received |
| `end` | No more data available |
| `error` | Error occurred |
| `close` | Stream closed |
| `readable` | Data can be read |

---

## 9. Writable Streams

A Writable Stream represents a destination to which data can be written.

Examples:

- Writing a file.
- Sending an HTTP response.
- Writing data to a network socket.
- Writing to standard output.

### Create Writable Stream

```javascript
const fs = require("fs");

const writableStream = fs.createWriteStream("output.txt");

writableStream.write("Hello ");

writableStream.write("Node.js ");

writableStream.write("Streams");

writableStream.end();
```

### Understanding end()

The `end()` method indicates that no more data will be written.

The stream finishes after the buffered data has been processed.

### Writable Stream Events

| Event | Meaning |
|---|---|
| `drain` | Internal buffer has emptied sufficiently to accept more data |
| `finish` | All data has been flushed to the underlying system |
| `error` | Error occurred |
| `close` | Stream closed |
| `pipe` | Source stream has been piped to it |

### Listen for finish

```javascript
writableStream.on("finish", () => {

    console.log("Writing completed");

});
```

---

## 10. Duplex Streams

A Duplex Stream supports both reading and writing.

It can act as both a Readable Stream and a Writable Stream.

Examples:

- TCP sockets.
- Some network communication channels.

### Concept

```text
          INPUT DATA
               |
               v
        DUPLEX STREAM
               |
          +----+----+
          |         |
          v         v
        READ      WRITE
```

### Example: TCP Socket

Node.js network sockets are Duplex Streams.

```javascript
const net = require("net");

const server = net.createServer((socket) => {

    socket.on("data", (data) => {

        console.log("Received:", data.toString());

        socket.write("Message received");

    });

});

server.listen(4000, () => {

    console.log("TCP server running on port 4000");

});
```

Here:

- `socket.on("data")` reads incoming data.
- `socket.write()` sends outgoing data.

---

## 11. Transform Streams

A Transform Stream is a special type of Duplex Stream.

It reads data, transforms it, and produces output.

Examples:

- Compressing files.
- Decompressing files.
- Encrypting data.
- Decrypting data.
- Converting text formats.

### Example: Uppercase Transform

```javascript
const { Transform } = require("stream");

const uppercaseTransform = new Transform({

    transform(chunk, encoding, callback) {

        const result = chunk.toString().toUpperCase();

        callback(null, result);

    }

});

uppercaseTransform.on("data", (chunk) => {

    console.log(chunk.toString());

});

uppercaseTransform.write("hello ");

uppercaseTransform.write("node.js");

uppercaseTransform.end();
```

Output:

```text
HELLO
NODE.JS
```

### Transform Stream Flow

```text
        INPUT DATA
             |
             v
        READABLE SIDE
             |
             v
         TRANSFORM
             |
             v
        WRITABLE SIDE
             |
             v
        OUTPUT DATA
```

---

## 12. What Is pipe()?

The `pipe()` method connects a Readable Stream to a Writable Stream.

It transfers data from one stream to another.

### Example: Copy File Using Streams

```javascript
const fs = require("fs");

const readable = fs.createReadStream("input.txt");

const writable = fs.createWriteStream("output.txt");

readable.pipe(writable);
```

### How Does It Work?

```text
       input.txt
           |
           v
     READ STREAM
           |
           v
         pipe()
           |
           v
     WRITE STREAM
           |
           v
       output.txt
```

You do not need to manually handle every chunk.

The pipe mechanism also coordinates flow control between compatible streams.

### Handling Errors

For a simple two-stream pipeline, use:

```javascript
const fs = require("fs");

const readable = fs.createReadStream("input.txt");

const writable = fs.createWriteStream("output.txt");

readable.on("error", console.error);

writable.on("error", console.error);

readable.pipe(writable);
```

For more complex stream pipelines, prefer `pipeline()`.

---

## 13. What Is pipeline()?

`pipeline()` is a utility provided by Node.js streams.

It connects multiple streams and provides centralized error handling.

### Example

```javascript
const fs = require("fs");

const { pipeline } = require("stream");

const readable = fs.createReadStream("input.txt");

const writable = fs.createWriteStream("output.txt");

pipeline(
    readable,
    writable,
    (error) => {

        if (error) {

            console.error("Pipeline failed:", error);

            return;

        }

        console.log("Pipeline completed");

    }
);
```

### Promise-Based pipeline()

```javascript
const fs = require("fs");

const { pipeline } = require("stream/promises");

async function copyFile() {

    try {

        await pipeline(

            fs.createReadStream("input.txt"),

            fs.createWriteStream("output.txt")

        );

        console.log("File copied successfully");

    } catch (error) {

        console.error(error);

    }

}

copyFile();
```

### pipe() vs pipeline()

| pipe() | pipeline() |
|---|---|
| Connects streams | Connects streams |
| Convenient for simple flows | Better for robust pipelines |
| Error handling needs more care | Centralized error propagation |
| Does not provide a completion callback | Supports completion callback or Promise API |

---

# PART 4: BACKPRESSURE

## 14. What Is Backpressure?

Backpressure occurs when data is produced faster than the destination can consume it.

Imagine:

- A Readable Stream produces 100 MB per second.
- A Writable Stream can process only 10 MB per second.

The destination cannot keep up.

Without flow control, buffered data could consume too much memory.

### Example

```text
      READABLE STREAM
       100 MB/SECOND
             |
             v
       WRITABLE STREAM
        10 MB/SECOND
             |
             v
       BUFFER INCREASES
             |
             v
       HIGH MEMORY USAGE
```

Backpressure helps regulate the data flow.

### Understanding write()

When you call:

```javascript
writable.write(data);
```

It returns a Boolean.

- `true`: The stream can continue accepting data without exceeding its buffering threshold.
- `false`: Stop writing temporarily and wait for the `drain` event.

### Example

```javascript
const fs = require("fs");

const writable = fs.createWriteStream("output.txt");

let index = 0;

function writeData() {

    while (index < 100000) {

        const canContinue = writable.write(
            `Line ${index}\n`
        );

        index++;

        if (!canContinue) {

            writable.once("drain", writeData);

            return;

        }

    }

    writable.end();

}

writeData();
```

### How It Works

```text
        WRITE DATA
             |
             v
       writable.write()
             |
       +-----+-----+
       |           |
       v           v
     TRUE        FALSE
       |           |
       v           v
   CONTINUE     STOP WRITING
                   |
                   v
             WAIT FOR drain
                   |
                   v
              CONTINUE
```

**Remember:** Backpressure is a fundamental concept when working with large files, network communication, and high-throughput systems.

---

# PART 5: BUFFERS

## 15. What Is a Buffer?

A Buffer is a Node.js object used to represent a sequence of bytes.

Buffers are particularly useful when working with binary data.

Examples:

- Images.
- Videos.
- Audio.
- PDFs.
- Network packets.
- Compressed files.

JavaScript strings represent text. They are not suitable for directly representing arbitrary binary data.

Node.js provides Buffer for byte-level operations.

### Create a Buffer

```javascript
const buffer = Buffer.from("Hello Node.js");

console.log(buffer);
```

Output will resemble:

```text
<Buffer 48 65 6c 6c 6f 20 4e 6f 64 65 2e 6a 73>
```

These hexadecimal values represent bytes.

### Convert Buffer to String

```javascript
const buffer = Buffer.from("Hello Node.js");

console.log(buffer.toString());
```

Output:

```text
Hello Node.js
```

### Create Buffer with Specific Size

```javascript
const buffer = Buffer.alloc(10);

console.log(buffer);
```

`Buffer.alloc()` creates a zero-initialized buffer.

### Buffer.allocUnsafe()

```javascript
const buffer = Buffer.allocUnsafe(10);
```

This allocates memory without initializing its contents.

It may contain previous memory contents until overwritten.

Only use it when you understand the security implications and ensure the buffer is fully initialized before exposing or using its contents.

### Buffer.from() with Array

```javascript
const buffer = Buffer.from([65, 66, 67]);

console.log(buffer.toString());
```

Output:

```text
ABC
```

### Buffer Properties

```javascript
const buffer = Buffer.from("Hello");

console.log(buffer.length);

console.log(buffer.toString("hex"));

console.log(buffer.toString("base64"));
```

### Common Buffer Methods

| Method | Purpose |
|---|---|
| `Buffer.from()` | Create buffer from existing data |
| `Buffer.alloc()` | Allocate zero-filled buffer |
| `Buffer.allocUnsafe()` | Allocate uninitialized buffer |
| `toString()` | Convert buffer to text |
| `write()` | Write data into a buffer |
| `slice()` | Create a view over part of a buffer |
| `subarray()` | Create a view over part of a buffer |
| `concat()` | Combine buffers |
| `equals()` | Compare buffer contents |
| `compare()` | Compare buffers |

### Example: Buffer Concatenation

```javascript
const buffer1 = Buffer.from("Hello ");

const buffer2 = Buffer.from("World");

const result = Buffer.concat([
    buffer1,
    buffer2
]);

console.log(result.toString());
```

Output:

```text
Hello World
```

### Buffer vs Stream

| Buffer | Stream |
|---|---|
| Represents bytes in memory | Processes data over time |
| Useful for binary data | Useful for continuous data flow |
| May hold an entire resource | Processes chunks |
| Can be used inside streams | Often transfers Buffer chunks |

**Important:** Streams frequently use Buffers internally when processing binary data.

---

# PART 6: CHILD PROCESSES

## 16. What Is a Child Process?

A child process is a separate operating-system process created by another process.

Node.js provides the `child_process` module to create and manage child processes.

### Why Do We Need Child Processes?

Suppose your application needs to:

- Execute a shell command.
- Run a Python script.
- Generate a PDF using an external program.
- Convert videos using FFmpeg.
- Execute another Node.js application.
- Run a long-running external process.

You can use child processes for these tasks.

### Parent and Child Process

```text
          PARENT PROCESS
          NODE.JS SERVER
                 |
                 |
          CREATE CHILD
                 |
                 v
          CHILD PROCESS
                 |
         +-------+-------+
         |       |       |
         v       v       v
       OUTPUT  ERROR   EXIT CODE
```

### Import child_process

```javascript
const { exec, spawn, fork } = require("child_process");
```

There are three important methods:

1. `exec()`
2. `spawn()`
3. `fork()`

---

## 17. exec()

`exec()` executes a command in a shell.

It buffers the command's output and provides it through a callback.

### Example

```javascript
const { exec } = require("child_process");

exec("node -v", (error, stdout, stderr) => {

    if (error) {

        console.error("Error:", error.message);

        return;

    }

    if (stderr) {

        console.error("Stderr:", stderr);

    }

    console.log("Output:", stdout);

});
```

Output:

```text
Output: v22.x.x
```

The actual output depends on your installed Node.js version.

### When Should You Use exec()?

- Short commands.
- Small command outputs.
- Shell utilities.
- Simple command execution.

### Important Security Warning

Never directly insert untrusted user input into a shell command.

Dangerous:

```javascript
exec(`some-command ${req.body.filename}`);
```

This can introduce command injection.

For commands that accept arguments, prefer `spawn()` with an argument array and avoid enabling a shell unnecessarily.

---

## 18. spawn()

`spawn()` starts a process and provides its output through streams.

It is particularly useful for long-running commands and large outputs.

### Example

```javascript
const { spawn } = require("child_process");

const child = spawn("node", ["-v"]);

child.stdout.on("data", (data) => {

    console.log("Output:", data.toString());

});

child.stderr.on("data", (data) => {

    console.error("Error:", data.toString());

});

child.on("close", (code) => {

    console.log("Process closed:", code);

});

child.on("error", (error) => {

    console.error("Failed to start:", error);

});
```

### What Is stdout?

`stdout` means standard output.

It represents normal output produced by the process.

### What Is stderr?

`stderr` means standard error.

It represents diagnostic or error output.

### What Is stdin?

`stdin` means standard input.

It allows input to be sent to the process.

### Example

```javascript
const { spawn } = require("child_process");

const child = spawn("node", ["-e", "process.stdin.pipe(process.stdout)"]);

child.stdin.write("Hello Child Process");

child.stdin.end();

child.stdout.on("data", (data) => {

    console.log(data.toString());

});
```

---

## 19. fork()

`fork()` creates a new Node.js process and establishes an IPC communication channel.

IPC stands for Inter-Process Communication.

It allows parent and child Node.js processes to exchange messages.

### Create Child File

File: `child.js`

```javascript
process.on("message", (message) => {

    console.log("Child received:", message);

    process.send({

        status: "success",

        message: "Message received by child"

    });

});
```

### Parent File

File: `parent.js`

```javascript
const { fork } = require("child_process");

const child = fork("./child.js");

child.send({

    message: "Hello from parent"

});

child.on("message", (message) => {

    console.log("Parent received:", message);

});

child.on("exit", (code) => {

    console.log("Child exited:", code);

});
```

Run:

```bash
node parent.js
```

### How fork() Works

```text
             PARENT
               |
               |
         child.send()
               |
               v
             CHILD
               |
               |
        process.on(message)
               |
               v
         process.send()
               |
               v
             PARENT
```

### exec() vs spawn() vs fork()

| Feature | exec() | spawn() | fork() |
|---|---|---|---|
| Purpose | Execute shell command | Start process | Start Node.js child process |
| Shell | Yes, by default | No, by default | No shell |
| Output | Buffered | Streams | IPC plus streams |
| Large output | Not ideal | Suitable | Depends on usage |
| IPC | No built-in Node IPC channel | No built-in Node IPC channel | Yes |
| Typical use | Short shell commands | Long-running commands | Node.js process communication |

---

# PART 7: WORKER THREADS

## 20. What Are Worker Threads?

Worker Threads allow JavaScript code to execute in parallel using separate threads.

Node.js provides the `worker_threads` module.

### Why Do We Need Worker Threads?

Node.js normally executes JavaScript on one main JavaScript thread per isolate.

This works well for I/O-heavy applications.

However, CPU-intensive JavaScript operations can block the event loop.

Examples:

- Large calculations.
- Image processing.
- Data compression.
- Complex mathematical operations.
- CPU-intensive parsing.

Worker Threads allow such work to execute in separate threads.

### Main Thread vs Worker Thread

```text
             MAIN THREAD
                  |
                  |
             CREATE WORKER
                  |
         +--------+--------+
         |                 |
         v                 v
      MAIN THREAD      WORKER THREAD
         |                 |
         v                 v
    HTTP REQUESTS      CPU CALCULATION
         |                 |
         v                 v
    EVENT LOOP         RESULT
         |                 |
         +--------+--------+
                  |
                  v
             MAIN THREAD
```

### Create Worker File

File: `worker.js`

```javascript
const { parentPort } = require("worker_threads");

let total = 0;

for (let i = 0; i < 100000000; i++) {

    total += i;

}

parentPort.postMessage(total);
```

### Main File

File: `main.js`

```javascript
const { Worker } = require("worker_threads");

const worker = new Worker("./worker.js");

worker.on("message", (result) => {

    console.log("Result:", result);

});

worker.on("error", (error) => {

    console.error("Worker Error:", error);

});

worker.on("exit", (code) => {

    console.log("Worker exited:", code);

});
```

Run:

```bash
node main.js
```

The calculation runs on a worker thread rather than blocking the main JavaScript thread.

### Communicating with Worker Threads

You can use:

- `parentPort.postMessage()`
- `worker.postMessage()`
- `worker.on("message")`

Example:

Main:

```javascript
const { Worker } = require("worker_threads");

const worker = new Worker("./worker.js");

worker.postMessage(10);

worker.on("message", (result) => {

    console.log(result);

});
```

Worker:

```javascript
const { parentPort } = require("worker_threads");

parentPort.on("message", (number) => {

    parentPort.postMessage(number * number);

});
```

Output:

```text
100
```

### Worker Threads vs Child Processes

| Worker Threads | Child Processes |
|---|---|
| Separate threads | Separate processes |
| Share process-level resources | Separate process memory |
| Can share memory using SharedArrayBuffer | Usually communicate through IPC or streams |
| Lower overhead than separate processes in many cases | Generally more process overhead |
| Good for CPU-intensive JavaScript | Good for external commands and process isolation |

### Important

Do not create a new worker for every small task.

Worker creation has overhead.

For production systems, use a worker pool to reuse a limited number of workers.

---

# PART 8: CLUSTERING

## 21. What Is Clustering in Node.js?

Clustering allows multiple Node.js processes to run and share incoming server connections.

It is useful when you want to take advantage of multiple CPU cores.

### Understand the Problem

Suppose your server has 8 CPU cores.

You start one Node.js process.

That process's main JavaScript thread generally runs on one CPU core at a time.

Other cores may remain underutilized for that process's JavaScript execution.

Clustering allows you to run multiple Node.js processes.

### Cluster Architecture

```text
                 CLIENT REQUESTS
                        |
                        v
                  PRIMARY PROCESS
                        |
             +----------+----------+
             |          |          |
             v          v          v
          WORKER 1   WORKER 2   WORKER 3
             |          |          |
             v          v          v
          SERVER     SERVER     SERVER
             |          |          |
             +----------+----------+
                        |
                        v
                   RESPONSES
```

### Create Cluster Example

File: `server.js`

```javascript
const cluster = require("cluster");

const os = require("os");

const http = require("http");

if (cluster.isPrimary) {

    const cpuCount = os.availableParallelism();

    console.log(`Primary process: ${process.pid}`);

    for (let i = 0; i < cpuCount; i++) {

        cluster.fork();

    }

    cluster.on("exit", (worker, code) => {

        console.log(
            `Worker ${worker.process.pid} exited`
        );

    });

} else {

    const server = http.createServer((req, res) => {

        res.end(`Handled by process ${process.pid}`);

    });

    server.listen(3000);

    console.log(`Worker started: ${process.pid}`);

}
```

Run:

```bash
node server.js
```

Make multiple requests to:

```text
http://localhost:3000
```

You may receive responses from different worker processes.

### What Is os.availableParallelism()?

It returns an estimate of the number of parallel execution units available to the application.

It is generally preferred over relying on `os.cpus().length` for choosing an available parallelism value.

### What Is a Cluster Worker?

A cluster worker is a separate Node.js process created by the primary process.

Each worker has its own:

- JavaScript execution environment.
- Event loop.
- Memory space.
- Module cache.

### Important Production Considerations

- Cluster workers should not depend on in-memory session state being shared.
- Use Redis or another shared store for sessions and distributed caching.
- Handle worker crashes carefully.
- Avoid spawning unlimited workers.
- Consider container orchestration or process managers for production scaling.

---

## 22. Worker Threads vs Clustering

This is a common interview question.

| Feature | Worker Threads | Cluster |
|---|---|---|
| Execution model | Multiple threads | Multiple processes |
| Memory | Can share memory | Separate process memory |
| Isolation | Less than separate processes | Stronger process isolation |
| Main use | CPU-intensive JavaScript | Scaling server processes |
| Communication | Message passing/shared memory | IPC |
| Event loop | Separate per worker thread | Separate per process |

### When to Use What?

Use Worker Threads when:

- You need CPU-intensive JavaScript operations to run in parallel.
- You want to keep the main event loop responsive.
- You need controlled parallel computation.

Use Clustering when:

- You want multiple Node.js server processes.
- You want to utilize multiple CPU cores for incoming requests.
- You want process-level isolation.

---

# PART 9: PROCESS MANAGEMENT

## 23. What Is the Process Object?

Node.js provides a global `process` object.

It contains information and methods related to the current Node.js process.

### Common Properties

```javascript
console.log(process.pid);

console.log(process.platform);

console.log(process.arch);

console.log(process.version);

console.log(process.cwd());

console.log(process.env);
```

| Property | Meaning |
|---|---|
| `process.pid` | Current process ID |
| `process.platform` | Operating system platform |
| `process.arch` | CPU architecture |
| `process.version` | Node.js version |
| `process.cwd()` | Current working directory |
| `process.env` | Environment variables |
| `process.argv` | Command-line arguments |
| `process.memoryUsage()` | Memory usage information |

### process.argv

Used to read command-line arguments.

Example:

```javascript
console.log(process.argv);
```

Run:

```bash
node app.js hello world
```

The last two values represent the supplied arguments.

Example:

```javascript
const args = process.argv.slice(2);

console.log(args);
```

Output:

```text
[ 'hello', 'world' ]
```

### process.exit()

Terminates the current Node.js process.

```javascript
process.exit(1);
```

Common exit codes:

| Code | Meaning |
|---|---|
| `0` | Successful execution |
| Non-zero | Failure or abnormal termination |

Avoid calling `process.exit()` casually in a server because it can terminate the process before pending operations finish.

Prefer graceful shutdown.

---

# PART 10: MEMORY MANAGEMENT

## 24. How Does Node.js Manage Memory?

Node.js uses the V8 engine for JavaScript memory management.

Memory is required for:

- Variables.
- Objects.
- Arrays.
- Functions.
- Closures.
- Buffers.
- Other runtime structures.

### Memory Areas

A simplified V8 memory model includes:

1. Stack.
2. Heap.
3. Code space.
4. Other runtime-managed memory areas.

### Stack

The stack stores execution-related information, such as function call frames and local execution state.

Example:

```javascript
function first() {

    second();

}

function second() {

    console.log("Hello");

}

first();
```

Function calls create execution frames that are managed by the runtime.

### Heap

The heap stores dynamically allocated objects.

Example:

```javascript
const user = {

    name: "John",

    age: 25

};
```

The object is allocated in managed memory.

### Simplified Memory Model

```text
          NODE.JS MEMORY
                 |
        +--------+--------+
        |        |        |
        v        v        v
      STACK    HEAP     OTHER
        |        |      MEMORY
        |        |
        v        v
    EXECUTION  OBJECTS
     FRAMES    ARRAYS
               FUNCTIONS
```

---

## 25. What Is Garbage Collection?

Garbage Collection (GC) is the process of identifying and reclaiming memory that is no longer reachable by the application.

V8 automatically manages much of JavaScript memory.

### Example

```javascript
let user = {

    name: "John"

};

user = null;
```

Initially, the object is referenced by `user`.

After:

```javascript
user = null;
```

The object may become eligible for garbage collection if nothing else references it.

### Important

Garbage collection does not happen immediately when an object becomes unreachable.

The runtime decides when to perform collection.

### Common Garbage Collection Concepts

- Reachability.
- Marking.
- Sweeping.
- Generational collection.
- Memory compaction.

V8 uses advanced garbage collection techniques, including generational and concurrent collection strategies.

---

# PART 11: MEMORY LEAKS

## 26. What Is a Memory Leak?

A memory leak occurs when memory that is no longer needed remains retained and cannot be reclaimed.

As a result, application memory usage can continuously increase.

### Common Causes

1. Unnecessary global variables.
2. Unremoved event listeners.
3. Unbounded caches.
4. Unclosed resources.
5. Long-lived closures retaining large objects.
6. Timers that are never cleared.
7. Accidental references to unused objects.

### Example 1: Global Array

```javascript
const users = [];

function addUser(user) {

    users.push(user);

}
```

If this array grows indefinitely, memory usage can increase continuously.

### Example 2: Unremoved Event Listeners

```javascript
const EventEmitter = require("events");

const emitter = new EventEmitter();

function handleEvent() {

    console.log("Event received");

}

emitter.on("data", handleEvent);
```

If listeners are repeatedly registered without being removed, the application may retain unnecessary references.

### Better Approach

```javascript
emitter.off("data", handleEvent);
```

### Example 3: Uncontrolled Timers

```javascript
const interval = setInterval(() => {

    console.log("Running");

}, 1000);
```

If the interval is no longer needed:

```javascript
clearInterval(interval);
```

### How to Detect Memory Leaks?

Useful tools:

- Chrome DevTools.
- Node.js Inspector.
- Heap snapshots.
- `process.memoryUsage()`.
- Clinic.js.
- V8 profiling tools.

### Check Memory Usage

```javascript
console.log(process.memoryUsage());
```

Example output:

```javascript
{
    rss: 50000000,
    heapTotal: 10000000,
    heapUsed: 7000000,
    external: 2000000,
    arrayBuffers: 1000000
}
```

Actual values depend on the running process.

### Understanding Memory Fields

| Field | Meaning |
|---|---|
| `rss` | Total resident memory used by the process |
| `heapTotal` | Total V8 heap memory allocated |
| `heapUsed` | V8 heap memory currently used |
| `external` | Memory associated with native objects outside the V8 heap |
| `arrayBuffers` | Memory used by ArrayBuffer and SharedArrayBuffer, including Node.js Buffers |

---

# PART 12: CACHING

## 27. What Is Caching?

Caching means storing frequently accessed data temporarily so it can be retrieved faster later.

### Without Caching

```text
CLIENT REQUEST
      |
      v
   DATABASE
      |
      v
   FETCH DATA
      |
      v
   RESPONSE
```

Every request queries the database.

### With Caching

```text
CLIENT REQUEST
      |
      v
     CACHE
      |
  +---+---+
  |       |
  v       v
HIT     MISS
  |       |
  v       v
DATA   DATABASE
  |       |
  |       v
  |    FETCH DATA
  |       |
  |       v
  |    STORE CACHE
  |       |
  +---+---+
      |
      v
   RESPONSE
```

### Cache Hit

Data is available in the cache.

### Cache Miss

Data is not available in the cache, so the application retrieves it from the original data source.

### Benefits

- Faster responses.
- Reduced database load.
- Improved scalability.
- Lower repeated computation.
- Better application performance.

### Types of Caching

1. In-memory caching.
2. Distributed caching.
3. Browser caching.
4. CDN caching.
5. Database caching.
6. Application-level caching.

---

## 28. In-Memory Caching

In-memory caching stores data in the application's memory.

Example:

```javascript
const cache = new Map();

function getUser(id) {

    if (cache.has(id)) {

        console.log("Cache Hit");

        return cache.get(id);

    }

    console.log("Cache Miss");

    const user = {

        id,

        name: "John"

    };

    cache.set(id, user);

    return user;

}

console.log(getUser(1));

console.log(getUser(1));
```

The first call creates and stores the data.

The second call retrieves it from the cache.

### Problem with In-Memory Cache

Suppose you run three Node.js processes.

Each process has its own memory.

```text
       NODE.JS PROCESS 1
           CACHE A

       NODE.JS PROCESS 2
           CACHE B

       NODE.JS PROCESS 3
           CACHE C
```

The caches are not automatically synchronized.

This creates consistency problems.

A distributed cache can solve this problem.

---

# PART 13: REDIS

## 29. What Is Redis?

Redis is an in-memory data store commonly used for:

- Caching.
- Session storage.
- Rate limiting.
- Distributed locks.
- Pub/Sub messaging.
- Queues and background jobs.

Redis supports several data structures:

- Strings.
- Hashes.
- Lists.
- Sets.
- Sorted Sets.
- Streams.

### Why Is Redis Fast?

Redis primarily serves data from memory, avoiding many of the latency costs associated with traditional disk-based database reads.

Redis can also use persistence mechanisms to store data.

### Redis Architecture

```text
         NODE.JS APPLICATION
                  |
                  v
                 REDIS
                  |
          +-------+-------+
          |       |       |
          v       v       v
        CACHE  SESSION   QUEUE
```

### Install Redis Client

```bash
npm install redis
```

### Connect Node.js to Redis

```javascript
const { createClient } = require("redis");

const client = createClient({

    url: "redis://localhost:6379"

});

client.on("error", (error) => {

    console.error("Redis Error:", error);

});

async function connectRedis() {

    await client.connect();

    console.log("Redis connected");

}

connectRedis();
```

### Store Data

```javascript
await client.set("username", "John");
```

### Retrieve Data

```javascript
const username = await client.get("username");

console.log(username);
```

### Set Expiration

```javascript
await client.set("otp:123", "456789", {

    EX: 300

});
```

This stores the key for 300 seconds.

### Delete Data

```javascript
await client.del("username");
```

### Redis Hash

Redis hashes allow you to store multiple fields under one key.

```javascript
await client.hSet("user:1", {

    name: "John",

    email: "john@example.com",

    age: "25"

});
```

Retrieve:

```javascript
const user = await client.hGetAll("user:1");

console.log(user);
```

---

## 30. Implement Redis Caching in Express

Suppose you have a product API.

Without Redis:

```javascript
app.get("/products", async (req, res) => {

    const products = await Product.findAll();

    res.json(products);

});
```

Every request queries the database.

### With Redis

```javascript
app.get("/products", async (req, res, next) => {

    try {

        const cachedProducts = await client.get("products");

        if (cachedProducts) {

            return res.json({

                source: "cache",

                data: JSON.parse(cachedProducts)

            });

        }

        const products = await Product.findAll();

        await client.set(

            "products",

            JSON.stringify(products),

            {
                EX: 300
            }

        );

        res.json({

            source: "database",

            data: products

        });

    } catch (error) {

        next(error);

    }

});
```

### What Happens?

First request:

```text
Cache Miss
    |
    v
Database Query
    |
    v
Store in Redis
    |
    v
Response
```

Second request:

```text
Cache Hit
    |
    v
Retrieve from Redis
    |
    v
Response
```

### What Is Cache Invalidation?

Cache invalidation means removing or updating cached data when the original data changes.

Suppose a product price changes.

You should invalidate or update its cached representation.

Example:

```javascript
await Product.update(
    { price: 80000 },
    { where: { id: 1 } }
);

await client.del("products");
```

This ensures the next request fetches fresh data.

**Important:** Caching introduces consistency and invalidation challenges. Consider TTLs, cache keys, stale data policies, and invalidation strategies.

---

# PART 14: WEBSOCKETS

## 31. What Are WebSockets?

WebSockets provide a persistent, bidirectional communication channel between a client and server.

Traditional HTTP follows a request-response model.

The client sends a request, and the server sends a response.

WebSockets allow both sides to send messages independently after the connection is established.

### HTTP vs WebSocket

| HTTP | WebSocket |
|---|---|
| Request-response communication | Bidirectional communication |
| Typically separate requests | Persistent connection |
| Server normally responds to requests | Server can send messages independently |
| Suitable for REST APIs | Suitable for real-time applications |

### WebSocket Architecture

```text
          CLIENT
             |
             |
       WEBSOCKET CONNECTION
             |
             |
          SERVER
             |
       +-----+-----+
       |           |
       v           v
     SEND        RECEIVE
    MESSAGE      MESSAGE
```

### WebSocket Use Cases

- Chat applications.
- Live notifications.
- Multiplayer games.
- Live dashboards.
- Collaborative editing.
- Real-time tracking.
- Stock-price updates.

---

## 32. What Is the WebSocket Handshake?

A WebSocket connection usually starts with an HTTP request.

The client sends an upgrade request.

Example headers:

```http
GET /chat HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: ...
Sec-WebSocket-Version: 13
```

The server responds with:

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: ...
```

The connection is now upgraded to WebSocket.

### Important

WebSocket connections commonly start with an HTTP/1.1 upgrade handshake. WebSockets can also be established over HTTP/2 using the extended CONNECT mechanism.

---

## 33. Create a WebSocket Server Using ws

The `ws` package is a popular WebSocket implementation for Node.js.

### Install

```bash
npm install ws
```

### WebSocket Server

File: `server.js`

```javascript
const http = require("http");

const WebSocket = require("ws");

const server = http.createServer();

const wss = new WebSocket.Server({

    server

});

wss.on("connection", (socket) => {

    console.log("Client connected");

    socket.send("Welcome to WebSocket Server");

    socket.on("message", (message) => {

        console.log("Received:", message.toString());

        socket.send("Message received");

    });

    socket.on("close", () => {

        console.log("Client disconnected");

    });

});

server.listen(3000, () => {

    console.log("Server running on port 3000");

});
```

### WebSocket Client

You can test it in a browser.

```javascript
const socket = new WebSocket("ws://localhost:3000");

socket.onopen = () => {

    console.log("Connected");

    socket.send("Hello Server");

};

socket.onmessage = (event) => {

    console.log("Server:", event.data);

};

socket.onclose = () => {

    console.log("Disconnected");

};

socket.onerror = (error) => {

    console.error("WebSocket Error:", error);

};
```

### WebSocket Events

| Event | Meaning |
|---|---|
| `open` | Connection established |
| `message` | Message received |
| `close` | Connection closed |
| `error` | Connection error |

---

## 34. Broadcasting Messages

Suppose multiple clients are connected.

You want to send a message to all connected clients.

```javascript
wss.on("connection", (socket) => {

    socket.on("message", (message) => {

        wss.clients.forEach((client) => {

            if (client.readyState === WebSocket.OPEN) {

                client.send(message.toString());

            }

        });

    });

});
```

This broadcasts a message to every connected client.

### Production Security Considerations

- Authenticate WebSocket connections.
- Authorize access to individual rooms.
- Validate incoming messages.
- Restrict message sizes.
- Implement rate limiting.
- Use WSS in production.
- Handle disconnections.
- Consider heartbeat/ping-pong mechanisms.
- Avoid trusting client-supplied user IDs.

---

# PART 15: SOCKET.IO

## 35. What Is Socket.IO?

Socket.IO is a real-time communication library built around event-based communication.

It provides features such as:

- Automatic reconnection.
- Rooms.
- Namespaces.
- Event-based messaging.
- Broadcasting.
- A fallback transport mechanism when WebSocket is unavailable.

### WebSocket vs Socket.IO

| WebSocket | Socket.IO |
|---|---|
| Communication protocol/API | Communication library |
| Provides bidirectional communication | Provides higher-level real-time features |
| No built-in rooms | Supports rooms |
| No built-in automatic reconnection | Supports reconnection |
| No built-in event names | Supports event-based messaging |

**Important:** Socket.IO is not a WebSocket implementation that is directly wire-compatible with a plain WebSocket client. A Socket.IO client and server should communicate using the Socket.IO protocol.

### Install

```bash
npm install socket.io
```

### Socket.IO Server

```javascript
const http = require("http");

const { Server } = require("socket.io");

const server = http.createServer();

const io = new Server(server, {

    cors: {

        origin: "http://localhost:3000"

    }

});

io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    socket.on("sendMessage", (message) => {

        console.log(message);

        io.emit("receiveMessage", message);

    });

    socket.on("disconnect", () => {

        console.log("User disconnected");

    });

});

server.listen(4000);
```

### Socket.IO Client

```javascript
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

socket.on("connect", () => {

    console.log("Connected:", socket.id);

});

socket.emit("sendMessage", "Hello Server");

socket.on("receiveMessage", (message) => {

    console.log(message);

});
```

Install the client package:

```bash
npm install socket.io-client
```

### What Are Rooms?

Rooms allow you to group clients.

Example:

```javascript
socket.join("room-1");
```

Send a message to a room:

```javascript
io.to("room-1").emit(
    "receiveMessage",
    "Hello Room 1"
);
```

### What Are Namespaces?

Namespaces allow you to create separate communication channels within one Socket.IO server.

Example:

```javascript
const chatNamespace = io.of("/chat");

chatNamespace.on("connection", (socket) => {

    console.log("Chat user connected");

});
```

---

# PART 16: GRACEFUL SHUTDOWN

## 36. What Is Graceful Shutdown?

Graceful shutdown means stopping an application in a controlled way.

Instead of terminating the process immediately, the application:

1. Stops accepting new requests.
2. Allows existing requests to finish.
3. Closes database connections.
4. Closes Redis connections.
5. Closes background workers.
6. Exits the process.

### Why Is Graceful Shutdown Important?

Suppose your application is running on a production server.

A deployment starts and the old server needs to stop.

If the server terminates immediately, users may experience:

- Failed requests.
- Incomplete database operations.
- Interrupted uploads.
- Lost messages.
- Incomplete background jobs.

Graceful shutdown reduces these problems.

### Example

```javascript
const http = require("http");

const app = require("./app");

const server = http.createServer(app);

server.listen(3000, () => {

    console.log("Server started");

});

async function shutdown(signal) {

    console.log(`${signal} received`);

    server.close(async () => {

        try {

            // Close database connections here.

            // Close Redis connection here.

            console.log("Application shut down successfully");

            process.exitCode = 0;

        } catch (error) {

            console.error("Shutdown error:", error);

            process.exitCode = 1;

        }

    });

}

process.on("SIGTERM", () => {

    shutdown("SIGTERM");

});

process.on("SIGINT", () => {

    shutdown("SIGINT");

});
```

### What Is SIGTERM?

SIGTERM is a signal requesting a process to terminate.

It is commonly used by process managers and deployment platforms.

### What Is SIGINT?

SIGINT is an interrupt signal.

It is commonly generated when a user presses:

```text
Ctrl + C
```

### Important Production Improvements

A production shutdown handler should also:

- Prevent repeated shutdown execution.
- Set a shutdown timeout.
- Stop background workers.
- Stop accepting new application-level work.
- Close external connections.
- Handle long-running requests.
- Force termination after the timeout if necessary.

### What About uncaughtException?

An `uncaughtException` handler should not be used to pretend that the application can safely continue.

If an uncaught exception occurs:

1. Log the failure.
2. Stop accepting new requests.
3. Attempt controlled cleanup.
4. Exit the process.
5. Let the process manager restart it.

Likewise, do not silently ignore unhandled promise rejections.

---

# PART 17: PERFORMANCE OPTIMIZATION

## 37. How to Improve Node.js Performance?

Performance optimization means improving application speed, throughput, resource usage, and scalability.

### 1. Avoid Blocking the Event Loop

Bad:

```javascript
const fs = require("fs");

const data = fs.readFileSync("large.txt");
```

Better:

```javascript
const fs = require("fs/promises");

async function readFile() {

    const data = await fs.readFile("large.txt");

    return data;

}
```

For very large files, use streams instead of loading the entire file.

### 2. Use Caching

Cache frequently accessed data.

Example:

```text
Redis Cache
    |
    v
Reduce Database Queries
```

### 3. Use Database Indexes

Indexes improve query performance for suitable access patterns.

Example:

```sql
CREATE INDEX idx_users_email
ON users(email);
```

### 4. Use Connection Pooling

Instead of creating a new database connection for every request, use a connection pool.

Example:

```javascript
const mysql = require("mysql2/promise");

const pool = mysql.createPool({

    host: "localhost",

    user: "root",

    password: "",

    database: "test",

    waitForConnections: true,

    connectionLimit: 10,

    queueLimit: 0

});
```

### 5. Use Pagination

Avoid fetching thousands of records in a single request.

Example:

```sql
SELECT *
FROM products
LIMIT 20 OFFSET 0;
```

### 6. Use Compression

Compression reduces response size.

Install:

```bash
npm install compression
```

Use:

```javascript
const compression = require("compression");

app.use(compression());
```

Compression is particularly useful for suitable text-based responses.

### 7. Optimize JSON Responses

Avoid returning unnecessary fields.

Instead of returning the entire database record, select only required fields.

### 8. Use Worker Threads for CPU-Intensive Tasks

Move expensive calculations away from the main event loop.

### 9. Use Streams for Large Data

Avoid loading large files completely into memory.

### 10. Monitor Application Performance

Useful tools include:

- Node.js Inspector.
- Chrome DevTools.
- Clinic.js.
- `perf_hooks`.
- `process.memoryUsage()`.
- APM monitoring platforms.

---

## 38. What Is the Event Loop Lag?

Event loop lag is the delay between when the event loop is expected to process work and when it actually processes it.

A high event loop lag can indicate that the main JavaScript thread is busy.

Possible causes:

- CPU-intensive loops.
- Synchronous file operations.
- Expensive JSON processing.
- Large computations.
- Blocking native operations.

### Measure Event Loop Delay

Node.js provides `monitorEventLoopDelay()`.

```javascript
const {
    monitorEventLoopDelay
} = require("perf_hooks");

const histogram = monitorEventLoopDelay({

    resolution: 20

});

histogram.enable();

setInterval(() => {

    console.log({

        mean: histogram.mean / 1e6,

        max: histogram.max / 1e6,

        min: histogram.min / 1e6

    });

    histogram.reset();

}, 5000);
```

The measurements are in milliseconds after conversion from nanoseconds.

---

# PART 18: NODE.JS WORKER AND BACKGROUND JOBS

## 39. What Are Background Jobs?

A background job is a task that runs outside the immediate request-response flow.

Examples:

- Sending emails.
- Generating reports.
- Processing uploaded files.
- Sending notifications.
- Video conversion.
- Processing large Excel files.

### Why Use Background Jobs?

Suppose a user uploads a large Excel file.

Processing the file may take 30 seconds.

If the application waits for the entire process, the HTTP request remains open.

Instead, the application can:

1. Accept the upload.
2. Create a background job.
3. Return a job ID.
4. Process the file asynchronously.
5. Let the client check job status.

### Architecture

```text
             CLIENT
                |
                v
          EXPRESS API
                |
                v
           CREATE JOB
                |
                v
            REDIS QUEUE
                |
                v
          BACKGROUND WORKER
                |
         +------+------+
         |             |
         v             v
      PROCESS       DATABASE
         |
         v
       RESULT
```

### Popular Node.js Job Queue Libraries

- BullMQ.
- Bull.
- Agenda.

### BullMQ Example

Install:

```bash
npm install bullmq
```

Create a queue:

```javascript
const { Queue } = require("bullmq");

const emailQueue = new Queue("emailQueue", {

    connection: {

        host: "localhost",

        port: 6379

    }

});

async function addJob() {

    await emailQueue.add("sendWelcomeEmail", {

        email: "john@example.com",

        name: "John"

    });

}

addJob();
```

Create worker:

```javascript
const { Worker } = require("bullmq");

const worker = new Worker(

    "emailQueue",

    async (job) => {

        console.log("Processing:", job.name);

        console.log("Email:", job.data.email);

        // Send email here.

    },

    {

        connection: {

            host: "localhost",

            port: 6379

        }

    }

);

worker.on("completed", (job) => {

    console.log(`Job ${job.id} completed`);

});

worker.on("failed", (job, error) => {

    console.error(`Job failed: ${error.message}`);

});
```

### Important Background Job Concepts

| Concept | Meaning |
|---|---|
| Queue | Stores pending jobs |
| Producer | Creates jobs |
| Consumer/Worker | Processes jobs |
| Retry | Attempts failed jobs again |
| Delay | Runs a job after a specified time |
| Concurrency | Number of jobs processed simultaneously |
| Job ID | Unique job identifier |
| Dead-letter queue | Holds jobs that cannot be successfully processed |

For production, configure retries, backoff, concurrency, idempotency, monitoring, and graceful worker shutdown.

---

# PART 19: IMPORTANT NODE.JS MODULES

## 40. Advanced Module Reference

| Module | Purpose |
|---|---|
| `events` | Event-driven programming |
| `stream` | Stream processing |
| `buffer` | Binary data |
| `child_process` | Create child processes |
| `worker_threads` | Multithreaded JavaScript |
| `cluster` | Multiple Node.js processes |
| `os` | Operating system information |
| `process` | Current process management |
| `perf_hooks` | Performance measurement |
| `v8` | V8 engine utilities |
| `inspector` | Debugging and profiling |
| `zlib` | Compression |
| `crypto` | Cryptographic operations |
| `net` | TCP networking |
| `tls` | TLS communication |
| `dgram` | UDP networking |

---

# PART 20: COMMON INTERVIEW QUESTIONS

## 41. Advanced Node.js Interview Questions

### Q1. What is V8?

V8 is Google's JavaScript engine used by Node.js to parse, compile, execute, and optimize JavaScript.

### Q2. What is Libuv?

Libuv is a C library that provides Node.js with an event loop, asynchronous I/O support, and a thread pool.

### Q3. What is EventEmitter?

EventEmitter is a Node.js class that allows objects to emit events and register event listeners.

### Q4. Is EventEmitter asynchronous?

No. EventEmitter listeners execute synchronously by default.

### Q5. What are Streams?

Streams are interfaces for processing data incrementally rather than loading the entire resource into memory.

### Q6. What are the four types of streams?

Readable, Writable, Duplex, and Transform.

### Q7. What is a Readable Stream?

A stream from which data can be read.

### Q8. What is a Writable Stream?

A stream to which data can be written.

### Q9. What is a Duplex Stream?

A stream that supports both reading and writing.

### Q10. What is a Transform Stream?

A Duplex Stream that transforms data while passing it through.

### Q11. What is pipe()?

It connects a Readable Stream to a Writable Stream.

### Q12. What is pipeline()?

It connects streams and provides centralized error handling and completion notification.

### Q13. What is Backpressure?

Backpressure occurs when a destination cannot consume data as quickly as the source produces it.

### Q14. What is a Buffer?

A Buffer represents a sequence of bytes and is used for binary data.

### Q15. What is the difference between Buffer and Stream?

A Buffer represents bytes in memory, whereas a Stream processes data incrementally over time.

### Q16. What is a Child Process?

A separate operating-system process created by another process.

### Q17. What is exec()?

It executes a command through a shell and buffers its output.

### Q18. What is spawn()?

It starts a child process and exposes its standard input, output, and error streams.

### Q19. What is fork()?

It starts a Node.js child process with an IPC communication channel.

### Q20. What is IPC?

Inter-Process Communication allows separate processes to exchange information.

### Q21. What are Worker Threads?

Worker Threads allow JavaScript code to execute in separate threads.

### Q22. Why do we need Worker Threads?

They help run CPU-intensive JavaScript operations without blocking the main event loop.

### Q23. What is Clustering?

Clustering allows multiple Node.js processes to run and handle server requests.

### Q24. What is the difference between Worker Threads and Cluster?

Worker Threads use multiple threads within one process, whereas Cluster uses multiple independent processes.

### Q25. What is Garbage Collection?

Garbage Collection automatically reclaims memory that is no longer reachable.

### Q26. What is a Memory Leak?

A memory leak occurs when unnecessary references prevent unused memory from being reclaimed.

### Q27. What is Caching?

Caching stores frequently accessed data temporarily for faster retrieval.

### Q28. What is Redis?

Redis is an in-memory data store commonly used for caching, session storage, queues, and messaging.

### Q29. What is Cache Invalidation?

Cache invalidation is the process of removing or updating cached data when the original data changes.

### Q30. What are WebSockets?

WebSockets provide persistent, bidirectional communication between clients and servers.

### Q31. What is the difference between HTTP and WebSockets?

HTTP primarily follows request-response communication, whereas WebSockets support bidirectional communication over a persistent connection.

### Q32. What is Socket.IO?

Socket.IO is a real-time communication library providing features such as rooms, namespaces, events, and automatic reconnection.

### Q33. What is Graceful Shutdown?

Graceful shutdown stops an application in a controlled way while allowing ongoing work and resources to be handled properly.

### Q34. What is Event Loop Lag?

It is the delay in processing event-loop work, often caused by blocking or CPU-intensive operations.

### Q35. What are Background Jobs?

Background jobs are tasks processed outside the immediate HTTP request-response flow.

---

# PART 21: PHASE 13 CHEAT SHEET

### EventEmitter

```javascript
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("event", () => {

    console.log("Event executed");

});

emitter.emit("event");
```

### Readable Stream

```javascript
const fs = require("fs");

const stream = fs.createReadStream("input.txt");

stream.on("data", (chunk) => {

    console.log(chunk);

});
```

### Writable Stream

```javascript
const fs = require("fs");

const stream = fs.createWriteStream("output.txt");

stream.write("Hello");

stream.end();
```

### Transform Stream

```javascript
const { Transform } = require("stream");

const transform = new Transform({

    transform(chunk, encoding, callback) {

        callback(null, chunk.toString().toUpperCase());

    }

});
```

### Pipeline

```javascript
const { pipeline } = require("stream/promises");
```

### Buffer

```javascript
const buffer = Buffer.from("Hello");

console.log(buffer.toString());
```

### Child Process

```javascript
const { spawn } = require("child_process");

const child = spawn("node", ["-v"]);
```

### Worker Threads

```javascript
const { Worker } = require("worker_threads");

const worker = new Worker("./worker.js");
```

### Cluster

```javascript
const cluster = require("cluster");

if (cluster.isPrimary) {

    cluster.fork();

}
```

### Memory Usage

```javascript
console.log(process.memoryUsage());
```

### Redis

```javascript
await client.set("name", "John");

const name = await client.get("name");
```

### WebSocket

```javascript
const WebSocket = require("ws");

const socket = new WebSocket("ws://localhost:3000");
```

### Graceful Shutdown

```javascript
process.on("SIGTERM", () => {

    server.close();

});
```

---

# PART 22: PRACTICAL PROJECTS

You should build these projects to understand Phase 13 properly.

| Project | Concepts |
|---|---|
| Event-Based Notification System | EventEmitter |
| Large File Reader | Readable Streams |
| File Copy Utility | Readable + Writable Streams |
| File Compression Tool | Transform Streams + zlib |
| Video Processing Tool | Child Processes + FFmpeg |
| CPU Calculator | Worker Threads |
| Multi-Core HTTP Server | Cluster |
| Memory Monitoring Tool | process + perf_hooks |
| Redis Cache API | Redis + Express |
| Real-Time Chat Application | WebSockets / Socket.IO |
| Background Email Queue | BullMQ + Redis |
| Graceful Server Shutdown | Process Management |

---

# PART 23: PHASE 13 COMPLETION CHECKLIST

Before moving to Phase 14, make sure you can:

- [ ] Explain Node.js architecture.
- [ ] Explain the V8 engine.
- [ ] Understand Libuv.
- [ ] Understand EventEmitter.
- [ ] Create and emit custom events.
- [ ] Understand Readable Streams.
- [ ] Understand Writable Streams.
- [ ] Understand Duplex Streams.
- [ ] Understand Transform Streams.
- [ ] Use `pipe()`.
- [ ] Use `pipeline()`.
- [ ] Understand backpressure.
- [ ] Create and manipulate Buffers.
- [ ] Understand binary data.
- [ ] Create child processes.
- [ ] Understand `exec()`.
- [ ] Understand `spawn()`.
- [ ] Understand `fork()`.
- [ ] Understand IPC.
- [ ] Create Worker Threads.
- [ ] Understand clustering.
- [ ] Understand process management.
- [ ] Understand memory management.
- [ ] Understand garbage collection.
- [ ] Identify memory leaks.
- [ ] Implement in-memory caching.
- [ ] Understand Redis.
- [ ] Implement Redis caching.
- [ ] Understand WebSockets.
- [ ] Understand Socket.IO.
- [ ] Implement graceful shutdown.
- [ ] Understand performance optimization.
- [ ] Implement background jobs.

---

# What Comes Next?

## PHASE 14: Testing, Performance & Deployment

In Phase 14, we will learn how to test, debug, monitor, optimize, and deploy Node.js applications.

Topics:

1. Software Testing Fundamentals.
2. Unit Testing.
3. Integration Testing.
4. End-to-End Testing.
5. Jest.
6. Node.js Built-in Test Runner.
7. Supertest.
8. Mocking and Spying.
9. Test Coverage.
10. API Testing.
11. Debugging Node.js.
12. Node.js Inspector.
13. Chrome DevTools.
14. Performance Profiling.
15. Load Testing.
16. Stress Testing.
17. Artillery.
18. Autocannon.
19. PM2.
20. Docker.
21. Docker Compose.
22. Nginx.
23. Reverse Proxy.
24. Environment Configuration.
25. CI/CD.
26. GitHub Actions.
27. AWS Deployment.
28. VPS Deployment.
29. Production Monitoring.
30. Production Deployment Checklist.

**Key takeaway from Phase 13:** Streams help process large data efficiently, Worker Threads help with CPU-intensive JavaScript, clustering helps scale across CPU cores, Redis improves data access, and WebSockets enable real-time communication. Understanding when to use each feature is essential for building scalable Node.js applications.