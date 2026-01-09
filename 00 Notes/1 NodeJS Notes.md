# 📘 Node.js Revision Notes

---

## 🔍 Check Installed Versions

```bash
node -v
npm -v
```

---

## 📦 Initialize a Node.js Project

```bash
npm init
```

This command creates a `package.json` file to manage project metadata and dependencies.

---

## 🧩 Node.js Modules Overview

### Core Modules

Built-in modules provided by Node.js:

* `console`
* `fs`
* `http`
* `buffer`

### Global Objects / Modules

Available without importing:

* `__dirname`
* `__filename`

---

## 📁 Module Export & Import Example

### `data.js`

```js
module.exports = {
  x: 1,
  y: 2
};
```

### `index.js`

```js
const data = require('./data');

console.log(data.x);
```

---

## 📄 Package Files

* `package.json` – Project metadata and dependencies
* `package-lock.json` – Exact dependency tree and versions

---

## 🔄 Nodemon Installation

```bash
npm i nodemon
npm install nodemon
npm i nodemon -g
npm install -g nodemon
```

* Local install: project-specific
* Global install (`-g`): available system-wide

---

## 📂 File System (`fs`) Module

### Import `fs`

```js
const fs = require('fs');
```

---

### Write a File (Sync)

```js
fs.writeFileSync("Hello.txt", "Hello");
```

---

### Read Directory

```js
fs.readdir(dirPath, (err, files) => {
  console.log(JSON.stringify(files));
});
```

---

### Read File (Buffer Output)

```js
fs.readFile(filePath, (err, item) => {
  console.log(item);
});
```

---

### Read File (UTF-8 Text)

```js
fs.readFile(filePath, 'utf-8', (err, item) => {
  console.log(item);
});
```

---

### Append Data to File

```js
fs.appendFile(filePath, "\nNew Line", (err) => {
  if (!err) console.log("File Updated");
});
```

---

### Rename File

```js
fs.rename(filePath, `${dirPath}/NewName.txt`, (err) => {
  if (!err) console.log("File Renamed");
});
```

---

### Delete File (Sync)

```js
fs.unlinkSync(filePath);
```

---

## 🌐 HTTP Module

### Basic HTTP Server

```js
const http = require('http');

http.createServer((req, res) => {
  res.write("<h1>Hello World</h1>");
  res.end();
}).listen(786);
```

---

### HTTP Server Using Function Reference

```js
http.createServer(createResponse).listen(786);

function createResponse(req, res) {
  res.writeHead(200, { 'content-type': 'application/json' });
  res.write(JSON.stringify(data));
  res.end();
}
```

---

## 🧠 Command Line Arguments

```js
const filePath = process.argv[2];
```

* `process.argv` stores command-line arguments
* Index `2` refers to the first custom argument

---

## 🔐 JWT (JSON Web Token)

```
JWT = Header + Payload + Signature
```

* **Header**: Algorithm & token type
* **Payload**: User data / claims
* **Signature**: Verification & integrity