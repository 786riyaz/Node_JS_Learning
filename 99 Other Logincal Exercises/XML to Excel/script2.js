/*
npm install fs
npm install xlsx
npm install xml2js
*/

const fs = require('fs');
const xlsx = require('xlsx');
const xml2js = require('xml2js');

// Function to parse XML data to JSON
function parseXmlToJson(xmlData) {
    return new Promise((resolve, reject) => {
        xml2js.parseString(xmlData, { explicitArray: false }, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

// Function to convert JSON data into Excel format
function jsonToExcel(jsonData, excelFilePath) {
    // Create a new workbook
    const workbook = xlsx.utils.book_new();
    
    // Array to store all entries
    const dataArray = [];

    // Iterate through each entry in the feed
    const entries = jsonData.feed.entry;
    entries.forEach((entry) => {
        const pdfdb = entry.content.F_PDFDB;
        
        dataArray.push({
          // Email: entry.contributor.email,
          uid: pdfdb.uid,
          F_text: pdfdb.F_text,
          F_JSONData: pdfdb.F_JSONData,
          F_imagePath: pdfdb.F_imagePath,
          F_ProductType: pdfdb.F_ProductType,
          F_pdfName: pdfdb.F_pdfName,
          F_pageNumber: pdfdb.F_pageNumber,
          F_pdfUrl: pdfdb.F_pdfUrl,
          F_Questions: pdfdb.F_Questions,
            // Flow_State: pdfdb.flowState,
        });
    });

    // Convert the data array to a worksheet
    const worksheet = xlsx.utils.json_to_sheet(dataArray);

    // Append the worksheet to the workbook
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Feed Data');

    // Write the Excel file
    xlsx.writeFile(workbook, excelFilePath);
}

// Main function to read XML, parse it, and create Excel
async function convertXmlToExcel(xmlFilePath, excelFilePath) {
    try {
        // Read the XML file
        const xmlData = fs.readFileSync(xmlFilePath, 'utf8');

        // Parse the XML data to JSON
        const jsonData = await parseXmlToJson(xmlData);

        // Convert JSON to Excel
        jsonToExcel(jsonData, excelFilePath);

        console.log('Excel file created successfully!');
    } catch (err) {
        console.error('Error:', err);
    }
}

// Example usage
const xmlFilePath = 'F_PDFDB.xml'; // Path to your XML file
const excelFilePath = 'output.xlsx'; // Path to the output Excel file
convertXmlToExcel(xmlFilePath, excelFilePath);
