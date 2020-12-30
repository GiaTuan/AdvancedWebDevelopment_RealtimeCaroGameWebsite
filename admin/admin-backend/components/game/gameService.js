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