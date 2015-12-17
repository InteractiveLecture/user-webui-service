///<reference path='../typings/tsd.d.ts' />
module CallBackend {
  'use strict'

  export class CallBackendService implements lectureDefinitions.interfaces.ModelService {

    cache: Caching.CachingService;
    $routeParams: any;
    $http: ng.IHttpService;
    $q: ng.IQService;
    jwtHelper: ng.jwt.IJwtHelper;
    $exceptionHandler: ng.IExceptionHandlerService


    public static $inject: string[] = [
      'CachingService',
      '$routeParams',
      '$http',
      '$exceptionHandler',
      'jwtHelper'
    ];

    /**
     * Einbinden der Dependency's
     * @param  {Caching.CachingService}      CachingService    [Die Daten die beschafft werden sollen gecached werden]
     * @param  {any}                         $routeParams      [RoutenParameter nutzen]
     * @param  {ng.IHttpService}             $http             [http-request versenden an das Backend]
     * @param  {ng.IQService}                $q                [Das defered zum schließen der Ressourcen]
     * @param  {any}                         jwtHelper         [Die Verarbeitung der Jwt-Token]
     * @param  {ng.IExceptionHandlerService} $exceptionHandler [Eigene Exceptions]
     */
    constructor(CachingService: Caching.CachingService, $routeParams: any, $http: ng.IHttpService, $q: ng.IQService, jwtHelper: any, $exceptionHandler: ng.IExceptionHandlerService) {
      var vm = this
      vm.cache = CachingService
      vm.$routeParams = $routeParams
      vm.$http = $http
      vm.$q = $q
      vm.$exceptionHandler = $exceptionHandler
      vm.jwtHelper = jwtHelper

    }

    /**
     * Service identifizieren
     * @return {string} [ServiceName]
     */
    get(): string {
      return 'CallBackendService';
    }

    /**
     * Modeldaten anhand der übergebenen Url laden. Die Verwendung der Daten
     * bestimmt der Nutzer per Callback
     * @param  {string} linkUrl  [Url wo die Ressourcen zu laden sind]
     * @param  {any}    callback [Callback damit der Aufrufer das Ergebnis verwenden kann]
     */
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


    /**
     * Eine Id aus einer Url herausfiltern
     * Wichtig ist der idName: z.B. url = http://localhost:8080/topics/1
     * mit idName = topics; wird die 1 gefunden
     * @param  {string} idName [Teil der Url dessen Id gesucht wird]
     * @param  {string} url    [Url die durchsucht werden soll]
     * @return {number}        [Die Id die angegebener Url gefunden wurde]
     */
    extractId(idName: string, url: string): number {
      var href = url
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
      return null
    }

    /**
     * Gibt die eingetippten Daten ans Backend weiter. Das Resultat wird im Cache
     * gespeichert und zurückgegeben
     * @param  {any}    userData [Object, welches ein passwort und eine kennung ernhält]
     * @param  {any}    callback [Das Egebnis des Post's wird dem Aufrufer gezeigt]
     */
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
        (token: any) => { callback(null, token) },
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
