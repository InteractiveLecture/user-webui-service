///<reference path='../../../typings/tsd.d.ts' />
module profile {
  'use strict';

  angular
    .module('user.profile')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('profile', {
        url: '/profile',
        templateUrl: 'user/profile/profile.tpl.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      });
  }
}
