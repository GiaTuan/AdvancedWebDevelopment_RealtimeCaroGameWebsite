
module.exports = (sequelize,Sequelize) => {
    const Chat = sequelize.define('Chat',{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        iduser: {
            type: Sequelize.INTEGER,    
        },
        idgame: {
            type: Sequelize.INTEGER,    
        },
        content: {
            type: Sequelize.STRING,    
        }
    })
    return Chat;
};