## 1️⃣ What Is the Event Loop?

> The **event loop** is the mechanism that allows Node.js to handle asynchronous operations by offloading work and executing callbacks in a defined sequence of phases.

Node.js uses **libuv** to implement the event loop.

---

## 2️⃣ Node.js Event Loop Phases (In Order)

```
┌─────────────┐
│   Timers    │  → setTimeout, setInterval
└─────────────┘
        ↓
┌────────────────────┐
│ Pending Callbacks  │  → Deferred I/O callbacks
└────────────────────┘
        ↓
┌────────────────────┐
│ Idle / Prepare     │  → Internal use
└────────────────────┘
        ↓
┌─────────────┐
│    Poll     │  → I/O callbacks (fs, net)
└─────────────┘
        ↓
┌─────────────┐
│    Check    │  → setImmediate
└─────────────┘
        ↓
┌──────────────────┐
│ Close Callbacks  │  → cleanup (socket.close)
└──────────────────┘
```

---

## 3️⃣ Phase-by-Phase Explanation

### 1. **Timers Phase**

* Executes callbacks scheduled by:

  * `setTimeout`
  * `setInterval`
* Runs callbacks whose delay has **expired**

```js
setTimeout(() => console.log("timer"), 0);
```

---

### 2. **Pending Callbacks Phase**

* Executes **deferred system-level callbacks**
* Examples:

  * TCP errors
  * Some OS-level operations

(Not commonly used directly in user code)

---

### 3. **Idle / Prepare Phase**

* Used internally by Node.js
* Prepares for poll phase
* No user-accessible callbacks

---

### 4. **Poll Phase (Most Important)**

* Executes **I/O callbacks**
* Examples:

  * `fs.readFile`
  * Network requests
* If poll queue is empty:

  * Waits for new I/O
  * Or moves to `check` if `setImmediate` exists

```js
fs.readFile("file.txt", () => {
  console.log("file read");
});
```

---

### 5. **Check Phase**

* Executes callbacks scheduled by:

  * `setImmediate`

```js
setImmediate(() => console.log("immediate"));
```

---

### 6. **Close Callbacks Phase**

* Executes cleanup callbacks
* Examples:

  * `socket.on("close")`
  * `process.on("exit")`

---

## 4️⃣ Microtasks (Not a Phase, but Critical)

Microtasks run:

* **After each phase**
* **Before moving to the next phase**

### Microtask Queue Order

1. `process.nextTick`
2. Promise callbacks (`then`, `catch`)
3. `queueMicrotask`

```js
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("promise"));
```

---

## 5️⃣ Full Execution Order (Simplified)

```
Synchronous code
↓
process.nextTick
↓
Promise microtasks
↓
Timers phase
↓
Microtasks
↓
Pending callbacks
↓
Microtasks
↓
Poll phase
↓
Microtasks
↓
Check phase
↓
Microtasks
↓
Close callbacks
↓
Microtasks
```

---

## 6️⃣ Interview-Favorite Example

```js
setTimeout(() => console.log("timeout"), 0);
setImmediate(() => console.log("immediate"));
```

### Output

* **Non-deterministic** at top-level
* **Deterministic inside I/O**

---

## 7️⃣ Common Interview Mistakes

❌ Saying microtasks are a phase
❌ Saying `setImmediate` runs before timers always
❌ Ignoring `process.nextTick` priority

---

## 8️⃣ One-Line Interview Answer

> The Node.js event loop consists of timers, pending callbacks, idle/prepare, poll, check, and close callback phases, with microtasks executed between each phase.

---

## 9️⃣ Key Takeaways

* Event loop is **phase-based**
* `setImmediate` runs in **check phase**
* Timers are **not guaranteed exact timing**
* Microtasks have **higher priority than macrotasks**
* `process.nextTick` runs **before everything else**

---

If you want, I can:

* Solve complex event-loop output questions
* Explain browser vs Node event loop differences
* Draw memory + event loop diagrams
* Explain libuv internals
