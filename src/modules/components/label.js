const Command = require('./command.js');

module.exports = class Label {
  /**
   * @param  {string} name
   * @param  {Command[]} commands
   */
  constructor(name, commands = []) {
    this.name = name;
    this.commands = [...commands];
  }

  /**
   * @param  {Command} command
   */
  appendCommand(command, index = null, overwrite = false) {
    if (!(command instanceof Command))
      throw new TypeError('Command must be instance of Command');

    if (typeof index === 'number') {
      if (overwrite) this.commands[index] = command;
      else this.commands.splice(index, 0, command);
    } else this.commands.push(command);

    return this.commands;
  }
};
