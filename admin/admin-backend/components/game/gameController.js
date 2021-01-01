const gameService = require('./gameService');
const chatService = require('../chat/chatService');

module.exports.getAll = async(req,res,next)=>{
    const result = await gameService.getAll();
    res.json(result);
}

module.exports.getGameById = async(req,res,next) => {
    const idGame = req.params.id;
    const result = await gameService.getGameById(idGame);
    res.json(result);
}

module.exports.getHistoryByGameId = async(req,res,next) => {
    const idGame = req.params.id;
    const result = await gameService.getHistoryByGameId(idGame);
    res.json(result);
}

module.exports.getPlayersByGameId = async(req,res,next) => {
    const idGame = req.params.id;
    const result = await gameService.getPlayersByGameId(idGame);
    res.json(result);
}

module.exports.getChatByGameId = async (req,res,next) => {
    const idGame = req.params.id;
    const result = await chatService.getChat(idGame);
    res.json(result);
}