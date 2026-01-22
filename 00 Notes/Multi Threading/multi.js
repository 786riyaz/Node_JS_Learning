const { Worker } = require("worker_threads");
const start = Date.now();

const runs = 4;
const iterations = 200_000_000;
let completed = 0;

for (let i = 0; i < runs; i++) {
  new Worker("./worker.js", { workerData: { iterations } })
    .on("message", () => {
      completed++;
      if (completed === runs) {
        console.log("Worker threads time:", Date.now() - start, "ms");            // Worker threads time: 1162 ms
      }
    });
}
