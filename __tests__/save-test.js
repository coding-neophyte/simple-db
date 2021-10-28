const SimpleDB = require('../src/SimpleDB.js');
const { rm, mkdir } = require('fs/promises');
const shortid = require('shortid');

describe('save-test', () => {
  const rootDir = './_test_/store';
  beforeEach(() => {
    return rm(rootDir, { force: true, recursive: true }).then(() =>
      mkdir(rootDir, { recursive: true })
    );
  });

  it('should save a file and assign id ', () => {
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


});
