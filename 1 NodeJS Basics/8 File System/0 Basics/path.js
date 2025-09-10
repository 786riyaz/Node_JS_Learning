const path = require('path');
console.log(__dirname);        // return path of current directory
console.log(__filename);        // File name with Complete path
console.log();
// console.log(path);
const dirPath = path.join(__dirname);       // return path of current directory
const dirPath2 = path.join(__dirname,'files');       // return path of current directory appended with provided folder name
console.warn(dirPath);
console.warn(dirPath2);