const { body } = require('express-validator');

exports.registerVal = [
  body('username').not().isEmpty().withMessage('username is required'),
  body('username')
    .isLength({ min: 3, max: 16 })
    .withMessage('username must be 3-16 characters in length')
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage('username must be alphanumeric'),
  body('password').not().isEmpty().withMessage('password is required'),
  body('password')
    .isLength({ min: 6, max: 16 })
    .withMessage('password must be 6-16 characters in length')
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .withMessage(
      'password must be alphanumeric, contain special character(!@#$%^&*)'
    ),
  body('email').not().isEmpty().withMessage('email is required'),
  body('email').isEmail().withMessage('email must be valid'),
];

exports.loginVal = [
  body('password').not().isEmpty().withMessage('password is required'),
  body('password')
    .isLength({ min: 6, max: 16 })
    .withMessage('password must be 6-16 characters in length')
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .withMessage(
      'password must be alphanumeric, contain special character(!@#$%^&*)'
    ),
  body('email').not().isEmpty().withMessage('email is required'),
  body('email').isEmail().withMessage('email must be valid'),
];
