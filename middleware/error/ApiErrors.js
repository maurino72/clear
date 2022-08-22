const BaseError = require("./BaseError");
const statusCodes = require("./httpStatusCodes");

class Api500Error extends BaseError {
  constructor(
    name,
    statusCode = statusCodes.INTERNAL_SERVER,
    description = "Internal Server Error",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

class Api400Error extends BaseError {
  constructor(
    name = "Error",
    statusCode = statusCodes.BAD_REQUEST,
    description = "Bad Request",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

module.export = Api400Error;
