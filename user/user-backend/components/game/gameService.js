const db = require('../../connection');

module.exports.getNewGame = async () => {
    const newGame = await db.game.create({
        isdone: false
    });
    return newGame;
}

module.exports.getGameById = async (id) => {
    const result = await db.game.findAll({
        where: {
            id: id
        }
    });
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

module.exports.checkGameId = async (id) => {
    const result = await db.game.findAll({
        where: {
            id: id,
            isdone: false
        }
    });

    if(result.length > 0) return true;
    return false;
}

module.exports.addHistory = async(idUser,idGame,row,column) => {
    const result = await db.gameHistory.create({
        iduser: idUser,
        idgame: idGame,
        row: row,
        col: column
    });
    return true;
}

module.exports.getAllGames = async () => {
    const result = await db.game.findAll({
        where:{
            isdone : false
        }
    });
    return result;
}

module.exports.setGameIsdone = async (idGame) => {
    const result = db.game.update({isdone: true},{
        where: {
            id: idGame
        }
    });
}

module.exports.addBoardToGame = async (idGame,board) => {
    const result = db.game.update({boards: board},{
        where: {
            id: idGame
        }
    });
}

module.exports.addGameUser = async(idGame,idUser) => {
    const result = db.gameUser.create({
        idgame: idGame,
        iduser: idUser
    });
}

module.exports.getHistoryByIdUser = async (idUser) => {
    const result = db.gameUser.findAll({
        where: {
            iduser: idUser
        }
    })
    return result;
}

module.exports.getHistoryByGameId = async (idGame) => {
    const result = db.gameHistory.findAll({
        where: {
            idgame: idGame
        }
    })
    return result;
}

module.exports.addWinner = async (idGame,idUser) => {
    const result = db.game.update({winner: idUser},{
        where: {
            id: idGame
        }
    });
}