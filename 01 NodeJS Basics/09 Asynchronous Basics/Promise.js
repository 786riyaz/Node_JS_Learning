let a = 10;
let b = 0;

let waitingForDataToUpdate = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(30);
    }, 2000);
});

waitingForDataToUpdate.then((data) => {
    b = data;
    console.log(a + b);
});


/* Output
40              <===== This statement prints after 2 seconds
*/