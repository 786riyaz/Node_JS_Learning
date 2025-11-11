// This is Application Level Middleware

const express = require('express');
const app = express();

const reqFilter = (req, res, next) => {
    console.log("In side Middlewaare ===> reqFilter");
    if (!req.query.age) {
        console.log("Age is not provided");
        res.send("Please provide Age...");
    } else {
        console.log("Age is already Provided ::: ", req.query.age);
        if(req.query.age >= 18){
        console.log("Age is Greater Than 18 ::: ", req.query.age);
        next();
        } else {
            console.log("Age is less than 18. Not Allowed.....");
            res.send("Age is less than 18. Not Allowed to view the page.")
        }
    }
}

app.use(reqFilter);         // This line applies the middleware to app which means it applies to all the routes

app.get("", (req, resp) => {
    resp.send("Welcome to Home Page!");
});

app.get("/users", (req, resp) => {
    resp.send("This is Users Page!");
});

app.listen(786);