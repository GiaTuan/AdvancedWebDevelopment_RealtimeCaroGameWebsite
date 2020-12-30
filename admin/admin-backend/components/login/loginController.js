const jwt = require('jsonwebtoken');

module.exports.loginAccount = async (req, res, next) => {
    const account = req.user;
    if(account.isadmin === false) return res.sendStatus(403);
    const payload = {id: account.id, username: account.username};
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.json({account, token});
}