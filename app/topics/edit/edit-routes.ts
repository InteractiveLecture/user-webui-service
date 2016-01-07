///<reference path='../../../typings/tsd.d.ts' />
module edit {
  'use strict';

  angular
    .module('topics.edit')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('edit', {
        url: '/edit',
        templateUrl: 'topics/edit/edit.tpl.html',
        controller: 'EditCtrl',
        controllerAs: 'edit'
      });
  }
}
