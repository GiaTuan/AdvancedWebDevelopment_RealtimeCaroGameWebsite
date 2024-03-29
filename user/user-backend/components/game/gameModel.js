
module.exports = (sequelize,Sequelize) => {
    const Game = sequelize.define('Game',{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        boards: {
            type: Sequelize.ARRAY(Sequelize.TEXT),
        },
        winner: {
            type: Sequelize.INTEGER
        }
        ,
        isdone: {
            type: Sequelize.BOOLEAN,    
        }
    })
    return Game;
};