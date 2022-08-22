const logError = (err) => {
  console.error(err); // Change for a logger functionality
};

const logErrorMiddleware = (err, req, res, next) => {
  logError(err); // Change for a logger functionality
  next(err);
};

const returnError = (err, req, res, next) => {
  res.status(err.statusCode || 500).json(err.message);
};

const isOperationalError = (error) => {
  if (error instanceof BaseError) {
    return error.isOperational;
  }
  return false;
};

module.exports = {
  logError,
  logErrorMiddleware,
  returnError,
  isOperationalError
};
