/* eslint-disable no-undef */
import Runner from '@/index';
import fs from 'fs';
import path from 'path';
import Parser from '@/modules/parser';

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
