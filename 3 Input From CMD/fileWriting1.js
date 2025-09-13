const fs = require('fs');

const input = process.argv;
const filePath = input[2];
const text = input[3];

fs.writeFileSync(filePath, text);