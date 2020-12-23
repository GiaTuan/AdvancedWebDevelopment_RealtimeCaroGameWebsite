const userService = require('./userService');

module.exports.getAllUsers = async (req,res,next) => {
    console.log(req.user.id);
    const result = await userService.getAllUsers();
    res.json(result);
}

module.exports.verify = async (req,res,next) => {
    res.sendStatus(200);
}
