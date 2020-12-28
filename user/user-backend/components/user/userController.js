const userService = require('./userService');
const gameService = require('../game/gameService');
const accountService = require('../account/accountService');

module.exports.getAllUsers = async (req,res,next) => {
    const result = await userService.getAllUsers();
    res.json(result);
}

module.exports.verify = async (req,res,next) => {
    res.sendStatus(200);
}

module.exports.getHistoryByUserId = async (req,res,next) => {
    const idUser = req.params.id;
    const result = await gameService.getHistoryByIdUser(idUser);
    res.json(result);
}

module.exports.getUserById = async (req,res,next) => {
    const idUser = req.params.id;
    const result = await accountService.getUserFromId(idUser);
    res.json(result);
}
