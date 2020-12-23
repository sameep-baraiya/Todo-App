const express = require('express');
const { getTodos, addTodo } = require('../controllers/todos');
const { addTodoVal } = require('../validator/todo');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/').get(protect, getTodos).post(protect, addTodoVal, addTodo);

module.exports = router;
