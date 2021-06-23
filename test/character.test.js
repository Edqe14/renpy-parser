const Runner = require('../src/index.js');

const fs = require('fs');
const path = require('path');
const { Character } = require('../src/modules/components/index.js');

const testFile = path.join(__dirname, 'test.rpy');
const file = fs.readFileSync(testFile, 'utf8');

const parsed = Runner.parseFromText(file);
describe('character parser', () => {
  test('define characters', () => {
    expect(parsed.characters.length).toBe(4);
  });

  test('character settings', () => {
    const kurokami = parsed.characters[0];
    expect(kurokami).toBeInstanceOf(Character);
    expect(kurokami.definition).toBe('k');
    expect(kurokami.name).toBe('Kurokami');
    expect(kurokami.options.color).toBe('#444444');
  });
});
