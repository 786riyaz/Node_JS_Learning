# PHASE 03: Node.js Core Modules

**Level:** Beginner to Intermediate  
**Goal:** Understand Node.js modules, how code is organized into reusable files, and how to use Node.js built-in modules.

In this phase, we will learn how Node.js handles modules and how to work with its built-in functionality.

## Topics Covered

1. Introduction to Modules
2. CommonJS Module System
3. require()
4. module.exports
5. exports
6. ES Modules
7. import and export
8. CommonJS vs ES Modules
9. Module Caching
10. Module Resolution
11. Creating Custom Modules
12. Node.js Core Modules Overview
13. Practical Projects
14. Interview Questions

---

# SECTION 1: INTRODUCTION TO MODULES

## 1. What is a Module?

**Definition:**

A module is a reusable and independent piece of code that contains related functionality and can be imported into other parts of an application.

Modules help developers organize code into smaller, manageable, and reusable files.

### Why Do We Need Modules?

Imagine you are building an application containing:

- User Management.
- Authentication.
- Payment Processing.
- Product Management.
- Database Operations.

If you write everything inside one JavaScript file, the code becomes difficult to maintain.

**Without Modules:**

```text
project/
│
└── index.js
```

All application logic exists inside one file.

**With Modules:**

```text
project/
│
├── index.js
│
├── modules/
│   ├── user.js
│   ├── auth.js
│   ├── payment.js
│   └── product.js
│
└── database/
    └── connection.js
```

Now each file handles a specific responsibility.

### Benefits of Modules

1. Code reusability.
2. Better code organization.
3. Easier maintenance.
4. Separation of concerns.
5. Improved readability.
6. Easier testing.
7. Better scalability.

---

## 2. Types of Modules in Node.js

Node.js applications commonly use three categories of modules.

### 2.1 Core Modules

Core Modules are built-in modules provided by Node.js.

You don't need to install them using NPM.

Examples:

```javascript
const fs = require("fs");
const path = require("path");
const http = require("http");
const os = require("os");
```

### 2.2 Local Modules

Local Modules are modules created by developers within their own projects.

Example:

```javascript
const calculator = require("./calculator");
```

Here, `calculator.js` is a local module.

### 2.3 Third-Party Modules

Third-party modules are packages developed and published by external developers or organizations.

You generally install them using NPM.

Examples:

```bash
npm install express
npm install mongoose
npm install dotenv
```

Usage:

```javascript
const express = require("express");
const mongoose = require("mongoose");
```

### Comparison

| Module Type | Description | Example |
|---|---|---|
| Core | Built into Node.js | fs, path, http |
| Local | Created within your project | calculator.js |
| Third-party | Installed through NPM | express, mongoose |

---

# SECTION 2: COMMONJS MODULE SYSTEM

## 3. What is CommonJS?

**Definition:**

CommonJS is a module system used by Node.js that provides a way to export and import functionality between JavaScript files.

It uses:

- `require()` to import modules.
- `module.exports` to export modules.

CommonJS is widely used in existing Node.js applications.

### Example

Project structure:

```text
project/
│
├── index.js
└── calculator.js
```

**calculator.js**

```javascript
function add(a, b) {
    return a + b;
}

module.exports = add;
```

**index.js**

```javascript
const add = require("./calculator");

console.log(add(10, 20));
```

Output:

```text
30
```

### How Does It Work?

1. `calculator.js` defines an `add()` function.
2. `module.exports` makes the function available outside that module.
3. `require("./calculator")` loads the module.
4. The imported function is assigned to `add`.
5. The function is executed.

---

## 4. What is require()?

**Definition:**

`require()` is a CommonJS function used to load modules into a JavaScript file.

It can load:

- Core Modules.
- Local Modules.
- Third-party Modules.

### 4.1 Importing Core Modules

```javascript
const fs = require("fs");

const path = require("path");

const os = require("os");
```

### 4.2 Importing Local Modules

```javascript
const calculator = require("./calculator");
```

Here:

- `./` means the current directory.
- `calculator` identifies the local module.

### 4.3 Importing Third-Party Modules

```javascript
const express = require("express");
```

Node.js resolves Express using its module resolution rules.

### 4.4 Importing Multiple Modules

```javascript
const fs = require("fs");

const path = require("path");

const http = require("http");
```

### Important Points

- `require()` is used by CommonJS.
- It returns the exported value of a module.
- CommonJS modules are cached after their first successful load.
- `require()` normally resolves and loads modules synchronously.

---

## 5. What is module.exports?

**Definition:**

`module.exports` is an object used by CommonJS modules to specify what value should be returned when another module imports them using `require()`.

In simple terms, it determines what a module exposes to other files.

### Example 1: Exporting a Function

**calculator.js**

```javascript
function add(a, b) {
    return a + b;
}

module.exports = add;
```

**index.js**

```javascript
const add = require("./calculator");

console.log(add(10, 20));
```

Output:

```text
30
```

### Example 2: Exporting Multiple Functions

**calculator.js**

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

**index.js**

```javascript
const calculator = require("./calculator");

console.log(calculator.add(10, 5));

console.log(calculator.subtract(10, 5));

console.log(calculator.multiply(10, 5));
```

Output:

```text
15
5
50
```

### Example 3: Destructuring Imported Functions

Instead of writing:

```javascript
const calculator = require("./calculator");

console.log(calculator.add(10, 5));
```

You can write:

```javascript
const {
    add,
    subtract,
    multiply
} = require("./calculator");

console.log(add(10, 5));

console.log(subtract(10, 5));

console.log(multiply(10, 5));
```

This is object destructuring.

---

## 6. What is exports?

**Definition:**

`exports` is a reference to the initial `module.exports` object in a CommonJS module.

It provides a shorthand way to add properties to the exported object.

### Example

**calculator.js**

```javascript
exports.add = function (a, b) {
    return a + b;
};

exports.subtract = function (a, b) {
    return a - b;
};
```

**index.js**

```javascript
const calculator = require("./calculator");

console.log(calculator.add(10, 20));

console.log(calculator.subtract(20, 10));
```

Output:

```text
30
10
```

### Important: exports vs module.exports

Initially:

```javascript
exports === module.exports
```

Both refer to the same object.

Therefore:

```javascript
exports.add = function () {
    return 10;
};
```

Works because you are adding a property to the shared object.

However, consider:

```javascript
exports = function () {
    return 10;
};
```

This does not change `module.exports`.

Why?

Because you are only reassigning the local `exports` variable.

The original `module.exports` remains unchanged.

### Correct Way to Export a Single Function

```javascript
module.exports = function () {
    return 10;
};
```

### Comparison

| exports | module.exports |
|---|---|
| Initially references module.exports | Actual exported value |
| Useful for adding properties | Can export objects, functions, classes, etc. |
| Reassigning it breaks the original reference | Reassigning it changes the exported value |

**Remember:**

Use `module.exports` when replacing the complete exported value.

Use `exports` when adding properties to the existing exported object.

---

## 7. What is the module Object?

**Definition:**

In CommonJS, `module` is an object that represents the current module.

Node.js provides it to every CommonJS module.

Example:

```javascript
console.log(module);
```

It contains information about the current module.

### Important Properties

| Property | Description |
|---|---|
| module.exports | Value exported by the module |
| module.id | Identifier of the module |
| module.filename | Absolute filename of the module |
| module.loaded | Indicates whether the module has finished loading |
| module.parent | Parent module reference in older module APIs |
| module.children | Child modules loaded by the module |

Some of these properties are legacy-oriented or subject to version-specific behavior.

### Example

```javascript
console.log(module.filename);

console.log(module.id);

console.log(module.loaded);

console.log(module.exports);
```

### What is `__filename`?

`__filename` is a CommonJS wrapper-provided variable containing the absolute path of the current module file.

Example:

```javascript
console.log(__filename);
```

Possible output:

```text
D:\Projects\node-app\index.js
```

### What is `__dirname`?

`__dirname` is a CommonJS wrapper-provided variable containing the absolute directory path of the current module.

Example:

```javascript
console.log(__dirname);
```

Possible output:

```text
D:\Projects\node-app
```

### Difference

| __filename | __dirname |
|---|---|
| Full file path | Directory path |
| Includes filename | Does not include filename |
| Example: `D:/app/index.js` | Example: `D:/app` |

**Important:** `__filename` and `__dirname` are not automatically available as globals in ES Modules.

---

# SECTION 3: ES MODULES

## 8. What are ES Modules?

**Definition:**

ES Modules (ECMAScript Modules or ESM) are the official JavaScript module system that provides standardized syntax for importing and exporting functionality between JavaScript files.

They use:

- `export` to expose functionality.
- `import` to load functionality.

Node.js supports both CommonJS and ES Modules.

### Why Were ES Modules Introduced?

JavaScript initially lacked a standardized built-in module system.

Different environments and tools developed different module systems.

For example:

- CommonJS for Node.js.
- AMD for browser applications.
- Other module-loading approaches.

ECMAScript Modules introduced a standardized module system for JavaScript.

### Example

**calculator.js**

```javascript
export function add(a, b) {
    return a + b;
}
```

**index.js**

```javascript
import { add } from "./calculator.js";

console.log(add(10, 20));
```

Output:

```text
30
```

Notice that ESM imports generally require the file extension for relative file paths.

---

## 9. What is export?

**Definition:**

`export` is used in ES Modules to make variables, functions, classes, or other declarations available to other modules.

There are two major types:

1. Named Exports.
2. Default Exports.

### 9.1 Named Exports

Named exports allow you to export multiple values from one module.

Example:

**calculator.js**

```javascript
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export class Calculator {
    multiply(a, b) {
        return a * b;
    }
}
```

Import:

```javascript
import {
    PI,
    add,
    subtract,
    Calculator
} from "./calculator.js";

console.log(PI);

console.log(add(10, 20));

console.log(subtract(20, 10));

const calculator = new Calculator();

console.log(calculator.multiply(5, 5));
```

### 9.2 Exporting at the End

Instead of exporting each declaration separately, you can export them together.

```javascript
const PI = 3.14159;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

export {
    PI,
    add,
    subtract
};
```

### 9.3 Default Export

A default export provides one primary exported value from a module.

Example:

**calculator.js**

```javascript
function add(a, b) {
    return a + b;
}

export default add;
```

Import:

```javascript
import add from "./calculator.js";

console.log(add(10, 20));
```

### Important Difference

With named exports:

```javascript
import { add } from "./calculator.js";
```

With default exports:

```javascript
import add from "./calculator.js";
```

Notice the curly braces.

Named exports require the corresponding exported name, while default imports can use a different local name.

---

## 10. What is import?

**Definition:**

`import` is used to access functionality exported by another ES Module.

### Named Import

```javascript
import { add, subtract } from "./calculator.js";
```

### Default Import

```javascript
import calculator from "./calculator.js";
```

### Import with Alias

```javascript
import {
    add as addition,
    subtract as subtraction
} from "./calculator.js";

console.log(addition(10, 20));

console.log(subtraction(20, 10));
```

### Import Everything

```javascript
import * as calculator from "./calculator.js";

console.log(calculator.add(10, 20));

console.log(calculator.subtract(20, 10));
```

### Import Only for Side Effects

```javascript
import "./config.js";
```

This executes the imported module without importing any particular binding.

---

## 11. How to Enable ES Modules in Node.js?

By default, `.js` files are interpreted according to the package module configuration.

To use ES Modules, you have several options.

### Method 1: Using package.json

Add:

```json
{
    "type": "module"
}
```

Now `.js` files in that package scope are interpreted as ES Modules.

Example:

**calculator.js**

```javascript
export function add(a, b) {
    return a + b;
}
```

**index.js**

```javascript
import { add } from "./calculator.js";

console.log(add(10, 20));
```

### Method 2: Using .mjs Extension

You can use `.mjs` files to explicitly indicate ES Modules.

Example:

```text
project/
│
├── index.mjs
└── calculator.mjs
```

**calculator.mjs**

```javascript
export function add(a, b) {
    return a + b;
}
```

**index.mjs**

```javascript
import { add } from "./calculator.mjs";

console.log(add(10, 20));
```

### Method 3: CommonJS Using .cjs

Similarly, `.cjs` explicitly indicates CommonJS.

Example:

```text
project/
│
├── index.cjs
└── calculator.cjs
```

**calculator.cjs**

```javascript
function add(a, b) {
    return a + b;
}

module.exports = add;
```

**index.cjs**

```javascript
const add = require("./calculator.cjs");

console.log(add(10, 20));
```

### File Extension Comparison

| Extension | Module System |
|---|---|
| `.js` | Determined by package configuration and Node.js module rules |
| `.mjs` | ES Modules |
| `.cjs` | CommonJS |

---

## 12. CommonJS vs ES Modules

This is an important Node.js interview topic.

| CommonJS | ES Modules |
|---|---|
| Uses `require()` | Uses `import` |
| Uses `module.exports` | Uses `export` |
| Uses `exports` | Uses named exports |
| Traditionally synchronous loading | Static imports are resolved asynchronously by the module loader |
| Commonly uses `__dirname` | Does not provide `__dirname` automatically |
| Uses `require.cache` | Uses a separate ESM module cache |
| Supports dynamic `require()` | Supports dynamic `import()` |
| Uses `.cjs` for explicit CommonJS | Uses `.mjs` for explicit ESM |

### Can We Use Both in the Same Project?

Yes.

Node.js supports both module systems.

Example:

```text
project/
│
├── package.json
├── index.mjs
└── calculator.cjs
```

**calculator.cjs**

```javascript
function add(a, b) {
    return a + b;
}

module.exports = add;
```

**index.mjs**

```javascript
import calculator from "./calculator.cjs";

console.log(calculator(10, 20));
```

Node.js supports importing CommonJS modules from ES Modules.

However, mixing module systems requires understanding their interoperability rules.

**Recommendation:** For new Node.js projects, learn ES Modules thoroughly. Also understand CommonJS because many existing projects and packages use it.

---

# SECTION 4: MODULE CACHING

## 13. What is Module Caching?

**Definition:**

Module caching is a mechanism in CommonJS where Node.js stores a successfully loaded module so that subsequent `require()` calls can reuse the cached module instead of executing the module code again.

### Example

**counter.js**

```javascript
console.log("Counter Module Loaded");

let count = 0;

function increment() {
    count++;
    return count;
}

module.exports = increment;
```

**index.js**

```javascript
const counter1 = require("./counter");

const counter2 = require("./counter");

console.log(counter1());

console.log(counter2());
```

Output:

```text
Counter Module Loaded

1
2
```

Why?

Because both `require()` calls return the same cached module export.

The module code executes only once.

Both variables reference the same exported function, which shares the same `count` variable.

### Checking Module Cache

```javascript
console.log(require.cache);
```

This displays the CommonJS module cache.

### Clearing Module Cache

```javascript
const modulePath = require.resolve("./counter");

delete require.cache[modulePath];

const counter = require("./counter");
```

Now Node.js loads and executes the module again on the next `require()`.

**Important:** This caching explanation applies to CommonJS. ES Modules use their own module caching mechanism.

---

# SECTION 5: MODULE RESOLUTION

## 14. What is Module Resolution?

**Definition:**

Module resolution is the process Node.js uses to locate a module when it encounters an import or require statement.

For example:

```javascript
const express = require("express");
```

Node.js needs to find where Express is installed.

### Types of Module Resolution

#### 1. Core Module Resolution

```javascript
const fs = require("fs");
```

Node.js recognizes `fs` as a built-in module.

#### 2. Relative Module Resolution

```javascript
const calculator = require("./calculator");
```

Node.js searches relative to the current module.

#### 3. Absolute Module Resolution

```javascript
const calculator = require("D:/projects/my-app/calculator.js");
```

Node.js loads the module from the specified absolute path.

#### 4. Package Module Resolution

```javascript
const express = require("express");
```

Node.js searches for the package using its module resolution rules, including relevant `node_modules` directories.

### Common Path Symbols

| Symbol | Meaning |
|---|---|
| `./` | Current directory |
| `../` | Parent directory |
| `/` | Root or absolute path context, depending on the path format |

### Example Project Structure

```text
project/
│
├── index.js
│
├── utils/
│   └── calculator.js
│
└── node_modules/
    └── express/
```

Import local module:

```javascript
const calculator = require("./utils/calculator");
```

Import third-party module:

```javascript
const express = require("express");
```

**Important:** Node.js module resolution has more detailed rules involving package.json, `exports`, file extensions, and directory resolution. We will study those when working with project architecture.

---

# SECTION 6: NODE.JS CORE MODULES OVERVIEW

Now let's understand the important built-in modules you will use throughout your Node.js journey.

Node.js provides many built-in modules.

You do not need to install them through NPM.

## 15. Important Core Modules

| Module | Purpose |
|---|---|
| `fs` | File system operations |
| `path` | File and directory paths |
| `os` | Operating system information |
| `http` | HTTP server creation |
| `https` | Secure HTTP communication |
| `events` | Event-driven programming |
| `crypto` | Cryptographic operations |
| `url` | URL parsing and manipulation |
| `querystring` | Query string operations |
| `stream` | Streaming data |
| `buffer` | Binary data handling |
| `util` | Utility functions |
| `zlib` | Data compression |
| `child_process` | Running external processes |
| `worker_threads` | Multithreaded JavaScript execution |

We will study these modules individually in the upcoming phases.

### Example: Importing Multiple Core Modules

```javascript
const fs = require("fs");

const path = require("path");

const os = require("os");

const http = require("http");

console.log("Node.js Version:", process.version);

console.log("Platform:", os.platform());

console.log("Current Directory:", process.cwd());

console.log("File Extension:", path.extname("index.js"));
```

Output will vary depending on your operating system and Node.js installation.

---

# SECTION 7: PRACTICAL PROJECTS

Let's apply everything we learned.

## Project 1: Calculator Using Custom Modules

### Project Structure

```text
calculator-project/
│
├── index.js
├── calculator.js
└── package.json
```

### calculator.js

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

function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }

    return a / b;
}

module.exports = {
    add,
    subtract,
    multiply,
    divide
};
```

### index.js

```javascript
const calculator = require("./calculator");

console.log("Addition:", calculator.add(10, 5));

console.log("Subtraction:", calculator.subtract(10, 5));

console.log("Multiplication:", calculator.multiply(10, 5));

console.log("Division:", calculator.divide(10, 5));
```

Output:

```text
Addition: 15
Subtraction: 5
Multiplication: 50
Division: 2
```

---

## Project 2: User Management Using Modules

### Project Structure

```text
user-management/
│
├── index.js
│
├── modules/
│   └── user.js
│
└── package.json
```

### modules/user.js

```javascript
const users = [];

function createUser(name, email) {
    const user = {
        id: users.length + 1,
        name,
        email
    };

    users.push(user);

    return user;
}

function getUsers() {
    return users;
}

function getUserById(id) {
    return users.find(user => user.id === id);
}

function deleteUser(id) {
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return false;
    }

    users.splice(index, 1);

    return true;
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    deleteUser
};
```

### index.js

```javascript
const {
    createUser,
    getUsers,
    getUserById,
    deleteUser
} = require("./modules/user");

createUser("Riyaz", "riyaz@example.com");

createUser("Ahmed", "ahmed@example.com");

console.log("All Users:", getUsers());

console.log("User:", getUserById(1));

console.log("Deleted:", deleteUser(2));

console.log("Updated Users:", getUsers());
```

This project demonstrates:

- Creating local modules.
- Exporting multiple functions.
- Importing functions.
- Data management.
- Code reusability.

**Note:** Data is stored in memory, so it disappears when the Node.js process stops.

---

# SECTION 8: IMPORTANT INTERVIEW QUESTIONS

Prepare answers to these questions.

### Module Fundamentals

1. What is a module in Node.js?
2. Why do we need modules?
3. What are the different types of modules?
4. What is a Core Module?
5. What is a Local Module?
6. What is a Third-Party Module?

### CommonJS

7. What is CommonJS?
8. What is require()?
9. What is module.exports?
10. What is exports?
11. What is the difference between exports and module.exports?
12. What happens when we reassign exports?
13. What is the module object?
14. What are __filename and __dirname?

### ES Modules

15. What are ES Modules?
16. What is the difference between import and require?
17. What are Named Exports?
18. What are Default Exports?
19. What is the difference between Named and Default Exports?
20. How do you enable ES Modules in Node.js?
21. What is the difference between .mjs and .cjs?
22. Can CommonJS and ES Modules work together?

### Advanced Module Concepts

23. What is Module Caching?
24. Why does Node.js cache CommonJS modules?
25. What is Module Resolution?
26. How does Node.js locate a third-party package?
27. What happens when the same module is required multiple times?

---

# SECTION 9: PHASE 3 COMPLETION CHECKLIST

### Module Fundamentals
- [ ] What is a Module?
- [ ] Why do we need Modules?
- [ ] Core Modules.
- [ ] Local Modules.
- [ ] Third-Party Modules.

### CommonJS
- [ ] What is CommonJS?
- [ ] require().
- [ ] module.exports.
- [ ] exports.
- [ ] exports vs module.exports.
- [ ] module object.
- [ ] __filename.
- [ ] __dirname.

### ES Modules
- [ ] What are ES Modules?
- [ ] import.
- [ ] export.
- [ ] Named Exports.
- [ ] Default Exports.
- [ ] import alias.
- [ ] Import everything.
- [ ] package.json type property.
- [ ] .mjs and .cjs.
- [ ] CommonJS vs ES Modules.

### Advanced Concepts
- [ ] Module Caching.
- [ ] require.cache.
- [ ] Module Resolution.
- [ ] Core Module Resolution.
- [ ] Relative Module Resolution.
- [ ] Package Module Resolution.

### Practical
- [ ] Created a Calculator Module.
- [ ] Created a User Management Module.
- [ ] Exported multiple functions.
- [ ] Imported modules into another file.
- [ ] Practiced both CommonJS and ES Modules.

---

# What Comes Next?

## PHASE 04: File System & Path Handling

This phase will cover:

1. What is the File System?
2. What is the FS Module?
3. Reading Files.
4. Writing Files.
5. Appending Files.
6. Deleting Files.
7. Renaming Files.
8. Creating Directories.
9. Reading Directories.
10. File Statistics.
11. Synchronous vs Asynchronous FS Methods.
12. Callback-Based FS Methods.
13. Promise-Based FS Methods.
14. What is the Path Module?
15. path.join().
16. path.resolve().
17. path.basename().
18. path.dirname().
19. path.extname().
20. Absolute vs Relative Paths.

We will also build a **File Manager and Directory Scanner** using Node.js.

**Learning advice:** For this phase, pay particular attention to CommonJS vs ES Modules and `module.exports` vs `exports`. These concepts are fundamental to understanding how Node.js applications are organized.