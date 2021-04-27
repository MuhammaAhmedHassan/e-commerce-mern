import { CustomError } from "./custom-error";

export class ServerError extends CustomError {
  statusCode = 500;
  message = "Something went wrong, please try again";

  constructor() {
    super("Server Error");

    Object.setPrototypeOf(this, ServerError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
