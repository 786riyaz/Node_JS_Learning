// In this file we will see how to handle case where you have to apply the specific middleware to multiple pages

const express = require('express');
const reqFilter = require('./middleware');
const app = express();
const route = express.Router();
route.use(reqFilter);

app.get("", (req, resp) => {
    resp.send("Welcome to Home Page!");
});

route.get("/users", (req, resp) => {
    resp.send("This is Users Page!");
});

route.get("/contacts", (req, resp) => {
    resp.send("This is Contact Page!");
});

app.get("/help", (req, resp) => {
    resp.send("This is Help Page!");
});

app.get("/about", (req, resp) => {
    resp.send("This is About Page!");
});

app.use('/',route);

app.listen(786);