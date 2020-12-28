const express = require('express');
const router = express.Router();
const gameController = require('./gameController');
const passport = require('../../passport');


router.get('/', passport.authenticate('jwt', { session: false }), gameController.getAllGames);

router.get('/add', passport.authenticate('jwt', { session: false }), gameController.getNewGame);

router.get('/:id', passport.authenticate('jwt', { session: false }), gameController.getGameById);

router.get('/:id/chat', passport.authenticate('jwt', { session: false }), gameController.getChatByGameId);

router.get('/:id/history', passport.authenticate('jwt', { session: false }), gameController.getHistoryByGameId);

router.get('/:id/players', passport.authenticate('jwt', { session: false }), gameController.getPlayersByGameId);

router.post('/check', passport.authenticate('jwt', { session: false }), gameController.checkGameId);

module.exports = router;