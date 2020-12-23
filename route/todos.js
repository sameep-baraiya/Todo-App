const express = require('express');
const { getTodos, addTodo, addTodoAction } = require('../controllers/todos');
const { addTodoVal } = require('../validator/todo');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/').get(protect, getTodos).post(protect, addTodoVal, addTodo);
router.route('/:id').post(protect, addTodoAction);

module.exports = router;
