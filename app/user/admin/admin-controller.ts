///<reference path='../../../typings/tsd.d.ts' />
module user {
  'use strict';

  class AdminCtrl {

    ctrlName: string

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: string[] = [
      '$log'
    ];

    // dependencies are injected via AngularJS $injector
    constructor($log: ng.ILogService) {
      var vm = this
      vm.ctrlName = 'AdminCtrl'
      $log.debug('controller ' + vm.ctrlName + ' is working')
    }
  }


  /**
  * @ngdoc object
  * @name user.admin.controller:AdminCtrl
  *
  * @description
  *
  */
  angular
    .module('user.admin')
    .controller('AdminCtrl', AdminCtrl);
}
