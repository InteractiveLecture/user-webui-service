///<reference path='../../../typings/tsd.d.ts' />
module overview {
  'use strict';

  angular
    .module('modules.overview')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('overview', {
        url: '/overview',
        templateUrl: 'modules/overview/overview.tpl.html',
        controller: 'OverviewCtrl',
        controllerAs: 'overview'
      });
  }
}
