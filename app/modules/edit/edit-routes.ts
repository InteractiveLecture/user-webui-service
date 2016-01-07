///<reference path='../../../typings/tsd.d.ts' />
module edit {
  'use strict';

  angular
    .module('modules.edit')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('edit', {
        url: '/edit',
        templateUrl: 'modules/edit/edit.tpl.html',
        controller: 'EditCtrl',
        controllerAs: 'edit'
      });
  }
}
