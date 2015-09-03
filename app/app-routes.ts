///<reference path='../typings/tsd.d.ts' />
module interactiveLectureWebFrontend {
  'use strict';

  angular
    .module('interactiveLectureWebFrontend')
    .config(config);

  function config($routeProvider: ng.route.IRouteProvider) {
    $routeProvider.otherwise({
      redirectTo: '/home'
    });
  }
}
