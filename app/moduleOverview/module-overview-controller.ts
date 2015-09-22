///<reference path='../../typings/tsd.d.ts' />
module ModuleOverviewCtrl {
  'use strict';

  class ModuleOverviewCtrl {

    ctrlName: string;
    topicsId: number;
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
      vm.topicsId = $routeParams.id;
      vm.ctrlName = 'ModuleOverviewCtrl';
    }
  }


  /**
  * @ngdoc object
  * @name moduleOverview.controller:ModuleOverviewCtrl
  *
  * @description
  *
  */
  angular
    .module('moduleOverview')
    .controller('ModuleOverviewCtrl', ModuleOverviewCtrl);
}
