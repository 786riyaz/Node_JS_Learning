const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, "Text_Files");
console.log("Directory Path =", dirPath);

const filePath = dirPath + "/Hello1.txt";
console.log("File Path =", filePath);

fs.rename(filePath, `${dirPath}/Hi5.txt`,(err)=>{
    if(!err) console.log("File Name is updated!");
})