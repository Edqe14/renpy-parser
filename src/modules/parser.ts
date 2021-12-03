/* eslint-disable no-underscore-dangle */
import * as lexure from 'lexure';
import {
  Character, Label, Command, Image
} from '@/modules/components/index';
import Helper from '@/modules/helper';

export default class Parser {
  public characters: Map<string, Character>;

  public labels: Map<string, Label>;

  public images: Map<string, Image>;

  /**
   * @ignore
   */
  private _activeLabel: string | null;

  constructor(str: string) {
    if (!str || typeof str !== 'string') throw new TypeError('Input need to be a string!');

    this.characters = new Map();
    this.labels = new Map();
    this.images = new Map();

    this._activeLabel = null;

    this.parse(str);
  }

  parse(str: string) {
    const lines = str
      .replace(/\r\n/gi, '\n')
      .split('\n')
      .filter((l) => !Helper.isCommentOrEmpty(l));

    lines.forEach((line) => this.parseLine(line));
  }

  parseLine(line: string) {
    const parsedLine = new lexure.Lexer(line)
      .setQuotes([
        ['"', '"'],
        ['\'', '\'']
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
    const command = split[0].replace(/:/gi, '');

    switch (command) {
      case 'label': {
        const name = split[1].replace(/:/gi, '');
        if (!this.labels.has(name)) this.labels.set(name, new Label(name));

        this._activeLabel = name;
        break;
      }

      case 'menu':
      case 'init': {
        if (!this.labels.has(command)) this.labels.set(command, new Label(command));

        this._activeLabel = command;
        break;
      }

      default: {
        if (Helper.isIndented(line)) {
          const label = this.labels.get(this._activeLabel as string);
          if (label) label.appendCommand(new Command(line, this.characters, this._activeLabel));
        }

        if (command === 'image') {
          const name = split[1];
          const value = line.split('=')[1].trim().replace(/"/gi, '');

          const image = new Image(name, value, this._activeLabel);
          this.images.set(image.name, image);
          break;
        }

        if (command === 'define' || command === '$') {
          if (split[3].startsWith('Character')) {
            const def = split[1];
            const args = split
              .slice(3)
              .join(' ')
              .replace(/(Character\(|\)|"|')/gi, '')
              .split(', ')
              .map((o) => o.split('='));

            const character = new Character(def, args, this._activeLabel);
            this.characters.set(character.definition as string, character);
          }

          break;
        }
      }
    }
  }
}
