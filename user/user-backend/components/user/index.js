const express = require('express');
const router = express.Router();
const userController = require('./userController');
const passport = require('../../passport');

router.get('/', passport.authenticate('jwt', { session: false }) , userController.getAllUsers);

router.get('/verify' , passport.authenticate('jwt', { session: false }), userController.verify);

router.get('/:id/history' , passport.authenticate('jwt', { session: false }), userController.getHistoryByUserId);

router.get('/:id', passport.authenticate('jwt', { session: false }), userController.getUserById);
module.exports = router;