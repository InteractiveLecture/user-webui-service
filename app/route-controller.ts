///<reference path='..//typings/tsd.d.ts' />
module RouteCtrl {
  'use strict';

  class RouteCtrl {

    ctrlName: string

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject = [
      '$router',
      '$componentLoader'
    ];

    // dependencies are injected via AngularJS $injector
    constructor(private $router: any, private $componentLoader: any) {
      var vm = this;
      vm.ctrlName = 'RouteCtrl';

      $router.config([
        { path: '/', redirectTo: '/home' },
        { path: '/home', component: 'home' }
      ]);



    }
  }


  /**
  * @ngdoc object
  * @name interactiveLectureWebFrontend.controller:RouteCtrl
  *
  * @description
  *
  */
  angular
    .module('interactiveLectureWebFrontend')
    .controller('RouteCtrl', RouteCtrl);
}
