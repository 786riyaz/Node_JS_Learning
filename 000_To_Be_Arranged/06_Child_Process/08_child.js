process.on("message", (data) => {
  const fib = (n) => (n <= 1 ? n : fib(n - 1) + fib(n - 2));

  const start = Date.now();

  const result = fib(data.number);

  process.send({
    result,
    timeTaken: Date.now() - start,
  });
});
