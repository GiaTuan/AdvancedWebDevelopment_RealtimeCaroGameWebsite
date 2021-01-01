
module.exports = (sequelize,Sequelize) => {
    const GameHistory = sequelize.define('GameHistory',{
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
        },
        row: {
            type: Sequelize.INTEGER,    
        },
        col: {
            type: Sequelize.INTEGER,    
        }
    })
    return GameHistory;
};