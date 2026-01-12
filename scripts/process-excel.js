const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'public', 'Data', 'EA - Group04.xlsx');
const outputDir = path.join(__dirname, 'public', 'Data', 'source_data');

// Ensure output directory exists
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`Reading file: ${inputFile}`);

try {
    const workbook = XLSX.readFile(inputFile);
    const sheetNames = workbook.SheetNames;

    console.log(`Found sheets: ${sheetNames.join(', ')}`);

    sheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const csvData = XLSX.utils.sheet_to_csv(worksheet);
        
        // Sanitize sheet name for filename (replace spaces or special chars if needed)
        // For simplicity, we'll keep it simple but you might want to replace spaces with underscores.
        const safeSheetName = sheetName.trim(); 
        const outputFile = path.join(outputDir, `${safeSheetName}.csv`);

        fs.writeFileSync(outputFile, csvData);
        console.log(`Converted '${sheetName}' to '${outputFile}'`);
    });

    console.log('All sheets processed successfully.');

} catch (error) {
    console.error('Error processing file:', error.message);
    process.exit(1);
}
