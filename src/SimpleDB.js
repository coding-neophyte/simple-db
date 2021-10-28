const { writeFile, readFile, readdir } = require('fs/promises');
const shortid = require('shortid');
const path = require('path');

class SimpleDB {
  constructor(rootDir) {
    this.rootDir = rootDir;


  }
  save(fileObj){
    const newId = shortid.generate();
    fileObj.id = newId;

    const jsonFile = `${fileObj.id}.json`;
    const filePath = path.join(this.rootDir, jsonFile);
    const stringedFile = JSON.stringify(fileObj);

    return writeFile(filePath, stringedFile);

  }

  get(id){
    this.filePath = path.join(this.rootDir, `${id}.json`);
    return readFile(this.filePath, 'utf-8').then((file) => JSON.parse(file)).catch((err) => {
      if (err.code === 'ENOENT') {
        return null;
      }
      throw err;
    });

  }

  async getAll() {
    const allFiles = await readdir(this.rootDir);

    const filePromise = await Promise.all(
      allFiles.map((file) =>
        readFile(`${this.rootDir}/${file}`, 'utf-8')
          .then((files) => JSON.parse(files))
          .catch((err) => {
            if (err.code === 'ENOENT') {
              return null;
            }
            throw err;
          })
      )
    );
    return filePromise;
  }
}

module.exports = SimpleDB;
