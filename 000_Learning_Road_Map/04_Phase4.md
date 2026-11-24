# PHASE 04: File System & Path Handling in Node.js

**Level:** Beginner to Intermediate

**Goal:** Learn how Node.js interacts with files and directories, reads and writes data, manages file paths, and performs file system operations.

The File System and Path modules are among the most frequently used Node.js core modules.

You will use them when building:
- File management applications.
- File upload systems.
- Log management systems.
- Backup applications.
- Project automation tools.
- File processing applications.

## Topics Covered

1. Introduction to File System.
2. FS Module.
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
14. File Descriptors.
15. Path Module.
16. path.join().
17. path.resolve().
18. path.basename().
19. path.dirname().
20. path.extname().
21. Absolute vs Relative Paths.
22. Practical Projects.

---

# SECTION 1: FILE SYSTEM FUNDAMENTALS

## 1. What is a File System?

**Definition:**

A File System is a method used by an operating system to organize, store, manage, and retrieve data from storage devices.

It allows users and applications to work with files and directories.

### Examples of File Systems

- NTFS (Windows)
- FAT32
- exFAT
- ext4 (Linux)
- APFS (macOS)

### What Can We Do With a File System?

1. Create files.
2. Read files.
3. Write files.
4. Update files.
5. Delete files.
6. Rename files.
7. Create directories.
8. Delete directories.
9. Search for files.
10. Retrieve file information.

### Example

Consider this directory structure:

```text
project/
│
├── index.js
├── package.json
│
├── uploads/
│   ├── image.png
│   └── document.pdf
│
└── logs/
    └── app.log
```

The operating system manages these files and directories.

Node.js provides APIs that allow JavaScript applications to interact with the file system.

---

## 2. What is the FS Module?

**Definition:**

The FS (File System) module is a built-in Node.js module that provides functionality for interacting with files and directories.

It allows developers to perform file operations using JavaScript.

### Importing FS Module

CommonJS:

```javascript
const fs = require("fs");
```

ES Modules:

```javascript
import fs from "node:fs";
```

You can also import specific methods:

```javascript
import { readFile, writeFile } from "node:fs/promises";
```

### Types of FS Methods

Node.js provides three main programming styles for many file system operations.

1. Synchronous Methods.
2. Callback-Based Asynchronous Methods.
3. Promise-Based Asynchronous Methods.

We will understand each one in detail.

---

# SECTION 2: READING FILES

## 3. What is Reading a File?

**Definition:**

Reading a file means retrieving the existing contents of a file from the file system.

Node.js provides several methods to read files.

### 3.1 readFileSync()

**Definition:**

`readFileSync()` reads a file synchronously.

It blocks further JavaScript execution on the current thread until the file-reading operation finishes.

Syntax:

```javascript
fs.readFileSync(path, options);
```

Parameters:

| Parameter | Description |
|---|---|
| path | File path |
| options | Optional encoding and other configuration |

Example:

Create `data.txt`:

```text
Hello Node.js!
Learning File System Module.
```

JavaScript:

```javascript
const fs = require("node:fs");

console.log("Start");

const data = fs.readFileSync("data.txt", "utf8");

console.log(data);

console.log("End");
```

Output:

```text
Start
Hello Node.js!
Learning File System Module.
End
```

**Important:** Because this method is synchronous, the next statement waits until the file has been read.

### 3.2 readFile()

**Definition:**

`readFile()` reads a file asynchronously using a callback function.

Syntax:

```javascript
fs.readFile(path, options, callback);
```

Example:

```javascript
const fs = require("node:fs");

console.log("Start");

fs.readFile("data.txt", "utf8", (err, data) => {
    if (err) {
        console.log("Error:", err.message);
        return;
    }

    console.log(data);
});

console.log("End");
```

Output:

```text
Start
End
Hello Node.js!
Learning File System Module.
```

### Understanding the Callback

```javascript
(err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(data);
}
```

The callback receives two arguments:

- `err`: Error information, if the operation fails.
- `data`: File contents, if the operation succeeds.

This is called the **Error-First Callback Pattern**.

### 3.3 readFile() Using Promises

Node.js also provides a Promise-based FS API.

Import:

```javascript
const fs = require("node:fs/promises");
```

Example:

```javascript
const fs = require("node:fs/promises");

console.log("Start");

fs.readFile("data.txt", "utf8")
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log("Error:", err.message);
    });

console.log("End");
```

### 3.4 readFile() Using Async/Await

```javascript
const fs = require("node:fs/promises");

async function readData() {
    try {
        console.log("Start");

        const data = await fs.readFile("data.txt", "utf8");

        console.log(data);

        console.log("End");
    } catch (error) {
        console.log("Error:", error.message);
    }
}

readData();
```

This is generally a clean approach for asynchronous file operations.

### Comparison

| Method | Type | Blocks Main Thread? |
|---|---|---|
| readFileSync() | Synchronous | Yes |
| readFile() | Callback-based asynchronous | No |
| fs.promises.readFile() | Promise-based asynchronous | No |

---

# SECTION 3: WRITING FILES

## 4. What is Writing a File?

**Definition:**

Writing a file means creating a new file or replacing the existing contents of a file with new data.

Node.js provides the `writeFile()` method.

### 4.1 writeFileSync()

Syntax:

```javascript
fs.writeFileSync(path, data, options);
```

Example:

```javascript
const fs = require("node:fs");

const data = "Hello from Node.js!";

fs.writeFileSync("output.txt", data);

console.log("File created successfully");
```

If `output.txt` does not exist, Node.js creates it.

If it already exists, its contents are replaced by default.

### 4.2 writeFile()

Syntax:

```javascript
fs.writeFile(path, data, options, callback);
```

Example:

```javascript
const fs = require("node:fs");

const data = "Hello from Node.js!";

fs.writeFile("output.txt", data, (err) => {
    if (err) {
        console.log("Error:", err.message);
        return;
    }

    console.log("File created successfully");
});
```

### 4.3 writeFile() Using Promises

```javascript
const fs = require("node:fs/promises");

async function createFile() {
    try {
        await fs.writeFile(
            "output.txt",
            "Hello from Node.js!"
        );

        console.log("File created successfully");
    } catch (error) {
        console.log(error.message);
    }
}

createFile();
```

### Writing JSON Data

A common use case is storing JavaScript objects in JSON files.

Example:

```javascript
const fs = require("node:fs");

const user = {
    id: 1,
    name: "Riyaz",
    email: "riyaz@example.com",
    role: "Developer"
};

const jsonData = JSON.stringify(user, null, 4);

fs.writeFileSync("user.json", jsonData);

console.log("JSON file created");
```

Output in `user.json`:

```json
{
    "id": 1,
    "name": "Riyaz",
    "email": "riyaz@example.com",
    "role": "Developer"
}
```

**Important:**

`JSON.stringify()` converts a JavaScript value into a JSON string.

`JSON.parse()` converts a valid JSON string into a JavaScript value.

Example:

```javascript
const jsonString = '{"name":"Riyaz","age":25}';

const user = JSON.parse(jsonString);

console.log(user.name);
```

---

# SECTION 4: APPENDING FILES

## 5. What is Appending a File?

**Definition:**

Appending means adding new content to the end of an existing file without removing its previous contents.

### 5.1 appendFileSync()

Example:

```javascript
const fs = require("node:fs");

fs.appendFileSync(
    "logs.txt",
    "New log entry\n"
);

console.log("Data appended successfully");
```

### 5.2 appendFile()

```javascript
const fs = require("node:fs");

fs.appendFile("logs.txt", "New log entry\n", (err) => {
    if (err) {
        console.log(err.message);
        return;
    }

    console.log("Data appended successfully");
});
```

### 5.3 appendFile() Using Promises

```javascript
const fs = require("node:fs/promises");

async function appendData() {
    try {
        await fs.appendFile(
            "logs.txt",
            "New log entry\n"
        );

        console.log("Data appended successfully");
    } catch (error) {
        console.log(error.message);
    }
}

appendData();
```

### Real-World Use Case: Logging

Suppose your application needs to record user activities.

```javascript
const fs = require("node:fs/promises");

async function logActivity(message) {
    const log = `${new Date().toISOString()} - ${message}\n`;

    await fs.appendFile("activity.log", log);
}

logActivity("User logged in");
logActivity("User updated profile");
```

For production logging systems, use a proper logging library and account for concurrent writes, log rotation, and failures.

---

# SECTION 5: DELETING AND RENAMING FILES

## 6. What is unlink()?

**Definition:**

`unlink()` is an FS method used to delete a file by removing its directory entry.

### Synchronous Version

```javascript
const fs = require("node:fs");

fs.unlinkSync("output.txt");

console.log("File deleted successfully");
```

### Asynchronous Version

```javascript
const fs = require("node:fs");

fs.unlink("output.txt", (err) => {
    if (err) {
        console.log("Error:", err.message);
        return;
    }

    console.log("File deleted successfully");
});
```

### Promise-Based Version

```javascript
const fs = require("node:fs/promises");

async function deleteFile() {
    try {
        await fs.unlink("output.txt");

        console.log("File deleted successfully");
    } catch (error) {
        console.log(error.message);
    }
}

deleteFile();
```

**Important:** `unlink()` is intended for files, not directories.

---

## 7. What is rename()?

**Definition:**

`rename()` is used to rename a file or move it to another location.

### Example: Rename a File

```javascript
const fs = require("node:fs");

fs.renameSync("old.txt", "new.txt");

console.log("File renamed successfully");
```

### Example: Move a File

```javascript
const fs = require("node:fs");

fs.renameSync(
    "old.txt",
    "uploads/old.txt"
);

console.log("File moved successfully");
```

### Asynchronous Version

```javascript
const fs = require("node:fs");

fs.rename("old.txt", "new.txt", (err) => {
    if (err) {
        console.log(err.message);
        return;
    }

    console.log("File renamed successfully");
});
```

**Note:** Moving files across different file systems may fail with certain errors. In that situation, a copy-and-delete approach may be necessary.

---

# SECTION 6: DIRECTORY OPERATIONS

## 8. What is mkdir()?

**Definition:**

`mkdir()` is used to create a new directory.

### Synchronous Version

```javascript
const fs = require("node:fs");

fs.mkdirSync("uploads");

console.log("Directory created");
```

### Asynchronous Version

```javascript
const fs = require("node:fs");

fs.mkdir("uploads", (err) => {
    if (err) {
        console.log(err.message);
        return;
    }

    console.log("Directory created");
});
```

### Creating Nested Directories

Suppose you want to create:

```text
uploads/images/profile/
```

You can use the recursive option:

```javascript
const fs = require("node:fs");

fs.mkdirSync(
    "uploads/images/profile",
    { recursive: true }
);
```

If parent directories don't exist, Node.js creates them.

If the directory already exists, recursive mode does not throw an error merely because it exists.

---

## 9. What is readdir()?

**Definition:**

`readdir()` is used to retrieve the names of files and directories inside a specified directory.

### Example

Suppose:

```text
project/
│
├── index.js
├── package.json
├── data.txt
│
└── uploads/
```

Code:

```javascript
const fs = require("node:fs");

fs.readdir(".", (err, files) => {
    if (err) {
        console.log(err.message);
        return;
    }

    console.log(files);
});
```

Possible output:

```text
[
    'index.js',
    'package.json',
    'data.txt',
    'uploads'
]
```

### Using withFileTypes

You can use `withFileTypes: true` to receive Dirent objects rather than only names.

```javascript
const fs = require("node:fs");

fs.readdir(
    ".",
    { withFileTypes: true },
    (err, entries) => {
        if (err) {
            console.log(err.message);
            return;
        }

        entries.forEach(entry => {
            if (entry.isFile()) {
                console.log("File:", entry.name);
            }

            if (entry.isDirectory()) {
                console.log("Directory:", entry.name);
            }
        });
    }
);
```

This is useful when building file scanners.

---

## 10. What is rmdir()?

**Definition:**

`rmdir()` is used to remove directories.

For a non-recursive operation, the directory must be empty.

Example:

```javascript
const fs = require("node:fs");

fs.rmdir("uploads", (err) => {
    if (err) {
        console.log(err.message);
        return;
    }

    console.log("Directory deleted");
});
```

### What If the Directory Contains Files?

Modern Node.js provides `fs.rm()` for removing directories recursively.

Example:

```javascript
const fs = require("node:fs");

fs.rm(
    "uploads",
    {
        recursive: true,
        force: true
    },
    (err) => {
        if (err) {
            console.log(err.message);
            return;
        }

        console.log("Directory deleted");
    }
);
```

**Important:**

- `fs.rmdir()` is primarily for empty directories.
- `fs.rm()` supports recursive deletion.
- Be extremely careful with recursive deletion because it can remove large amounts of data.

---

# SECTION 7: FILE INFORMATION

## 11. What is stat()?

**Definition:**

`stat()` is used to retrieve information about a file or directory.

It returns an object containing metadata.

### Example

```javascript
const fs = require("node:fs");

fs.stat("data.txt", (err, stats) => {
    if (err) {
        console.log(err.message);
        return;
    }

    console.log("Is File:", stats.isFile());

    console.log("Is Directory:", stats.isDirectory());

    console.log("File Size:", stats.size);

    console.log("Created:", stats.birthtime);

    console.log("Modified:", stats.mtime);
});
```

### Important Stats Properties

| Property / Method | Description |
|---|---|
| stats.size | Size in bytes |
| stats.isFile() | Checks whether it is a file |
| stats.isDirectory() | Checks whether it is a directory |
| stats.isSymbolicLink() | Checks whether it is a symbolic link |
| stats.birthtime | File creation time where supported |
| stats.mtime | Last modification time |
| stats.atime | Last access time |
| stats.ctime | Metadata status change time on POSIX systems |

### What is access()?

`access()` checks whether a file or directory can be accessed with the requested permissions.

Example:

```javascript
const fs = require("node:fs");

fs.access("data.txt", fs.constants.F_OK, (err) => {
    if (err) {
        console.log("File does not exist or is inaccessible");
        return;
    }

    console.log("File is accessible");
});
```

Common constants:

| Constant | Meaning |
|---|---|
| F_OK | Checks existence |
| R_OK | Checks read permission |
| W_OK | Checks write permission |
| X_OK | Checks execute permission where applicable |

**Important:** Avoid using `access()` followed by another operation as a way to guarantee the file will still be accessible. The file can change between the check and the operation. Prefer handling errors from the actual operation.

---

# SECTION 8: SYNCHRONOUS VS ASYNCHRONOUS FS METHODS

## 12. Understanding the Difference

Node.js provides synchronous and asynchronous versions of many FS methods.

### Synchronous Example

```javascript
const fs = require("node:fs");

console.log("A");

const data = fs.readFileSync("data.txt", "utf8");

console.log(data);

console.log("B");
```

Execution:

```text
A
File Content
B
```

The program waits until the file is read.

### Asynchronous Example

```javascript
const fs = require("node:fs");

console.log("A");

fs.readFile("data.txt", "utf8", (err, data) => {
    if (err) throw err;

    console.log(data);
});

console.log("B");
```

Execution:

```text
A
B
File Content
```

### Comparison

| Synchronous | Asynchronous |
|---|---|
| Blocks the current JavaScript thread | Allows other JavaScript execution to continue |
| Simpler control flow | Requires callback or Promise handling |
| Useful for simple startup scripts | Preferred for normal server I/O |
| Can block concurrent request handling | Supports better concurrency |

**Recommendation:** Prefer asynchronous FS operations in backend applications.

---

# SECTION 9: CALLBACKS VS PROMISES VS ASYNC/AWAIT

## 13. Three Ways to Handle File Operations

Consider reading a file.

### Method 1: Callback

```javascript
const fs = require("node:fs");

fs.readFile("data.txt", "utf8", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(data);
});
```

### Method 2: Promise

```javascript
const fs = require("node:fs/promises");

fs.readFile("data.txt", "utf8")
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });
```

### Method 3: Async/Await

```javascript
const fs = require("node:fs/promises");

async function readData() {
    try {
        const data = await fs.readFile(
            "data.txt",
            "utf8"
        );

        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

readData();
```

### Comparison

| Callback | Promise | Async/Await |
|---|---|---|
| Uses callback function | Uses Promise | Uses Promise internally |
| Error-first pattern commonly used | Uses .catch() | Uses try/catch |
| Can become difficult with nested operations | Supports chaining | Provides sequential-looking syntax |
| Common in older Node.js APIs | Modern asynchronous approach | Modern asynchronous approach |

**Important:** Async/await is syntax built on top of Promises. It does not make asynchronous operations synchronous.

---

# SECTION 10: FILE DESCRIPTORS

## 14. What is a File Descriptor?

**Definition:**

A File Descriptor is a numeric identifier used by an operating system to represent an open file or another I/O resource.

Node.js provides methods to open, read, write, and close files using file descriptors.

### Opening a File

```javascript
const fs = require("node:fs");

fs.open("data.txt", "r", (err, fd) => {
    if (err) {
        console.log(err.message);
        return;
    }

    console.log("File Descriptor:", fd);

    fs.close(fd, (err) => {
        if (err) {
            console.log(err.message);
            return;
        }

        console.log("File closed");
    });
});
```

### Important Methods

| Method | Purpose |
|---|---|
| fs.open() | Opens a file |
| fs.read() | Reads using a file descriptor |
| fs.write() | Writes using a file descriptor |
| fs.close() | Closes an open file descriptor |

### File Opening Flags

| Flag | Meaning |
|---|---|
| `r` | Open for reading |
| `r+` | Open for reading and writing |
| `w` | Open for writing; truncates existing file |
| `w+` | Open for reading and writing; truncates existing file |
| `a` | Open for appending |
| `a+` | Open for reading and appending |

File descriptors are useful when you need more control over file operations.

For most ordinary file operations, `readFile()` and `writeFile()` are easier to use.

---

# SECTION 11: PATH MODULE

Now let's move to the second important core module.

## 15. What is the Path Module?

**Definition:**

The Path module is a built-in Node.js module that provides utilities for working with file and directory paths.

It helps developers construct, parse, normalize, and manipulate paths.

### Why Do We Need the Path Module?

Consider:

```javascript
const filePath = "uploads" + "\\" + "images" + "\\" + "photo.png";
```

This approach assumes Windows-style separators.

But Linux and macOS use different path separators.

The Path module provides cross-platform utilities.

### Importing Path

CommonJS:

```javascript
const path = require("node:path");
```

ES Modules:

```javascript
import path from "node:path";
```

---

## 16. What is path.join()?

**Definition:**

`path.join()` joins multiple path segments into one normalized path.

Syntax:

```javascript
path.join(...paths);
```

Example:

```javascript
const path = require("node:path");

const filePath = path.join(
    "uploads",
    "images",
    "photo.png"
);

console.log(filePath);
```

Windows output:

```text
uploads\images\photo.png
```

Linux/macOS output:

```text
uploads/images/photo.png
```

### Handling Parent Directories

```javascript
const result = path.join(
    "uploads",
    "images",
    "..",
    "photo.png"
);

console.log(result);
```

Output:

```text
uploads/photo.png
```

The `..` segment refers to the parent directory.

### Real-World Example

```javascript
const path = require("node:path");

const filePath = path.join(
    __dirname,
    "uploads",
    "profile.png"
);

console.log(filePath);
```

This creates an absolute path based on the current module directory.

---

## 17. What is path.resolve()?

**Definition:**

`path.resolve()` converts a sequence of path segments into an absolute path.

Syntax:

```javascript
path.resolve(...paths);
```

Example:

```javascript
const path = require("node:path");

const result = path.resolve(
    "uploads",
    "images",
    "photo.png"
);

console.log(result);
```

Possible Windows output:

```text
D:\Projects\my-app\uploads\images\photo.png
```

The result depends on the current working directory.

### Understanding path.resolve()

```javascript
path.resolve("uploads", "images");
```

It resolves the segments into an absolute path.

### join() vs resolve()

| path.join() | path.resolve() |
|---|---|
| Joins path segments | Produces an absolute path |
| Does not necessarily return an absolute path | Returns an absolute path |
| Normalizes path segments | Normalizes and resolves path segments |
| Useful for constructing paths | Useful for resolving absolute paths |

**Important:** Both functions normalize path segments. The key difference is that `resolve()` produces an absolute path.

---

## 18. What is path.basename()?

**Definition:**

`path.basename()` returns the final portion of a path.

Example:

```javascript
const path = require("node:path");

const result = path.basename(
    "uploads/images/photo.png"
);

console.log(result);
```

Output:

```text
photo.png
```

### Removing File Extension

```javascript
const result = path.basename(
    "uploads/images/photo.png",
    ".png"
);

console.log(result);
```

Output:

```text
photo
```

---

## 19. What is path.dirname()?

**Definition:**

`path.dirname()` returns the directory portion of a given path.

Example:

```javascript
const path = require("node:path");

const result = path.dirname(
    "uploads/images/photo.png"
);

console.log(result);
```

Output:

```text
uploads/images
```

### Difference Between basename() and dirname()

| basename() | dirname() |
|---|---|
| Returns the final path component | Returns the directory portion |
| Example: photo.png | Example: uploads/images |

---

## 20. What is path.extname()?

**Definition:**

`path.extname()` returns the extension of a file path, including the leading dot.

Example:

```javascript
const path = require("node:path");

console.log(path.extname("photo.png"));

console.log(path.extname("document.pdf"));

console.log(path.extname("index.js"));
```

Output:

```text
.png
.pdf
.js
```

### Important Cases

```javascript
console.log(path.extname("file.txt"));

console.log(path.extname("archive.tar.gz"));

console.log(path.extname("README"));

console.log(path.extname(".env"));
```

Output:

```text
.txt
.gz

```

The last two results are empty strings.

**Important:** `extname()` returns only the extension from the final dot in the basename. It does not validate the actual file format.

---

## 21. What is path.parse()?

**Definition:**

`path.parse()` converts a path string into an object containing its components.

Example:

```javascript
const path = require("node:path");

const result = path.parse(
    "D:/projects/node-app/uploads/photo.png"
);

console.log(result);
```

Possible output:

```javascript
{
    root: "D:/",
    dir: "D:/projects/node-app/uploads",
    base: "photo.png",
    ext: ".png",
    name: "photo"
}
```

### Important Properties

| Property | Meaning |
|---|---|
| root | Root directory |
| dir | Directory portion |
| base | Filename with extension |
| ext | File extension |
| name | Filename without extension |

---

## 22. What is path.format()?

**Definition:**

`path.format()` creates a path string from an object containing path components.

Example:

```javascript
const path = require("node:path");

const result = path.format({
    dir: "uploads/images",
    name: "photo",
    ext: ".png"
});

console.log(result);
```

Output:

```text
uploads/images/photo.png
```

### parse() vs format()

| parse() | format() |
|---|---|
| Converts path into an object | Converts an object into a path |
| String → Object | Object → String |

---

## 23. What is path.isAbsolute()?

**Definition:**

`path.isAbsolute()` checks whether a given path is absolute.

Example:

```javascript
const path = require("node:path");

console.log(
    path.isAbsolute("D:/projects/index.js")
);

console.log(
    path.isAbsolute("projects/index.js")
);
```

On Windows, the first path is absolute and the second is relative.

**Important:** Absolute path interpretation depends on the operating system's path rules.

---

## 24. What is path.normalize()?

**Definition:**

`path.normalize()` normalizes a path by resolving unnecessary separators and dot segments.

Example:

```javascript
const path = require("node:path");

const result = path.normalize(
    "uploads//images/../photo.png"
);

console.log(result);
```

Windows output:

```text
uploads\photo.png
```

Linux/macOS output:

```text
uploads/photo.png
```

---

# SECTION 12: ABSOLUTE VS RELATIVE PATHS

## 25. What is an Absolute Path?

**Definition:**

An absolute path specifies the complete location of a file or directory from the root of the file system.

Example on Windows:

```text
D:\Projects\NodeApp\index.js
```

Example on Linux:

```text
/home/user/projects/node-app/index.js
```

An absolute path identifies the location independently of the current working directory.

## 26. What is a Relative Path?

**Definition:**

A relative path specifies the location of a file or directory relative to another directory.

Example:

```text
./uploads/photo.png
```

Another example:

```text
../images/photo.png
```

### Comparison

| Absolute Path | Relative Path |
|---|---|
| Complete path | Partial path |
| Starts from a filesystem root or equivalent | Starts from a reference directory |
| Independent of current working directory | Depends on its reference directory |
| Example: `D:/app/index.js` | Example: `./index.js` |

---

## 27. What is the Difference Between __dirname and process.cwd()?

This is particularly important in Node.js projects.

### __dirname

Returns the absolute directory path of the current CommonJS module.

```javascript
console.log(__dirname);
```

### process.cwd()

Returns the current working directory of the Node.js process.

```javascript
console.log(process.cwd());
```

### Example

Suppose:

```text
D:\Projects\my-app\
│
├── index.js
│
└── src\
    └── utils\
        └── helper.js
```

Run the application from:

```text
D:\Projects\my-app
```

Inside `helper.js`:

```javascript
console.log("__dirname:", __dirname);

console.log("cwd:", process.cwd());
```

Possible output:

```text
__dirname: D:\Projects\my-app\src\utils

cwd: D:\Projects\my-app
```

### Comparison

| __dirname | process.cwd() |
|---|---|
| Current module's directory | Process working directory |
| Depends on the module location | Depends on where the process was started |
| CommonJS variable | Node.js process method |
| Not automatically available in ESM | Available in both CommonJS and ESM |

**Important:** In ES Modules, you can obtain the current file's directory using:

```javascript
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

console.log(__dirname);
```

---

# SECTION 13: PRACTICAL PROJECTS

Now let's apply what we learned.

## Project 1: Basic File Manager

**Features:**

1. Create a file.
2. Read a file.
3. Update a file.
4. Append content.
5. Delete a file.
6. Rename a file.
7. Check file existence.

### Project Structure

```text
file-manager/
│
├── index.js
├── fileManager.js
│
├── files/
│
└── package.json
```

### fileManager.js

```javascript
const fs = require("node:fs/promises");

const path = require("node:path");

const FILE_DIR = path.join(__dirname, "files");

async function createFile(fileName, content) {
    try {
        await fs.mkdir(FILE_DIR, { recursive: true });

        const filePath = path.join(FILE_DIR, fileName);

        await fs.writeFile(filePath, content);

        console.log("File created successfully");
    } catch (error) {
        console.log("Error:", error.message);
    }
}

async function readFile(fileName) {
    try {
        const filePath = path.join(FILE_DIR, fileName);

        const data = await fs.readFile(filePath, "utf8");

        console.log(data);
    } catch (error) {
        console.log("Error:", error.message);
    }
}

async function appendFile(fileName, content) {
    try {
        const filePath = path.join(FILE_DIR, fileName);

        await fs.appendFile(filePath, content);

        console.log("Content appended successfully");
    } catch (error) {
        console.log("Error:", error.message);
    }
}

async function renameFile(oldName, newName) {
    try {
        const oldPath = path.join(FILE_DIR, oldName);

        const newPath = path.join(FILE_DIR, newName);

        await fs.rename(oldPath, newPath);

        console.log("File renamed successfully");
    } catch (error) {
        console.log("Error:", error.message);
    }
}

async function deleteFile(fileName) {
    try {
        const filePath = path.join(FILE_DIR, fileName);

        await fs.unlink(filePath);

        console.log("File deleted successfully");
    } catch (error) {
        console.log("Error:", error.message);
    }
}

module.exports = {
    createFile,
    readFile,
    appendFile,
    renameFile,
    deleteFile
};
```

### index.js

```javascript
const fileManager = require("./fileManager");

async function main() {

    await fileManager.createFile(
        "data.txt",
        "Hello Node.js!\n"
    );

    await fileManager.appendFile(
        "data.txt",
        "Learning File System Module.\n"
    );

    await fileManager.readFile("data.txt");

    await fileManager.renameFile(
        "data.txt",
        "new-data.txt"
    );

    await fileManager.deleteFile("new-data.txt");
}

main();
```

This project covers:
- FS Module.
- Path Module.
- Promises.
- Async/Await.
- CommonJS.
- Custom Modules.
- Error Handling.

**Security note:** This basic example assumes trusted filenames. In real applications, validate filenames and prevent path traversal so users cannot access files outside the intended directory.

---

## Project 2: Directory Scanner

**Goal:** Scan a directory and identify all files and subdirectories recursively.

### Project Structure

```text
directory-scanner/
│
├── index.js
└── package.json
```

### index.js

```javascript
const fs = require("node:fs/promises");

const path = require("node:path");

async function scanDirectory(directory) {

    try {

        const entries = await fs.readdir(
            directory,
            { withFileTypes: true }
        );

        for (const entry of entries) {

            const fullPath = path.join(
                directory,
                entry.name
            );

            if (entry.isDirectory()) {

                console.log("Directory:", fullPath);

                await scanDirectory(fullPath);

            } else if (entry.isFile()) {

                console.log("File:", fullPath);

            }

        }

    } catch (error) {

        console.log("Error:", error.message);

    }

}

scanDirectory("./");
```

### Expected Output

```text
File: index.js
File: package.json
Directory: uploads
File: uploads/image.png
Directory: documents
File: documents/report.pdf
```

The output depends on your actual directory structure.

This is a recursive directory scanner.

**Important:** This simple scanner follows directories but does not recursively follow symbolic links, which helps avoid some circular traversal problems.

---

# SECTION 14: IMPORTANT INTERVIEW QUESTIONS

Prepare answers to these questions.

### File System

1. What is a File System?
2. What is the FS module?
3. How do you read a file in Node.js?
4. What is the difference between readFile() and readFileSync()?
5. What is the difference between writeFile() and appendFile()?
6. How do you delete a file?
7. How do you rename a file?
8. How do you create a directory?
9. How do you read directory contents?
10. What is the difference between rmdir() and rm()?
11. What is stat()?
12. What is access()?
13. What is a File Descriptor?
14. What is the difference between callback-based and Promise-based FS methods?
15. Why should synchronous file operations generally be avoided in backend request handlers?

### Path Module

16. What is the Path module?
17. Why should we use path.join()?
18. What is the difference between path.join() and path.resolve()?
19. What is path.basename()?
20. What is path.dirname()?
21. What is path.extname()?
22. What is path.parse()?
23. What is path.format()?
24. What is path.normalize()?
25. What is path.isAbsolute()?
26. What is the difference between absolute and relative paths?
27. What is the difference between __dirname and process.cwd()?
28. Is __dirname available in ES Modules?

---

# SECTION 15: PHASE 4 COMPLETION CHECKLIST

### FS Module

- [ ] What is a File System?
- [ ] What is the FS Module?
- [ ] readFileSync().
- [ ] readFile().
- [ ] Promise-based readFile().
- [ ] writeFileSync().
- [ ] writeFile().
- [ ] appendFile().
- [ ] unlink().
- [ ] rename().
- [ ] mkdir().
- [ ] readdir().
- [ ] rmdir().
- [ ] rm().
- [ ] stat().
- [ ] access().
- [ ] File Descriptors.
- [ ] Synchronous vs Asynchronous operations.
- [ ] Callback vs Promise vs Async/Await.

### Path Module

- [ ] What is the Path Module?
- [ ] path.join().
- [ ] path.resolve().
- [ ] path.basename().
- [ ] path.dirname().
- [ ] path.extname().
- [ ] path.parse().
- [ ] path.format().
- [ ] path.isAbsolute().
- [ ] path.normalize().
- [ ] Absolute vs Relative Paths.
- [ ] __dirname vs process.cwd().

### Practical

- [ ] Created a file.
- [ ] Read a file.
- [ ] Updated a file.
- [ ] Appended content.
- [ ] Renamed a file.
- [ ] Deleted a file.
- [ ] Created directories.
- [ ] Read directory contents.
- [ ] Built a File Manager.
- [ ] Built a Directory Scanner.

---

# What Comes Next?

## PHASE 05: Asynchronous Programming in Node.js

This is one of the most important phases in your Node.js journey.

We will cover:

1. Synchronous vs Asynchronous Programming.
2. Blocking vs Non-Blocking Operations.
3. What are Callbacks?
4. Error-First Callbacks.
5. Callback Hell.
6. What are Promises?
7. Promise States.
8. Promise Chaining.
9. Promise.resolve().
10. Promise.reject().
11. Promise.all().
12. Promise.allSettled().
13. Promise.race().
14. Promise.any().
15. What is async?
16. What is await?
17. Error Handling with try/catch.
18. Sequential vs Parallel Execution.
19. Handling Multiple API Requests.
20. Asynchronous Programming Best Practices.

**My recommendation:** Give special attention to `readFile()`, `writeFile()`, `path.join()`, `path.resolve()`, and the difference between `__dirname` and `process.cwd()`. These concepts will be useful in almost every Node.js backend project.