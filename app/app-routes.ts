///<reference path='../typings/tsd.d.ts' />
module webUiService {
  'use strict';

  angular
    .module('webUiService')
    .config(config);

  function config($urlRouterProvider: ng.ui.IUrlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
  }
}
