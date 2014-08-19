/**
 * Entry point of the application.
 */
'use strict';

var express = require('express');
var MongoStore = require('connect-mongo')(express);
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nconf = require('nconf');
var less = require('less-middleware');
var passport = require('passport');
var auth = require('./services/auth');
var database = require('./services/database');

var mongoStore = new MongoStore({
  mongooseConnection: database.connection,
  db: database.connection.db
});

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(less(nconf.get('bootstrap')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.session({
  secret: nconf.get('session:secret'),
  cookie: { expires: new Date(Date.now() + 3600000 * 336) },
  store: mongoStore
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(auth.localStrategy());

app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.use(function (err, req, res, next) {
  console.log(err);
  res.send(err.status || 400, err.message);
});

app.locals({
  css: nconf.get('css'),
  env: app.get('env'),
  src: nconf.get('src'),
  version: nconf.get('version')
});

// Load all routes.
require('./routes')(app);

module.exports = app;
