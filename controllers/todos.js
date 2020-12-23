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

// @desc    Add todoaction
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

// @desc    Update todo
// @route   PUT /api/v1/todos/:id
// @access  Private
exports.updateTodo = async (req, res, next) => {
  try {
    let todo = await Todo.findById(req.params.id);
    if (!todo) {
      return next(
        new ErrorResponse(`Todo not found with id of ${req.params.id}`, 404)
      );
    }

    todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: todo });
  } catch (err) {
    next(err);
  }
};

// @desc    Update todoaction
// @route   PUT /api/v1/todos/todoaction/:id
// @access  Private
exports.updateTodoAction = async (req, res, next) => {
  try {
    let todoAction = await TodoAction.findById(req.params.id);
    if (!todoAction) {
      return next(
        new ErrorResponse(
          `TodoAction not found with id of ${req.params.id}`,
          404
        )
      );
    }

    todoAction = await TodoAction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: todoAction });
  } catch (err) {
    next(err);
  }
};

// @desc    Delet todo
// @route   DELETE /api/v1/todos/:id
// @access  Private
exports.deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return next(
        new ErrorResponse(`Todo not found with id of ${req.params.id}`, 404)
      );
    }

    todo.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};

// @desc    Delet todoaction
// @route   DELETE /api/v1/todos/:id
// @access  Private
exports.deleteTodoAction = async (req, res, next) => {
  try {
    const todoAction = await TodoAction.findById(req.params.id);
    if (!todoAction) {
      return next(
        new ErrorResponse(
          `TodoAction not found with id of ${req.params.id}`,
          404
        )
      );
    }

    todoAction.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
