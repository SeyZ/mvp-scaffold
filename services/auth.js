/**
 * This service has the responsability to authentify users.
 */
'use strict';

var async = require('async');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var error = require('./error');
var User = require('../models/user');

var verification = function (username, password, done) {
  async.waterfall([
    function (cb) {
      User.findOne({ username: username }, cb);
    },
    function (user, cb) {
      if (user) { return cb(null, user); }
      User.findOne({ email: username }, cb);
    },
    function (user, cb) {
      if (!user) {
        return cb(null, false, {
          message: 'Bad username/password combination.'
        });
      }
      user.comparePassword(password, function (err, isMatch) {
        if (err) { throw err; }
        if (!isMatch) {
          return cb(null, false, {
            message: 'Bad username/password combination.'
          });
        } else {
          return done(null, user);
        }
      });
    }
  ], function (err, user, opts) {
    if (err) { return done(err); }
    return done(null, user, opts);
  });
};

exports.ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    return next(new error.Unauthorized('User is not authenticated.'));
  }
};

exports.localStrategy = function () {
  return new LocalStrategy(verification);
};

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  async.waterfall([
    function (cb) {
      User.findById(id, cb);
    }
  ], function (err, user) {
    if (!user) { return done(new error.NotFound()); }
    done(err, user);
  });
});
