///<reference path='../../typings/tsd.d.ts' />
module ExerciseOverviewCtrl {
  'use strict';

  class ExerciseOverviewCtrl {

    moduleId: number
    exercises: any

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
      vm.exercises = [{ "title": "Variablen", "description": "Der Umgang mit Variablen in Java" },
        { "title": "Vererbung", "description": "Der Umgang mit Vererbung in Java" },
        { "title": "Klassen", "description": "Was ist eine Klasse in Java" }];
    }
  }

  /**
  * @ngdoc object
  * @name exerciseOverview.controller:ExerciseOverviewCtrl
  *
  * @description
  * Anzeigen der einzelnen Aufgaben je Modul
  */
  angular
    .module('exerciseOverview')
    .controller('ExerciseOverviewCtrl', ExerciseOverviewCtrl);
}
