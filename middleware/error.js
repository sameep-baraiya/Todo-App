const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next) => {
  // Log to console for dev
  if (process.env.NODE_ENV === 'development') {
    console.log('-----ERROR-----'.red.underline);
    console.log(err);
    console.log('---------------'.red.underline);
  }

  if (err.name === 'MongoError') {
    if (err.code === 11000) {
      res.status(404).json({
        success: false,
        error: 'Duplicate field entered',
        flag: 'duplicate-field',
      });
      return;
    }
  }

  if (err.errorFlag === 'express-validator') {
    res.status(err.statusCode || 500).json({
      success: false,
      error: err.message,
      flag: 'express-validator',
      errors: err.payload,
    });
    return;
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error',
  });
};

module.exports = errorHandler;
