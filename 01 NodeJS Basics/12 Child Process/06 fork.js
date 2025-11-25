
const { fork } = require("child_process");

const worker = fork("./worker.js");

worker.on("message", msg => {
  console.log("From worker:", msg);
});

worker.send({ task: "test" });
worker.send({ task: "calculate" });