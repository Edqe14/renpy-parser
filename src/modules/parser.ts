import * as lexure from 'lexure';
import {
  Character, Label, Command, Image
} from '@/modules/components/index';
import Helper from '@/modules/helper';

export default class Parser {
  public characters: Character[];

  public labels: Label[];

  public images: Image[];

  /**
   * @ignore
   */
  private activeLabel: string | null;

  constructor(str: string) {
    this.characters = [];
    this.labels = [];
    this.images = [];

    this.activeLabel = null;

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

          this.characters.push(new Character(def, args));
        }

        break;
      }

      case 'image': {
        const name = split[1];
        const file = line.split('=')[1].trim().replace(/"/gi, '');

        this.images.push(new Image(name, file));
        break;
      }

      case 'label':
      case 'menu': {
        const name = command === 'menu' ? 'menu' : split[1].replace(/:/gi, '');
        if (!this.labels.some((l) => l.name === name)) {
          this.labels.push(new Label(name));
        }

        this.activeLabel = name;
        break;
      }

      default: {
        if (Helper.isIndented(line)) {
          const label = this.labels.find((l) => l.name === this.activeLabel);
          if (label) label.appendCommand(new Command(line, this.characters));
        }

        break;
      }
    }
  }
}