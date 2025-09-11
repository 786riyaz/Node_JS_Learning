const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, "Text_Files");
console.log("Directory Path =", dirPath);

const filePath = dirPath + "/Hello1.txt";
console.log("File Path =", filePath);

fs.readFile(filePath, (err, item) => {
    console.log(item);              // <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64 20 31>
})

fs.readFile(filePath, "utf-8", (err, item) => {
    console.log(item);              // Hello World 1
})