'use strict';

function main(req, res) {
  res.render('index');
}

module.exports = function (app) {
  app.get('/', main);
  app.get('/[^api/]*', main);
};
