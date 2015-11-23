///<reference path='../../typings/tsd.d.ts' />
module TutorialTextUploadCtrl {
  'use strict';

  class TutorialTextUploadCtrl {

    ctrlName: string

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject = [
    ];

    // dependencies are injected via AngularJS $injector
    constructor() {
      var vm = this;
      vm.ctrlName = 'TutorialTextUploadCtrl';
    }
  }


  /**
  * @ngdoc object
  * @name tutorialTextUpload.controller:TutorialTextUploadCtrl
  *
  * @description
  *
  */
  angular
    .module('tutorialTextUpload')
    .controller('TutorialTextUploadCtrl', TutorialTextUploadCtrl);
}
