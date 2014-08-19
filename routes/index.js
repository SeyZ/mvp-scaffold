/**
 * This module loads dynamically all routes modules located in the routes/
 * directory.
 */
'use strict';
var fs = require('fs');
var path = require('path');

module.exports = function (app) {
  fs.readdirSync('./routes').forEach(function (file) {
    // Avoid to read this current file and hidden files.
    if (file[0] === '.' || file === path.basename(__filename)) {
      return;
    }

    // Load the route file.
    require('./' + file)(app);
  });
};
