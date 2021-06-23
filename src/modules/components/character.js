module.exports = class Character {
  /**
   * @param  {string} definition
   * @param  {string[][]} args
   */
  constructor(definition, args) {
    const { name, options } = Character.parseArgs(args);

    this.definition = definition;
    this.name = name;
    this.options = options;
  }

  /**
   * @param  {string[][]} args
   */
  static parseArgs(args) {
    if (!Array.isArray(args)) throw new TypeError('Arguments must be an array');

    const name = args[0][0];
    const options = {};
    args.slice(1).forEach((a) => {
      const [name, value] = a;
      if (!name || !value) return;

      options[name] = value;
    });

    return {
      name,
      options,
    };
  }
};
