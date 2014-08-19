/**
 * This module has the responsability to transform object from DB to the
 * client-side view (JSON).
 */
'use strict';
var async = require('async');

function ViewAdapter() {
  var that = this;

  /**
   * Call the function fct on each item object.
   */
  function pluralize(fct, items, callback) {
    async.map(items, function (item, cb) {
      fct(item, cb);
    }, callback);
  }
}

module.exports = new ViewAdapter();
