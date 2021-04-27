import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 404;
  message = "Route not found";

  constructor() {
    super("Route not authorized");

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
