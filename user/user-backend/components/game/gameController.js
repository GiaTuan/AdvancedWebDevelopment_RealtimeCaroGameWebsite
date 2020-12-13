const { game } = require('../../connection');
const gameService = require('./gameService');

module.exports.getNewGame = async (req,res,next) => {
    const idNewGame = await gameService.getNewGameId();
    res.json(idNewGame);
}

module.exports.checkGameId = async (req,res,next) => {
    const idGame = req.body.idGame;
    const isExist = await gameService.checkGameId(idGame);
    res.json(isExist);
}