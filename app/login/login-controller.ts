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

    attemptLogin(userData: any): boolean {
      // CallBackend Service nutzen
      var cookieData: any = this.callBackend.postUserData(userData);
      // Bei erfolgreichem LogIn Cookie setzen
      if (cookieData == undefined) {
        if (cookieData == null) {
          console.log('failed');
          this.$cookies.put('kennung', 'unbekannt');
          this.$cookies.put('authenticated', 'false');
          return false;
        }
      }
      else {
        console.log('success');
        this.$cookies.put('kennung', cookieData.kennung);
        this.$cookies.put('authenticated', 'true');
        return true;
      }
    }
  }


  /**
  * @ngdoc object
  * @name login.controller:LoginCtrl
  *
  * @description
  *
  */
  angular
    .module('login')
    .controller('LoginCtrl', LoginCtrl);
}
