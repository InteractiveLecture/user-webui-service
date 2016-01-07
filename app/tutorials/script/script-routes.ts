///<reference path='../../../typings/tsd.d.ts' />
module tutorials {
  'use strict';

  angular
    .module('tutorials.script')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('tutorialsScript', {
        url: '/modules/:id/script',
        templateUrl: 'tutorials/script/script.tpl.html',
        controller: 'ScriptCtrl',
        controllerAs: 'tutorialsScript'
      });
  }
}
