///<reference path='../../../typings/tsd.d.ts' />
module topics {
  'use strict';

  angular
    .module('topics.details')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('topicDetails', {
        url: '/topics/:id',
        templateUrl: 'topics/details/details.tpl.html',
        controller: 'DetailsCtrl',
        controllerAs: 'topicDetails'
      });
  }
}
