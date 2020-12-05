const accountService = require('../account/accountService');
module.exports.addAccount = async (username,password,name,email,phone) => {
    await accountService.addAccount(username,password,name,email,phone);
    return true;
}