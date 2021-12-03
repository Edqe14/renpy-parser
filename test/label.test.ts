/* eslint-disable no-undef */
import Runner from '@/index';
import fs from 'fs';
import path from 'path';
import { Label } from '@/modules/components';

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
