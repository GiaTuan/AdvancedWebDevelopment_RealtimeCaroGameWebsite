const gameService = require('./gameService');

module.exports.getAll = async(req,res,next)=>{
    const result = await gameService.getAll();
    res.json(result);
}

module.exports.getGameById = async(req,res,next) => {
    const idGame = req.params.id;
    const result = await gameService.getGameById(idGame);
    res.json(result);
}
