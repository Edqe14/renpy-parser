export default class Image {
  public name: string;

  public value: string;

  public at: string | null;

  constructor(name: string, value: string, at: string | null) {
    this.name = name;
    this.value = value;
    this.at = at;
  }
}
