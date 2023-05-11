const fs = require('fs');
const path = require('path');
const fsPromise = require('fs/promises');

const pathFiles = path.join(__dirname, 'files');
const pathCopyFiles = path.join(__dirname, 'files-copy');

async function copyDir() {
    await fsPromise.rm(pathCopyFiles,
        {
            force: true,
            recursive: true
        });

    await fsPromise.mkdir(pathCopyFiles,
        {
            recursive: true
        });

    await fsPromise.readdir(pathFiles).then(files => {
        files.forEach(file => {
            const nameFile = path.basename(file);
            const pathFile = path.join(pathFiles, nameFile);
            const pathCopyFile = path.join(pathCopyFiles, nameFile);
            fs.copyFile(pathFile, pathCopyFile, err => {
                if (err) throw err;
            });
        });
    })
}

copyDir();
