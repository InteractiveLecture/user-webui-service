///<reference path='../../typings/tsd.d.ts' />
module LoginCtrl {
  'use strict';

  class LoginCtrl {

    ctrlName: string;
    userData: any;
    $cookies: ng.cookies.ICookiesService;
    callBackend: CallBackend.CallBackendService;

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: string[] = [
      '$cookies',
      'CallBackendService'
    ];

    // dependencies are injected via AngularJS $injector
    constructor($cookies: any, CallBackendService: any) {
      var vm = this;
      vm.ctrlName = 'LoginCtrl';
      vm.$cookies = $cookies;
      vm.callBackend = CallBackendService;
    }

    public attemptLogin(userData: any){
      // CallBackend Service nutzen
      this.callBackend.postUserData(userData,(err: any, data: any) => {
        if(err !== null){
          console.log("you are not logged in... moron!");
          //TODO error anzeigen und redirect auf login.
        }
        else {
          console.log(`congrats! here is your token:${data.access_token}`);
          /*
           * vorhandene eigenschaften des objektes:
           *{
              access_token, token_type,refresh_token,expires_in,scope,id,jti,
            }
           *
           * */
          //TODO auf Seite weiterleiten.
        }
      })
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
