///<reference path='../../typings/tsd.d.ts' />
module TutorialTextCtrl {
  'use strict';

  class TutorialTextCtrl {

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
      vm.ctrlName = 'TutorialTextCtrl';
    }
  }


  /**
  * @ngdoc object
  * @name tutorialText.controller:TutorialTextCtrl
  *
  * @description
  *
  */
  angular
    .module('tutorialText')
    .controller('TutorialTextCtrl', TutorialTextCtrl);
}
