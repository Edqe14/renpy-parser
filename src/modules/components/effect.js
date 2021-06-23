module.exports = class Effect {
  /**
   * @param  {string} name
   * @param  {number} duration
   */
  constructor(name, duration) {
    this.name = name;
    this.duration = duration;
  }
};
