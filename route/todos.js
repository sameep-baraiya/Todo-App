const express = require('express');
const { getTodos } = require('../controllers/todos');
const router = express.Router();

router.route('/').get(getTodos);

module.exports = router;
