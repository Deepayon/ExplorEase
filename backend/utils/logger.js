const fs = require('fs');  
const path = require('path');  

const logFilePath = path.join(__dirname, '../logs/app.log');  

const log = (message) => {  
  const logMessage = `${new Date().toISOString()} - ${message}\n`;  
  fs.appendFile(logFilePath, logMessage, (err) => {  
    if (err) console.error('Error writing to log file:', err);  
  });  
};  

module.exports = log;