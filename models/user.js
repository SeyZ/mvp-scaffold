'use strict';
/**
 * The user database model.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var db = require('../services/database').connection;

var UserSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true, },
  email: { type: String, unique: true, sparse: true },
  password: String,
  source: { type: String, required: true, 'default': 'local' },
  createdAt: { type: Date, default: Date.now }
}, { read: 'sp'});

UserSchema.pre('save', function (next) {
  var user = this;
  // If the password is unmodified, skip.
  if (!user.isModified('password')) { return next(); }

  // Encrypt the password using bcrypt.
  bcrypt.genSalt(10, function (err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) { return next(err); }

      // Replace the plain password by the encrypted password.
      user.password = hash;
      next();
    });
  });
});

// Compare the password with the plain candidatePassword given.
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  if (!this.password) { return cb(null, false); }
  bcrypt.compare(candidatePassword, this.password, function (err, equals) {
    if (err) { return cb(err); }
    cb(null, equals);
  });
};

module.exports = db.model('User', UserSchema);

