const { writeFile, readFile } = require('fs/promises');
const shortid = require('shortId');
const path = require('path');

class SimpleDB {
  constructor(rootDir) {
    const fileName = `${shortid.generate()}.txt`;
    this.newFile = path.join(rootDir, fileName);

  }
  save(id){
    const savedFile = JSON.stringify(this.fileName);
    return writeFile(savedFile, id);

  }

  get(id){
    const readSavedFile = JSON.parse(id);
    return readFile(this.rootDir, readSavedFile).catch((error) => {
      if (error === 'ENOENT'){
        return  null;
      }
    });
  }

}

module.exports = SimpleDB;
