export default class Helper {
  static isCommentOrEmpty(line: string) {
    return line.trim().startsWith('#') || line.trim().length === 0;
  }

  static isIndented(line: string) {
    return line.startsWith('    ') || line.startsWith('  ') || line.startsWith('\t');
  }

  static extractQuote(line: string) {
    return (line.match(Helper.QUOTE_REGEX)?.[1] ?? '');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static clearUndefinedOrNull(object: Record<string, any>) {
    Object
      .keys(object)
      // eslint-disable-next-line no-param-reassign
      .forEach((k) => object[k] === undefined || object[k] === null ? delete object[k] : null);
    return object;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static convertTo2D(array: any[] = [], row = 2) {
    const newArr = [];
    while (array.length) newArr.push(array.splice(0, row));

    return newArr;
  }

  static get QUOTE_REGEX() {
    return /"(.*?)"/;
  }
}
