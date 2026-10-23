console.log("Child process is ready to receive data from parent...");
process.on("message", (data) => {
  const fib = (n) => (n <= 1 ? n : fib(n - 1) + fib(n - 2));

  console.log("Child process started computation...");
  const startTime = Date.now();
  const result = fib(data.number);
  const endTime = Date.now();
  process.send({ result, timeTaken: endTime - startTime });
});
