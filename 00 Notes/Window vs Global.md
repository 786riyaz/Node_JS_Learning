## 1️⃣ What is `window`?

### Definition

> **`window`** is the **global object in the browser environment**.

It represents:

* The browser window/tab
* The global scope for browser JavaScript
* Access point to browser APIs

### Available Only In

✅ Browsers
❌ Node.js

### Examples

```js
window.alert("Hello");
window.document.getElementById("app");
window.setTimeout(() => {}, 1000);
```

In browsers:

```js
var x = 10;
console.log(window.x); // 10
```

---

## 2️⃣ What is `global`?

### Definition

> **`global`** is the **global object in Node.js**.

It represents:

* The Node.js runtime environment
* Access point to Node-specific APIs

### Available Only In

❌ Browsers
✅ Node.js

### Examples

```js
global.setTimeout(() => {}, 1000);
global.process.pid;
global.Buffer.from("hello");
```

In Node:

```js
global.x = 10;
console.log(x); // 10
```

---

## 3️⃣ Why They Are Different

Because **Node.js is not a browser**:

| Browser     | Node.js |   |
| ----------- | ------- | - |
| UI          | No UI   |   |
| DOM         | No DOM  |   |
| `window`    | ❌       |   |
| `global`    | ❌       |   |
| File system | ❌       | ✅ |

Each environment defines its **own global object** based on its responsibilities.

---

## 4️⃣ The Universal Global: `globalThis`

### Problem

Different environments → different global objects

### Solution (ES2020)

```js
globalThis
```

### Works Everywhere

* Browser → `globalThis === window`
* Node → `globalThis === global`

### Example

```js
globalThis.setTimeout(() => {
  console.log("works everywhere");
}, 1000);
```

✔️ Environment-agnostic
✔️ Recommended for shared code

---

## 5️⃣ Scope Behavior Differences (Important)

### Browser

```js
var a = 10;
let b = 20;

console.log(window.a); // 10
console.log(window.b); // undefined
```

### Node.js

```js
var a = 10;
let b = 20;

console.log(global.a); // undefined
```

📌 In Node, `var` does **not** attach to `global` at top level (module scope).

---

## 6️⃣ Key Differences Summary

| Feature               | window          | global       |
| --------------------- | --------------- | ------------ |
| Environment           | Browser         | Node.js      |
| Represents            | Browser window  | Node runtime |
| DOM access            | ✅               | ❌            |
| OS access             | ❌               | ✅            |
| Global scope          | Browser scripts | Node runtime |
| Standardized          | ❌               | ❌            |
| Universal alternative | ❌               | `globalThis` |

---

## 7️⃣ Interview-Perfect Answer

> `window` is the global object in browsers and provides access to DOM and browser APIs, while `global` is the global object in Node.js and provides access to Node runtime APIs. They are different because they run in completely different environments.

---

## 8️⃣ One-Line Summary

> `window` exists in browsers, `global` exists in Node.js, and `globalThis` works in both.

---

## 9️⃣ Common Interview Follow-Up (Be Ready)

**Q: Why does `document` exist on `window` but not on `global`?**
**A:** Because `document` is part of the browser’s DOM API, and Node.js has no DOM.

---

If you want, I can next explain:

* `this` at global level (browser vs Node)
* Why top-level `this` is `{}` in Node
* Module scope vs global scope
* How bundlers handle `window` and `global`
