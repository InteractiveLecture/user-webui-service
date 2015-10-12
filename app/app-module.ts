///<reference path='../typings/tsd.d.ts' />
module interactiveLectureWebFrontend {
  'use strict';

  /* @ngdoc object
   * @name interactiveLectureWebFrontend
   * @description
   *
   */
  var app = angular
    .module('interactiveLectureWebFrontend', [
    'ngNewRouter',
    "ngSanitize",
		"com.2fdevs.videogular",
		"com.2fdevs.videogular.plugins.controls",
		"com.2fdevs.videogular.plugins.overlayplay",
		"com.2fdevs.videogular.plugins.poster",
    'angular-jwt',
    'home',
    'login',
    'profile',
    'moduleOverview',
    'topicOverview',
    'topicDetails',
    'tutorialText',
    'tutorialVideo',
    'exerciseOverview',
    'exerciseWorksheet',
    'uiComponents'

  ]);

  app.config(['$componentLoaderProvider', '$httpProvider', 'jwtInterceptorProvider',
    ($componentLoaderProvider: any, $httpProvider: ng.IHttpProvider, jwtInterceptorProvider: ng.jwt.IJwtInterceptor) => {
      // Die generierten Controller nutzen
      $componentLoaderProvider.setCtrlNameMapping((name: string) => {
        // name is component name
        return name[0].toUpperCase() + name.substr(1) + 'Ctrl';
      });
      // Die generierten Templates nutzen
      $componentLoaderProvider.setTemplateMapping((name: string) => {
        // name is component name
        return name + '/' + name + '.tpl.html';
      });

      jwtInterceptorProvider.tokenGetter = function(){
        console.log("Rufe Token auf");
        //TODO Implemnéntierung prüfen
        return <string> localStorage.getItem('id_token');
      };

      $httpProvider.interceptors.push('jwtInterceptor');

    }]);

}
