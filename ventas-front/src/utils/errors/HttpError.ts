export class HttpError extends Error {
  code: number;

  /**
   * First digit of code.
   */
  type: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
    this.type = Math.floor(code / 100);

    // Important: Set the prototype explicitly if transpiling weirdly.
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
