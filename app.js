var express = require('express');
var package = require('./package.json');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var bunyanRequest = require('bunyan-request');
var logger = require('./logger');

var requestLogger = bunyanRequest({
  logger: logger,
  headerName: 'x-request-id'
});


var index = require('./routes/index');

var app = express();

app.locals.package = package;

app.use(helmet());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(requestLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
