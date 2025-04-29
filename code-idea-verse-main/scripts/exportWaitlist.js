const fs = require('fs').promises;
const path = require('path');
const XLSX = require('xlsx');

const waitlistPath = path.join(__dirname, '../data/waitlist.json');
const exportPath = path.join(__dirname, '../public/waitlist.xlsx');

async function exportToExcel() {
  try {
    // Read JSON data
    const data = await fs.readFile(waitlistPath, 'utf8');
    const waitlist = JSON.parse(data);

    // Create workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(waitlist);
    XLSX.utils.book_append_sheet(wb, ws, 'Waitlist');

    // Write to file
    XLSX.writeFile(wb, exportPath);
    console.log(`Successfully exported waitlist to ${exportPath}`);
  } catch (error) {
    console.error('Error exporting waitlist:', error);
  }
}

exportToExcel();
