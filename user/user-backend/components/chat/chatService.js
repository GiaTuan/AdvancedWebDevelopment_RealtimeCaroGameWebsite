const db = require('../../connection');

module.exports.addChat = async (idGame,idUser,text) => {
    const result = await db.chat.create({
        idgame: idGame,
        iduser: idUser,
        content: text
    });
    return result;
}

module.exports.getChat = async(idGame) => {
    const result = await db.chat.findAll({
        where: {
            idgame: idGame
        },
    })

    return result;
}

module.exports.deleteChat = async(idGame) => {
    await db.chat.destroy({
        where:{
            idgame: idGame
        }
    })
}