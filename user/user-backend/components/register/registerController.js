const passport = require("passport");
const { use } = require("passport");

const registerService = require('./registerService');

module.exports.registerAccount = async (req,res,next) => {

    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;

    await registerService.addAccount(username,password,name,email,phone);

    res.json("success");
}