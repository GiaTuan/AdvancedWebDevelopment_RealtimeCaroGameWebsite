const express = require('express');
const router = express.Router();
const loginController = require('./loginController');
const passport = require('../../passport');

router.post('/', passport.authenticate('local',{session: false}) , loginController.loginAccount);

router.post('/forgotPassword',loginController.forgotPassword);
router.post('/google',  loginController.loginGoogle);
router.post('/facebook',  loginController.loginFacebook);

module.exports = router;