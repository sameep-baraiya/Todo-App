const express = require('express');
const { getTodos } = require('../controllers/todos');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/').get(protect, getTodos);

module.exports = router;
