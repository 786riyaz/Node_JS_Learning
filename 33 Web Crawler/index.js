// web_crawler.js
// npm install axios cheerio


// Import required modules
import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import readline from "readline";

// Function to clean and extract readable text
function extractTextFromHTML(html) {
  const $ = cheerio.load(html);
  // Remove unnecessary elements
  $("script, style, noscript, iframe").remove();
  // Get all text
  let text = $("body").text();
  // Clean and format text
  text = text.replace(/\s+/g, " ").trim();
  return text;
}

// Function to crawl and save content
async function crawlAndSave(url) {
  try {
    console.log(`🔍 Crawling: ${url}`);
    const response = await axios.get(url);
    const html = response.data;

    const text = extractTextFromHTML(html);

    const filename = "page_content.txt";
    fs.writeFileSync(filename, text, "utf8");

    console.log(`✅ Content saved to ${filename}`);
  } catch (err) {
    console.error("❌ Error while crawling:", err.message);
  }
}

// Read URL input from console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter the URL to crawl: ", async (url) => {
  await crawlAndSave(url);
  rl.close();
});
