const express = require('express');
const router = express.Router();
const gameController = require('./gameController');


router.get('/', gameController.getNewGame);

router.post('/check', gameController.checkGameId);


module.exports = router;