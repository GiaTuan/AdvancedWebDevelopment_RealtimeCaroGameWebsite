const { game } = require('../../connection');
const gameService = require('./gameService');
const chatService = require('../chat/chatService');

module.exports.getNewGame = async (req,res,next) => {
    const newGame = await gameService.getNewGame();
    res.json(newGame);
}

module.exports.getGameById = async(req,res,next) => {
    const idGame = req.params.id;
    const result = await gameService.getGameById(idGame);
    res.json(result);
}

module.exports.getChatByGameId = async (req,res,next) => {
    const idGame = req.params.id;
    const result = await chatService.getChat(idGame);
    res.json(result);
}

module.exports.getHistoryByGameId = async (req,res,next) => {
    const idGame = req.params.id;
    const result = await gameService.getHistoryByGameId(idGame);
    res.json(result);
}

module.exports.getPlayersByGameId = async (req,res,next) => {
    const idGame = req.params.id;
    const result = await gameService.getPlayersByGameId(idGame);
    res.json(result);
}


module.exports.checkGameId = async (req,res,next) => {
    const idGame = req.body.idGame;
    const isExist = await gameService.checkGameId(idGame);
    res.json(isExist);
}

module.exports.getAllGames = async(req,res,next) => {
    const games = await gameService.getAllGames();
    res.json(games);
}