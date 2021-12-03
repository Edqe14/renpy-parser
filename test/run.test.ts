import Reader, { Character, Image } from '../src/index';
import Parser from '../src/modules/parser';

import path from 'path';

const parsed: Parser = Reader.parseFromFile(path.join(__dirname, 'main.rpy'));

describe('characters', () => {
  test('defined characters', () => {
    expect(parsed.characters.size).toBe(2);

    const player = parsed.characters.get('p') as Character;
    expect(player).toBeInstanceOf(Character);
    expect(player.name).toBe('Player');
  });
});

describe('labels', () => {
  test('defined labels', () => {
    expect(parsed.labels.size).toBe(4);
  });

  test('intro label', () => {
    const intro = parsed.labels.get('intro');
    expect(intro).not.toBeUndefined();
    expect(intro?.name).toBe('intro');

    // Execute type
    const scene = intro?.commands?.[0];
    expect(scene).not.toBeUndefined();
    expect(scene?.type).toBe('EXECUTE');
    expect(scene?.action).toBe('scene');

    // Narrator type
    const narrator = intro?.commands?.[2];
    expect(narrator).not.toBeUndefined();
    expect(narrator?.type).toBe('NARRATOR');
    expect(typeof narrator?.data?.text).toBe('string');

    // Dialogue type
    const dialog = intro?.commands?.[7];
    expect(dialog).not.toBeUndefined();
    expect(dialog?.type).toBe('DIALOGUE');
    expect(typeof dialog?.data?.text).toBe('string');
    expect(dialog?.data?.character).toBeInstanceOf(Character);
    expect(dialog?.data?.character?.name).toBe('Friend');
  });

  test('menu label', () => {
    const menu = parsed.labels.get('menu');
    expect(menu).not.toBeUndefined();
    expect(menu?.name).toBe('menu');

    const firstMenu = menu?.commands?.[0];
    expect(firstMenu?.type).toBe('MENU');
    expect(firstMenu?.data?.name).toBe('Intro');
  });
});

describe('image', () => {
  test('defined images', () => {
    expect(parsed.images.size).toBe(2);
  });

  test('specific image', () => {
    const images = parsed.images;
    const image = images.get('jane');
    expect(image).not.toBeUndefined();
    expect(image).toBeInstanceOf(Image);
    expect(image?.value).toBe('jane_happy.png');
  });
});
