///<reference path='../../typings/tsd.d.ts' />
module TutorialVideoCtrl {
  'use strict';

  class TutorialVideoCtrl {

    ctrlName: string;
    moduleId: number;
    $sce: ng.ISCEService;
    config: any

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: string[] = [
      '$routeParams',
      '$sce'
    ];

    // dependencies are injected via AngularJS $injector
    constructor($routeParams: any, $sce: ng.ISCEService) {
      var vm = this;
      vm.moduleId = $routeParams.id;
      vm.ctrlName = 'TutorialVideoCtrl';

      // TODO Test Daten entfernen
      this.config = {
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
  * @name tutorialVideo.controller:TutorialVideoCtrl
  *
  * @description
  *
  */
  angular
    .module('tutorialVideo')
    .controller('TutorialVideoCtrl', TutorialVideoCtrl);
}
