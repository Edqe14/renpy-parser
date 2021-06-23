const Helper = require('./helper.js');
const lexure = require('lexure');
const { Lexer } = lexure;
const { Character, Label, Command, Image } = require('./components/index.js');

module.exports = class Parser {
  /**
   * @param  {string} str
   */
  constructor(str) {
    this.characters = [];
    this.labels = [];
    this.images = [];

    this._activeLabel = null;

    this.parse(str);
  }

  /**
   * @param  {string} str
   */
  parse(str) {
    const lines = str
      .replace(/\r\n/gi, '\n')
      .split('\n')
      .filter((l) => !Helper.isCommentOrEmpty(l));

    lines.forEach((line) => this.parseLine(line));
  }

  /**
   * @param  {string} line
   */
  parseLine(line) {
    const parsedLine = new Lexer(line)
      .setQuotes([
        ['"', '"'],
        ["'", "'"],
      ])
      .lex();

    const commentIndex = parsedLine.findIndex(
      (l) => l.value.includes('#') && !l.raw.startsWith('"')
    );

    const split = lexure
      .joinTokens(
        parsedLine.slice(0, commentIndex === -1 ? undefined : commentIndex)
      )
      .split(' ');
    const command = split[0];
    switch (command) {
      case 'define': {
        if (split[3].startsWith('Character')) {
          const def = split[1];
          const args = split
            .slice(3)
            .join(' ')
            .replace(/(Character\(|\)|"|')/gi, '')
            .split(', ')
            .map((o) => o.split('='));

          return this.characters.push(new Character(def, args));
        }

        break;
      }

      case 'image': {
        const name = split[1];
        const file = line.split('=')[1].trim().replace(/"/gi, '');

        return this.images.push(new Image(name, file));
      }

      case 'label':
      case 'menu': {
        const name = command === 'menu' ? 'menu' : split[1].replace(/:/gi, '');
        if (!this.labels.some((l) => l.name === name)) {
          this.labels.push(new Label(name));
        }

        this._activeLabel = name;
        break;
      }

      default: {
        if (Helper.isIndented(line)) {
          const label = this.labels.find((l) => l.name === this._activeLabel);
          if (label) label.appendCommand(new Command(line, this.characters));
        }

        break;
      }
    }
  }
};
