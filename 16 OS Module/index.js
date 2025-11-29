// os Module is useful to perform different operation at level of Operating System.
// os Module is also useful for getting different information of Operating System.

const os = require("os");

console.log(os);

console.log(os.arch());                                 // ===> x64

console.log(os.freemem());                              // =====> 13817843712
console.log(os.freemem()/(1024*1024*1024));             // =====> 12.946754455566406

console.log(os.totalmem());                             // =====> 25480257536
console.log(os.totalmem()/(1024*1024*1024));            // =====> 23.73033905029297

console.log(os.hostname());                             // =====> Riyaz-Legion

console.log(os.platform());                             // =====> win32

console.log(os.userInfo());                             // ===>

/*
[Object: null prototype] {
  uid: -1,
  gid: -1,
  username: 'Riyaz',
  homedir: 'C:\\Users\\Riyaz',
  shell: null
}
*/