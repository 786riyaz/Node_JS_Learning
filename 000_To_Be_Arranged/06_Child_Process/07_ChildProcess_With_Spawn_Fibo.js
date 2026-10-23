const { spawn } = require("child_process");
const path = require("path");

console.log("Parent process started...");

const child = spawn("node", [path.join(__dirname, "07_child.js")]);

// Send data to child through stdin
child.stdin.write(JSON.stringify({ number: 30 }));
child.stdin.end();

child.stdout.on("data", (data) => {
  const result = JSON.parse(data.toString());

  console.log("Received Result :", result.result);
  console.log("Time Taken      :", result.timeTaken, "ms");
});

child.stderr.on("data", (err) => {
  console.error(err.toString());
});

child.on("close", (code) => {
  console.log("Child exited with code", code);
});

console.log("Parent is doing other work...");
