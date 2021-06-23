const Runner = require('../src/index.js');

const fs = require('fs');
const path = require('path');
const { Label } = require('../src/modules/components/index.js');

const testFile = path.join(__dirname, 'test.rpy');
const file = fs.readFileSync(testFile, 'utf8');

const parsed = Runner.parseFromText(file);

const start = parsed.labels[0];
describe('label parser', () => {
  test('start label', () => {
    expect(start).toBeInstanceOf(Label);
    expect(start.name).toBe('start');
  });
});
