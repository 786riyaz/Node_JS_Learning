const heavyTask = require("../heavy");
const start = Date.now();

const runs = 4;
const iterations = 200_000_000; // adjust based on machine

for (let i = 0; i < runs; i++) {
  heavyTask(iterations);
}

console.log("Single-threaded time:", Date.now() - start, "ms");         // Single-threaded time: 3744 ms
