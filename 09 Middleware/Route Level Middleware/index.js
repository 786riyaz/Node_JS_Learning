// This is Route Level Middleware

const express = require('express');
const app = express();

const reqFilter = (req, res, next) => {
    console.log("In side Middlewaare ===> reqFilter");
    if (!req.query.age) {
        res.send("Please provide Age...");
        console.log("Age is not provided");
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

// app.use(reqFilter);  // This line applies the middleware to all the routes which means it creates a application level middleware

app.get("", (req, resp) => {
    resp.send("Welcome to Home Page!");
});

app.get("/users", reqFilter, (req, resp) => {
    resp.send("This is Users Page!");
});

app.listen(786);