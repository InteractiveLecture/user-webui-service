///<reference path='../../../typings/tsd.d.ts' />
module tutorials {
  'use strict';

  class VideoCtrl {

    ctrlName: string

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: string[] = [
    ];

    // dependencies are injected via AngularJS $injector
    constructor() {
      var vm = this;
      vm.ctrlName = 'VideoCtrl';
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