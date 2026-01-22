function heavyTask(iterations) {
  let count = 0;
  for (let i = 0; i < iterations; i++) {
    // heavy math
    Math.sqrt(i) * Math.random();
    count++;
  }
  return count;
}

module.exports = heavyTask;
