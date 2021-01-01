const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const db = require('../../connection');


module.exports.getAll = async () => {
    const result = db.account.findAll({
        attributes: ["id","username","name","email","phone","isadmin","totalplays","totalwins","point","isblocked"],
        order: [
            'id'
        ]
    });
    return result;
}

module.exports.getAccountById = async(id) => {
    const result = db.account.findAll({
        attributes: ["id","username","name","email","phone","isadmin","totalplays","totalwins","point","isblocked"],
        where: {
            id: id
        }
    });
    return result;
}

module.exports.blockedUserById = async (id) => {
    const result = db.account.update({isblocked: true},{
        where: {
            id: id
        }
    })
    return result;
}

module.exports.unblockedUserById = async (id) => {
    const result = db.account.update({isblocked: false},{
        where: {
            id: id
        }
    })
    return result;
}

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

module.exports.getAllGamesByUserId = async (id) => {
    const result = db.gameUser.findAll({
        attributes: [['idgame', 'id'],[Sequelize.col('Game.winner'), 'winner']],
        where: {
            iduser: id
        },
        include: [{
            model: db.game,
            required: true
        }],
        order: ['idgame']
    })
    return result;
}