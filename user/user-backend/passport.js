const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const accountService = require('./components/account/accountService');

passport.use(new LocalStrategy({session: false}, async (username,password,done)=>{
    console.log("DMMM");
    const [isSucess,user] = await accountService.authenAccount(username,password);
    console.log("DMMM2");
    if(isSucess)
    {
        if(user === -1)
        {
            done(null,{isNotActivated : true});
        }
        if(user === 0)
        {
            done(null,{isBlocked : true})
        }
        done(null,{ id: user.id, username: user.username });
    }
    else 
    {
        done(null,false)
    };
}));

const JWTOptions ={};

JWTOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
JWTOptions.secretOrKey = process.env.JWT_SECRET;

passport.use(new JwtStrategy(JWTOptions , function(jwt_payload, done) {
    done(null,jwt_payload);
}));


module.exports = passport;


