/* eslint-disable @typescript-eslint/no-explicit-any */

import { Lexer, Token } from 'lexure';
import Character from '@/modules/components/character';
import Effect from '@/modules/components/effect';
import Helper from '@/modules/helper';

export interface ParsedLine {
  type: string;
  [key: string]: any;
}

export default class Command {
  public data: Record<string, any>;

  constructor(line: string, characters: Character[]) {
    const parsed = Command.parseLine(line, characters);
    this.data = Helper.clearUndefinedOrNull(parsed);
  }

  static parseLine(line: string, characters: Character[]): ParsedLine {
    const trimmed = line.trim();
    const lexer = new Lexer(trimmed).setQuotes([['"', '"']]);

    const parsed = lexer.lex();
    const [whoOrCommandOrNarrator, valueOrCharacter, ...expressionOrOthers] = parsed;

    const type = Command.getType(parsed);
    const obj = {
      type
    };

    switch (type) {
      case 'NARRATOR': {
        Object.assign(obj, {
          text: whoOrCommandOrNarrator.value
        });
        break;
      }

      case 'EXECUTE': {
        const exp = expressionOrOthers.map((c) => c.value).join(' ');
        const action = whoOrCommandOrNarrator?.value;

        switch (action) {
          case 'scene': {
            Object.assign(obj, {
              action,
              name: [valueOrCharacter?.value, ...exp.split(' ')]
                .filter((v) => v !== undefined || v !== null)
                .join(' ')
            });
            break;
          }

          case 'with': {
            Object.assign(obj, {
              action,
              name: valueOrCharacter?.value
            });
            break;
          }

          case 'play':
          case 'queue':
          case 'stop': {
            const effects = Helper.convertTo2D(expressionOrOthers.slice(1)).map(
              ([name, duration]) => new Effect(
                name.value,
                Number.isNaN(duration.value) ? 1 : Number(duration.value)
              )
            );

            Object.assign(obj, {
              action,
              category: valueOrCharacter.value,
              name: expressionOrOthers[0]?.value,
              effects: effects.length === 0 ? null : effects
            });
            break;
          }

          case 'pause': {
            const duration = Number(valueOrCharacter?.value);

            Object.assign(obj, {
              action,
              duration: Number.isNaN(duration) ? null : duration
            });

            break;
          }

          case 'jump': {
            Object.assign(obj, {
              action,
              name: valueOrCharacter?.value
            });
            break;
          }

          default: {
            Object.assign(obj, {
              action,
              character: valueOrCharacter?.value,
              ...(exp.length && { expression: exp })
            });
            break;
          }
        }
        break;
      }

      case 'DIALOGUE': {
        Object.assign(obj, {
          character:
            characters.find(
              (c) => c.definition === whoOrCommandOrNarrator.value
            ) ?? new Character(null, [[whoOrCommandOrNarrator.value]]),
          text: valueOrCharacter.value
        });
        break;
      }

      default: break;
    }

    return obj;
  }

  static getType(parsed: Token[]) {
    if (parsed.length === 1 && parsed[0].raw.startsWith('"')) return 'NARRATOR';

    const cmd = parsed[0].value;
    if (Command.EXECUTE_TYPE.includes(cmd)) return 'EXECUTE';
    return 'DIALOGUE';
  }

  static get EXECUTE_TYPE() {
    return [
      'show',
      'hide',
      'scene',
      'with',
      'play',
      'queue',
      'stop',
      'pause',
      'return',
      'jump'
    ];
  }
}
