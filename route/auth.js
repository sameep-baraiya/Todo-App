const express = require('express');
const { register } = require('../controllers/auth');
const { registerVal } = require('../validator/auth');
const router = express.Router();

router.route('/').post(registerVal, register);

module.exports = router;
