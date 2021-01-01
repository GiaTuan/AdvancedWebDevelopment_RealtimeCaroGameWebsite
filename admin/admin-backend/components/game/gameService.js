const db = require('../../connection');

module.exports.getAll = async () => {
    const result = await db.game.findAll(
        {
            order: [
                'id'
            ]
        }
    );
    return result
}

module.exports.getGameById = async (id) => {
    const result = await db.game.findAll({
        where: {
            id: id
        }
    });
    return result;
}

module.exports.getHistoryByGameId = async(id) => {
    const result = db.gameHistory.findAll({
        where: {
            idgame: id
        }
    })
    return result;
}

module.exports.getPlayersByGameId =  async (id) => {
    const result = await db.gameUser.findAll({
        where: {
            idgame: id
        },
        include: [{
            model: db.account,
            attributes: ['name']
        }]
    });
    return result;
}