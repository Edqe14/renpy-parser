import Command from '@/modules/components/command';

export default class Label {
  public name: string;

  public commands: Command[];

  constructor(name: string, commands: Command[] = []) {
    this.name = name;
    this.commands = [...commands];
  }

  appendCommand(command: Command, index = null, overwrite = false) {
    if (!(command instanceof Command)) throw new TypeError('Command must be instance of Command');

    if (typeof index === 'number') {
      if (overwrite) this.commands[index] = command;
      else this.commands.splice(index, 0, command);
    } else this.commands.push(command);

    return this.commands;
  }
}
