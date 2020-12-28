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
    const data = await db.chat.findAll({
        where: {
            idgame: idGame
        },
        include: [{
            model: db.account, 
            attributes: ['name'],
            required: false
        }]
    })

    const chats = [];
    for(let i = 0 ; i < data.length ; i++)
    {
        const obj = {
            user: {
                id: data[i].iduser,
                name: data[i].Account.name
            },
            content: data[i].content
        }
        chats.push(obj);
    }
    return chats;
}

module.exports.deleteChat = async(idGame) => {
    await db.chat.destroy({
        where:{
            idgame: idGame
        }
    })
}