const userService = require('./userService');

module.exports.getAllUsers = async (req,res,next) => {
    const result = await userService.getAllUsers();
    res.json(result);
}

