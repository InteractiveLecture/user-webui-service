///<reference path='../../../typings/tsd.d.ts' />
module overview {
  'use strict';

  angular
    .module('exercises.overview')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('overview', {
        url: '/overview',
        templateUrl: 'exercises/overview/overview.tpl.html',
        controller: 'OverviewCtrl',
        controllerAs: 'overview'
      });
  }
}
