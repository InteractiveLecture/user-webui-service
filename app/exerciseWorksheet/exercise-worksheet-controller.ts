///<reference path='../../typings/tsd.d.ts' />
module ExerciseWorksheetCtrl {
  'use strict';

  class ExerciseWorksheetCtrl {

    ctrlName: string;
    hints: string;
    output: string;
    exerciseDescription: string;


    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: string[] = [
    ];

    // dependencies are injected via AngularJS $injector
    constructor() {
      var vm = this;
      vm.ctrlName = 'ExerciseWorksheetCtrl';
      vm.hints = "Hinweis 1";
      vm.output = "Hallo Welt";
      vm.exerciseDescription = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
  }


  /**
  * @ngdoc object
  * @name exerciseWorksheet.controller:ExerciseWorksheetCtrl
  *
  * @description
  *
  */
  angular
    .module('exerciseWorksheet')
    .controller('ExerciseWorksheetCtrl', ExerciseWorksheetCtrl);
}
