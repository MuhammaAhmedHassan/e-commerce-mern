import { CustomError } from "./custom-error";

export class DatabaseUniqueValueError extends CustomError {
  statusCode = 400;

  constructor(private errors: { [key: string]: string }) {
    super("Bad request error");

    Object.setPrototypeOf(this, DatabaseUniqueValueError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    // error type
    // "keyValue": {
    //     "slug": "react"
    //   }
    return Object.keys(this.errors).map((key) => ({
      message: `${key} with a value '${this.errors[key]}' already exists`,
      field: key,
    }));
  }
}
