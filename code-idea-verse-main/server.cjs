const express = require('express');
const cors = require('cors');
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'https://vibecode.org.in'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: false
}));

// Handle preflight requests
app.options('/api/waitlist', cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('VibeCode Waitlist API is running');
});

// Path to Excel file
const EXCEL_FILE_PATH = '/Users/tripathd/Downloads/Manual Library/Projects/VibeCode_website/code-idea-verse-main/Waitlist.xlsx';

// API endpoint to handle waitlist submissions
app.post('/api/waitlist', (req, res) => {
  try {
    console.log('Received submission:', req.body);
    const { name, email, phone, country, useCase, review } = req.body;
    
    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }
    
    // Read the existing Excel file or create a new one
    let workbook;
    try {
      workbook = XLSX.readFile(EXCEL_FILE_PATH);
    } catch (error) {
      console.log('Creating new Excel file');
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
    console.log('Entry added to Excel file');
    
    res.status(200).json({ success: true, message: 'Successfully added to waitlist' });
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    res.status(500).json({ success: false, message: 'Failed to add to waitlist' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Waitlist Excel file path: ${EXCEL_FILE_PATH}`);
});
