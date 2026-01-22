// cluster.js
const cluster = require("cluster");
const heavyTask = require("./heavy");
const runs = 4;
const iterations = 200_000_000;

if (cluster.isMaster) {
  const start = Date.now();
  let count = 0;

  for (let i = 0; i < runs; i++) {
    const worker = cluster.fork();
    worker.on("exit", () => {
      count++;
      if (count === runs) {
        console.log("Cluster time:", Date.now() - start, "ms");             // Cluster time: 1238 ms
      }
    });
  }
} else {
  heavyTask(iterations);
  process.exit();
}
