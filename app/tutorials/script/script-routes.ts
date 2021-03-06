///<reference path='../../../typings/tsd.d.ts' />
module tutorials {
  'use strict';

  angular
    .module('tutorials.script')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('script', {
        url: '/modules/{id}/script',
        templateUrl: 'tutorials/script/script.tpl.html',
        controller: 'TutorialsScriptCtrl',
        controllerAs: 'tutorialsScript'
      });
  }
}
