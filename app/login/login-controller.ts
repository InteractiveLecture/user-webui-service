///<reference path='../../typings/tsd.d.ts' />
module LoginCtrl {
  'use strict';

  class LoginCtrl {

    userData: any
    $cookies: ng.cookies.ICookiesService
    $location: ng.ILocationService
    callBackend: CallBackend.CallBackendService
    errorStatus: string


    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: string[] = [
      '$cookies',
      'CallBackendService',
      '$location'
    ];

    // dependencies are injected via AngularJS $injector
    constructor($cookies: any, CallBackendService: any, $location: ng.ILocationService) {
      var vm = this;
      vm.$cookies = $cookies;
      vm.$location = $location;
      vm.callBackend = CallBackendService;

    }

    public attemptLogin(userData: any) {
      // CallBackend Service nutzen
      if (userData !== null && userData !== undefined) {
        this.callBackend.postUserData(userData, (err: any, data: any) => {
          if (err !== null) {
            this.errorStatus = err.status;
            this.userData.passwort = "";
            // console.log("you are not logged in... moron!");
          }
          else {
            // console.log(`congrats! here is your token:${data.access_token}`);
            localStorage.setItem('id_token', data.access_token);
            localStorage.setItem('refresh_token', data.refreh_token);
            /*
             * vorhandene eigenschaften des objektes:
             *{
                access_token, token_type,refresh_token,expires_in,scope,id,jti,
              }
             *
             * */

            // Weiterleitung / Redirect
            this.$location.path("/home");
          }
        })
      }
    }
  }


  /**
  * @ngdoc object
  * @name login.controller:LoginCtrl
  *
  * @description
  * Login verwalten. Hält dafür die zu versenden Daten und eine Methode fürs einloggen
  */
  angular
    .module('login')
    .controller('LoginCtrl', LoginCtrl);
}
