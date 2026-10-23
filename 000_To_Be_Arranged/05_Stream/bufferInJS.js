// Simplest Buffer creation from an array of values
let arr = [1,2,3,10,16];
let bufferValues = Buffer.from(arr);
console.log(bufferValues);              // <Buffer 01 02 03 0a 10>

let name = "RiyazKhan";
let bufferName = Buffer.from(name);
console.log(bufferName);                // <Buffer 52 69 79 61 7a 4b 68 61 6e>

// combining two buffers
let combinedBuffer = Buffer.concat([bufferValues, bufferName]);
console.log(combinedBuffer);            // <Buffer 01 02 03 0a 10 52 69 79 61 7a 4b 68 61 6e>

// Why the to String method is not working on array of number
console.log(bufferValues.toString());              // <Buffer 01 02 03 0a 10>
console.log(bufferName.toString());                // <Buffer 52 69 79 61 7a 4b 68 61 6e>
console.log(combinedBuffer.toString());    // RiyazKhan