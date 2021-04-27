import { CustomError } from "./custom-error";

export class DatabaseError extends CustomError {
  statusCode = 500;

  constructor(public message: string) {
    super("Error connecting to db");

    Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
