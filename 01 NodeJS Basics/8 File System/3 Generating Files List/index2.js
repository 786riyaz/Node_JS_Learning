const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname,"Text_Files");
console.log("Directory Path ::", dirPath);

fs.readdir(dirPath,(err,files)=>{
    console.log("List of Files :::");
    files.forEach((file) => {
        console.log(file);
    });
})