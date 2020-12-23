const express = require('express');
const { register, login } = require('../controllers/auth');
const { registerVal, loginVal } = require('../validator/auth');
const router = express.Router();

router.route('/register').post(registerVal, register);
router.route('/login').post(loginVal, login);

module.exports = router;
