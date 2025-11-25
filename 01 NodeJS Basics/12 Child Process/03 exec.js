const { exec } = require("child_process");

// exec("cd.. && ls", (err, stdout) => {    runs on linux
// exec("chdir", (err, stdout) => {
// exec("dir", (err, stdout) => {
// exec("mkdir RRR", (err, stdout) => {
  
/*
exec('mkdir RRR && cd RRR && echo "Hello" > test.txt && dir', (err, stdout) => {
  console.log("RRR ::",stdout);
}); 
*/

exec('mkdir RRR || echo "RRR already exists" && cd RRR && echo "Hello" > test.txt && dir', 
(err, stdout) => {
  console.log("RRR ::", stdout);
});
