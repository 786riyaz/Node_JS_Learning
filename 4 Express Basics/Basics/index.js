const express = require('express');

const app = express();

app.get('', (req, res) => {
    res.send("Home Page Content");
});

app.get('/about', (req, res) => {
    res.send("About Page Content");
});

app.get('/contactus', (req, res) => {
    res.send("Contact Us Page Content");
});

app.listen(786);