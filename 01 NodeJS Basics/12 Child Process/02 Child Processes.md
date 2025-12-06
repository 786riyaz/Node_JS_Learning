# ⭐ **Child Processes in Node.js (Deep Explanation)**

Node.js runs on a **single main thread** → meaning **CPU-heavy or blocking tasks freeze the event loop** and slow down your app.

To avoid blocking, Node provides the **child_process** module which allows us to run tasks **in separate OS processes**.

Child processes run **in parallel** with the main Node.js process.

---

# 1️⃣ **exec() – Executes Shell Commands (Buffers Output)**

### ✔ What happens internally?

* `exec()` **spawns a shell** (like bash, cmd, PowerShell)
* Executes the command **inside that shell**
* **Captures entire output in a buffer**
* Returns everything at once in a callback

### ✔ Syntax

```js
exec(command, callback)
```

### ✔ Example

```js
const { exec } = require("child_process");

exec("ls -la", (err, stdout, stderr) => {
  if (err) console.error(err);
  console.log(stdout);
});
```

### ✔ Best Use Cases

| Use Case                               | Why?                  |
| -------------------------------------- | --------------------- |
| Running short shell commands           | Output is small       |
| git, ls, mkdir, rm, curl, npm commands | These are shell tasks |
| Automation scripts                     | exec works like bash  |

### ✔ Limitations

❌ Output is **stored in memory** → For large output → **crashes**
❌ Not suitable for long running processes.

### ✔ Interview Question

**Q: Why shouldn't we use exec() for large logs?**
✔ Because `exec()` buffers output in memory → if output is too large, it causes memory overflow.

---

# 2️⃣ **spawn() – Streams Output (Best for Long Tasks)**

### ✔ Internal Working

* Does **NOT** run inside a shell (unless shell: true)
* Output is **streamed**:

  * `stdout` gives chunks of data
  * No buffering → memory efficient

### ✔ Syntax

```js
const child = spawn(cmd, args, options)
```

### ✔ Example: Ping command

```js
const { spawn } = require("child_process");

const child = spawn("ping", ["google.com"]);

child.stdout.on("data", (data) => {
  console.log("OUTPUT:", data.toString());   // streaming
});
```

### ✔ Best Use Cases

| Use Case                                       | Why                              |
| ---------------------------------------------- | -------------------------------- |
| Streaming large logs                           | No buffer                        |
| Long-running tasks (ping, ffmpeg, compression) | Keeps running                    |
| Child process communication                    | Streaming supported              |
| Real-time outputs                              | Example: video encoding progress |

### ✔ Limitations

❌ Harder to use than `exec`
❌ You must manually handle data streams

### ✔ Interview Question

**Q: When should you use spawn over exec?**
✔ When output is large or continuous → streaming avoids memory issues.

---

# 3️⃣ **fork() – Special Case for Node.js Scripts (IPC Enabled)**

`fork()` is just like spawn(), **but designed only for Node.js files**.

### ✔ Internal Working

* Runs another Node process
* Creates a special channel called **IPC (Inter-Process Communication)**
* Parent and child can send messages using `.send()`
* Used for dividing heavy logic into worker processes

### ✔ Example

### Parent

```js
const { fork } = require("child_process");

const worker = fork("./worker.js");

worker.on("message", msg => {
  console.log("From worker:", msg);
});

worker.send({ task: "calculate" });
```

### worker.js

```js
process.on("message", msg => {
  if (msg.task === "calculate") {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) sum += i;
    process.send(sum);
  }
});
```

### ✔ Best Use Cases

| Use Case                     | Why?                        |
| ---------------------------- | --------------------------- |
| CPU-heavy tasks              | Offloads to another process |
| Image processing             | Heavy CPU                   |
| JSON parsing                 | Large JSON blocks           |
| Encryption, hashing          | CPU bound                   |
| Dedicated background workers | Independent node processes  |

### ✔ Limitations

❌ Overhead of creating new Node process
❌ More complex communication via message passing
❌ Not for shell commands (only Node scripts)

### ✔ Common Interview Question

**Q: Why use fork() instead of worker_threads?**
✔ fork() = separate **process** (different memory)
✔ worker_threads = separate **thread** (shared memory)

Fork is safer when:

* Memory isolation is required
* Crashes in worker shouldn't affect main thread

---

# 🔥 **Comparing exec vs spawn vs fork**

| Feature               | exec()        | spawn()                | fork()             |
| --------------------- | ------------- | ---------------------- | ------------------ |
| Runs shell commands   | ✔             | (No) unless shell=true | ❌                  |
| Output type           | Buffered      | Streaming              | Messaging          |
| Best for              | small tasks   | long-running tasks     | heavy CPU tasks    |
| Memory usage          | High (buffer) | Low                    | Medium             |
| Communication         | Callback      | Streams                | IPC (send/receive) |
| Executes Node scripts | ❌             | ✔                      | ✔ (optimized)      |

---

# 🧠 **Real-life Example Differences**

### ✔ exec()

Run a Git command:

```js
exec("git status", ...)
```

### ✔ spawn()

Process a 1GB log file:

```js
spawn("grep", ["error", "bigfile.log"]);
```

### ✔ fork()

Offload expensive calculations:

```js
fork("cpuTask.js")
```

---

# 🎯 **Interview-Level Questions & Answers**
### 1. **Why Node needs child processes?**
✔ Node is single-threaded
✔ CPU tasks block the event loop
✔ Child processes run in parallel → non-blocking

---

### 2. **What is IPC and why used in fork()?**
✔ IPC = Inter Process Communication
✔ Enables sending JSON/messages between processes
✔ Used to send tasks/results between main process & worker

---

### 3. **Can child processes share memory?*
✔ No → they have **separate memory**
✔ Only communication is through messaging

---

### 4. **Difference between spawn and spawn with shell:true?**
* spawn → runs native program
* spawn with shell:true → behaves like exec

---

### 5. **Which method to use for real-time output?**
✔ spawn()

---

### 6. **Which method to use for heavy CPU calculation?**
✔ fork()