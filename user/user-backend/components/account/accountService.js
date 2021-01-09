const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");
const db = require('../../connection');

module.exports.addAccount = async (username,password,name,email,phone) => {
    let hashPassword;
    if(password != null)
    {
        const salt = bcrypt.genSaltSync(10);
        hashPassword = bcrypt.hashSync(password, salt);
    }

    const activateID = Math.floor(Math.random() * 900000);

    //send email
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
          user: 'tuan0949@gmail.com', 
          pass: 'Tuantun123', 
        },
      });
    
    const info = await transporter.sendMail({
        from: 'tuan0949@gmail.com', 
        to: email, 
        subject: "Activate account", 
        html: '<p>Click <a href="http://localhost:3000/users/activate?id=' + activateID + '">here</a> to activate account</p>'
    });

    const result = await db.account.create({username: username,password: hashPassword,email: email, name: name, phone: phone, totalplays : 0, totalwins : 0, point : 0, isblocked : false, isadmin: false, isconfirmed: activateID});
    return result;
}

module.exports.forgotPassword = async (email) => {
    const tempPassword = Math.floor(Math.random() * 900000000).toString();
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(tempPassword, salt);
    db.account.update({password: hashPassword},{
        where:{
            email: email
        }
    })
    //send email
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
          user: 'tuan0949@gmail.com', 
          pass: 'Tuantun123', 
        },
      });
    
    const info = await transporter.sendMail({
        from: 'tuan0949@gmail.com', 
        to: email, 
        subject: "Recover password", 
        html: '<p>Your temporary password: '+ tempPassword + '</p>' +'<p>Click <a href="http://localhost:3001">here</a> to login with your temporary password</p>'
    });
}

module.exports.checkCurrentPassword = async (id,currentPassword) => {
    const user = await db.account.findOne({
        where:{
            id: id
        }
    });

    const hashedPassword = user.password;
    const isMatch = bcrypt.compareSync(currentPassword,hashedPassword);
    return isMatch;
}

module.exports.updatePassword = async (id,newPassword) => {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(newPassword, salt);
    const user = await db.account.update({password: hashPassword},{
        where:{
            id: id
        }
    });
}

module.exports.activate = async(id) => {
    const result = db.account.update({isconfirmed: 1},{
        where:{
            isconfirmed: id
        }
    })
    return result;
} 

module.exports.addGoogleAccountToDb = async(obj) => {
    const result = await db.account.create({username: obj.email,password: '',email: obj.email, name: obj.name, totalplays : 0, totalwins : 0, point : 0, isblocked : false, isadmin: false, isconfirmed: 1});
    return result;
}


module.exports.addFacebookAccountToDb = async(obj) => {
    const result = await db.account.create({username: obj.id,password: '',email: obj.id, name: obj.name, totalplays : 0, totalwins : 0, point : 0, isblocked : false, isadmin: false, isconfirmed: 1});
    return result;
}


module.exports.authenAccount = async (username,password) => {
    const user = await db.account.findOne({
        where: {
            username: username
        }
    });
    if(user !== null)
    {
        if(user.isconfirmed !== 1)
        {
            return [true,-1];
        }
        if(user.isblocked === true)
        {
            return [true,0];
        }
        const hashedPassword = user.password;
        const isMatch = bcrypt.compareSync(password,hashedPassword);
        if(isMatch) return [true,user];
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

module.exports.updateWinner = async (idWinner,idLoser) => {
    console.log(idWinner,idLoser);
    const winner = await this.getUserFromId(idWinner);
    const loser = await this.getUserFromId(idLoser);

    console.log(winner,loser);

    const point = 10 + Math.round(Math.abs(winner.point - (winner.point - loser.point))/100);

    const totalWins = await this.getTotalWinsByIdUser(idWinner);
    const totalPlays = await this.getTotalPlaysByIdUser(idWinner);
    const totalPoints = await this.getTotalPointsByIdUser(idWinner);

    const result = await db.account.update({totalwins: totalWins + 1, totalPlays: totalPlays + 1, point: totalPoints + point},{
        where: {
            id: idWinner
        }
    })
}

module.exports.checkUsername = async(username) => {
    const result = db.account.findOne({
        where: {
            username: username
        }
    })
    return result;
}

module.exports.checkEmail = async(email) => {
    const result = db.account.findOne({
        where: {
            email: email
        }
    })
    return result;
}