console.log("First statement");

setTimeout(() => {
    console.log("Second statement");
}, 2000);

console.log("Third statement");

/* Output
First statement
Third statement

Second statement                <=== This Statement Prints after 2 seconds
*/