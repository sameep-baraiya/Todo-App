const ErrorResponse = require('../utils/ErrorResponse');

// @desc    Get all todos
// @route   GET /api/v1/todos
// @access  Private
exports.getTodos = (req, res, next) => {
  res.json({
    success: true,
    data: null,
  });
};
