import fs from 'fs';
import Parser from '@/modules/parser';

export class Reader {
  static parseFromFile(file: fs.PathLike) {
    if (!fs.existsSync(file)) throw new Error('Missing file');
    if (fs.statSync(file).isDirectory()) throw new Error('Path is a directory');

    const str = fs.readFileSync(file, 'utf8');
    return Reader.parseFromText(str);
  }

  static parseFromText(str: string) {
    if (typeof str !== 'string') throw new Error('Invalid argument "str"');
    if (str.length === 0) throw new Error('Invalid string');

    return new Parser(str);
  }
}

export default Reader;
export { default as Parser } from '@/modules/parser';
export { default as Helper } from '@/modules/parser';
export { default as Character } from '@/modules/components/character';
export { default as Command } from '@/modules/components/command';
export { default as Label } from '@/modules/components/label';
export { default as Image } from '@/modules/components/image';
export { default as Effect } from '@/modules/components/effect';
