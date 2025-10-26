const cluster = require("cluster");
const os = require("os");
const express = require("express");

const port = 786;

if (cluster.isMaster) {
  // Force round-robin scheduling on Windows
  cluster.schedulingPolicy = cluster.SCHED_RR;

  const numCPUs = os.cpus().length;
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  const app = express();
  app.get("/", (req, res) => {
    console.log("Request handled by process id: " + process.pid);
    res.send("Hello from worker ::: " + process.pid);
  });
  app.listen(port, () => {
    console.log(`Worker ${process.pid} listening on port ${port}`);
  });
}
