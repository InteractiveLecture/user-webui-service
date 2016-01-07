///<reference path='../../../typings/tsd.d.ts' />
module worksheet {
  'use strict';

  angular
    .module('exercises.worksheet')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('worksheet', {
        url: '/worksheet',
        templateUrl: 'exercises/worksheet/worksheet.tpl.html',
        controller: 'WorksheetCtrl',
        controllerAs: 'worksheet'
      });
  }
}
