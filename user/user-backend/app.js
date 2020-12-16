const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
/**
 * DEV_DB_NAME = 'WebDB'
DEV_DB_USERNAME = 'postgres'
DEV_DB_PASSWORD = 'Adgt123456'
DEV_DB_HOST = 'localhost'
JWT_SECRET = 'my-secrett'

 */



const passport = require('./passport');

const loginRouter = require('./components/login');
const registerRouter = require('./components/register');
const userRouter = require('./components/user');
const gameRouter = require('./components/game');
const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

app.use('/login',loginRouter);
app.use('/register',registerRouter);
app.use('/users',userRouter);
app.use('/game',gameRouter);


//=============================================================================


//=============================================================================



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
