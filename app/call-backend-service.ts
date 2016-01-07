///<reference path='../typings/tsd.d.ts' />
module CallBackend {
  'use strict'

  export class CallBackendService {

    $http: ng.IHttpService
    jwtHelper: ng.jwt.IJwtHelper


    public static $inject: string[] = [
      '$http',
      'jwtHelper'
    ]

    /**
     * @param  {ng.IHttpService} $http     [HTTP anfragen stellen]
     * @param  {any}             jwtHelper [Jwt Token verarbeiten]
     */
    constructor($http: ng.IHttpService, jwtHelper: any) {
      var vm = this
      vm.$http = $http
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

    loadTopicsPage(pageNumber: number, pageSize: number, callback: any) {
      this.$http({
        method: 'GET',
        url: '/topics?page=' + pageNumber + '&size=' + pageSize
      }).then((result: any) => {
        callback(result.data)
      }, (err: any) => {
          console.log(err)
        })
    }

    loadModuleTree(topic_id: string, layer: number, ancestors: number, descedants: number, callback: any) {
      this.$http({
        method: 'GET',
        url: `/topics/${topic_id}/modules?layer=${layer}&ancestors=${ancestors}&descedants=${descedants}`
      }).then((result: any) => {
        callback(result.data)
      }, (err: any) => {
          console.log(err)
        })
    }

    /**
     * Gibt die eingetippten Daten ans Backend weiter. Das Resultat wird im Cache
     * gespeichert und zurückgegeben
     * @param  {loginable}    userData [Object, welches ein passwort und eine kennung ernhält]
     * @param  {any}    callback [Das Egebnis des Post's wird dem Aufrufer gezeigt]
     */
    postUserData(userData: lectureDefinitions.interfaces.loginable, callback: any) {
      var username = userData.username
      var password = userData.password
      var clientId = "user-web-client"
      var clientSecret = "user-web-client-secret"
      var grant_type = "password"
      var data = `username=${username}&password=${password}&client_id=${clientId}&client_secret=${clientSecret}&grant_type=${grant_type}`
      var req = {
        method: 'POST',
        url: '/login',
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
    .module('webUiService')
    .service('CallBackendService', CallBackendService);
}
