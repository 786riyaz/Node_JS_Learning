// This is Seperate File Middleware

const express = require('express');
const reqFilter = require('./middleware');
const app = express();

// app.use(reqFilter);  // This line applies the middleware to all the routes which means it creates a application level middleware

app.get("", (req, resp) => {
    resp.send("Welcome to Home Page!");
});

app.get("/users", reqFilter, (req, resp) => {
    resp.send("This is Users Page!");
});

app.listen(786);