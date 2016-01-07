///<reference path='../typings/tsd.d.ts' />
module webUiService {
  'use strict';

  /* @ngdoc object
   * @name webUiService
   * @description
   *
   */
  angular
    .module('webUiService', [
      'ngAria',
      'ui.router',
      'ui.bootstrap',
      'home',
      'user',
      'topics',
      'tutorials',
      'exercises',
      'modules',
      'upload'
    ]);
}
