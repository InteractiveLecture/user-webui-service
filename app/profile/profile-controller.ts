///<reference path='../../typings/tsd.d.ts' />
module ProfileCtrl {
  'use strict';

  class ProfileCtrl {

    ctrlName: string;
    cache: Caching.CachingService;
    profileData: any

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: string[] = [
      'CachingService'
    ];

    // dependencies are injected via AngularJS $injector
    constructor(CachingService: Caching.CachingService) {
      var vm = this;
      vm.ctrlName = 'ProfileCtrl';
      vm.cache = CachingService;
      vm.profileData = vm.cache.load('profile');
    }
  }


  /**
  * @ngdoc object
  * @name profile.controller:ProfileCtrl
  *
  * @description
  *
  */
  angular
    .module('profile')
    .controller('ProfileCtrl', ProfileCtrl);
}
