const http = require('http');

console.log("Creating Server....")
http.createServer((req,res)=>{
    // console.log(req);
    // console.log(res);
    console.log("Generating Response...")
    res.write("<h1>Hello World!!!</h1>");

    res.end();
}).listen(786);

