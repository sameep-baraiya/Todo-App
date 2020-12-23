const ErrorResponse = require('../utils/ErrorResponse');
const Todo = require('../models/Todo');
const TodoAction = require('../models/TodoAction');
const { validationResult } = require('express-validator');

// @desc    Get all todos
// @route   GET /api/v1/todos
// @access  Private
exports.getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.user._id });

    let data = [];
    for (var i = 0; i < todos.length; i++) {
      const temp = await todos[i].populate('tasks').execPopulate();
      data.push(temp);
    }

    res.json({
      success: true,
      data: data,
    });
  } catch (err) {
    console.error(err);
  }
};

// @desc    Add todo
// @route   POST /api/v1/todos
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

// @desc    Add todotask
// @route   POST /api/v1/todos/:id
// @access  Private
exports.addTodoAction = async (req, res, next) => {
  try {
    req.body.todo = req.params.id;
    const todoAction = await TodoAction.create(req.body);
    res.json({
      success: true,
      data: todoAction,
    });
  } catch (err) {
    next(err);
  }
};
