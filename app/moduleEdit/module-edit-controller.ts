///<reference path='../../typings/tsd.d.ts' />
module ModuleEditCtrl {
  'use strict';

  class ModuleEditCtrl {

    rfc4122: any
    currentTab: number
    cachingService: Caching.CachingService
    callBackendService: CallBackend.CallBackendService
    patch: lectureDefinitions.models.LecturePatch
    workingModule: string
    delete_id:string
    backend: string
    hints: any[]
    tasks: any[]


    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: any = [
      'CallBackendService',
      'CachingService'
    ];

    // dependencies are injected via AngularJS $injector
    constructor(callBackend: CallBackend.CallBackendService, cache: Caching.CachingService, rfc4122: any) {
      var vm = this
      vm.currentTab = 1
      vm.cachingService = cache
      vm.callBackendService =callBackend
      vm.rfc4122 = rfc4122
      vm.workingModule = $routeParams.id
      vm.patch = new lectureDefinitions.models.LecturePatch()
    }

    generateDeleteExercisePatch(delete_id:string) {
      var path = "/exercise/" + delete_id
      this.patch.deleteOperation(path)
    }

    generateAddExercisePatch(backend: string, tasks:any[], hints:any[]) {
      var path = "/exercise/"
      var value = {
        id: this.rfc4122.v4(),
        backend: backend,
        tasks: tasks,
        hints: hints
      }
      this.patch.addOperation(path, value)
    }

    generateChangeModuleDescriptionPatch(description:string) {

    }

    generateChangeModuleVideoIdPatch(video_id:string) {

    }

    generateChangeModuleScriptIdPatch(script_id:string) {

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
