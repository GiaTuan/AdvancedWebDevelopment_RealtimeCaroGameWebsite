const accountService = require('../account/accountService');
module.exports.addAccount = async (username,password,name,email,phone) => {
    await accountService.addAccount(username,password,name,email,phone);
    return true;
}

module.exports.checkUsername = async(username) => {
    const result = db.account.findOne({
        where:{
            username: username
        }
    })
    if(result !== undefined) return true;
    return false;
}