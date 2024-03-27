const fs = require('fs');

fs.readFile('./sampledata/users.txt', 'utf8', (err, contents) => {
    let users = contents;
    console.log(users)

});

fs.readFile('./sampledata/emailids.txt', 'utf8', (err, content) => {
    let emails = content;
    console.log(emails)
})

