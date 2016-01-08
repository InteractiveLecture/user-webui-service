///<reference path='../../../typings/tsd.d.ts' />
module modules {
  'use strict';

  class OverviewCtrl {

    ctrlName: string
    nodes: any[]
    edges: any[]
    moduleTree: lectureDefinitions.interfaces.treeData[]
    callBackendService: CallBackend.CallBackendService

    $location: ng.ILocationService

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: string[] = [
      'CallBackendService'
    ];

    // dependencies are injected via AngularJS $injector
    constructor($location: ng.ILocationService, callBackendService: CallBackend.CallBackendService) {
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
    }

    getNodesFrom(data: lectureDefinitions.interfaces.treeData[]) {
      var result: any[] = []
      data.forEach((node) => {
        result.push({ data: { id: node.id, name: node.description } })
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
