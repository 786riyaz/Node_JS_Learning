const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 786;
const publicFolderPath = path.join(__dirname, "public");
console.log("Folder Path ::", publicFolderPath);

function serveFile(res, filePath, statusCode = 200) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal Server Error");
        } else {
            res.writeHead(statusCode, { "Content-Type": "text/html" });
            res.end(data);
        }
    });
}

const server = http.createServer((req, res) => {
    let filePath;

    if (req.url === "/" || req.url === "") {
        filePath = path.join(publicFolderPath, "index.html");
    } else if (req.url === "/about") {
        filePath = path.join(publicFolderPath, "About.html");
    } else if (req.url === "/contact") {
        filePath = path.join(publicFolderPath, "Contact.html");
    } else {
        filePath = path.join(publicFolderPath, "404.html");
        return serveFile(res, filePath, 404);
    }

    serveFile(res, filePath);
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
