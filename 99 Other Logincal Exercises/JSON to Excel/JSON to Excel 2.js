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

    // Define column mappings
    const columnMapping = {
        "Product_ID": "F_ID",
        "Product_Status": "F_AvailabilityStatus",
        "Product_Url": "F_ProductURL",
        "Language_Name": "F_Language",
        "Product_Title": "F_ProductName",
        "Product_Description": "F_ProductDescription",
        "Product_SKU": "F_SKU",
        "Category_2": "F_MasterCategory",
        "Category_3": "F_Category",
        "Category_4": "F_SubCategory",
        "origin": "F_CountryOfOrigin",
        "voltage": "F_Voltage",
        "frequency-hz": "F_Frequency",
        "socket-type": "F_SocketType",
        "cord-length": "F_CordLength",
        "heating-elements": "F_HeatingElements",
        "watt": "F_Watt",
        "colour": "F_Colour",
        "capacity-liters": "F_CapacityInLiters",
        "compressor-type": "F_CompressorType",
        "refrigerant-gas_opt": "F_RefrigerantGas",
        "Images": "F_ImageURLs",
        "Regular_Price": "F_RegularPrice",
        "Selling_Price": "F_SellingPrice",
        "Discount": "F_Discount",
        "Deal_Price": "F_DealPrice",
        "product_Quantity": "F_Quantity",
        "Overviews": "F_Overview",
        "Reviews_JSON": "F_Reviews_JSON"
    };

    // Transform data to match required columns
    const transformedData = data.map(item => {
        let transformedItem = {};

        Object.keys(columnMapping).forEach(jsonKey => {
            let newKey = columnMapping[jsonKey];

            if (jsonKey === "Images") {
                // Extract image URLs from JSON string
                try {
                    let images = JSON.parse(item[jsonKey] || "[]");
                    transformedItem[newKey] = images.map(img => img.media).join(", ");
                } catch {
                    transformedItem[newKey] = "";
                }
            } else if (jsonKey === "Overviews") {
                // Extract overview details
                try {
                    let overviews = JSON.parse(item[jsonKey] || "[]");
                    transformedItem[newKey] = overviews.map(o => `${o.title}: ${o.value}`).join(" | ");
                } catch {
                    transformedItem[newKey] = "";
                }
            } else if (jsonKey === "Reviews_JSON") {
                // Extract reviews
                try {
                    let reviews = JSON.parse(item[jsonKey] || "[]");
                    transformedItem[newKey] = reviews.map(r => `${r.reviewText} (Rating: ${r.rating})`).join(" | ");
                } catch {
                    transformedItem[newKey] = "";
                }
            } else {
                transformedItem[newKey] = item[jsonKey] || "";
            }
        });

        return transformedItem;
    });

    // Convert to worksheet
    const worksheet = XLSX.utils.json_to_sheet(transformedData);

    // Create workbook and append sheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    // Write file
    XLSX.writeFile(workbook, outputExcelFilePath);
    console.log(`Excel file saved as: ${outputExcelFilePath}`);
}

// Example usage
const jsonFilePath = "data.json"; // Path to your JSON file
const outputExcelFilePath = "output.xlsx"; // Path to save the Excel file
convertJsonToExcel(jsonFilePath, outputExcelFilePath);
