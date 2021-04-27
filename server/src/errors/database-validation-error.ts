import { CustomError } from "./custom-error";

export class DatabaseValidationError extends CustomError {
  statusCode = 400;

  constructor(private errors: { [key: string]: string }) {
    super("Bad request error");

    Object.setPrototypeOf(this, DatabaseValidationError.prototype);
  }

  private formatMessage() {
    const isMinLengthError = this.errors.type === "minlength" ? true : false;

    const message = `${this.errors.message}, ${
      isMinLengthError ? "min length" : "max length"
    } is ${this.errors[isMinLengthError ? "minlength" : "maxlength"]}`;

    return message;
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    console.log("Errors", this.errors);

    return [
      {
        message: this.formatMessage(),
        field: this.errors.path,
      },
    ];
  }
}
