var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var session = require('express-session');
var methodOverride = require('method-override');
var multipart = require('connect-multiparty');
var expressSanitizer = require('express-sanitizer');
var config = require('./config');

var login = require('./routes/login');
var register = require('./routes/register');
var checkUser = require('./routes/checkUser');
var news = require('./routes/news');
var profile = require('./routes/profile');
var logout = require('./routes/logout');
var createNews = require('./routes/createNews');
var showCard = require('./routes/showCard');
var game = require('./routes/game');
var decks = require('./routes/decks');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(methodOverride('_method'));
app.use(session({
                name: config.sessionName,
                secret: config.sessionSecret,
                resave: false,
                saveUninitialized: true,
                httpOnly: true,
                ephemeral: true
              }));
app.use(multipart());
app.use(expressSanitizer());

//Routes
app.use('/', login);
app.use('/profile', profile);
app.use('/news', news);
app.use('/register', register);
app.use('/checkUser', checkUser);
app.use('/logout', logout);
app.use('/admin/news', createNews);
app.use('/card', showCard);
app.use('/game', game);
app.use('/deckscards', decks);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
