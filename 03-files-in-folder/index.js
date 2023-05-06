const fs = require('fs');
const path = require('path');
const pathFolder = path.join(__dirname, 'secret-folder');

fs.promises.readdir(pathFolder, { withFileTypes: true })
  .then((files) => {
    files.forEach(file => {
      if (!file.isDirectory()) {
        const filePath = path.join(pathFolder, file.name)
        const fileName = path.basename(filePath);
        const extension = path.extname(filePath);
        const indexOfExtension = fileName.indexOf('.');
        fs.promises
          .stat(filePath)
          .then(res => {
            console.log(`${fileName.slice(0, indexOfExtension)} - ${extension.slice(1)} - ${res.size}bytes`);
          })
      }
    })
  }
  )
