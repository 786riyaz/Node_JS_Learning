const http = require("http");

// Create Server
const server = http.createServer((req, res) => {

    console.log("==================================");
    console.log("Method :", req.method);
    console.log("URL    :", req.url);
    console.log("Headers:", req.headers);

    // Parse URL
    const url = new URL(req.url, `http://${req.headers.host}`);

    // Route 1
    if (url.pathname === "/") {

        // Status Code
        res.statusCode = 200;

        // Single Header
        res.setHeader("Content-Type", "text/html");

        res.end("<h1>Home Page</h1>");
    }

    // Route 2
    else if (url.pathname === "/about") {

        // Multiple Headers + Status Code
        res.writeHead(200, {
            "Content-Type": "text/html",
            "Author": "Riyaz Khan"
        });

        res.write("<h1>About Page</h1>");
        res.write("<p>Learning Node.js HTTP Module</p>");

        res.end();
    }

    // Route 3 (Query Parameters)
    else if (url.pathname === "/user") {

        const name = url.searchParams.get("name");
        const age = url.searchParams.get("age");

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            name,
            age
        }));
    }

    // Route 4 (POST Request Example)
    else if (url.pathname === "/login" && req.method === "POST") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                message: "Login Successful",
                receivedData: body
            }));
        });
    }

    // Route Not Found
    else {

        res.writeHead(404, {
            "Content-Type": "text/html"
        });

        res.end("<h1>404 Page Not Found</h1>");
    }

});

// Listen Server
server.listen(3000, () => {
    console.log("Server Running...");
    console.log("http://localhost:3000");
});