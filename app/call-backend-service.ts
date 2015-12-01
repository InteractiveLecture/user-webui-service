///<reference path='../typings/tsd.d.ts' />
module CallBackend {
  'use strict';

  export class CallBackendService implements lectureDefinitions.interfaces.ModelService {

    cache: Caching.CachingService;
    $routeParams: any;
    $http: ng.IHttpService;
    $q: ng.IQService;
    jwtHelper: ng.jwt.IJwtHelper;


    public static $inject: string[] = [
      'CachingService',
      '$routeParams',
      '$http',
      'jwtHelper'
    ];

    // Dependency einbinden
    constructor(CachingService: Caching.CachingService, $routeParams: any, $http: ng.IHttpService, $q: ng.IQService, jwtHelper: any) {
      var vm = this
      vm.cache = CachingService
      vm.$routeParams = $routeParams
      vm.$http = $http
      vm.$q = $q
      vm.jwtHelper = jwtHelper

    }

    get(): string {
      return 'CallBackendService';
    }

    // Modeldaten anhand der übergebenen Url laden.
    // Die Verwendung der Daten bestimmt der Nutzer per Callback
    loadModel(linkUrl: string, callback: any) {
      var model = this.cache.load(linkUrl);
      if (model !== undefined) {
        if (model !== null) {
          if (model.id === this.extractId(model.cacheIndex, linkUrl)) {
            return model;
          }
        }
      }
      this.$http({
        method: 'GET',
        url: linkUrl
      }).then((result: any) => {
        var jsonResult = result.data;
        callback(jsonResult.content.map((item: any) => new lectureDefinitions.models.BaseModel(item)));
      }, (err) => console.log(err))
    }

    // Eine Id aus einer Url herausfiltern
    // Wichtig ist der idName: z.B. url = http://localhost:8080/topics/1
    // mit idName = topics; wird die 1 gefunden
    extractId(idName: string, url: string): number {
      var href = url;
      if (href === null) {
        return null;
      }
      var elements: string[] = href.split("/");
      for (var i = 0; i < elements.length; i++) {
        if (elements[i] === idName) {
          if (i < elements.length) {
            if (!isNaN(parseInt(elements[i + 1]))) {
              return parseInt(elements[i + 1]);
            }
          }
        }
      }
      return null;
    }

    // LOGIN
    // Gibt die eingetippten Daten ans Backend weiter. resultat wird im Cache
    // gespeichert und zurückgegeben
    postUserData(userData: any, callback: any) {

      var username = userData.kennung;
      var passwort = userData.passwort;
      var clientId = "user-web-client";
      var clientSecret = "user-web-client-secret"
      var grant_type = "password";
      var data = `username=${username}&password=${passwort}&client_id=${clientId}&client_secret=${clientSecret}&grant_type=${grant_type}`
      var req = {
        method: 'POST',
        url: '/authentication-service/oauth/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      }
      this.$http(req).then(
        (token: any) => { callback(null, token.data) },
        (error: any) => { callback(error, null) }
        )
    }
  }


  /**
   * @ngdoc service
   * @name interactiveLectureWebFrontend.service:CallBackend
   *
   * @description
   * Kommunikation mit dem Backend.
   * WICHTIG: Jeder Konsument braucht die Dependency 'interactiveLectureWebFrontend'
   */
  angular
    .module('interactiveLectureWebFrontend')
    .service('CallBackendService', CallBackendService);
}
