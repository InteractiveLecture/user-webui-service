///<reference path='../../../typings/tsd.d.ts' />
module topics {
  'use strict';

  angular
    .module('topics.edit')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('topicEdit', {
        url: '/topics/{id}/edit',
        templateUrl: 'topics/edit/edit.tpl.html',
        controller: 'TopicEditCtrl',
        controllerAs: 'topicEdit'
      });
  }
}
