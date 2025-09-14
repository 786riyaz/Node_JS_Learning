const express = require('express');
const app = express()

app.get("", (req, res) => {
    res.send(`
        <H1>This is Home Page</H1>
        <BR>
        <a href = "/contact"/> Contact Page </a>
        `);

    console.log("Home Page Rendered......");
});

app.get("/help", (req, res) => {
    res.send({
        "name": "Riyaz",
        "age": "25"
    });
    console.log("Help Page Rendered......");
});

app.get("/data", (req, res) => {
    res.send([{
        "name": "Riyaz",
        "age": "25"
    }, {
        "name": "Tasin",
        "age": "19"
    }]);
    console.log("Data Page Rendered......");
});

app.get("/contact", (req, res) => {
    res.send(`
        <H1>This is Contact Page</H1>
        <BR>
        <input type = "Text" placeholder="User Name"/>
        <BR>
        <input type = "password" placeholder="Password"/>
        <BR>
        <BR>
        <Button> Submit </Button>        
        <BR>
        <BR>
        <a href = "/"/> Home Page </a>
        `);
    // res.send("This is Contact Page");
    console.log("Contact Page Rendered......");
})


app.listen(786);