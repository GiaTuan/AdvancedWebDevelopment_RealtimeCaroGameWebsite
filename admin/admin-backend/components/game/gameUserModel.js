module.exports = (sequelize,Sequelize) => {
    const GameUser = sequelize.define('GameUser',{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        idgame: {
            type: Sequelize.INTEGER,    
        },
        iduser: {
            type: Sequelize.INTEGER,    
        }
    })
    return GameUser;
};