
//Users.hasMany(Boards,{as: 'Boards', foreignKey: 'id_user'})
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
        totalplays: {
            type: Sequelize.INTEGER,
        },
        totalwins: {
            type: Sequelize.INTEGER,
        },
        point: {
            type: Sequelize.INTEGER,
        },
        isblocked: {
            type: Sequelize.BOOLEAN,
        },
        isadmin:{
            type: Sequelize.BOOLEAN,
        },
        isconfirmed:{
            type: Sequelize.INTEGER,
        },
    })
    return Account;
};