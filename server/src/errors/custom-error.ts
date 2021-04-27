export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract serializeErrors(): { message: string; field?: string }[];

  constructor(message: string) {
    super(message);

    // because we're extending a built in base class
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
