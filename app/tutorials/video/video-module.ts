///<reference path='../../../typings/tsd.d.ts' />
module tutorials {
  'use strict';

  /* @ngdoc object
  * @name tutorials.video
  * @description
  *
  */
  angular
    .module('tutorials.video', [
    'ui.router',
    "com.2fdevs.videogular",
    "com.2fdevs.videogular.plugins.controls",
    "com.2fdevs.videogular.plugins.overlayplay",
    "com.2fdevs.videogular.plugins.poster",
  ]);
}
