export class Validator {
  static isValidNumber(query: any): boolean {
    return (
      query &&
      !isNaN(Number(query)) &&
      Number(query) >= 1 &&
      Number(query) <= 3999
    );
  }
}
