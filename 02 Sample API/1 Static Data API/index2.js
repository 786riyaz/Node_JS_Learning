const colors = require('colors');
const http = require('http');
const data = require('./Data');

http.createServer(createResponse).listen(786);

function createResponse(req, res) {
    console.log("Request URL:", req.url);

    if (req.url === "/favicon.ico") {
        console.log("Not Sending any further response for favicon");
        res.writeHead(500); // No Content
        return res.end();
    }
     if (req.url === "/.well-known/appspecific/com.chrome.devtools.json") {
        console.log("Not Sending any further response for devtools");
        res.writeHead(404); // No Content
        return res.end();
    }

    console.log("Creating Response for Sample API from Data.js File".blue);
    res.writeHead(200, {'Content-Type':'application/json'});
    res.write(JSON.stringify(data));
    console.log("Sending Data :::".bgWhite, data);
    res.end();
}