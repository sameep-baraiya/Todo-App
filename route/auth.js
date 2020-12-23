const express = require('express');
const { register, login, logout } = require('../controllers/auth');
const { registerVal, loginVal } = require('../validator/auth');
const router = express.Router();

router.route('/register').post(registerVal, register);
router.route('/login').post(loginVal, login);
router.route('/logout').get(logout);

module.exports = router;
