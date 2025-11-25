const { spawn } = require("child_process");

const child = spawn("ping", ["google.com"]);

child.stdout.on("data", data => {
  console.log(data.toString());
});