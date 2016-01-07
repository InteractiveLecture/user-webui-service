///<reference path='../../../typings/tsd.d.ts' />
module overview {
  'use strict';

  angular
    .module('topics.overview')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('topicOverview', {
        url: '/topics',
        templateUrl: 'topics/overview/overview.tpl.html',
        controller: 'OverviewCtrl',
        controllerAs: 'topicOverview'
      });
  }
}
