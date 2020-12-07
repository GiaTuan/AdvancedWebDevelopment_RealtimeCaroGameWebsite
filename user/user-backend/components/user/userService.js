const accountService = require('../account/accountService');

module.exports.getAllUsers = async () => {
    return await accountService.getAllUsers();
}