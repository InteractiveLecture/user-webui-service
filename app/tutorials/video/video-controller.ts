///<reference path='../../../typings/tsd.d.ts' />
module tutorials {
  'use strict';

  class VideoCtrl {

    ctrlName: string
    config: any
    lectureModule: lectureDefinitions.models.Module

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: string[] = [
      '$sce',
      '$stateParams',
      'CachingService'
    ];

    // dependencies are injected via AngularJS $injector
    constructor($sce: ng.ISCEService, $stateParams: any, cachingService: Caching.CachingService) {
      var vm = this
      vm.ctrlName = 'VideoCtrl'
      vm.lectureModule = cachingService.loadModule($stateParams.id)
      vm.config = {
        sources: [
          { src: $sce.trustAsResourceUrl('/videos/'), type: "video/mp4" }
        ],
        theme: "vendor/videogular-themes-default/videogular.css",
        plugins: {
          poster: "app/images/fb_wirtschaft.jpg"
        }
      }

    }
  }


  /**
  * @ngdoc object
  * @name tutorials.video.controller:VideoCtrl
  *
  * @description
  *
  */
  angular
    .module('tutorials.video')
    .controller('TutorialsVideoCtrl', VideoCtrl);
}
