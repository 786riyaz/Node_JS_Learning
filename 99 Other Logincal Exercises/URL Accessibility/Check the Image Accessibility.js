const urls = [
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Linear_Plain_Bearings.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Linear_Plain_Bearings_FMN.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Plain_Bearings_Compact_Thin_Wall_FG.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Plain_Bearings_Compact_Thin_Wall_FMT.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Plain_Bearings_Closed_Pillow_Blocks_PM.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Plain_Bearings_Open_Pillow_Blocks_PMN.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Flange_Bearings_SFPM.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Flange_Bearings_SFFPMR.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Flange_Bearings_DFPM.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Flange_Bearings_DFPMR.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Flange_Bearings_CFPM.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Flange_Bearings_CFPMR.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Die_Set_Bushings.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Sleeve_Bearings.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Sleeve_Bearings_with_Flange.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Self_Aligning_Ball_Bearings_EPS.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Self_Aligning_Ball_Bearings_EPS_OP.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Ball_Bearings_EP.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Ball_Bearings_Epxx_AJ.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Ball_Bearings_Epxx_OP.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Double_Wide_Ball_Bearings.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Ball_Bearings_Closed_Pillow_Blocks_EPPM.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Ball_Bearings_Open_Pillow_Blocks_EPPMN.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Ball_Bearings_Square_Flange_Mount_EPK.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Ball_Bearings_Round_Flange_Mount_EPF.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Double_Wide_Ball_Bearings_Square_Flange_Mount_EPK_W.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Double_Wide_Ball_Bearings_Round_Flange_Mount_EPF_W.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Ball_Bearings_Square_Flange_Center_Mount_EPKC.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Ball_Bearings_Round_Flange_Center_Mount_EPFC.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Ball_Bearings_Compact_Thin_Wall_KHP.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Single_Roller_Pillow_Block_MSPB_OPN.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Double_Roller_Pillow_Block_MDPB_OPN.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Twin_Roller_Pillow_Block_MTWN_OPN.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Simplicity_60_Plus_Shafting.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/RC60_Steel_Solid_Shafting_NIM.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/No image",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Pre_Drilled_and_Tapped_Steel_NIPDM.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Pre_Drilled_and_Tapped_440_Stainless_Steel_NIPDMxxSS.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Solid_Shafting_CCM.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Pre_Drilled_and_Tapped_CCMDL.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Rail_Assembly_Aluminum_Support_Rail_SRA.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Support_Rail_Aluminum_SR_and_SR_PD.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Low_Support_Rail_Steel_LSRM.jpg",
    "https://pythonlabs.streebo.com/chatbot-python-utilities/pdfcrawler/images/PBC_Linear/Low_Support_Rail_and_Shaft_Set_LSG.jpg"
    // Add more URLs here
];

async function checkUrls(urls) {
    for (const url of urls) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            if (response.status === 404) {
                console.log(`404 Not Found: ${url}`);
            } else {
                console.log(`Accessible: ${url}`);
            }
        } catch (error) {
            console.log(`Error accessing ${url}: ${error.message}`);
        }
    }
}

checkUrls(urls);
