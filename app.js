var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var flash = require('connect-flash');
var validator = require('express-validator');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// session
var session = require("express-session")
app.use(express.static("public"));
app.use(session({
  secret: 'mysupersecret',
  resave: true,
  saveUninitialized: true
}));
app.disable('x-powered-by');
app.use(flash());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
var routes = require('./routes/index');
var login = require('./routes/login');
var messageBoard = require('./routes/messageBoard');
var signup = require('./routes/signup');
var user = require('./routes/user');
app.use('/', routes);
app.use('/login', login);
app.use('/signup', signup);

// Check login (Middleware)
app.use((req,res,next)=>{
  if(req.session.uid){
    next();
  }
  res.redirect('/');
})

app.use('/user', user);
app.use('/messageBoard', messageBoard);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).render('../views/404')
  /*
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
  */
 next();
});

// error handlers
// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  //res.status(err.status || 500).send('123');  
  res.render('error', {
    message: err.message,
    error: {}
  });  
});
module.exports = app;
