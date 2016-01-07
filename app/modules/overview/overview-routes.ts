///<reference path='../../../typings/tsd.d.ts' />
module modules {
  'use strict';

  angular
    .module('modules.overview')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('moduleOverview', {
        url: '/topics/:id/modules',
        templateUrl: 'modules/overview/overview.tpl.html',
        controller: 'OverviewCtrl',
        controllerAs: 'moduleOverview'
      });
  }
}
