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
    'uiComponents',
    'tutorialVideoUpload',
    'tutorialTextUpload'
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
        // Keine Token für .html mitschicken
        if (config.url.substr(config.url.length - 5) == '.html') {
          return null;
        }
        // Keine Token für .css mitschicken
        if (config.url.substr(config.url.length - 4) == '.css') {
          return null;
        }
        // Keine Token für .js mitschicken
        if (config.url.substr(config.url.length - 3) == '.js') {
          return null;
        }

        // localStorage abrufen
        var idToken = localStorage.getItem('id_token');
        var refreshToken = localStorage.getItem('refresh_token');

        // Den leeren localStorage für Chrome und Firefox abfangen. (Grrr)
        if (idToken !== 'null' && idToken !== null) {
          // Falls das aktuelle Token abläuft soll...
          if (jwtHelper.isTokenExpired(idToken)) {
            // Ein Request geschickt werden für ein refreshToken
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
              // Falls die Anfrage erfolg hat tue ich das mit der Antwort
              console.log('Broken bei function(response: any')
              var id_token = response.data.id_token;
              localStorage.setItem('id_token', id_token);
              return id_token;
            });
          } else {
            // Falls das Token nicht abgelaufen ist gebe ich das aktuelle zurück
            return idToken;
          }
        }
        else {
          // Falls es noch kein Token gibt, gibt es keins zurück
          return null;
        }
      }];

      // Überschriebenen Interceptor nutzen.
      $httpProvider.interceptors.push('jwtInterceptor');

    }]);

}
