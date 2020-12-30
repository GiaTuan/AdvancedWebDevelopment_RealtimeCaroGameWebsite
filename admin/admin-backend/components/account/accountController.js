const accountService = require('./accountService');

module.exports.getAll = async (req,res,next) => {
    const result = await accountService.getAll();
    res.json(result);
}

module.exports.verify = async (req,res,next) => {
    res.sendStatus(200);
}

module.exports.getAccountById = async(req,res,next)=>{
    const id = req.params.id;
    const result = await accountService.getAccountById(id);
    res.json(result[0]);
}

module.exports.blockedUserById = async(req,res,next)=>{
    const id = req.params.id;
    await accountService.blockedUserById(id);
    res.sendStatus(200);
}

module.exports.unblockedUserById = async(req,res,next)=>{
    const id = req.params.id;
    await accountService.unblockedUserById(id);
    res.sendStatus(200);
}

module.exports.getAllGamesByUserId = async(req,res,next)=>{
    const id = req.params.id;
    const result = await accountService.getAllGamesByUserId(id);
    res.json(result);
}