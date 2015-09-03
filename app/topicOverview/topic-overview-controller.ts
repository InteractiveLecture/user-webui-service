///<reference path='../../typings/tsd.d.ts' />
module TopicOverviewCtrl {
  'use strict';

  class TopicOverviewCtrl {

    ctrlName: string

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: string[] = [
    ];

    // dependencies are injected via AngularJS $injector
    constructor() {
      var vm = this;
      vm.ctrlName = 'TopicOverviewCtrl';
    }
  }


  /**
  * @ngdoc object
  * @name topicOverview.controller:TopicOverviewCtrl
  *
  * @description
  *
  */
  angular
    .module('topicOverview')
    .controller('TopicOverviewCtrl', TopicOverviewCtrl);
}
