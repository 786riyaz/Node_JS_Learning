// npm install natural

const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

const arrayOfStrings = [
    "Create a Column",
    "Base Cabinets",
    "Vanity Cabinets",
    "5-Piece Mortise and Tenon Drawer Fronts",
    "Tall Cabinets",
    "Accessories",
    "Wall Cabinets",
    "Marketing Support Materials",
    "Marketing Support",
    "Legs, Corbels & Accents",
    "Wood Corbels",
    "Decorative Floating Shelf Straps",
    "Metal Feet",
    "Wood Feet",
    "Vent Covers",
    "Outlet and Switch Plates",
    "Table Legs and Decorative Columns",
    "Decorative Turning Program",
    "Stanisci Design Range Hoods",
    "Specialty Products",
    "Range Hoods",
    "Entry Level Range Hoods",
    "Blum AVENTOS Door Lift System Hardware",
    "Blum Frameless Cabinetry Hinge Program",
    "Blum COMPACT BLUMOTION Hinge Program",
    "3D Panels",
    "PVC Edgeband Program",
    "Wood Edgeband Program",
    "Veneers",
    "1/4\" Short Grain Plywood Program",
    "1/8\", 1/4\" and 3/4\" Plywood Program",
    "Front Frame Pricing",
    "Front Frame Specifications",
    "Alternative Material Floating Shelves",
    "Wood Floating Shelves",
    "Standard 1-Piece Valances",
    "Standard Arched Valances",
    "Custom Valances - Special Designs",
    "Closet Accessory Program",
    "Cabinet Accessories",
    "Interior Storage",
    "Custom Drawer Accessories",
    "Dovetail Drawer Box Options",
    "Dovetail Drawer Box Pricing",
    "Mouldings",
    "Moulding Assembly Options",
    "Non-Standard Mouldings",
    "8 Foot Non-Standard Moulding Pricing and Availability",
    "Specialty Mouldings",
    "Trim and Accent Mouldings",
    "Crown Mouldings",
    "12 Foot Standard Moulding Pricing and Availability",
    "8 Foot Standard Moulding Pricing and Availability",
    "DuraGuard Finishing Instructions",
    "Finishing Program",
    "Finish Sample Kits",
    "Offering and Availability",
    "Customer Responsibilities",
    "Primed Products",
    "Options",
    "Design Options",
    "Wainscot Panels",
    "Leather Panel Inserts",
    "Wire Grille Inserts",
    "Wood Accent Doors",
    "Plywood Pilaster Posts",
    "CRP-10 and TW-10 Pilaster Posts",
    "CRP-10 and TW-10 Pilaster Doors",
    "Quarter Circle 2000 and 3000 Radius Mullion Recommendations",
    "Quarter Circle 1000 Radius Mullion Recommendations",
    "Mullion Doors",
    "Accent Doors & Panels",
    "5-Piece Wood and MDF Mullion Doors",
    "5-Piece Wood and MDF Frame Only Doors",
    "Synchronicity Accessories",
    "Synchronicity High Gloss Doors & Drawer Fronts",
    "Synchronicity Super Matte Doors & Drawer Fronts",
    "Thermally Textured Surface Accessories",
    "Sequential Grain Matching",
    "Thermally Textured Surface Doors & Drawer Fronts",
    "Allure DLV Accessories",
    "Applied Moulding Doors",
    "Allure Decorative Laminate Veneer Drawer Fronts – French Cut Shaker Design",
    "Allure Decorative Laminate Veneer Doors – French Cut Shaker Design",
    "Allure Decorative Laminate Veneer Drawers – Shaker and Slab Designs",
    "Allure Decorative Laminate Veneer Doors – Shaker and Slab Designs",
    "Allure Decorative Laminate Veneer Drawer Fronts – Miter Designs",
    "Allure Decorative Laminate Veneer Doors – Miter Designs",
    "5-Piece MDF Drawer Fronts – Applied Moulding Designs",
    "5-Piece MDF Doors – Applied Moulding Designs",
    "5-Piece MDF Drawer Fronts – Miter Designs",
    "5-Piece MDF Doors – Miter Designs",
    "5-Piece MDF Drawer Fronts – Mortise & Tenon Designs",
    "5-Piece MDF Doors – Mortise & Tenon Designs",
    "1-Piece MDF Drawer Fronts",
    "1-Piece MDF Door Designs",
    "MDF & Alternative Materials",
    "Conestoga Material Pricing Guide",
    "Wood Doors & Drawer Fronts",
    "Edgebanded Doors and Drawer Fronts",
    "1-Piece and 3-Piece Drawer Fronts",
    "3-Piece and Batten Doors",
    "1\" Thick Drawer Front Collection",
    "1\" Thick Door Collection",
    "Grooved Panel Collection Drawer Fronts",
    "Grooved Panel Collection Drawer Front",
    "Grooved Panel Collection Doors",
    "Statesman Collection Drawer Fronts",
    "Statesman Collection Doors",
    "Shaker Drawer Fronts",
    "Shaker Doors",
    "Applied Moulding – Plywood Slab Drawer Fronts",
    "Applied Moulding – Plywood Slab Doors",
    "Applied Moulding Drawer Fronts",
    "Miter Drawer Fronts",
    "Miter Raised Panel Doors",
    "Miter Plywood Panel Doors",
    "Miter Plywood Slab Doors (1\" Thick)",
    "Plywood Panel Doors",
    "Raised Panel Doors",
    "Pricing Procedure for Doors and Drawer Fronts",
    "Alternative Material Characteristics",
    "Specie and Grade Characteristics",
    "Expansion Due to Moisture",
    "Tips for Avoiding Moisture-related Problems",
    "Specifications",
    "Replacement/Re-Order Program Lead-Time",
    "Lead-Time Schedule and Upcharges",
    "Lead-Times",
    "General Information",
    "Conestoga DuraGuard System Overview",
    "Cabinet Systems Finishing Pricing",
    "Finish Options",
    "Cabinet Hinge Options",
    "Drawer Slide Options",
    "Shelf Options",
    "Finished Bottom Panels for Wall Cabinets",
    "Pull-Out Storage Units",
    "Moulding Availability – Crown Mouldings and Mounting Plates",
    "Home Office/Media Cabinets",
    "Base Cabinets",
    "Wall Cabinets",
    "Inset Door and Drawer Information",
    "Overlay Diagrams (w/center stile)",
    "Advantage Framed Door and Drawer Front Specifications",
    "About Conestoga Wood Specialties",
    "Customer Wiping Stain Match",
    "Standard Options",
    "Home Office/Media Standard Features and Options",
    "Vanity Cabinet Standard Features and Options",
    "Tall Cabinet Standard Features and Options",
    "Base Cabinet Standard Features and Options",
    "Wall Cabinet Standard Features and Options",
    "Vesta Program Door and Drawer Front Availability",
    "Specie and Grade Characteristics (Doors and Drawer Fronts)",
    "Vesta Full Access Cabinet Construction",
    "Lead-Times",
    "General Information"
];

function preprocess(text) {
    return tokenizer
        .tokenize(text.toLowerCase())
        .map(word => stemmer.stem(word));
}

const preprocessedItems = arrayOfStrings.map(item => ({
    original: item,
    tokens: preprocess(item)
}));

const stopWords = [
    "what", "is", "the", "of", "for", "a", "an", "and", "in", "to", "price", "how", "design", "Door", "Drawer", "front"
];

function extractKeywords(query) {
    return tokenizer
        .tokenize(query.toLowerCase())
        .filter(word => !stopWords.includes(word))
        .map(word => stemmer.stem(word));
}

function calculateMatchScore(itemTokens, keywords) {
    let score = 0;
    keywords.forEach(keyword => {
        if (itemTokens.includes(keyword)) {
            score += 2;
        } else {
            const partialMatch = itemTokens.find(token => natural.LevenshteinDistance(token, keyword) <= 1);
            if (partialMatch) {
                score += 1;
            }
        }
    });
    return score;
}

function findBestMatch(preprocessedItems, keywords) {
    let bestScore = 0;
    let bestMatches = [];

    preprocessedItems.forEach(item => {
        const score = calculateMatchScore(item.tokens, keywords);
        if (score > bestScore) {
            bestScore = score;
            bestMatches = [item.original];
        } else if (score === bestScore) {
            bestMatches.push(item.original);
        }
    });

    return bestMatches.length > 0 ? bestMatches : ["No matching item found."];
}

// const userQuery = "What is the door design options for applied moulding";
// const userQuery = "What is the difference between wall cabinet and tall cabinet.";
// const userQuery = "What is the difference between a Miter and Mortise and Tenon door?";
// const userQuery = "What is the difference between Raise panel door and plywood panel door?";
// const userQuery = "what is the difference between advantage and vesta cabinet systems?";
// const userQuery = "What is the difference between a CRP10 of Wood Doors and Drawer Fronts and TW10 door of Wood Doors and Drawer Fronts?";
// const userQuery = "What is the difference between a CRP10 of Wood Doors and Drawer Fronts and Crown 2324 of Mouldings?";
// const userQuery = "What is the difference between a Boca 330 of MDF and Alternative Materials and Crown 2324 of Mouldings?";
// const userQuery = "Thick Drawer Front Collection";
const userQuery = "Which is better: 'Allure Veneer Doors' or 'Cabo 225 Decorative Doors'?";


const keywords = extractKeywords(userQuery);
const bestMatch = findBestMatch(preprocessedItems, keywords);
console.log(bestMatch);

