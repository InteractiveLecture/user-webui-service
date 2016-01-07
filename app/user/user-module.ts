///<reference path='../../typings/tsd.d.ts' />
module user {
  'use strict';

  /* @ngdoc object
  * @name user
  * @description
  *
  */
  angular
    .module('user', [
      'user.login',
      'user.profile',
      'user.admin'
    ]);
}
