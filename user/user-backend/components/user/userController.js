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


module.exports.activate = async(req,res,next)=>{
    const confirmId = req.query.id;
    const success = await accountService.activate(confirmId);
    res.redirect("http://localhost:3001/");
}

module.exports.changePassword = async (req,res,next) => {
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;
    const id = req.params.id;
    const isMatch = await accountService.checkCurrentPassword(id,currentPassword);
    if(isMatch)
    {
        await accountService.updatePassword(id,newPassword)
        res.status(200).json("Change password success");
    }
    else
    {
        res.status(200).json("Current password is not correct");
    }
}


