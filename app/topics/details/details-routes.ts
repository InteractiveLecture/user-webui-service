///<reference path='../../../typings/tsd.d.ts' />
module details {
  'use strict';

  angular
    .module('topics.details')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('details', {
        url: '/details',
        templateUrl: 'topics/details/details.tpl.html',
        controller: 'DetailsCtrl',
        controllerAs: 'details'
      });
  }
}
