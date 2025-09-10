const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname,"Text_Files");
console.log("Directory Path ::", dirPath);

// fs.writeFileSync(dirPath+"/Hello.txt","Hello World");

for (let i=1; i<=5;i++){
    // fs.writeFileSync("Hello.txt", "Hello World");
    // fs.writeFileSync(`Hello${i}.txt`, `Hello World ${i}`);
    fs.writeFileSync(`${dirPath}/Hello${i}.txt`, `Hello World ${i}`);
    console.log(`Created File ${i}`);
}