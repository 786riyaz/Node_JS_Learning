const { spawn } = require("child_process");
const path = require("path");

const child = spawn(
    process.execPath,
    [path.join(__dirname, "08_child.js")],
    {
        stdio: ["inherit", "inherit", "inherit", "ipc"]
    }
);

child.send({ number: 30 });

child.on("message", (msg) => {
    console.log(msg);
});