///<reference path='../../../typings/tsd.d.ts' />
module exercises {
  'use strict';

  angular
    .module('exercises.edit')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('exerciseEdit', {
      url: '/modules/{id}/exercises/{eId}/edit',
      templateUrl: 'exercises/edit/edit.tpl.html',
      controller: 'EditCtrl',
      controllerAs: 'exerciseEdit'
    });
  }
}
