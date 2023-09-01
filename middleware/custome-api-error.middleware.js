export class CustomeAPIError extends Error {
  // extends the Error class and add status code
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
