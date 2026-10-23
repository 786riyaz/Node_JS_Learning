const fib = (n) => (n<= 1 ? n : fib(n - 1) + fib(n - 2));
console.log("Starting Computation...");
const startTime = Date.now();
const result = fib(43);
const endTime = Date.now();
console.log(`Result: ${result}`);
console.log(`Time taken: ${endTime - startTime} ms`);