const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, "Text_Files");
console.log("Directory Path =", dirPath);

const filePath = dirPath + "/Hello1.txt";
console.log("File Path =", filePath);

fs.appendFile(filePath, "\nThis is a new Text", (err) => {
    if (!err) console.log("File is Updated");
});