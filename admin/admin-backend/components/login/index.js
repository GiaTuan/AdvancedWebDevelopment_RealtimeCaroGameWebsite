const express = require('express');
const router = express.Router();
const loginController = require('./loginController');
const passport = require('../../passport');

router.post('/', passport.authenticate('local', {session: false}), loginController.loginAccount);

module.exports = router;