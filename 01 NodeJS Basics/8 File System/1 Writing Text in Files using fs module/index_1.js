const fsWriteSync = require('fs').writeFileSync;
fsWriteSync("Hello.txt","Hello World");
console.debug("File Write Operation Completed!")