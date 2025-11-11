import fs from "fs";
import path from "path";
import mammoth from "mammoth";
import pptx2json from "pptx2json";
import pdf from "pdf-parse"; // ✅ correct ESM import for your version

// PDF extraction
async function extractPDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  return data.text;
}

// DOCX extraction
async function extractDOCX(filePath) {
  const result = await mammoth.extractRawText({ path: filePath });
  return result.value;
}

// PPTX extraction
async function extractPPTX(filePath) {
  const slides = await pptx2json.parse(filePath);
  let text = "";
  slides.slides.forEach((slide) => {
    slide.texts.forEach((item) => {
      text += item.text + "\n";
    });
  });
  return text;
}

// Crawl and combine
async function crawlDocuments(folderPath) {
  const files = fs.readdirSync(folderPath);
  let allText = "";

  for (const file of files) {
    const fullPath = path.join(folderPath, file);
    const ext = path.extname(file).toLowerCase();

    console.log(`📂 Processing: ${file}`);

    try {
      let content = "";
      if (ext === ".pdf") content = await extractPDF(fullPath);
      else if (ext === ".docx") content = await extractDOCX(fullPath);
      else if (ext === ".pptx") content = await extractPPTX(fullPath);
      else {
        console.log(`⚠️ Skipping unsupported file: ${file}`);
        continue;
      }

      allText += `\n\n--- ${file} ---\n${content}`;
    } catch (err) {
      console.error(`❌ Error reading ${file}:`, err.message);
    }
  }

  fs.writeFileSync("documents_content.txt", allText, "utf8");
  console.log("\n✅ All document content saved to documents_content.txt");
}

// Run
const folderPath = "./docs"; // Change if needed
await crawlDocuments(folderPath);
