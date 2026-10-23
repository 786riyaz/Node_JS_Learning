const { spawn } = require("child_process")
console.log("Parent process started...");

const child = spawn("cmd",["/c","echo %cd%"]);

child.stdout.on("data", (data) => {
  console.log(`Child process output: ${data}`);
});

child.stderr.on("data", (err) => {
  console.error(`Child process error: ${err}`);
});

child.on("close", (code) => {
  console.log(`Child process exited with code ${code}`);
});

console.log("Parent process is doing other work while child computes...");
  