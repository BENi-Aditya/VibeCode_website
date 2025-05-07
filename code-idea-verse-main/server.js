import express from 'express';
import cors from 'cors';
import XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173', 'https://vibecode.org.in'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: false
}));

// Handle preflight requests
app.options('/api/waitlist', cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/Logo', express.static(path.join(__dirname, 'public/Logo')));

// Path to Excel file - use an explicit relative path from project root
const EXCEL_FILE_PATH = path.join(__dirname, 'Waitlist.xlsx');

// Ensure the Excel file directory exists
const excelDir = path.dirname(EXCEL_FILE_PATH);
if (!fs.existsSync(excelDir)) {
  fs.mkdirSync(excelDir, { recursive: true });
}

// API endpoint to handle waitlist submissions
app.post('/api/waitlist', (req, res) => {
  try {
    const { name, email, phone, country, useCase, review } = req.body;
    
    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }
    
    // Read the existing Excel file
    let workbook;
    try {
      workbook = XLSX.readFile(EXCEL_FILE_PATH);
    } catch (error) {
      // If file doesn't exist, create a new workbook
      workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.aoa_to_sheet([
        ['Name', 'Email', 'Phone', 'Country', 'Use Case', 'Review', 'Timestamp']
      ]);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Waitlist');
    }
    
    // Get the first worksheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert worksheet to JSON
    const data = XLSX.utils.sheet_to_json(worksheet);
    
    // Add new entry
    data.push({
      'Name': name,
      'Email': email,
      'Phone': phone || '',
      'Country': country || '',
      'Use Case': useCase || '',
      'Review': review || '',
      'Timestamp': new Date().toISOString()
    });
    
    // Convert back to worksheet
    const newWorksheet = XLSX.utils.json_to_sheet(data);
    workbook.Sheets[sheetName] = newWorksheet;
    
    // Write back to file
    XLSX.writeFile(workbook, EXCEL_FILE_PATH);
    
    res.status(200).json({ success: true, message: 'Successfully added to waitlist' });
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    res.status(500).json({ success: false, message: 'Failed to add to waitlist' });
  }
});

// Serve static files for any other route (SPA fallback)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
