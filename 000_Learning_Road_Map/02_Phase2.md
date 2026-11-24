# PHASE 02: Node.js Environment & NPM

**Level:** Beginner  
**Goal:** Understand how Node.js projects are created, configured, managed, and executed using NPM and development tools.

### Topics Covered

1. NPM Fundamentals
2. Package Management
3. Project Configuration
4. Dependencies & Version Management
5. Development Tools
6. Environment Variables
7. Debugging & Project Setup
8. Practical Exercises
9. Interview Questions

---

# SECTION 1: NPM FUNDAMENTALS

## 1. What is NPM?

**Definition:**

NPM (Node Package Manager) is the default package manager for Node.js. It helps developers install, manage, update, and remove JavaScript packages and dependencies.

NPM is distributed with Node.js.

### Why Do We Need NPM?

Imagine you want to build a Node.js application that generates PDF files.

You could write all the PDF-generation functionality yourself, but that would take considerable time.

Instead, you can install an existing package that provides this functionality.

For example:

```bash
npm install pdfkit
```

Now you can use PDFKit in your application.

### Main Responsibilities of NPM

1. Installing packages.
2. Uninstalling packages.
3. Updating packages.
4. Managing dependencies.
5. Managing project scripts.
6. Managing package versions.
7. Publishing packages.
8. Running project commands.

### Important Points

- NPM stands for Node Package Manager.
- NPM is installed along with Node.js.
- NPM provides access to the NPM Registry.
- NPM manages project dependencies.
- NPM uses `package.json` to manage project configuration.

---

## 2. What is a Package?

**Definition:**

A package is a reusable collection of JavaScript code and related files that can be installed and used in an application.

A package generally contains:

- JavaScript files.
- package.json.
- Documentation.
- Dependencies.
- Other supporting files.

### Examples of Popular Packages

| Package | Purpose |
|---|---|
| express | Backend web framework |
| mongoose | MongoDB object modeling |
| mysql2 | MySQL database connectivity |
| axios | HTTP requests |
| bcrypt | Password hashing |
| jsonwebtoken | JWT authentication |
| multer | File uploads |
| dotenv | Environment variables |
| nodemon | Automatic server restarting |
| cors | Cross-Origin Resource Sharing |

### Installing a Package

```bash
npm install express
```

This command:

1. Downloads Express from the NPM Registry.
2. Creates or updates the `node_modules` directory.
3. Adds Express to `dependencies` in `package.json`.
4. Updates `package-lock.json`.

### Using the Installed Package

```javascript
const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello Node.js");
});

app.listen(3000);
```

---

## 3. What is NPM Registry?

**Definition:**

The NPM Registry is an online database that stores JavaScript packages and their metadata.

When you execute:

```bash
npm install express
```

NPM downloads the required package from the NPM Registry.

Official website:

https://www.npmjs.com/

You can search for packages, explore documentation, check versions, and view package dependencies.

---

## 4. What is a Dependency?

**Definition:**

A dependency is an external package or library that an application requires to perform certain operations.

For example:

Suppose you are developing an Express backend.

Your application uses:

- Express for routing.
- Mongoose for MongoDB.
- Bcrypt for password hashing.

These packages are dependencies of your application.

### Example

```json
{
  "dependencies": {
    "express": "^5.1.0",
    "mongoose": "^8.0.0",
    "bcrypt": "^6.0.0"
  }
}
```

The versions above are illustrative.

Your application depends on these packages to function correctly.

---

# SECTION 2: PACKAGE MANAGEMENT

## 5. What is npm install?

**Definition:**

`npm install` is a command used to install packages or install all dependencies defined in the project's package.json.

### Installing a Specific Package

```bash
npm install express
```

Short form:

```bash
npm i express
```

### Installing Multiple Packages

```bash
npm install express mongoose dotenv
```

### Installing Existing Project Dependencies

Suppose you clone a project from GitHub.

The project contains:

```text
package.json
package-lock.json
```

But it does not contain `node_modules`.

Execute:

```bash
npm install
```

NPM installs the project's dependencies.

**Important:** You generally do not commit `node_modules` to GitHub because it can be recreated using the package manifests.

---

## 6. What is npm uninstall?

**Definition:**

`npm uninstall` removes an installed package from your project.

Example:

```bash
npm uninstall express
```

This removes Express from:

- node_modules.
- package.json.
- package-lock.json.

You can also uninstall multiple packages:

```bash
npm uninstall express mongoose
```

---

## 7. What is npm update?

**Definition:**

`npm update` updates installed packages according to the version ranges specified in package.json.

Example:

```bash
npm update
```

Update a specific package:

```bash
npm update express
```

**Important:**

`npm update` generally respects the existing version ranges. It does not automatically upgrade every package to its latest major version if that version falls outside the declared range.

---

## 8. What is Global Installation vs Local Installation?

NPM supports two main installation locations.

### 8.1 Local Installation

A package is installed inside the current project.

Command:

```bash
npm install express
```

Location:

```text
project/
│
├── node_modules/
│   └── express/
│
├── package.json
└── package-lock.json
```

**Characteristics:**

- Available to the current project.
- Recorded in package.json when installed as a dependency.
- Different projects can use different package versions.
- Recommended for most application dependencies.

### 8.2 Global Installation

A package is installed globally on your system.

Command:

```bash
npm install -g nodemon
```

**Characteristics:**

- Makes the package's executable commands available system-wide.
- Useful for command-line tools.
- Does not add the package to your project's dependencies.
- Global packages are not automatically available through normal local package resolution.

### Comparison

| Local Installation | Global Installation |
|---|---|
| Installed inside project | Installed in global NPM location |
| Used by a specific project | CLI commands available system-wide |
| Recorded in project dependencies when applicable | Not recorded in project package.json |
| Supports different versions per project | Generally one globally installed version per package |

**Recommendation:** Prefer local installation for project dependencies and development tools.

---

# SECTION 3: PROJECT CONFIGURATION

## 9. What is package.json?

**Definition:**

`package.json` is a configuration file that stores important information about a Node.js project, including its name, version, scripts, dependencies, and other metadata.

It is one of the most important files in a Node.js project.

### Creating package.json

Command:

```bash
npm init
```

NPM asks questions about your project.

Alternatively:

```bash
npm init -y
```

This creates package.json using default values.

### Example package.json

```json
{
  "name": "my-node-app",
  "version": "1.0.0",
  "description": "My first Node.js application",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "keywords": [
    "nodejs",
    "backend"
  ],
  "author": "Developer",
  "license": "ISC",
  "dependencies": {
    "express": "^5.1.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
```

### Important package.json Properties

| Property | Description |
|---|---|
| name | Project name |
| version | Project version |
| description | Project description |
| main | Package entry point |
| scripts | Custom commands |
| keywords | Search keywords |
| author | Project author |
| license | Project license |
| dependencies | Required packages |
| devDependencies | Development-only packages |
| type | Module system configuration |
| engines | Supported runtime versions |

Let's understand the most important properties.

---

## 10. What is the main Property?

The `main` property specifies the primary entry point when a package is imported by another application.

Example:

```json
{
  "main": "index.js"
}
```

Suppose your package structure is:

```text
my-package/
│
├── index.js
├── package.json
└── calculator.js
```

When another application imports your package by its package name, Node.js uses its configured entry point.

**Important:** The `main` property does not automatically determine which file runs when you execute `node .` in every Node.js module configuration. Node.js package resolution also considers other properties and rules, including `exports`.

---

## 11. What are NPM Scripts?

**Definition:**

NPM Scripts allow developers to define custom commands inside package.json and execute them using NPM.

Example:

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "node --test"
  }
}
```

### Executing Scripts

Start the application:

```bash
npm start
```

Run development mode:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

### Why Do We Need NPM Scripts?

Without NPM scripts:

```bash
node src/server.js
```

With NPM scripts:

```bash
npm start
```

Benefits:

1. Simplifies commands.
2. Provides consistent project workflows.
3. Allows multiple commands to be configured.
4. Makes project execution easier for other developers.

**Important:**

For scripts named `start`, `test`, `stop`, and `restart`, NPM supports shortcuts. Other custom scripts generally require `npm run <script-name>`.

---

## 12. What is package-lock.json?

**Definition:**

`package-lock.json` is a file automatically generated by NPM that records the exact dependency versions installed in a project and their dependency tree.

### Why Do We Need It?

Consider:

```json
{
  "dependencies": {
    "express": "^5.1.0"
  }
}
```

The caret (`^`) allows compatible updates within the same major version.

At different times, different compatible Express versions might be available.

The package-lock.json records the exact resolved version installed.

Example:

```json
{
  "name": "my-node-app",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "packages": {
    "node_modules/express": {
      "version": "5.1.0"
    }
  }
}
```

This is a simplified illustration.

### Main Responsibilities

- Records exact installed package versions.
- Records dependency relationships.
- Helps reproduce installations.
- Makes installations more consistent across environments.
- Improves installation efficiency.

### package.json vs package-lock.json

| package.json | package-lock.json |
|---|---|
| Project configuration | Dependency installation record |
| Defines version ranges | Records exact resolved versions |
| Can be created manually | Generated and maintained by NPM |
| Lists direct dependencies | Records the dependency tree |
| Describes what the project needs | Records what was resolved and installed |

**Important:** Commit both package.json and package-lock.json to Git.

---

## 13. What is node_modules?

**Definition:**

`node_modules` is the directory where NPM installs the packages required by a Node.js project.

Example:

```text
my-project/
│
├── node_modules/
│   ├── express/
│   ├── mongoose/
│   ├── dotenv/
│   └── ...
│
├── package.json
└── package-lock.json
```

### Important Characteristics

1. Contains installed packages.
2. Can contain hundreds or thousands of files.
3. Can be recreated using NPM.
4. Is generally excluded from Git.
5. Can be deleted and recreated.

### What Happens If We Delete node_modules?

Suppose you delete:

```text
node_modules/
```

Your package.json and package-lock.json remain.

Execute:

```bash
npm install
```

NPM reinstalls the dependencies.

**Important:** You should not normally upload node_modules to GitHub because it unnecessarily increases repository size.

---

# SECTION 4: DEPENDENCIES & VERSION MANAGEMENT

## 14. What are Dependencies and DevDependencies?

These are two important package.json properties.

### 14.1 Dependencies

**Definition:**

Dependencies are packages required by an application to run its functionality.

Examples:

- Express.
- Mongoose.
- MySQL2.
- Bcrypt.
- JSON Web Token.

Install:

```bash
npm install express
```

This adds Express to:

```json
{
  "dependencies": {
    "express": "^5.1.0"
  }
}
```

### 14.2 DevDependencies

**Definition:**

DevDependencies are packages primarily required during development, testing, building, or code-quality checks rather than normal application runtime.

Examples:

- Nodemon.
- ESLint.
- Prettier.
- Jest.
- TypeScript development tooling.

Install:

```bash
npm install nodemon --save-dev
```

Short form:

```bash
npm install nodemon -D
```

This adds Nodemon to:

```json
{
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
```

### Dependencies vs DevDependencies

| Dependencies | DevDependencies |
|---|---|
| Required for application runtime | Primarily required during development |
| Installed in production | Usually omitted from production-only installations |
| Express | Nodemon |
| Mongoose | ESLint |
| Bcrypt | Prettier |
| JSON Web Token | Jest |

### Installing Only Production Dependencies

```bash
npm install --omit=dev
```

This skips installation of devDependencies.

**Example:**

If your backend uses Express and Nodemon:

- Express is required to run the application.
- Nodemon is used to restart the application during development.

Therefore:

```json
{
  "dependencies": {
    "express": "^5.1.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
```

---

## 15. What is Semantic Versioning?

**Definition:**

Semantic Versioning (SemVer) is a versioning system used to communicate changes in software packages.

Version format:

```text
MAJOR.MINOR.PATCH
```

Example:

```text
5.2.3
```

| Component | Meaning |
|---|---|
| 5 | MAJOR |
| 2 | MINOR |
| 3 | PATCH |

### MAJOR Version

Introduces incompatible changes.

Example:

```text
4.0.0 → 5.0.0
```

A major update may require changes in your existing code.

### MINOR Version

Introduces new backward-compatible functionality.

Example:

```text
5.1.0 → 5.2.0
```

### PATCH Version

Introduces backward-compatible bug fixes.

Example:

```text
5.2.1 → 5.2.2
```

### Summary

| Version Change | Meaning |
|---|---|
| 1.0.0 → 2.0.0 | Major |
| 1.0.0 → 1.1.0 | Minor |
| 1.0.0 → 1.0.1 | Patch |

---

## 16. Understanding ^, ~ and Exact Versions

These symbols define which package versions NPM is allowed to install when resolving a dependency.

### 16.1 Caret (^)

Example:

```json
{
  "dependencies": {
    "express": "^5.1.0"
  }
}
```

Allows compatible versions:

```text
>=5.1.0 <6.0.0
```

It allows minor and patch updates but excludes the next major version.

### 16.2 Tilde (~)

Example:

```json
{
  "dependencies": {
    "express": "~5.1.0"
  }
}
```

Allows:

```text
>=5.1.0 <5.2.0
```

It allows patch updates but excludes new minor and major versions.

### 16.3 Exact Version

Example:

```json
{
  "dependencies": {
    "express": "5.1.0"
  }
}
```

Only version 5.1.0 satisfies this exact version requirement.

### Comparison

| Version | Allowed Updates |
|---|---|
| `^5.1.0` | Minor and patch |
| `~5.1.0` | Patch only |
| `5.1.0` | Exact version only |

**Important:** These are SemVer range rules for the specified version format. Special cases exist for versions starting with `0.x.x`.

---

## 17. What is .npmrc?

**Definition:**

`.npmrc` is a configuration file used to customize NPM behavior.

It can define:

- NPM Registry.
- Package installation settings.
- Authentication configuration.
- Save preferences.
- Other NPM options.

Example:

```text
save-exact=true
```

This configuration tells NPM to save exact package versions instead of using the default version range prefix when saving dependencies.

Another example:

```text
registry=https://registry.npmjs.org/
```

**Important:** Never commit authentication tokens or private registry credentials to a public repository.

---

# SECTION 5: DEVELOPMENT TOOLS

## 18. What is Nodemon?

**Definition:**

Nodemon is a development utility that automatically restarts a Node.js application when it detects changes in watched files.

### Without Nodemon

Every time you modify your code, you may need to stop and restart the server manually.

```bash
node index.js
```

After changing code:

1. Stop the server.
2. Execute the command again.

This becomes repetitive.

### With Nodemon

Install:

```bash
npm install nodemon --save-dev
```

Run:

```bash
npx nodemon index.js
```

Now Nodemon monitors your application files and restarts the process when relevant changes occur.

### Using NPM Scripts

package.json:

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

Execute:

```bash
npm run dev
```

### Nodemon vs Node.js

| Node.js | Nodemon |
|---|---|
| Executes JavaScript applications | Monitors and restarts Node.js applications |
| Built-in runtime | External development package |
| Does not automatically restart on file changes | Automatically restarts on detected changes |
| Used in production and development | Primarily used in development |

---

## 19. What are Environment Variables?

**Definition:**

Environment variables are key-value pairs used to configure applications without hardcoding configuration values directly into source code.

They are commonly used for:

- Database credentials.
- API keys.
- Secret keys.
- Port numbers.
- Application environments.
- External service configuration.

### Why Do We Need Environment Variables?

Consider a database connection.

Bad practice:

```javascript
const DB_PASSWORD = "mySecretPassword123";
```

This exposes sensitive information in your source code.

Better approach:

```javascript
const DB_PASSWORD = process.env.DB_PASSWORD;
```

Now the value is provided through the environment.

### Accessing Environment Variables in Node.js

Node.js provides the global `process` object.

Example:

```javascript
console.log(process.env);
```

Access a specific variable:

```javascript
console.log(process.env.PORT);
```

---

## 20. What is a .env File?

**Definition:**

A `.env` file is a commonly used configuration file that stores environment variables in key-value format.

Example:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=my_database

JWT_SECRET=my_secret_key
```

### Project Structure

```text
project/
│
├── node_modules/
│
├── src/
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── package-lock.json
```

### Important

Node.js does not automatically load `.env` files in all versions and execution configurations.

You must load them explicitly or use supported built-in environment-file functionality.

---

## 21. What is dotenv?

**Definition:**

dotenv is an NPM package that loads variables from a `.env` file into `process.env`.

### Installation

```bash
npm install dotenv
```

### .env File

```env
PORT=5000
APP_NAME=My Node Application
```

### index.js

```javascript
require("dotenv").config();

console.log(process.env.PORT);

console.log(process.env.APP_NAME);
```

Output:

```text
5000
My Node Application
```

### Using ES Modules

```javascript
import "dotenv/config";

console.log(process.env.PORT);
```

### Alternative: Built-in Node.js Environment File Support

Modern Node.js versions also support:

```bash
node --env-file=.env index.js
```

This allows Node.js to load environment variables directly without installing dotenv.

**Important:** Use either an appropriate built-in method or dotenv. You don't need both for the same purpose.

---

## 22. What are Different Application Environments?

Applications generally run in different environments.

### Development Environment

Used while developers are writing and testing code.

Characteristics:

- Debugging enabled.
- Detailed error messages.
- Automatic server restarting.
- Development tools enabled.

### Production Environment

Used by real users.

Characteristics:

- Production configuration.
- Restricted debugging information.
- Optimized execution.
- Secure environment variables.
- Production database.

### Test Environment

Used to execute automated tests.

Characteristics:

- Test database or isolated test data.
- Mocked external services when appropriate.
- Automated test execution.

### NODE_ENV

`NODE_ENV` is a commonly used environment variable for identifying the application environment.

Example:

```env
NODE_ENV=development
```

Access:

```javascript
console.log(process.env.NODE_ENV);
```

Typical values:

```text
development
production
test
```

**Important:** `NODE_ENV` is a convention used by the Node.js ecosystem. Node.js does not automatically switch every application behavior based on this variable.

---

## 23. What is .gitignore?

**Definition:**

`.gitignore` is a Git configuration file that specifies files and directories Git should ignore when tracking changes.

### Why Do We Need It?

Some project files should not be uploaded to GitHub.

Examples:

- node_modules.
- .env.
- Log files.
- Temporary files.
- Build output.

### Example .gitignore

```gitignore
# Dependencies
node_modules/

# Environment variables
.env
.env.*

# Logs
logs/
*.log

# Build output
dist/
build/

# Operating system files
.DS_Store
Thumbs.db
```

### Important Points

- `.gitignore` does not delete files.
- It prevents untracked matching files from being added to Git.
- Files already tracked by Git are not automatically ignored.
- `.env` should generally be excluded from version control.

---

# SECTION 6: DEBUGGING & PROJECT SETUP

## 24. What is Debugging?

**Definition:**

Debugging is the process of identifying, analyzing, and fixing errors or unexpected behavior in an application.

Node.js provides debugging capabilities through:

- Node.js Inspector.
- Chrome DevTools.
- VS Code Debugger.
- Console debugging.

### Console Debugging

```javascript
const a = 10;
const b = 20;

console.log("A:", a);
console.log("B:", b);

console.log("Result:", a + b);
```

### Debugging with Node.js Inspector

```bash
node --inspect index.js
```

This enables the Node.js Inspector protocol.

For debugging that pauses execution immediately:

```bash
node --inspect-brk index.js
```

You can connect using Chrome DevTools or a compatible debugger.

### VS Code Debugging

VS Code provides built-in debugging support for Node.js.

You can:

- Set breakpoints.
- Execute code line by line.
- Inspect variables.
- Watch expressions.
- Examine the Call Stack.
- Identify errors.

---

# SECTION 7: PRACTICAL PROJECT

Now let's combine everything from this phase.

## Build: Node.js Project Starter

### Step 1: Create a Project

```bash
mkdir node-learning
cd node-learning
```

### Step 2: Initialize NPM

```bash
npm init -y
```

### Step 3: Install Dependencies

```bash
npm install dotenv
```

### Step 4: Install Nodemon

```bash
npm install nodemon --save-dev
```

### Step 5: Create Project Structure

```text
node-learning/
│
├── node_modules/
│
├── src/
│   └── index.js
│
├── .env
├── .gitignore
├── package.json
└── package-lock.json
```

### Step 6: Configure .env

```env
PORT=5000
APP_NAME=Node Learning Project
NODE_ENV=development
```

### Step 7: Configure package.json

Add these scripts:

```json
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  }
}
```

Keep your existing dependencies and other package.json properties.

### Step 8: Write index.js

```javascript
require("dotenv").config();

const PORT = process.env.PORT;
const APP_NAME = process.env.APP_NAME;
const ENVIRONMENT = process.env.NODE_ENV;

console.log("--------------------------------");
console.log("Application Information");
console.log("--------------------------------");

console.log("Application:", APP_NAME);
console.log("Port:", PORT);
console.log("Environment:", ENVIRONMENT);

console.log("--------------------------------");
console.log("Node.js Version:", process.version);
console.log("--------------------------------");
```

### Step 9: Execute the Application

Development:

```bash
npm run dev
```

Production-style execution:

```bash
npm start
```

### Step 10: Test Nodemon

Change the application name in `.env`.

Save the file.

Observe whether Nodemon restarts your application.

**Note:** Nodemon watches files, but `.env` is not necessarily watched by default. If your `.env` change doesn't trigger a restart, configure Nodemon to watch it using a `nodemon.json` file:

```json
{
  "watch": ["src", ".env"],
  "ext": "js,json,env"
}
```

---

# SECTION 8: Important NPM Commands Cheat Sheet

| Command | Purpose |
|---|---|
| `node -v` | Check Node.js version |
| `npm -v` | Check NPM version |
| `npm init` | Initialize a project |
| `npm init -y` | Initialize with default values |
| `npm install` | Install project dependencies |
| `npm install express` | Install a package |
| `npm install -D nodemon` | Install development dependency |
| `npm uninstall express` | Remove a package |
| `npm update` | Update compatible dependencies |
| `npm list` | List installed packages |
| `npm list -g` | List globally installed packages |
| `npm outdated` | Check outdated packages |
| `npm audit` | Check dependency vulnerabilities |
| `npm run dev` | Execute dev script |
| `npm start` | Execute start script |
| `npm install --omit=dev` | Install without devDependencies |
| `npx nodemon index.js` | Execute local Nodemon |
| `npm cache verify` | Verify NPM cache |

---

# SECTION 9: Interview Questions

Prepare answers to these questions.

### NPM Fundamentals

1. What is NPM?
2. What is NPM Registry?
3. What is a package?
4. What is a dependency?
5. What is the difference between NPM and NPX?
6. What is the difference between local and global installation?

### Project Configuration

7. What is package.json?
8. What is package-lock.json?
9. What is node_modules?
10. What is the purpose of the main property?
11. What are NPM scripts?
12. What happens when you execute npm install?
13. Why should node_modules not be committed to Git?

### Dependencies

14. What is the difference between dependencies and devDependencies?
15. What is Semantic Versioning?
16. What is the difference between major, minor, and patch versions?
17. What is the difference between ^ and ~?
18. What is the purpose of .npmrc?

### Development Tools

19. What is Nodemon?
20. What is dotenv?
21. What are environment variables?
22. Why should we use a .env file?
23. What is NODE_ENV?
24. What is .gitignore?
25. How do you debug a Node.js application?

---

# SECTION 10: Phase 2 Completion Checklist

Before moving to Phase 3, make sure you understand:

**NPM Fundamentals**
- [ ] What is NPM?
- [ ] What is NPM Registry?
- [ ] What is a Package?
- [ ] What is a Dependency?
- [ ] npm install
- [ ] npm uninstall
- [ ] npm update

**Project Configuration**
- [ ] package.json
- [ ] package-lock.json
- [ ] node_modules
- [ ] npm init
- [ ] NPM Scripts
- [ ] main property
- [ ] .npmrc

**Dependencies**
- [ ] Dependencies vs DevDependencies
- [ ] Semantic Versioning
- [ ] MAJOR, MINOR, PATCH
- [ ] ^ vs ~ vs Exact Version
- [ ] Local vs Global Installation

**Development Tools**
- [ ] Nodemon
- [ ] Environment Variables
- [ ] .env
- [ ] dotenv
- [ ] NODE_ENV
- [ ] .gitignore
- [ ] Node.js Debugging

**Practical**
- [ ] Created a Node.js project.
- [ ] Initialized NPM.
- [ ] Installed packages.
- [ ] Configured NPM scripts.
- [ ] Configured environment variables.
- [ ] Tested Nodemon.
- [ ] Executed the application.

---

## What Comes Next?

**PHASE 03: Node.js Core Modules**

This is where we start working with Node.js built-in modules.

We will cover:

1. What are Core Modules?
2. CommonJS Module System.
3. require() and module.exports.
4. exports vs module.exports.
5. ES Modules.
6. import and export.
7. CommonJS vs ES Modules.
8. Module Caching.
9. Module Resolution.
10. Creating Custom Modules.
11. Understanding important built-in modules.

We will also build practical applications using these concepts.

**My recommendation:** Don't rush Phase 3. Make sure you can independently create a Node.js project, install dependencies, configure environment variables, and execute scripts. These are fundamental skills you'll use in almost every backend project.