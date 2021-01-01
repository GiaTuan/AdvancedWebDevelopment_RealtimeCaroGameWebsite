const bcrypt = require('bcryptjs');
const db = require('../../connection');

module.exports.addAccount = async (username,password,name,email,phone) => {
    let hashPassword;
    if(password != null)
    {
        const salt = bcrypt.genSaltSync(10);
        hashPassword = bcrypt.hashSync(password, salt);
    }

    const id = await db.account.create({username: username,password: hashPassword,email: email, name: name, phone: phone, totalplays : 0, totalwins : 0, point : 0, isblocked : false, isadmin: false});
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

module.exports.getUserFromId = async (userId) => {
    const user = await db.account.findAll({
        attributes: ['id','email','name','phone','totalplays', 'totalwins' , 'point' , 'isblocked','isadmin'],
        where: {
            id: userId
        }
    })
    if(user.length > 0)
    {
       return user[0];
    }
    return null;
}

module.exports.getAllUsers = async () => {
    const users = await db.account.findAll({
        attributes: ['id','username','name','email','phone'],
        where: {
            isadmin: false
        },
        order: [['point', 'DESC']]
    });
    return users;
}

module.exports.getTotalPlaysByIdUser = async (idUser) => {
    const user = await db.account.findAll({
        attributes: ['totalplays'],
        where: {
            id: idUser
        }
    })
    if(user.length > 0)
    {
       return user[0].totalplays;
    }
    return null;
}

module.exports.updateTotalPlaysByIdUser = async (idUser) => {
    const totalPlays = await this.getTotalPlaysByIdUser(idUser);
    const result = await db.account.update({totalplays: totalPlays + 1},{
        where: {
            id: idUser
        }
    })
}

module.exports.getTotalWinsByIdUser = async (idUser) => {
    const user = await db.account.findAll({
        attributes: ['totalwins'],
        where: {
            id: idUser
        }
    })
    if(user.length > 0)
    {
       return user[0].totalwins;
    }
    return null;
}

module.exports.updateTotalWinsByIdUser = async (idUser) => {
    const totalWins = await this.getTotalWinsByIdUser(idUser);
    const result = await db.account.update({totalwins: totalWins + 1},{
        where: {
            id: idUser
        }
    })
}

module.exports.getTotalPointsByIdUser = async (idUser) => {
    const user = await db.account.findAll({
        attributes: ['point'],
        where: {
            id: idUser
        }
    })
    if(user.length > 0)
    {
       return user[0].point;
    }
    return null;
}

module.exports.updateWinner = async (idUser) => {
    const totalWins = await this.getTotalWinsByIdUser(idUser);
    const totalPlays = await this.getTotalPlaysByIdUser(idUser);
    const totalPoints = await this.getTotalPointsByIdUser(idUser);
    const result = await db.account.update({totalwins: totalWins + 1, totalPlays: totalPlays + 1, point: totalPoints + 10},{
        where: {
            id: idUser
        }
    })
}