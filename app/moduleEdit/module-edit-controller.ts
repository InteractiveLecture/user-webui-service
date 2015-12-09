///<reference path='../../typings/tsd.d.ts' />
module ModuleEditCtrl {
  'use strict';

  class ModuleEditCtrl {

    currentTab: number
    cachingService: Caching.CachingService
    callBackendService: CallBackend.CallBackendService
    patch: lectureDefinitions.models.LecturePatch

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: any = [
      'CallBackendService',
      'CachingService'
    ];

    // dependencies are injected via AngularJS $injector
    constructor(callBackend: CallBackend.CallBackendService, cache: Caching.CachingService) {
      var vm = this
      vm.currentTab = 1
      vm.cachingService = cache
      vm.callBackendService =callBackend
      vm.patch = new lectureDefinitions.models.LecturePatch()
    }

    
  }


  /**
  * @ngdoc object
  * @name moduleEdit.controller:ModuleEditCtrl
  *
  * @description
  *
  */
  angular
    .module('moduleEdit')
    .controller('ModuleEditCtrl', ModuleEditCtrl);
}
