///<reference path='../../../typings/tsd.d.ts' />
module edit {
  'use strict';

  angular
    .module('exercises.edit')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('edit', {
        url: '/edit',
        templateUrl: 'exercises/edit/edit.tpl.html',
        controller: 'EditCtrl',
        controllerAs: 'edit'
      });
  }
}
