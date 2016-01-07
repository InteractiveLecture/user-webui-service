///<reference path='../../../typings/tsd.d.ts' />
module user {
  'use strict';

  angular
    .module('user.login')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    console.log('setze alias')
    $stateProvider
      .state('loginScreen', {
      url: '/login',
      templateUrl: 'user/login/login.tpl.html',
      controller: 'LoginCtrl',
      controllerAs: 'login'
    });
  }
}
