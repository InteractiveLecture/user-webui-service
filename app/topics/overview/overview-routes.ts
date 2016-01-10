///<reference path='../../../typings/tsd.d.ts' />
module topics {
  'use strict';

  angular
    .module('topics.overview')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('topics', {
        url: '/topics',
        templateUrl: 'topics/overview/overview.tpl.html',
        controller: 'TopicOverviewCtrl',
        controllerAs: 'topicOverview'
      });
  }
}
