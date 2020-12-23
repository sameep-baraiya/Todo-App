const { body } = require('express-validator');

exports.addTodoVal = [
  body('title').not().isEmpty().withMessage('title is required'),
  body('title')
    .isLength({ max: 20 })
    .withMessage('title must be less than 20 characters in length'),
  body('description').not().isEmpty().withMessage('description is required'),
  body('description')
    .isLength({ max: 50 })
    .withMessage('description must be less than 50 characters in length'),
];
