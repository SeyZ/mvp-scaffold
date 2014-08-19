/**
 * A database connection service.
 */
'use strict';
var mongoose = require('mongoose');
var nconf = require('nconf');

function Database() {
  var that = this;

  /**
   * The connection object to the database.
   */
  this.connection = null;

  /**
   * Connects to the database.
   */
  this.connect = function (callback) {
    // If the connection already exists, do nothing.
    if (this.connection) { return callback(null, this.connection); }
    // Connect to the database.
    this.connection = mongoose.createConnection(nconf.get('MONGOHQ_URL') ||
      nconf.get('database:uri'));

    // Called on database connection error.
    this.connection.on('error', function (err) {
      callback(err);
    });

    // Called on database connection success.
    this.connection.on('open', function () {
      callback(null, that.connection);
    });
  };
}

// Export a singleton object (one connection to the database, not more).
module.exports = new Database();
