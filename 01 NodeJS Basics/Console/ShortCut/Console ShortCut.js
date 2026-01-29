console.clear();
console.log("Hello World (USing Normal Console)");

const cl = console.log.bind(console);
cl('Hello World (Bind Function)')