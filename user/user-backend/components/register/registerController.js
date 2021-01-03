const passport = require("passport");
const { use } = require("passport");
const accountService = require('../account/accountService');
const registerService = require('./registerService');

module.exports.registerAccount = async (req,res,next) => {

    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;

    const checkUsername = await accountService.checkUsername(username);
    if(checkUsername !== null)
    {
        res.status(403).json("Username already existed");
    }
    const checkEmail = await accountService.checkEmail(email);
    if(checkEmail !== null)
    {
        res.status(403).json("Email already existed");
    }
    await registerService.addAccount(username,password,name,email,phone);

    res.json("success");
}