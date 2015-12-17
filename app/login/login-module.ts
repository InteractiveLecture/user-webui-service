///<reference path='../../typings/tsd.d.ts' />
module login {
  'use strict';

  /* @ngdoc object
  * @name login
  * @description
  * Login in den Lecture Service
  */
  angular
    .module('login', [
      'ngNewRouter',
      'ngCookies',
      'uuid',
      'interactiveLectureWebFrontend'
    ])
}
