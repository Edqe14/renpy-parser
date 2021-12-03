/* eslint-disable no-undef */
import Runner from '@/index';
import fs from 'fs';
import path from 'path';
import { Image } from '@/modules/components';

const testFile = path.join(__dirname, 'test.rpy');
const file = fs.readFileSync(testFile, 'utf8');

const parsed = Runner.parseFromText(file);
describe('image parser', () => {
  test('parsed', () => {
    expect(parsed.images.length).toBe(1);
  });

  test('image class', () => {
    const image = parsed.images[0];
    expect(image).toBeInstanceOf(Image);
    expect(image.name).toBe('logo');
    expect(image.file).toBe('renpy_logo.png');
  });
});
