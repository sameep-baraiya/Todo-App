class ErrorResponse extends Error {
  constructor(message, statusCode, errorFlag = 'regular', payload = null) {
    super(message);
    this.statusCode = statusCode;
    this.errorFlag = errorFlag;
    this.payload = payload;
  }
}

module.exports = ErrorResponse;
