const ErrorResponse = require('../utils/ErrorResponse');
const Todo = require('../models/Todo');
const { validationResult } = require('express-validator');

// @desc    Get all todos
// @route   GET /api/v1/todos
// @access  Private
exports.getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.user._id });

    res.json({
      success: true,
      data: todos,
    });
  } catch (err) {
    console.error(err);
  }
};

// @desc    Get all todos
// @route   GET /api/v1/todos
// @access  Private
exports.addTodo = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new ErrorResponse(
          'addTodo validation error',
          400,
          'express-validator',
          errors.array()
        )
      );
    }

    req.body.user = req.user._id;
    const todo = await Todo.create(req.body);

    res.json({
      success: true,
      data: todo,
    });
  } catch (err) {
    next(err);
  }
};
