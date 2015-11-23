///<reference path='..//typings/tsd.d.ts' />
module RouteCtrl {
  'use strict';

  class RouteCtrl {

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: string[] = [
      '$router'
    ];

    // dependencies are injected via AngularJS $injector
    constructor(private $router: any) {
      var vm = this;
      // New Router: Routen definiert anhand von Komponenten
      // Eine Komponente besteht immer aus Template, Controller und eventuell Router
      $router.config([
        { path: '/', redirectTo: '/login' },
        { path: '/home', component: 'home' },
        { path: '/login', component: 'login' },
        { path: '/profile', component: 'profile' },
        { path: '/topics', component: 'topicOverview' },
        { path: '/topics/:id', component: 'topicDetails' },
        { path: '/topics/:id/module', component: 'moduleOverview' },
        { path: '/module/:id/tutorial/text', component: 'tutorialText' },
        { path: '/module/:id/tutorial/text/upload', component: 'tutorialTextUpload' },
        { path: '/module/:id/tutorial/video', component: 'tutorialVideo' },
        { path: '/module/:id/tutorial/video/upload', component: 'tutorialVideoUpload' },
        { path: '/module/:id/exercise', component: 'exerciseOverview' },
        { path: '/module/:id/exercise/:eId', component: 'exerciseWorksheet' },
      ]);
    }
  }


  /**
  * @ngdoc object
  * @name interactiveLectureWebFrontend.controller:RouteCtrl
  *
  * @description
  * Verwaltung der Routen des Lecture Service
  */
  angular
    .module('interactiveLectureWebFrontend')
    .controller('RouteCtrl', RouteCtrl);
}
