const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'), err => {
    if (err) console.log(err);
})

const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'), 'utf-8');
const pathStyles = path.join(__dirname, 'styles');

fs.promises
    .readdir(pathStyles)
    .then(async (files) => {
        files.forEach(file => {
            const fileName = path.basename(file);
            if (path.extname(file) === '.css') {
                const input = fs.createReadStream(path.join(pathStyles, fileName));
                input.on('data', data => {
                    output.write(`${data.toString()}\n`);
                })
            }
        })
    })