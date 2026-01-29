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

    // Mapping JSON fields to required column names
    const mappedData = data.map(item => ({
        F_ID: item.Product_ID,
        F_AvailabilityStatus: item.Product_Status,
        F_ProductURL: item.Product_Url,
        F_Language: item.Language_Name,
        F_ProductName: item.Product_Title,
        F_ProductDescription: item.Product_Description,
        F_SKU: item.Product_SKU,
        F_MasterCategory: item.Category_2,
        F_Category: item.Category_3,
        F_SubCategory: item.Category_4,
        F_CountryOfOrigin: item.origin,
        F_Voltage: item.voltage,
        F_Frequency: item["frequency-hz"],
        F_SocketType: item["socket-type"],
        F_CordLength: item["cord-length"],
        F_HeatingElements: item["heating-elements"],
        F_Watt: item.watt,
        F_Colour: item.colour,
        F_CapacityInLiters: item["capacity-liters"],
        F_CompressorType: item["compressor-type"],
        F_RefrigerantGas: item["refrigerant-gas_opt"],
        F_ImageURLs: item.Images,
        F_RegularPrice: item.Regular_Price,
        F_SellingPrice: item.Selling_Price,
        F_Discount: item.Discount,
        F_DealPrice: item.Deal_Price,
        F_Quantity: item.product_Quantity,
        F_Overview: item.Overviews,
        F_Reviews_JSON: item.Reviews_JSON
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
