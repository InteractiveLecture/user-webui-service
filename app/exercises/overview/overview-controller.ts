///<reference path='../../../typings/tsd.d.ts' />
module exercises {
  'use strict';

  class OverviewCtrl {

    ctrlName: string
    exercise: any
    moduleId: string
    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: string[] = [
      '$log',
      '$stateParams'
    ];

    // dependencies are injected via AngularJS $injector
    constructor($log: ng.ILogService, $stateParams: any) {
      var vm = this
      vm.moduleId = $stateParams.id
      vm.ctrlName = 'OverviewCtrl'
      $log.debug('controller ' + vm.ctrlName + ' is working')
      vm.exercise = [{ "title": "Variablen", "description": "Der Umgang mit Variablen in Java", "eId": "dksjaflkaöfjksljaflajlkaöjdklsfsöjkasö" },
        { "title": "Vererbung", "description": "Der Umgang mit Vererbung in Java", "eId": "dksjvirnvirnivndianidsoiadsaäsdioss" },
        { "title": "Klassen", "description": "Was ist eine Klasse in Java", "eId": "q3456uikjhvcxcvbnmlp987ztghjklmnbvfzu" }];
    }
  }



  /**
  * @ngdoc object
  * @name exercises.overview.controller:OverviewCtrl
  *
  * @description
  *
  */
  angular
    .module('exercises.overview')
    .controller('ExerciseOverviewCtrl', OverviewCtrl);
}
