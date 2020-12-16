const { game } = require('../../connection');
const gameService = require('./gameService');

module.exports.getNewGame = async (req,res,next) => {
    const newGame = await gameService.getNewGame();
    res.json(newGame);
}

module.exports.checkGameId = async (req,res,next) => {
    const idGame = req.body.idGame;
    const isExist = await gameService.checkGameId(idGame);
    res.json(isExist);
}