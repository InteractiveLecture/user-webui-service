///<reference path='../../../typings/tsd.d.ts' />
module topics {
  'use strict';

  class DetailsCtrl {

    ctrlName: string
    topicList: lectureDefinitions.models.Topic[]
    cachingService: Caching.CachingService

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: string[] = [
      'CachingService',
      '$log'
    ];

    // dependencies are injected via AngularJS $injector
    constructor(cachningService: Caching.CachingService, $log: ng.ILogService) {
      var vm = this
      vm.ctrlName = 'DetailsCtrl'
      $log.debug('controller ' + vm.ctrlName + ' is working')
      vm.cachingService = cachningService

    }
  }


  /**
  * @ngdoc object
  * @name topics.details.controller:DetailsCtrl
  *
  * @description
  *
  */
  angular
    .module('topics.details')
    .controller('DetailsCtrl', DetailsCtrl);
}
