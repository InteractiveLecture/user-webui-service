///<reference path='../../../typings/tsd.d.ts' />
module overview {
  'use strict';

  angular
    .module('topics.overview')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('overview', {
        url: '/overview',
        templateUrl: 'topics/overview/overview.tpl.html',
        controller: 'OverviewCtrl',
        controllerAs: 'overview'
      });
  }
}
