///<reference path='../../../typings/tsd.d.ts' />
module tutorials {
  'use strict';

  class VideoCtrl {

    ctrlName: string
    config: any

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: string[] = [
      '$sce'
    ];

    // dependencies are injected via AngularJS $injector
    constructor($sce: ng.ISCEService) {
      var vm = this
      vm.ctrlName = 'VideoCtrl'
      vm.config = {
        sources: [
          { src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4" },
          { src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"), type: "video/webm" },
          { src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg" }
        ],
        tracks: [
          {
            src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
            kind: "subtitles",
            srclang: "en",
            label: "English",
            default: ""
          }
        ],
        theme: "bower_components/videogular-themes-default/videogular.css",
        plugins: {
          poster: "http://www.videogular.com/assets/images/videogular.png"
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
    .controller('VideoCtrl', VideoCtrl);
}
