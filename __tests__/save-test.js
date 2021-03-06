const SimpleDB = require('../src/SimpleDB.js');
const { rm, mkdir } = require('fs/promises');


describe('save-test / get', () => {
  const rootDir = './_test_/store';
  beforeEach(() => {
    return rm(rootDir, { force: true, recursive: true }).then(() =>
      mkdir(rootDir, { recursive: true })
    );
  });

  it('should save a file and get by id ', () => {
    const simpleDB = new SimpleDB(rootDir);
    const newObj =
    {
      name: 'new file' };
    const actualFile = { id: expect.any(String), name: 'new file' };

    return simpleDB
      .save(newObj)
      .then(() => simpleDB.get(newObj.id))
      .then((newFile) => expect(newFile).toEqual(actualFile));
  });

  it('should throw error if id does not exist', () => {
    const newDB = new SimpleDB(rootDir);
    const falseId = 'nothing';

    return newDB
      .get(falseId)
      .then((dud) => expect(dud).toEqual(null));
  });

  it('gets all files from directory', () => {
    const wholeDB = new SimpleDB(rootDir);
    const fileOne = { name: 'new file' };
    const fileTwo = {  name: 'old file' };

    const newObjectArray = [{ id: expect.any(String), name: 'new file' },
      { id: expect.any(String), name: 'old file' }];

    return wholeDB
      .save(fileOne)
      .then(() => wholeDB.save(fileTwo))
      .then(() => wholeDB.getAll())
      .then((allObjects) => expect(allObjects).toEqual(expect.arrayContaining(newObjectArray)));
  });


});
