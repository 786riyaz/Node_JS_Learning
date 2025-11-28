const http = require('http');
console.log("Creating Server....");

function renderHTML(req,res) {
    console.log("Creating HTML Response...")
    res.write("<h1> Hello World </h1>");
    res.end();
}

http.createServer(renderHTML).listen(786);