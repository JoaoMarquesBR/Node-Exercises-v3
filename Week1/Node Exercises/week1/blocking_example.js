const fs = require('fs');

try {
    let users = fs.readFileSync('./sampledata/users.txt', 'utf8');
    console.log(users);
    
    let emails = fs.readFileSync('./sampledata/emailids.txt', 'utf8');
    console.log(emails);


} catch (error) {
  console.error("Error reading the file:", error);
}
