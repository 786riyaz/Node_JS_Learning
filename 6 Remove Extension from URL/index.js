const express = require("express");
const path = require("path");
const app = express();

const publicFolderPath = path.join(__dirname, "public");
console.log("Folder Path ::", publicFolderPath);

// If you want to serve static files (CSS, JS, images etc.) automatically, uncomment this:
// app.use(express.static(publicFolderPath));

/**
 * ✅ Works fine
 * "/" route (root path) -> serves index.html
 */
app.get("", (req, res) => {
    res.sendFile(`${publicFolderPath}/index.html`);
});

/**
 * ✅ Works fine
 * "/about" route -> serves About.html (without needing ".html" in the URL)
 */
app.get("/about", (req, res) => {
    res.sendFile(`${publicFolderPath}/About.html`);
});

/**
 * ✅ Works fine
 * "/contact" route -> serves Contact.html
 */
app.get("/contact", (req, res) => {
    res.sendFile(`${publicFolderPath}/Contact.html`);
});

/**
 * ❌ DOES NOT WORK in Express v5+
 * In Express 4 you could do `app.get("*", ...)` or `app.get("/*", ...)` for catch-all,
 * but in Express 5 the underlying `path-to-regexp@6` no longer supports "*" patterns.
 * It throws: "TypeError: Missing parameter name ..."
 */
// app.get("/*", (req, res) => {
//     res.sendFile(`${publicFolderPath}/NotFound.html`);
// });

/**
 * ✅ RECOMMENDED WAY in Express v5+
 * Catch-all middleware (runs if no other route matches)
 * This works across GET/POST/PUT etc. and is future-proof.
 */
app.use((req, res) => {
    res.status(404).sendFile(`${publicFolderPath}/404.html`);
});

app.listen(786, () => {
    console.log("Server running at http://localhost:786");
});
