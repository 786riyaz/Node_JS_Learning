const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public")); // serve frontend files

io.on("connection", (socket) => {
  console.log("A user connected");

  // When user sends their username
  socket.on("setUsername", (username) => {
    socket.username = username;
    io.emit("notification", `${username} joined the chat`);
  });

  // When user sends a chat message
  socket.on("chatMessage", (msg) => {
    io.emit("chatMessage", { user: socket.username, text: msg });
  });

  // When user disconnects
  socket.on("disconnect", () => {
    if (socket.username) {
      io.emit("notification", `${socket.username} left the chat`);
    }
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
