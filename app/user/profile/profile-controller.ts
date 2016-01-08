///<reference path='../../../typings/tsd.d.ts' />
module user {
  'use strict';

  class ProfileCtrl {

    ctrlName: string
    callBackendService: lectureDefinitions.interfaces.backendable
    user: lectureDefinitions.models.User
    newPassword: string

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: string[] = [
      'CallBackendService'
    ];

    // dependencies are injected via AngularJS $injector
    constructor(callBackendService: lectureDefinitions.interfaces.backendable) {
      var vm = this
      vm.ctrlName = 'ProfileCtrl'
      vm.callBackendService = callBackendService
      // Mockdaten
      vm.user = new lectureDefinitions.models.User({ username: "muellerm" })
    }

    changePassword(newPassword: string) {
      // TODO: changePassword implementieren
      console.log(newPassword)
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
