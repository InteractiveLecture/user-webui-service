///<reference path='../../../typings/tsd.d.ts' />
module modules {
  'use strict';

  class OverviewCtrl {

    ctrlName: string
    nodes: any[]
    edges: any[]
    module: lectureDefinitions.models.Module
    topic: lectureDefinitions.models.Topic
    moduleTree: lectureDefinitions.interfaces.treeData[]
    callBackendService: CallBackend.CallBackendService
    cachingService: Caching.CachingService

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: string[] = [
      'CallBackendService',
      'CachingService',
      '$scope',
      '$log',
      '$stateParams'
    ];

    // dependencies are injected via AngularJS $injector
    constructor(callBackendService: CallBackend.CallBackendService, cachingService: Caching.CachingService, $scope: ng.IScope, $log: ng.ILogService, $stateParams: any) {
      var vm = this
      vm.ctrlName = 'OverviewCtrl'
      $log.debug('controller ' + vm.ctrlName + ' is working')
      vm.callBackendService = callBackendService
      vm.cachingService = cachingService
      vm.moduleTree = []

      vm.topic = cachingService.loadTopic($stateParams.id)

      $scope.$on('loadModule', (event: ng.IAngularEvent, moduleId: string) => {
        console.log("im callback")
        callBackendService.loadModule(moduleId, (module: lectureDefinitions.models.Module) => {
          vm.module = module
          console.log('es lädt')
          cachingService.save(module.id, module)
        })
      })

      // vm.callBackendService.loadModuleTree('abc', 0, -1, -1, (treeData: lectureDefinitions.interfaces.treeData[]) => {
      //   vm.moduleTree = treeData
      // })
      //
      console.log($stateParams.id)
      callBackendService.loadModuleTree($stateParams.id, 0, 2, 2, (tree: lectureDefinitions.interfaces.treeData[]) => {
        vm.nodes = vm.getNodesFrom(tree)
        vm.edges = vm.getEdgesFrom(tree)
        vm.initFirstNode()
      })
    }

    getNodesFrom(data: lectureDefinitions.interfaces.treeData[]) {
      var result: any[] = []
      data.forEach((node) => {
        result.push({
          data:
          {
            id: node.id,
            name: node.description,
            visible: false,
            video_id: node.video_id,
            scipt: node.script_id
          }
        })
      })
      return result
    }

    getEdgesFrom(data: lectureDefinitions.interfaces.treeData[]) {
      var result: any[] = []
      data.forEach((node) => {
        node.children.forEach((child) => {
          result.push({ data: { source: node.id, target: child } })
        })
      })
      return result
    }

    initFirstNode() {
      this.nodes[0].data.visible = true
    }

    haveVideo(node: lectureDefinitions.interfaces.treeData): boolean {
      if (node.video_id != null) {
        return true
      } else {
        return false
      }
    }

    haveScript(node: lectureDefinitions.interfaces.treeData): boolean {
      if (node.script_id != null) {
        return true
      } else {
        return false
      }
    }
  }


  /**
  * @ngdoc object
  * @name modules.overview.controller:OverviewCtrl
  *
  * @description
  *
  */
  angular
    .module('modules.overview')
    .controller('ModuleOverviewCtrl', OverviewCtrl);
}
