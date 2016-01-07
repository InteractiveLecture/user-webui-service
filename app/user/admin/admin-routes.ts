///<reference path='../../../typings/tsd.d.ts' />
module admin {
  'use strict';

  angular
    .module('user.admin')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'user/admin/admin.tpl.html',
        controller: 'AdminCtrl',
        controllerAs: 'admin'
      });
  }
}
