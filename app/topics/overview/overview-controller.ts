///<reference path='../../../typings/tsd.d.ts' />
module topics {
  'use strict';

  class OverviewCtrl {

    ctrlName: string
    topicList: lectureDefinitions.models.Topic[]
    cachingService: Caching.CachingService

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: string[] = [
      'CachingService',
      'CallBackendService',
      '$log'
    ];

    // dependencies are injected via AngularJS $injector
    constructor(cachingService: Caching.CachingService, callBackendService: CallBackend.CallBackendService, $log: ng.ILogService) {
      var vm = this
      vm.ctrlName = 'OverviewCtrl'
      vm.cachingService = cachingService

      //TODO: Echtdaten anfordern
      $log.debug('controller ' + vm.ctrlName + ' is working!')
      //Mockdaten

      callBackendService.loadTopicsPage(0, 100, (result: lectureDefinitions.models.Topic[]) => {
        vm.topicList = result
        result.forEach((topic: lectureDefinitions.models.Topic)=>{
          cachingService.save(topic.id, topic)
          $log.debug('schreibe ' + topic.name + ' in den Cache')
        })
      })
    }
  }


  /**
  * @ngdoc object
  * @name topics.overview.controller:OverviewCtrl
  *
  * @description
  *
  */

  angular
    .module('topics.overview')
    .controller('TopicOverviewCtrl', OverviewCtrl);

}
