const { writeFile, readFile } = require('fs/promises');
const shortid = require('shortid');
const path = require('path');

class SimpleDB {
  constructor(rootDir) {
    this.rootDir = rootDir;


  }
  save(fileObj){
    const newId = shortid.generate();
    fileObj.id = newId;
    const stringedFile = JSON.stringify(fileObj);
    const jsonFile = `${fileObj.id}.json`;
    const filePath = path.join(this.rootDir, jsonFile);

    return writeFile(filePath, stringedFile);

  }

  get(id){
    this.filePath = path.join(this.rootDir, `${id}.json`);
    return readFile(this.filePath, 'utf-8').then((file) => JSON.parse(file));

  }
}

module.exports = SimpleDB;
