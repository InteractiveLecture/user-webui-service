///<reference path='../../../typings/tsd.d.ts' />
module tutorials {
  'use strict';

  angular
    .module('tutorials.video')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('video', {
        url: '/modules/{id}/video',
        templateUrl: 'tutorials/video/video.tpl.html',
        controller: 'VideoCtrl',
        controllerAs: 'tutorialsVideo'
      });
  }
}
