///<reference path='../../../typings/tsd.d.ts' />
module script {
  'use strict';

  angular
    .module('tutorials.script')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('script', {
        url: '/script',
        templateUrl: 'tutorials/script/script.tpl.html',
        controller: 'ScriptCtrl',
        controllerAs: 'script'
      });
  }
}
