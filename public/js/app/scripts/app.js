'use strict';

angular.module('scaffold', ['ngResource', 'ui.router', 'ui.bootstrap'])
  .config(function ($locationProvider) {
    // Enable history push state if available.
    if (typeof history.pushState !== 'undefined') {
      $locationProvider.html5Mode(true);
    }
  });
