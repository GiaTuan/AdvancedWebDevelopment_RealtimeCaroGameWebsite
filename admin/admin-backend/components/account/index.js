const express = require('express');
const router = express.Router();
const accountController = require('./accountController');
const passport = require('../../passport');

router.get('/' , passport.authenticate('jwt', { session: false }), accountController.getAll);

router.get('/verify' , passport.authenticate('jwt', { session: false }), accountController.verify);

router.get('/:id' , passport.authenticate('jwt', { session: false }), accountController.getAccountById);

router.get('/:id/block' , passport.authenticate('jwt', { session: false }), accountController.blockedUserById);

router.get('/:id/unblock' , passport.authenticate('jwt', { session: false }), accountController.unblockedUserById);

router.get('/:id/games' , passport.authenticate('jwt', { session: false }), accountController.getAllGamesByUserId);

module.exports = router;