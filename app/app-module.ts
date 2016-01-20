///<reference path='../typings/tsd.d.ts' />
module webUiService {
  'use strict';

  /* @ngdoc object
   * @name webUiService
   * @description
   *
   */
  var app = angular
    .module('webUiService', [
    'ngAria',
    'ngSanitize',
    'ngAnimate',
    'ui.router',
    'ui.bootstrap',
    'ngFx',
    "com.2fdevs.videogular",
    "com.2fdevs.videogular.plugins.controls",
    "com.2fdevs.videogular.plugins.overlayplay",
    "com.2fdevs.videogular.plugins.poster",
    'angular-jwt',
    'home',
    'user',
    'topics',
    'tutorials',
    'exercises',
    'modules',
    'upload'
  ]);

  app.animation('.container', function($log: ng.ILogService) {

    return {
      enter: function(element: any, done: any) {
        $log.debug('enter');
        element.css({
          opacity: 0.5,
          position: 'relative',
          left: '500px'
        }).animate({
          left: 0,
          opacity: 1
        }, 350, done);

        return function(cancelled: any) {
          if (cancelled)
            element.stop();
        }

      }
    }
  })


  app.config(['$httpProvider', 'jwtInterceptorProvider',
    ($httpProvider: ng.IHttpProvider, jwtInterceptorProvider: any) => {
      /**
       * Interceptor der http-request für jwt Token überschreiben
       * WICHTIG: $http muss vom any sein. Die Konfiguration nicht den Typings entspricht, aber funktioniert
       */
      jwtInterceptorProvider.tokenGetter = ['config', 'jwtHelper', '$http', (config: any, jwtHelper: ng.jwt.IJwtHelper, $http: any) => {
        // Keine Token für .html mitschicken
        if (config.url.substr(config.url.length - 5) == '.html') {
          return null
        }
        // Keine Token für .css mitschicken
        if (config.url.substr(config.url.length - 4) == '.css') {
          return null
        }
        // Keine Token für .js mitschicken
        if (config.url.substr(config.url.length - 3) == '.js') {
          return null
        }

        // Für den Login wird kein Token benötigt
        if (config.url.startsWith('/login')) {
          return null
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
              url: '/login',
              // This makes it so that this request doesn't send the JWT
              skipAuthorization: true,
              method: 'POST',
              data: `refresh_token=${refreshToken}&client_id=user-web-client&grant_type=refresh_token`,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then(function(response: any) {
              // Falls die Anfrage erfolg hat tue ich das mit der Antwort
              var id_token = response.data.id_token
              localStorage.setItem('id_token', id_token)
              return id_token
            })
          } else {
            // Falls das Token nicht abgelaufen ist gebe ich das aktuelle zurück
            return idToken
          }
        }
        else {
          // Falls es noch kein Token gibt, gibt es keins zurück
          return null
        }
      }];

      // Überschriebenen Interceptor nutzen.
      $httpProvider.interceptors.push('jwtInterceptor')

    }])
}
