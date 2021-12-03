import fs from 'fs';
import Parser from './modules/parser';

export default class Reader {
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
