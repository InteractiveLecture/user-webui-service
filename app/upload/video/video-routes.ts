///<reference path='../../../typings/tsd.d.ts' />
module video {
  'use strict';

  angular
    .module('upload.video')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('uploadVideo', {
        url: '/modules/:id/video/upload',
        templateUrl: 'upload/video/video.tpl.html',
        controller: 'VideoCtrl',
        controllerAs: 'uploadVideo'
      });
  }
}
