const Runner = require('../src/index.js');

const fs = require('fs');
const path = require('path');
const {
  Command,
  Character,
  Effect,
} = require('../src/modules/components/index.js');

const testFile = path.join(__dirname, 'test.rpy');
const file = fs.readFileSync(testFile, 'utf8');

const parsed = Runner.parseFromText(file);

const start = parsed.labels[0];
describe('command parser', () => {
  test('narrator type', () => {
    const narrator = start.commands[2];
    expect(narrator).toBeInstanceOf(Command);
    expect(narrator.type).toBe('NARRATOR');
  });

  describe('execute type', () => {
    test('scene', () => {
      const execute = start.commands[0];
      expect(execute).toBeInstanceOf(Command);
      expect(execute.type).toBe('EXECUTE');
      expect(execute.action).toBe('scene');
      expect(execute.name).toBe('bg test');
    });

    test('transition', () => {
      const execute = start.commands[1];
      expect(execute).toBeInstanceOf(Command);
      expect(execute.type).toBe('EXECUTE');
      expect(execute.action).toBe('with');
      expect(execute.name).toBe('fade');
    });

    test('show w/o expression', () => {
      const execute = start.commands[8];
      expect(execute).toBeInstanceOf(Command);
      expect(execute.type).toBe('EXECUTE');
      expect(execute.action).toBe('show');
      expect(execute.expression).toBe(undefined);
    });

    test('show w/ expression', () => {
      const execute = start.commands[18];
      expect(execute).toBeInstanceOf(Command);
      expect(execute.type).toBe('EXECUTE');
      expect(execute.action).toBe('show');
      expect(execute.expression).toBe('shadowed');
    });

    const audio = parsed.labels[1];

    test('pause w/o duration', () => {
      const execute = audio.commands[5];
      expect(execute).toBeInstanceOf(Command);
      expect(execute.type).toBe('EXECUTE');
      expect(execute.action).toBe('pause');
      expect(execute.duration).toBe(undefined);
    });

    test('pause w/ duration', () => {
      const execute = audio.commands[6];
      expect(execute).toBeInstanceOf(Command);
      expect(execute.type).toBe('EXECUTE');
      expect(execute.action).toBe('pause');
      expect(execute.duration).toBe(3);
    });

    test('return/end', () => {
      const execute = audio.commands[7];
      expect(execute).toBeInstanceOf(Command);
      expect(execute.type).toBe('EXECUTE');
      expect(execute.action).toBe('return');
    });

    describe('audio', () => {
      test('play music w/o effects', () => {
        const play = audio.commands[0];
        expect(play).toBeInstanceOf(Command);
        expect(play.type).toBe('EXECUTE');
        expect(play.action).toBe('play');
        expect(play.category).toBe('music');
        expect(play.name).toBe('illurock.ogg');
      });

      test('play music w/ effects', () => {
        const play = audio.commands[1];
        expect(play).toBeInstanceOf(Command);
        expect(play.type).toBe('EXECUTE');
        expect(play.action).toBe('play');
        expect(play.category).toBe('music');
        expect(play.name).toBe('illurock.ogg');

        const effect = play.effects[0];
        expect(effect).toBeInstanceOf(Effect);
        expect(effect.name).toBe('fadeout');
        expect(effect.duration).toBe(1);
      });

      test('queue music', () => {
        const play = audio.commands[2];
        expect(play).toBeInstanceOf(Command);
        expect(play.type).toBe('EXECUTE');
        expect(play.action).toBe('queue');
        expect(play.category).toBe('music');
        expect(play.name).toBe('next_track.opus');
      });

      test('stop music', () => {
        const play = audio.commands[3];
        expect(play).toBeInstanceOf(Command);
        expect(play.type).toBe('EXECUTE');
        expect(play.action).toBe('stop');
        expect(play.category).toBe('music');
      });
    });
  });

  test('dialogue type', () => {
    const dialogue = start.commands[9];
    expect(dialogue).toBeInstanceOf(Command);
    expect(dialogue.type).toBe('DIALOGUE');

    expect(dialogue.character).toBeInstanceOf(Character);
  });
});
