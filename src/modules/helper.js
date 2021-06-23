module.exports = class Helper {
  /**
   * @param  {string} line
   */
  static isCommentOrEmpty(line) {
    return line.trim().startsWith('#') || line.trim().length === 0;
  }

  /**
   * @param  {string} line
   */
  static isIndented(line) {
    return line.startsWith('    ') || line.startsWith('\t');
  }

  /**
   * @param  {string} line
   */
  static extractQuote(line) {
    return (line.match(Helper.QUOTE_REGEX)[0] ?? '').replace(/"/gi, '');
  }

  /**
   * @param  {object} object
   */
  static clearUndefinedOrNull(object = {}) {
    Object.keys(object).forEach((k) =>
      object[k] === undefined || object[k] === null ? delete object[k] : null
    );
    return object;
  }

  /**
   * @param  {string[]} array
   * @param  {number} row
   */
  static convertTo2D(array = [], row = 2) {
    const newArr = [];
    while (array.length) newArr.push(array.splice(0, row));

    return newArr;
  }

  static get QUOTE_REGEX() {
    return /(?:"[^"]*"|^[^"]*$)/;
  }
};
