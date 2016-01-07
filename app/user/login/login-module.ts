///<reference path='../../../typings/tsd.d.ts' />
module user {
  'use strict';

  /* @ngdoc object
  * @name user.login
  * @description
  *
  */
  angular
    .module('user.login', [
    'ui.router',
    'angular-jwt',
    'webUiService'
  ]);
}
