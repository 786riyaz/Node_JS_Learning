**Child Processes**

Used to run code **outside Node's main thread**.

Because Node.js is single-threaded, heavy tasks block the event loop → child processes avoid that.

---
## (A) **exec()**
Runs shell commands - buffers the output.

```js
const { exec } = require("child_process");

exec("ls", (err, stdout) => {
  console.log(stdout);
});
```

Good for:
* quick shell commands
* small outputs
---
## (B) **spawn()**
Used for long-running processes.

```js
const { spawn } = require("child_process");

const child = spawn("ping", ["google.com"]);

child.stdout.on("data", data => {
  console.log(data.toString());
});
```

Advantages:
* streaming output
* memory efficient
---
## (C) **fork()**
Used to run another Node.js script as a **separate process**

```js
const { fork } = require("child_process");

const worker = fork("./worker.js");
worker.send("start");
```

Used for:
* CPU intensive tasks
* JSON parsing
* Image processing
* Cryptography