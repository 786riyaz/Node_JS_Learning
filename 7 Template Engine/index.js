const express = require("express");
const path = require("path");
const app = express();

// Set the views directory manually
app.set("views", path.join(__dirname, "views"));  // Comment this line if you want to use default views path of root directory
app.set("view engine", "ejs");

const publicFolderPath = path.join(__dirname, "public");
console.log("Folder Path ::", publicFolderPath);

app.get("", (req, res) => {
    res.sendFile(`${publicFolderPath}/index.html`);
});

app.get("/profile", (req, res) => {
    const userData = {
        name : "Riyaz Pathan",
        email : "moh.riyazpathan@gmail.com",
        address : "Ahmedabad",
        skills : ["C", "JS", "MERN", "Arduino"]
    }
    res.render(`profile`, userData);
});

app.get("/about", (req, res) => {
    res.sendFile(`${publicFolderPath}/About.html`);
});

app.get("/contact", (req, res) => {
    res.sendFile(`${publicFolderPath}/Contact.html`);
});

app.use((req, res) => {
    res.status(404).sendFile(`${publicFolderPath}/404.html`);
});

app.listen(786, () => {
    console.log("Server running at http://localhost:786");
});