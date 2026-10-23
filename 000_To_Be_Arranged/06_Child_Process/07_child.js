process.stdin.on("data", (data) => {
  const input = JSON.parse(data.toString());

  const fib = (n) => (n <= 1 ? n : fib(n - 1) + fib(n - 2));

  const start = Date.now();

  const result = fib(input.number);

  const end = Date.now();

  process.stdout.write(
    JSON.stringify({
      result,
      timeTaken: end - start,
    }),
  );
});
