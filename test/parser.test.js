const Runner = require('../src/index.js');
const Parser = require('../src/modules/parser.js');

const fs = require('fs');
const path = require('path');

const testFile = path.join(__dirname, 'test.rpy');
const file = fs.readFileSync(testFile, 'utf8');

describe('parse from', () => {
  test('file on file system', () => {
    expect(Runner.parseFromFile(testFile)).toBeInstanceOf(Parser);
  });

  test('string', () => {
    expect(Runner.parseFromText(file)).toBeInstanceOf(Parser);
  });
});
