///<reference path='../../typings/tsd.d.ts' />
module TopicEditCtrl {
  'use strict';

  class TopicEditCtrl {

    description: string
    relatedText: any[]
    relatedVideos: any[]
    cachingService: Caching.CachingService
    callBackendService: CallBackend.CallBackendService
    workingTopic: lectureDefinitions.models.Topic
    patch: lectureDefinitions.models.LecturePatch
    deleteId: string
    addId: string
    moveId: string
    textId: any
    videoId: any
    currentTab: number


    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: any = [
      'CallBackendService',
      'CachingService',
      '$routeParams'
    ]

    // dependencies are injected via AngularJS $injector
    constructor(callBackendService: CallBackend.CallBackendService, $routeParams: any, cachingService: Caching.CachingService) {
      var vm = this
      vm.currentTab = 1
      vm.callBackendService = callBackendService
      vm.patch = new lectureDefinitions.models.LecturePatch()
      //vm.workingTopic = <lectureDefinitions.models.Topic>cachingService.load($routeParams.id)
      vm.workingTopic = new lectureDefinitions.models.Topic(JSON.parse(lectureDefinitions.models.testdata))
      // Beispiele für Videos, Texte
    }

    generateDeleteModulePatch(deleteId: string) {
      var path = "/modules/" + deleteId
      this.patch.deleteOperation(path)
    }

    generateAddModulePatch(addId: string, description: string) {
      var path = "/modules/" + addId
      this.patch.addOperation(path, description)
    }

    generateMoveModulePatch(moveId: string, parents: any[]) {
      var from = "modules/"
      var path = "modules/"
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
