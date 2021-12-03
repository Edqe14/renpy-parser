export default class Character {
  public name: string;

  public options: Record<string, string>;

  public definition: string | null;

  constructor(definition: string | null, args: string[][]) {
    const { name, options } = Character.parseArgs(args);

    this.definition = definition;
    this.name = name;
    this.options = options;
  }

  static parseArgs(args: string[][]) {
    if (!Array.isArray(args)) throw new TypeError('Arguments must be an array');

    const name = args[0][0];
    const options = {} as Record<string, string>;
    args.slice(1).forEach((a) => {
      const [key, value] = a;
      if (!key || !value) return;

      options[key] = value;
    });

    return {
      name,
      options
    };
  }
}
