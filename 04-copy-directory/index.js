const pathFiles = path.join(__dirname, 'files');
const pathCopyFiles = path.join(__dirname, 'files-copy');

function copyDir() {
    fs.mkdir(pathCopyFiles, err => {
        if (err) throw err;
    });
    fs.promises.readdir(pathFiles).then(files => {
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