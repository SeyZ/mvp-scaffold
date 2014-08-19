/**
 * This error service.
 */
'use strict';

exports.NotFound = function (msg) {
  this.name = 'NotFound';
  this.status = 404;
  this.message = msg;
  Error.call(this, msg);
};

exports.Unauthorized = function (msg) {
  this.name = 'Unauthorized';
  this.status = 401;
  this.message = msg;
  Error.call(this, msg);
};

exports.Forbidden = function (msg) {
  this.name = 'Forbidden';
  this.status = 403;
  this.message = msg;
  Error.call(this, msg);
};

exports.BadRequest = function (msg) {
  this.name = 'BadRequest';
  this.status = 400;
  this.message = msg;
  Error.call(this, msg);
};

exports.Internal = function (msg) {
  this.name = 'InternalError';
  this.status = 500;
  this.message = msg;
  Error.call(this, msg);
};
