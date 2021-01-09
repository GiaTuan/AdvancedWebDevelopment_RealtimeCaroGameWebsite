const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const accountService = require('../account/accountService');

module.exports.loginAccount = async (req,res,next)=>{
    const account = req.user;
    if(account.isBlocked)
    {
        res.status(403).json("Account is blocked");
    }
    if(account.isNotActivated){
        res.status(403).json(("Account is not activated"));
    }
    const payload = {id: account.id, name: account.username}
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.json({account, token});
}

module.exports.activate = async(req,res,next) =>
{
    const activateId = req.query.id;
    await accountService.activate(activateId);
    req.redirect('http:localhost:3001/');
} 


module.exports.loginGoogle = async(req,res,next) => {
    const data = req.body.google;
    const googleResponse = await fetch('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + data.tokenId);
    const response = await googleResponse.json();
    if(data.profileObj.googleId === response.sub)
    {
        let account = await accountService.checkEmail(data.profileObj.email);
        if(account === null)
        {
            account = await accountService.addGoogleAccountToDb(data.profileObj);
        }

        const payload = {id: account.id, name: account.username}
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.json({account, token});
    }
    res.sendStatus(401)
}

module.exports.loginFacebook = async(req,res,next) => {
    const data = req.body.facebook;
    const facebookResponse = await fetch('https://graph.facebook.com/me?access_token=' + data.accessToken);
    const response = await facebookResponse.json();
    if(data.id === response.id)
    {
        let account = await accountService.checkEmail(data.id);
        if(account === null)
        {
            account = await accountService.addFacebookAccountToDb(data);
        }

        const payload = {id: account.id, name: account.username}
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.json({account, token});
    }
    res.sendStatus(401)
}

module.exports.forgotPassword = async (req,res,next)=>{
    const email = req.body.email;
    const exist = await accountService.checkEmail(email);
    if(exist !== null)
    {
        await accountService.forgotPassword(email);
        res.sendStatus(200);
    }
    res.sendStatus(401);
}