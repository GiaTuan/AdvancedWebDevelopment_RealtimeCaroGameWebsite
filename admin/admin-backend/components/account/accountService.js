const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../../connection');

module.exports.addAcount = async (username, password, name, email, phone) => {
    let hashPassword;

    if(password != null)
        hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(5));
    
    return await db.account.create({username: username, password: hashPassword, email: email, name: name, phone: phone, isAdmin: true})
}

module.exports.authenAccount = async (username, password) => {
    
    const user = await db.account.findOne({
        where: {
            username: username
        }
    });

    if(user != null)  
        if(bcrypt.compareSync(password, user.password))
            return ['Success', user];
        else
            return ['Username or password incorrect', null];

    return ['Not found', null];
    
}