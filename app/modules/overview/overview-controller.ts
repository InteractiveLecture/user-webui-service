///<reference path='../../../typings/tsd.d.ts' />
module modules {
  'use strict';

  class OverviewCtrl {

    ctrlName: string
    nodes: any[]
    edges: any[]
    moduleTree: lectureDefinitions.interfaces.treeData[]
    callBackendService: CallBackend.CallBackendService

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: string[] = [
      'CallBackendService'
    ];

    // dependencies are injected via AngularJS $injector
    constructor(callBackendService: CallBackend.CallBackendService) {
      var vm = this
      vm.ctrlName = 'OverviewCtrl'
      vm.callBackendService = callBackendService
      vm.moduleTree = []
      // vm.callBackendService.loadModuleTree('abc', 0, -1, -1, (treeData: lectureDefinitions.interfaces.treeData[]) => {
      //   vm.moduleTree = treeData
      // })
      //
      vm.nodes = vm.getNodesFrom(lectureDefinitions.models.testTree)
      vm.edges = vm.getEdgesFrom(lectureDefinitions.models.testTree)
      vm.initFirstNode()
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
        return false
      } else {
        return true
      }
    }

    haveScript(node: lectureDefinitions.interfaces.treeData): boolean {
      if (node.script_id != null) {
        return false
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
    .controller('OverviewCtrl', OverviewCtrl);
}
