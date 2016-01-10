///<reference path='../../../typings/tsd.d.ts' />
module exercises {
  'use strict';

  angular
    .module('exercises.worksheet')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('exerciseWorksheet', {
        url: '/modules/{id}/exercises/{eId}',
        templateUrl: 'exercises/worksheet/worksheet.tpl.html',
        controller: 'WorksheetCtrl',
        controllerAs: 'exerciseWorksheet'
      });
  }
}
