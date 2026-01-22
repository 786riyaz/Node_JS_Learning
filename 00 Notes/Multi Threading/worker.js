const { parentPort, workerData } = require("worker_threads");
const heavyTask = require("./heavy");

const result = heavyTask(workerData.iterations);
parentPort.postMessage(result);
