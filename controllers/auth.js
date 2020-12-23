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
    sendTokenResponse(user, 200, res);
  } catch (err) {
    return next(err);
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new ErrorResponse(
        'Login validation error',
        400,
        'express-validator',
        errors.array()
      )
    );
  }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(
        new ErrorResponse('Invalid credentials', 401, 'invalid-credentials')
      );
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(
        new ErrorResponse('Invalid credentials', 401, 'invalid-credentials')
      );
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    return next(err);
  }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const option = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    option.secure = true;
  }

  res.status(statusCode).cookie('token', token, option).json({
    success: true,
    token,
  });
};

// @desc    Log user out / clear cookie
// @route   GET /api/v1/auth/logout
// @access  Private
exports.logout = async (req, res, next) => {
  try {
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    console.error(err);
  }
};
