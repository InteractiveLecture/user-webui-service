///<reference path='../../typings/tsd.d.ts' />
module TopicEditCtrl {
  'use strict';

  class TopicEditCtrl {

    cachingService: Caching.CachingService
    callBackendService: CallBackend.CallBackendService
    workingTopic: lectureDefinitions.models.Topic
    patch: lectureDefinitions.models.LecturePatch
    deleteId: string



    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: any = [
      'CallBackendService',
      'CachingService',
      '$routeParams'
    ];

    // dependencies are injected via AngularJS $injector
    constructor(callBackendService: CallBackend.CallBackendService, $routeParams: any, cachingService: Caching.CachingService) {
      var vm = this;
      vm.callBackendService = callBackendService
      vm.patch = new lectureDefinitions.models.LecturePatch()
      //vm.workingTopic = <lectureDefinitions.models.Topic>cachingService.load($routeParams.id)
      vm.workingTopic = new lectureDefinitions.models.Topic(JSON.parse(lectureDefinitions.models.testdata))
      // console.log(vm.workingTopic)
    }

    generateDeleteModulePatch(deleteId: string) {
      var path = "/modules/" + deleteId
      this.patch.deleteOperation(path)
    }



  }


  /**
  * @ngdoc object
  * @name topicEdit.controller:TopicEditCtrl
  *
  * @description
  *
  */
  angular
    .module('topicEdit')
    .controller('TopicEditCtrl', TopicEditCtrl);
}
