/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const Parser = require('./modules/parser.js');

module.exports = class Reader {
  /**
   * @param  {fs.PathLike} file
   */
  static parseFromFile(file) {
    if (!fs.existsSync(file)) throw new Error('Missing file');
    if (fs.statSync(file).isDirectory()) throw new Error('Path is a directory');

    const str = fs.readFileSync(file, 'utf8');
    return Reader.parseFromText(str);
  }

  /**
   * @param  {string} str
   */
  static parseFromText(str) {
    if (typeof str !== 'string') throw new Error('Invalid argument "str"');
    if (str.length === 0) throw new Error('Invalid string');

    return new Parser(str);
  }
};
