
module.exports = (sequelize,Sequelize) => {
    const Game = sequelize.define('Game',{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        state: {
            type: Sequelize.STRING,    
        }
    })
    return Game;
};