const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const accountService = require('./components/account/accountService');

passport.use(new LocalStrategy({session: false}, async (username, password, done) => {
    const [status, user] = await accountService.authenAccount(username, password);

    if(status === 'Success')
        done(null, {id: user.id, username: user.username});
    else
        done(null, false)
}));

// const JWTOptions = {};

// JWTOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
// JWTOptions.serectOrKey = process.env.JWT_SERECT;
const JWTOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SERECT
};

passport.use(new JWTStrategy(JWTOptions, function(jwt_payload, done) {
    done(null, jwt_payload);
}));

module.exports = passport;