const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('path');

const pathTemplate = path.join(__dirname, 'template.html');
const pathComponents = path.join(__dirname, 'components');
let dataTemplate = '';



fs.mkdir(path.join(__dirname, 'project-dist'), err => {
    if (err) console.log(err);
})

const replaceComponents = async () => {
    try {
        const componentFiles = await fsPromises.readdir(pathComponents);
        const dataComponents = {};
        await Promise.all(componentFiles.map(async (file) => {
            const componentName = path.parse(file).name;
            const pathComponent = path.join(pathComponents, file);
            const content = await fsPromises.readFile(pathComponent, 'utf8');
            dataComponents[componentName] = content;
        }));
        const template = await fsPromises.readFile(pathTemplate, 'utf8');
        const replaced = template.replace(/\{\{(.+?)\}\}/g, (match, tag) => {
            return dataComponents[tag] || '';
        });
        await fsPromises.writeFile(path.join(__dirname, 'project-dist', 'index.html'), replaced, 'utf8');
    } catch (err) {
        console.error(err);
    }
};
replaceComponents();



const pathFolder = path.join(__dirname, 'assets');
const pathCopyFolder = path.join(__dirname, 'project-dist', 'assets');

function copyDir() {
    fs.mkdir(pathCopyFolder, err => {
        if (err) console.log(err);
    });
    fs.promises.readdir(pathFolder).then(folders => {
        folders.forEach(folder => {
            const nameFolder = path.basename(folder);
            fs.mkdir(path.join(pathCopyFolder, nameFolder), err => {
                if (err) console.log(err);
            });
            fs.promises.readdir(path.join(pathFolder, nameFolder)).then(folder => {
                folder.forEach(file => {
                    const nameFile = path.basename(file);
                    fs.copyFile(path.join(pathFolder, nameFolder, nameFile), path.join(pathCopyFolder, nameFolder, nameFile), err => {
                        if (err) console.log(err);
                    });
                })
            })
        })
    })
}

copyDir();

const pathStyles = path.join(__dirname, 'styles');
const outputCss = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));


fs.promises.readdir(pathStyles).then(files => {
    files.forEach(file => {
        const fileName = path.basename(file);
        if (path.extname(file) === '.css') {
            const input = fs.createReadStream(path.join(pathStyles, fileName));
            input.on('data', data => {
                outputCss.write(`${data.toString()}\n`);
            })
        }
    })
})

