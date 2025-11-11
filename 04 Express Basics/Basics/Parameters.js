const express = require('express');
const http = require('http');

const app = express();

app.get('', (req, res) => {
    console.log("Parameters Received :::", req.query);
    console.log("Value Received :::", req.query.key);
    console.log("Name Received :::", req.query.name);
    res.send("Home Page Content<BR>Welcome "+req.query.name);
});

app.listen(786);

/*

Timeline of How Express Parses req.query
========================================

1. Request is made:
   http://localhost:786/?key=value&name=Riyaz

2. Express receives the request:
   Raw URL = "/?key=value&name=Riyaz"

3. Express calls its query parser (qs by default).

4. Query parser creates a safe object:
   const obj = Object.create(null);
   obj.key = "value";
   obj.name = "Riyaz";

   -> No prototype chain, avoids prototype pollution.

5. Express attaches the object to req.query:
   req.query = obj;

6. When logged in Node.js, it shows:
   [Object: null prototype] { key: 'value', name: 'Riyaz' }


Diagram Representation
======================

HTTP Request
    |
    V
Express Router
    |
    V
Query Parser (qs)
    |
    V
Creates Safe Object:
   Object.create(null)
    |
    V
req.query = [Object: null prototype] { key: 'value', name: 'Riyaz' }
    |
    V
Your Route Handler (console.log, res.send, etc.)


Details
=======

🔹 What it means
----------------
Normally, JavaScript objects inherit from Object.prototype.
But here, req.query is created with Object.create(null).
That means it has no prototype, so Node.js logs it as:
[Object: null prototype] { ... }

This ensures the object is a plain dictionary without
extra inherited methods like toString, hasOwnProperty, etc.

🔹 Why Express does this
------------------------
Express uses the "qs" library (or querystring) for parsing query strings.
These libraries intentionally use Object.create(null) to protect against
prototype pollution attacks. Without this, a malicious user could send
a query like ?__proto__=dangerous and modify global Object.prototype.

By using a null-prototype object, Express ensures your server is safe
from this class of attacks.

🔹 Does it affect your code?
----------------------------
For most use cases, no. You can still access values like:
   req.query.key   // "value"
   req.query.name  // "Riyaz"

The only difference is that methods normally available on objects are missing:
   req.query.hasOwnProperty("key")   // ERROR (not a function)

If you need those, convert it into a normal object:
   const normalObj = Object.fromEntries(Object.entries(req.query));
   console.log(normalObj);  // { key: "value", name: "Riyaz" }

This way, you regain all prototype methods safely while keeping
Express’s security benefits for the raw object.
*/