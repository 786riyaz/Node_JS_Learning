const { exec } = require("child_process");

const links = [
  "https://www.linkedin.com/jobs/view/4341829986",
  "https://www.linkedin.com/jobs/view/4324277656",
  "https://www.linkedin.com/jobs/view/4341878934",
  "https://www.linkedin.com/jobs/view/4347486903",
  "https://www.linkedin.com/jobs/view/4347633722",
  "https://www.linkedin.com/jobs/view/4324850519",
  "https://www.linkedin.com/jobs/view/4338889442",
  "https://www.linkedin.com/jobs/view/4324515198",
  "https://www.linkedin.com/jobs/view/4338773298",
  "https://www.linkedin.com/jobs/view/4341877418",
  "https://www.linkedin.com/jobs/view/4341918791",
  "https://www.linkedin.com/jobs/view/4347554285",
  "https://www.linkedin.com/jobs/view/4324209195",
  "https://www.linkedin.com/jobs/view/4347591400",
  "https://www.linkedin.com/jobs/view/4347584794",
  "https://www.linkedin.com/jobs/view/4347563672",
  "https://www.linkedin.com/jobs/view/4339146633",
  "https://www.linkedin.com/jobs/view/4324870078",
  "https://www.linkedin.com/jobs/view/4324571182",
  "https://www.linkedin.com/jobs/view/4324538922",
  "https://www.linkedin.com/jobs/view/4324542517",
  "https://www.linkedin.com/jobs/view/4305124005",
  "https://www.linkedin.com/jobs/view/4337811366",
  "https://www.linkedin.com/jobs/view/4324900472",
  "https://www.linkedin.com/jobs/view/4339133844",
  "https://www.linkedin.com/jobs/view/4324591390",
  "https://www.linkedin.com/jobs/view/4347419778",
  "https://www.linkedin.com/jobs/view/4305114229",
  "https://www.linkedin.com/jobs/view/4339168422",
  "https://www.linkedin.com/jobs/view/4339104285"
];

// For Windows: "start chrome"
// For macOS: "open -a \"Google Chrome\""
// For Linux: "google-chrome"

const OPEN_CMD =
  process.platform === "win32"
    ? "start chrome"
    : process.platform === "darwin"
    ? 'open -a "Google Chrome"'
    : "google-chrome";

links.forEach((url, i) => {
  setTimeout(() => {
    console.log("Opening:", url);
    exec(`${OPEN_CMD} "${url}"`);
  }, i * 500); // open every 500ms
});
