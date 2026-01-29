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
    xml2js.parseString(xmlData, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

// Function to convert JSON data into Excel format
function jsonToExcel(jsonData, excelFilePath) {
  // Create a new workbook
  const workbook = xlsx.utils.book_new();

  // Assuming we have an array of items in JSON (modify as needed depending on XML structure)
  const dataArray = jsonData.root.item.map(item => ({
    ID: item.id[0],
    Name: item.name[0],
    Age: item.age[0],
  }));

  // Convert JSON to a worksheet
  const worksheet = xlsx.utils.json_to_sheet(dataArray);

  // Append the worksheet to the workbook
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

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
    console.log("JSON Data ::: ")
    console.log(JSON.stringify(jsonData));

    // Convert JSON to Excel
    jsonToExcel(jsonData, excelFilePath);

    console.log('Excel file created successfully!');
  } catch (err) {
    console.error('Error:', err);
  }
}

// Example usage
const xmlFilePath = 'data.xml'; // Path to your XML file
const excelFilePath = 'output.xlsx'; // Path to the output Excel file
convertXmlToExcel(xmlFilePath, excelFilePath);
