const db = require('../../connection');

module.exports.getNewGame = async () => {
    const newGame = await db.game.create();
    return newGame;
}

module.exports.checkGameId = async (id) => {
    const result = await db.game.findAll({
        where: {
            id: id
        }
    });

    if(result.length > 0) return true;
    return false;
}

module.exports.addDataToGameUser = async(idUser,idGame) => {
    const result = await db.gameUser.create({
        iduser: idUser,
        idgame: idGame
    });
    // const result = await db.gameUser.findAll({
    //     attributes: ["id","idgame","iduser"],
    //     where: {
    //         id: 1
    //     },
    //     include: [{
    //         model: db.account, 
    //         required: false
    //     }]
    // })
    // console.log(result)
    // console.log(JSON.stringify(result));
}