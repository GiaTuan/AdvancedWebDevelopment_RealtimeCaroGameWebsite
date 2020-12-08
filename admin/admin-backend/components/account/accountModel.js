module.exports = (sequelize,Sequelize) => {
    const Account = sequelize.define('Account',{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING,    
        },
        password:{
            type: Sequelize.STRING,
        },
        email:{
            type: Sequelize.STRING,
        },
        name:{
            type: Sequelize.STRING,
        },
        phone:{
            type: Sequelize.STRING,
        },
        isadmin:{
            type: Sequelize.BOOLEAN,
        },
    })
    return Account;
};