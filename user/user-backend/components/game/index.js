const express = require('express');
const router = express.Router();
const gameController = require('./gameController');
const passport = require('../../passport');


router.get('/', passport.authenticate('jwt', { session: false }), gameController.getNewGame);

router.post('/check',  gameController.checkGameId);

router.get('/all', gameController.getAllGames);


module.exports = router;