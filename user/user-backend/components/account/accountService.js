const bcrypt = require('bcryptjs');
const db = require('../../connection');

module.exports.addAccount = async (username,password,name,email,phone) => {
    let hashPassword;
    if(password != null)
    {
        const salt = bcrypt.genSaltSync(10);
        hashPassword = bcrypt.hashSync(password, salt);
    }

    const id = await db.account.create({username: username,password: hashPassword,email: email, name: name, phone: phone, isadmin: false});
    return id;
}

module.exports.authenAccount = async (username,password) => {
    const user = await db.account.findAll({
        where: {
            username: username
        }
    });
    if(user.length > 0)
    {
        const hashedPassword = user[0].password;
        const isMatch = bcrypt.compareSync(password,hashedPassword);
        if(isMatch) return [true,user[0]];
        return [false,null];
    }
    else return [false,null];
}
