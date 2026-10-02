/**
 * Google Apps Script for Fakari & Aghita Wedding
 * 
 * Setup Instructions:
 * 1. Create a new Google Sheet for responses
 * 2. Open Extensions > Apps Script
 * 3. Paste this code
 * 4. Create two sheets: "RSVP" and "Guestbook"
 * 5. Set headers in RSVP: timestamp, name, attendance, guests, message
 * 6. Set headers in Guestbook: timestamp, name, attendance, guests, message
 * 7. Deploy > New deployment > Web app > Execute as: Me > Who has access: Anyone
 * 8. Copy the Web App URL and update CONFIG.googleAppsScript.rsvpUrl and guestbookUrl in data/config.js
 */

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // Replace with your Google Sheet ID

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('RSVP');
    
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.attendance || '',
      data.guests || 0,
      data.message || ''
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      error: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Guestbook');
    const data = sheet.getDataRange().getValues();
    
    // Skip header row
    const messages = data.slice(1).map(row => ({
      timestamp: row[0],
      name: row[1],
      attendance: row[2],
      guests: row[3],
      message: row[4]
    })).filter(msg => msg.name && msg.message);
    
    // Sort by timestamp descending (newest first)
    messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    return ContentService.createTextOutput(JSON.stringify(messages))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify([]))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Add CORS headers if needed
function setCorsHeaders(response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function options(e) {
  const response = ContentService.createTextOutput('');
  setCorsHeaders(response);
  return response;
}