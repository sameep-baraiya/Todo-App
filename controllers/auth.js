const { validationResult } = require('express-validator');
const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/User');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res, next) => {
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
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    return next(err);
  }
};
