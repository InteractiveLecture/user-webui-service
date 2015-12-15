///<reference path='../../typings/tsd.d.ts' />
module TutorialTextUploadCtrl {
  'use strict';

  class TutorialTextUploadCtrl {

    tutorialName: string
    tutorialDescription: string

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: any = [
    ];

    // dependencies are injected via AngularJS $injector
    constructor() {
      var vm = this;
    }

    /**
     * Ein Tutorial uploaden zum Backend
     * @param  {string} description [Beschreibung des Tutorials]
     * @param  {string} name        [Name des Tutorials]
     * @return {[type]}             [description]
     */
    uploadText(description: string, name: string) {
      // Do some Upload Magic
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
