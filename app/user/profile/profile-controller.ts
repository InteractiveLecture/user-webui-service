///<reference path='../../../typings/tsd.d.ts' />
module user {
  'use strict';

  class ProfileCtrl {

    ctrlName: string
    callBackendService: lectureDefinitions.interfaces.backendable
    $log: ng.ILogService
    user: lectureDefinitions.models.User
    newPassword: string
    error: any

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: string[] = [
      'CallBackendService',
      '$log'
    ];

    // dependencies are injected via AngularJS $injector
    constructor(callBackendService: lectureDefinitions.interfaces.backendable, $log: ng.ILogService) {
      var vm = this
      vm.ctrlName = 'ProfileCtrl'
      vm.$log = $log
      $log.debug('controller ' + vm.ctrlName + ' is working')
      vm.callBackendService = callBackendService
      // Mockdaten
      vm.user = new lectureDefinitions.models.User({ username: "muellerm", id: 12 })
    }

    changePassword(newPassword: string) {
      this.callBackendService.postNewPassword(newPassword, this.user.id, (result: any) => {
        this.$log.debug(result.status)
        this.error = result.status
      })
    }
  }


  /**
  * @ngdoc object
  * @name user.profile.controller:ProfileCtrl
  *
  * @description
  *
  */
  angular
    .module('user.profile')
    .controller('ProfileCtrl', ProfileCtrl);
}
