//npm install xlsx 
const XLSX = require("xlsx");
const fs = require("fs");

function convertJsonToExcel(jsonFilePath, outputExcelFilePath) {
    // Read and parse the JSON file
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));
    
    // Extract the 'data' array
    const data = jsonData.data;
    
    if (!data || !Array.isArray(data)) {
        console.error("Invalid JSON format: 'data' field is missing or not an array");
        return;
    }
    
    // Convert JSON data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    
    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    
    // Write the workbook to the specified file
    XLSX.writeFile(workbook, outputExcelFilePath);
    console.log(`Excel file saved as: ${outputExcelFilePath}`);
}

// Example usage
const jsonFilePath = "data.json"; // Path to your JSON file
const outputExcelFilePath = "output.xlsx"; // Path to save the Excel file
convertJsonToExcel(jsonFilePath, outputExcelFilePath);