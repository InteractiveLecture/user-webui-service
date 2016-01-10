///<reference path='../../../typings/tsd.d.ts' />
module modules {
  'use strict';

  angular
    .module('modules.edit')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('moduleEdit', {
        url: '/modules/{id}/edit',
        templateUrl: 'modules/edit/edit.tpl.html',
        controller: 'ModuleEditCtrl',
        controllerAs: 'moduleEdit'
      });
  }
}
