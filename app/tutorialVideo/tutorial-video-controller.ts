///<reference path='../../typings/tsd.d.ts' />
module TutorialVideoCtrl {
  'use strict';

  class TutorialVideoCtrl {

    ctrlName: string;
    moduleId: number;

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: string[] = [
        '$routeParams'
    ];

    // dependencies are injected via AngularJS $injector
    constructor($routeParams: any) {
      var vm = this;
      vm.moduleId = $routeParams.id;
      vm.ctrlName = 'TutorialVideoCtrl';
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
