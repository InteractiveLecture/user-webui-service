///<reference path='../../../typings/tsd.d.ts' />
module user {
  'use strict';

  class AdminCtrl {

    ctrlName: string
    newUser: any
    error: any
    callBackendService: lectureDefinitions.interfaces.backendable
    $log: ng.ILogService

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: string[] = [
      'CallBackendService',
      '$log',
      'rfc4122'
    ];

    // dependencies are injected via AngularJS $injector
    constructor(callBackendService: lectureDefinitions.interfaces.backendable, $log: ng.ILogService, rfc4122: any) {
      var vm = this
      vm.ctrlName = 'AdminCtrl'
      vm.$log = $log
      vm.callBackendService = callBackendService
      $log.debug('controller ' + vm.ctrlName + ' is working')
      vm.newUser = {
        id: rfc4122.v4(),
        username: '',
        role: 'USER'
      }
    }

    postNewUser(newUser: any) {
      this.$log.debug(newUser)
      this.callBackendService.postUser(newUser, (result: any) => {
        this.$log.debug(result.status)
        this.error = result.status
      })
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
