const express = require('express');
const {
  getTodos,
  addTodo,
  addTodoAction,
  updateTodo,
  updateTodoAction,
  deleteTodo,
  deleteTodoAction,
} = require('../controllers/todos');
const { addTodoVal } = require('../validator/todo');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/').get(protect, getTodos).post(protect, addTodoVal, addTodo);
router
  .route('/:id')
  .post(protect, addTodoAction)
  .put(protect, updateTodo)
  .delete(protect, deleteTodo);
router
  .route('/todoaction/:id')
  .put(protect, updateTodoAction)
  .delete(protect, deleteTodoAction);

module.exports = router;
