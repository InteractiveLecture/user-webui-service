///<reference path='../../typings/tsd.d.ts' />
module ProfileCtrl {
  'use strict';

  class ProfileCtrl {

    cache: Caching.CachingService
    profileData: lectureDefinitions.models.Profile

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: string[] = [
      'CachingService',
      '$http'
    ];

    // dependencies are injected via AngularJS $injector
    constructor(CachingService: Caching.CachingService, $http: ng.IHttpService) {
      var vm = this;
      vm.cache = CachingService;
      vm.profileData = <lectureDefinitions.models.Profile>vm.cache.load('profile');
    }
  }

  /**
  * @ngdoc object
  * @name profile.controller:ProfileCtrl
  *
  * @description
  * Profildaten darstellen
  */
  angular
    .module('profile')
    .controller('ProfileCtrl', ProfileCtrl);
}
