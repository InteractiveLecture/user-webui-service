///<reference path='../typings/tsd.d.ts' />
module CallBackend {
  'use strict'

  export class CallBackendService implements lectureDefinitions.interfaces.ModelService {

    $routeParams: any
    $http: ng.IHttpService
    $q: ng.IQService
    jwtHelper: ng.jwt.IJwtHelper
    $exceptionHandler: ng.IExceptionHandlerService


    public static $inject: string[] = [
      '$routeParams',
      '$http',
      '$exceptionHandler',
      'jwtHelper'
    ]

    /**
     * Einbinden der Dependency's
     * @param  {Caching.CachingService}      CachingService    [Die Daten die beschafft werden sollen gecached werden]
     * @param  {any}                         $routeParams      [RoutenParameter nutzen]
     * @param  {ng.IHttpService}             $http             [http-request versenden an das Backend]
     * @param  {ng.IQService}                $q                [Das defered zum schließen der Ressourcen]
     * @param  {any}                         jwtHelper         [Die Verarbeitung der Jwt-Token]
     * @param  {ng.IExceptionHandlerService} $exceptionHandler [Eigene Exceptions]
     */
    constructor($routeParams: any, $http: ng.IHttpService, $q: ng.IQService, jwtHelper: any, $exceptionHandler: ng.IExceptionHandlerService) {
      var vm = this
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
    loadModel(id: string, callback: any) {
      this.$http({
        method: 'GET',
        url: id // An das Backend
      }).then((result: any) => {
        var jsonResult = result.data;
        callback(jsonResult.content.map((item: any) => new lectureDefinitions.models.BaseModel(item)));
      }, (err) => console.log(err))
    }

    /**
     * Gibt die eingetippten Daten ans Backend weiter. Das Resultat wird im Cache
     * gespeichert und zurückgegeben
     * @param  {any}    userData [Object, welches ein passwort und eine kennung ernhält]
     * @param  {any}    callback [Das Egebnis des Post's wird dem Aufrufer gezeigt]
     */
    postUserData(userData: any, callback: any) {
      var username = userData.kennung
      var passwort = userData.passwort
      var clientId = "user-web-client"
      var clientSecret = "user-web-client-secret"
      var grant_type = "password"
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
