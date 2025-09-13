console.log("Getting Data from Command Line");
// console.log(process);
// console.log(process.argv);
console.log(process.argv[2]);


/*
Output---------------------------
Getting Data from Command Line
[
  'C:\\Program Files\\nodejs\\node.exe',
  'E:\\GIT\\NodeJS\\3 Input From CMD\\index.js'
]

Explaination-------------------
The first thing is thorough which our file runs
Second thing is path of the current file

And whatever we write as argument we can fetch thorguh it 
like
node index.js Test
nodemon index.js Test

We can fetch different argument value using indexing like 
console.log(process.argv[2]);
*/
