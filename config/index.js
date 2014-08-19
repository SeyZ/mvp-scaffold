/**
 * This module loads the configuration file of the application. Use a
 * settings.json file to override default values.
 */
'use strict';
var path = require('path');
var nconf = require('nconf');

nconf.file({ file: 'settings.json' });
nconf.env();

var src = [
  'public/js/components/jquery/dist/jquery.js',
  'public/js/components/angular/angular.js',
  'public/js/components/angular-animate/angular-animate.js',
  'public/js/components/angular-ui/build/angular-ui.js',
  'public/js/components/angular-ui-router/release/angular-ui-router.js',
  'public/js/components/angular-http-auth/src/http-auth-interceptor.js',
  'public/js/components/angular-resource/angular-resource.js',
  'public/js/components/angular-bootstrap/ui-bootstrap-tpls.js',
  'public/js/app/scripts/app.js'
];

var css = [
  'public/js/components/animate.css/animate.css',
  'public/css/style.css'
];

nconf.defaults({
  bootstrap: {
    src: path.join(__dirname, '..', 'assets', 'less'),
    paths: [
      path.join(__dirname, '..', 'node_modules', 'bootstrap', 'less'),
      path.join(__dirname, '..', 'public', 'js', 'components', 'font-awesome',
                'less')
    ],
    dest: path.join(__dirname, '..', 'public', 'css'),
    prefix : '/css',
    compress: true
  },
  css: css,
  database: {
    uri: 'mongodb://localhost/scaffold'
  },
  http: {
    baseurl: 'http://localhost:3000',
    port: 3000
  },
  session: {
    secret: 'securesecret'
  },
  src: src,
  version: '0.0.1'
});
