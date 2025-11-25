process.on("message", (msg) => {
  if (msg.task === "calculate") {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) sum += i;
    process.send(sum);
  } else if (msg.task === "test") {
    process.send("Test task received");
  }
});
