///<reference path='../../../typings/tsd.d.ts' />
module exercises {
  'use strict';

  angular
    .module('exercises.overview')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('exerciseOverview', {
        url: '/modules/{id}/exercises',
        templateUrl: 'exercises/overview/overview.tpl.html',
        controller: 'ExerciseOverviewCtrl',
        controllerAs: 'exerciseOverview'
      });
  }
}
