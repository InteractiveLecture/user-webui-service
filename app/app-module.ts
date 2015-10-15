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
    ($componentLoaderProvider: any, $httpProvider: ng.IHttpProvider, jwtInterceptorProvider: any) => {
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

      jwtInterceptorProvider.tokenGetter = ['config', 'jwtHelper', '$http', (config: any, jwtHelper: ng.jwt.IJwtHelper, $http: any) => {
        // Skip authentication for any requests ending in .html
        if (config.url.substr(config.url.length - 5) == '.html') {
          return null;
        }
        if (config.url.substr(config.url.length - 4) == '.css') {
          return null;
        }
        if (config.url.substr(config.url.length - 3) == '.js') {
          return null;
        }

        var idToken = localStorage.getItem('id_token');
        var refreshToken = localStorage.getItem('refresh_token');
        console.log(idToken);
        console.log(typeof idToken);
        if (idToken !== 'null' && idToken !== null) {
          console.log('Broken bei idToken != null')
          if (jwtHelper.isTokenExpired(idToken)) {
            // This is a promise of a JWT id_token
            return $http({
              url: '/authentication-service/oauth/token',
              // This makes it so that this request doesn't send the JWT
              skipAuthorization: true,
              method: 'POST',
              data: `refresh_token=${refreshToken}&client_id=user-web-client&grant_type=refresh_token`,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then(function(response: any) {
              console.log('Broken bei function(response: any')
              var id_token = response.data.id_token;
              localStorage.setItem('id_token', id_token);
              return id_token;
            });
          } else {
            return idToken;
          }
        }
        else {
          return null;
        }
      }];

      $httpProvider.interceptors.push('jwtInterceptor');

    }]);

}
