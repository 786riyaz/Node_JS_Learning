const { fork } = require("child_process");
const path = require("path");

const child = fork(path.join(__dirname, "05_child.js"));
console.log("Parent process started...");

child.send({number:40});

child.on("message", (data) => {
  console.log(`Received result from child process: ${data.result}`);
  console.log(`Time taken by child process: ${data.timeTaken} ms`);
  console.log("========================================");
});

console.log("Parent process is doing other work while child computes...");
  