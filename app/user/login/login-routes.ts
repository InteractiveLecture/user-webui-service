///<reference path='../../../typings/tsd.d.ts' />
module login {
  'use strict';

  angular
    .module('user.login')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'user/login/login.tpl.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      });
  }
}
