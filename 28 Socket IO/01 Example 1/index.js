const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// When a user connects
io.on("connection", (socket) => {
  console.log("A user connected");

  // Receive message from client
  socket.on("chat message", (msg) => {
    console.log("Message:", msg);

    // Send message to all clients
    io.emit("chat message", msg);
  });

  // When a user disconnects
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
