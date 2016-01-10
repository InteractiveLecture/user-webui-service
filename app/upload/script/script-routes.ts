///<reference path='../../../typings/tsd.d.ts' />
module script {
  'use strict';

  angular
    .module('upload.script')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('uploadScript', {
        url: '/modules/{id}/script/upload',
        templateUrl: 'upload/script/script.tpl.html',
        controller: 'ScriptCtrl',
        controllerAs: 'uploadScript'
      });
  }
}
