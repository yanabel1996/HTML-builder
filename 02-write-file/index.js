const path = require('path');
const fs = require('fs');
const { stdin, stdout, exit } = process;
const filePath = path.join(__dirname, 'text.txt');
const file = fs.createWriteStream(filePath);

stdout.write('Введите любой текст\n');
stdin.on('data', data => {
    if (data.toString().trim() === 'exit') {
        bye();
    }
    file.write(data);
})

process.on('SIGINT', bye);

function bye() {
    stdout.write('Удачи в изучении Node.js!');
    exit();
}