const { validationResult } = require('express-validator');
const ErrorResponse = require('../utils/ErrorResponse');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new ErrorResponse(
        'Registration validation error',
        400,
        'express-validator',
        errors.array()
      )
    );
  }
  res.status(200).json({
    success: true,
    data: req.body,
  });
};
