const colors = require('colors');
const http = require('http');
const data = require('./Data');

http.createServer(createResponse).listen(786);

function createResponse(req, res) {
    console.log("Creating Response for Sample API from Data.js File".blue);
    res.writeHead(200, {'Content-Type':'application/json'});
    // res.write("Data");
    // res.write(JSON.stringify({"Name":"Riyaz", "Age":"25", "Email":"moh.riyazpathan@gmail.com"}));
    console.log("Sending Data :::".bgWhite, data);
    res.write(JSON.stringify(data));
    // res.write(JSON.stringify(data.getAge()));

    res.end();
}

/*
Why 2 requests happen in the browser

When you open http://localhost:786 in a browser:
The browser makes the first request → this is the actual request for / (your API).
Most browsers (like Chrome, Edge) automatically make a second request for /favicon.ico → this is the little icon you see in the browser tab.
Since your server is very simple and doesn't distinguish between routes, both / and /favicon.ico hit the same handler, so you see your log messages printed twice.

Why Postman only shows one
Postman only sends the request you configure (GET /), it doesn't send the automatic favicon request, so you see only one log.
*/