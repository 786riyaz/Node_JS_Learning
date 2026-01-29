const XLSX = require("xlsx");
const fs = require("fs");

function sanitizeValue(value) {
    if (typeof value === "string") {
        return value.replace(/&amp;/g, "&"); // Replace all occurrences of "&amp;" with "&"
    }
    return value;
}

function convertJsonToExcel(jsonFilePath, outputExcelFilePath) {
    // Read and parse the JSON file
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));
    
    // Extract the 'data' array
    const data = jsonData.data;
    
    if (!data || !Array.isArray(data)) {
        console.error("Invalid JSON format: 'data' field is missing or not an array");
        return;
    }

    // Mapping JSON fields to required column names while sanitizing values
    const mappedData = data.map(item => ({
        F_ID: sanitizeValue(item.Product_ID),
        F_AvailabilityStatus: sanitizeValue(item.Product_Status),
        F_ProductURL: sanitizeValue(item.Product_Url),
        F_Language: sanitizeValue(item.Language_Name),
        F_ProductName: sanitizeValue(item.Product_Title),
        F_ProductDescription: sanitizeValue(item.Product_Description),
        F_SKU: sanitizeValue(item.Product_SKU),
        F_MasterCategory: sanitizeValue(item.Category_2),
        F_Category: sanitizeValue(item.Category_3),
        F_SubCategory: sanitizeValue(item.Category_4),
        F_CountryOfOrigin: sanitizeValue(item.origin),
        F_Voltage: sanitizeValue(item.voltage),
        F_Frequency: sanitizeValue(item["frequency-hz"]),
        F_SocketType: sanitizeValue(item["socket-type"]),
        F_CordLength: sanitizeValue(item["cord-length"]),
        F_HeatingElements: sanitizeValue(item["heating-elements"]),
        F_Watt: sanitizeValue(item.watt),
        F_Colour: sanitizeValue(item.colour),
        F_CapacityInLiters: sanitizeValue(item["capacity-liters"]),
        F_CompressorType: sanitizeValue(item["compressor-type"]),
        F_RefrigerantGas: sanitizeValue(item["refrigerant-gas_opt"]),
        F_ImageURLs: sanitizeValue(item.Images),
        F_RegularPrice: sanitizeValue(item.Regular_Price),
        F_SellingPrice: sanitizeValue(item.Selling_Price),
        F_Discount: sanitizeValue(item.Discount),
        F_DealPrice: sanitizeValue(item.Deal_Price),
        F_Quantity: sanitizeValue(item.product_Quantity),
        F_Overview: sanitizeValue(item.Overviews), 
        F_Reviews_JSON: sanitizeValue(item.Reviews_JSON) 
    }));

    // Convert JSON data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(mappedData);

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
