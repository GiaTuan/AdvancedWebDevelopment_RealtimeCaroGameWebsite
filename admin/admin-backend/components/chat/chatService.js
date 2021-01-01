const db = require('../../connection');

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