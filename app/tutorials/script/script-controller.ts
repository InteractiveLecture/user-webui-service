///<reference path='../../../typings/tsd.d.ts' />
module tutorials {
  'use strict';

  class ScriptCtrl {

    ctrlName: string
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
      vm.ctrlName = 'ScriptCtrl'


      $log.debug('controller ' + vm.ctrlName + ' is working')
    }
  }


  /**
  * @ngdoc object
  * @name tutorials.script.controller:ScriptCtrl
  *
  * @description
  *
  */
  angular
    .module('tutorials.script')
    .controller('TutorialsScriptCtrl', ScriptCtrl);
}
