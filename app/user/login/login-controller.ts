///<reference path='../../../typings/tsd.d.ts' />
module user {
  'use strict';

  class LoginCtrl {

    ctrlName: string
    userData: lectureDefinitions.interfaces.loginable
    errorStatus: any
    callBackendService: lectureDefinitions.interfaces.backendable

    $location: ng.ILocationService

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: string[] = [
      'CallBackendService',
      '$location',
    ];

    // dependencies are injected via AngularJS $injector
    constructor(callBackendService: lectureDefinitions.interfaces.backendable, $location: ng.ILocationService) {
      var vm = this
      vm.ctrlName = 'LoginCtrl'
      vm.callBackendService = callBackendService
      vm.$location = $location
      console.log('controller is working')
    }

    public attemptLogin(userData: lectureDefinitions.interfaces.loginable) {
      // CallBackend Service nutzen
      console.log('reagiert')
      this.userData = userData
      if (userData !== null && userData !== undefined) {
        this.callBackendService.postUserData(userData, (err: any, token: any) => {
          if (err !== null) {
            this.errorStatus = err.status
            this.userData.password = ''
          }
          else {
            // console.log(`congrats! here is your token:${data.access_token}`);
            localStorage.setItem('id_token', token.data.access_token)
            localStorage.setItem('refresh_token', token.data.refresh_token)
            /*vorhandene eigenschaften des objektes:
             {
                access_token, token_type,refresh_token,expires_in,scope,id,jti,
              }*/

            // Weiterleitung / Redirect
            this.$location.path("/topics");
          }
        })
      }
    }
  }


  /**
  * @ngdoc object
  * @name user.login.controller:LoginCtrl
  *
  * @description
  *
  */
 console.log('registere controller')
  angular
    .module('user.login')
    .controller('LoginCtrl', LoginCtrl);
}
