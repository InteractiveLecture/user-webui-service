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
      //var jsonResult = JSON.parse('{"links":[{"rel":"self","href":"http://localhost:8080/topics"}],"content":[{"topicName":"Programmierung","id":"1", "topicDescription":"Eine Einführung in die Programmierung mit Java","links":[{"rel":"self","href":"http://localhost:8080/topics/1"},{"rel":"modules","href":"http://localhost:8080/topics/1/modules"},{"rel":"root-module","href":"http://localhost:8080/modules/1"},{"rel":"officers","href":"http://localhost:8080/topics/1/officers"},{"rel":"assistants","href":"http://localhost:8080/topics/1/assistants"}]},{"topicName":"Mathematik","id":"2","topicDescription":"Mathematik für Wirtschaftswissenschaftler","links":[{"rel":"self","href":"http://localhost:8080/topics/2"},{"rel":"modules","href":"http://localhost:8080/topics/2/modules"},{"rel":"root-module","href":"http://localhost:8080/modules/4"},{"rel":"officers","href":"http://localhost:8080/topics/2/officers"},{"rel":"assistants","href":"http://localhost:8080/topics/2/assistants"}]},{"topicName":"Statistik","id":"3","topicDescription":"Deskriptive und induktive Statistik","links":[{"rel":"self","href":"http://localhost:8080/topics/3"},{"rel":"modules","href":"http://localhost:8080/topics/3/modules"},{"rel":"root-module","href":"http://localhost:8080/modules/5"},{"rel":"officers","href":"http://localhost:8080/topics/3/officers"},{"rel":"assistants","href":"http://localhost:8080/topics/3/assistants"}]},{"topicName":null,"topicDescription":null,"links":[{"rel":"self","href":"http://localhost:8080/topics/0"},{"rel":"modules","href":"http://localhost:8080/topics/0/modules"},{"rel":"officers","href":"http://localhost:8080/topics/0/officers"},{"rel":"assistants","href":"http://localhost:8080/topics/0/assistants"}]}],"page":{"size":20,"totalElements":4,"totalPages":1,"number":0}}');
      this.http_get(linkUrl, (result: any) => {
        var jsonResult = JSON.parse(<string> result);
        callback(jsonResult.content.map((item: any) => new lectureDefinitions.models.BaseModel(item)));
      })
      //callback(jsonResult.content.map((item: any) => new lectureDefinitions.models.BaseModel(item)));
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

    /*
    ---------------------------------------------------------------------------
    Http Request erzeugen
    ---------------------------------------------------------------------------
    */

    // HTTP GET an URL X und verwenden des Ergebnisses per Callback
    http_get(url: string, callback: Function) {
      this.$http.get(url).then(
        (data) => callback(data),
        (error) => console.log(error)
        );
    }

    // Löschen für Url
    http_delete(url: string) {
      this.$http.delete(url).then(
        () => { return true },
        (error) => { return error }
        )
    }

    // Updaten für Url
    http_put(url: string, data: any) {
      this.$http.delete(url, data).then(
        () => { return true },
        (error) => { return error }
        )
    }

    // Posten für Url
    http_post(url: string, data: any) {
      this.$http.post(url, data).then(
        () => { return true },
        (error) => { return error }
        )
    }

    /*
    ---------------------------------------------------------------------------
    Generieren der ServeranfrageUrls
    ---------------------------------------------------------------------------
    */

    /*
    Exercises
    -------------------------------------------------------------------
    */
    // Alle Exercises anfordern und per Callback nutzen
    // Dependency loadModel() -> http_get()
    request_exercises(callback: Function) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('exercises')
        .build()

      this.loadModel(url, callback);
    }

    // Eine Exercise mit der ID X anfordern under per Callbackverwenden
    // Dependency loadModel() -> http_get()
    request_oneExercise(id: number, callback: Function) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('exercises')
        .setUrlPath(id.toString())
        .build()

      this.loadModel(url, callback);
    }

    // Eine Exercise mit ID x löschen
    delete_oneExercise(id: number) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('exercises')
        .setUrlPath(id.toString())
        .build()

      this.http_delete(url);
    }

    // Eine Exercise mit bestimmter ID updaten
    update_oneExercise(id: number, updateData: any) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('exercises')
        .setUrlPath(id.toString())
        .build()

      this.http_put(url, updateData);
    }

    // Neue Exercise in den Baum einfügen. ParantID angeben
    post_childExercise(idOfParent: number, childData: any) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('exercises')
        .setUrlPath(idOfParent.toString())
        .build()

      this.http_post(url, childData);
    }

    // Erfolg einer Exercise posten. successData = userID
    post_exerciseSuccess(id: number, successData: any) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('exercises')
        .setUrlPath(id.toString())
        .setUrlPath('success')
        .build()

      this.http_post(url, successData);
    }

    // Neuen RootHint anlegen
    post_newRootHint(id: number, RootHint: any) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('exercises')
        .setUrlPath(id.toString())
        .setUrlPath('hints')
        .build()

      this.http_post(url, RootHint);
    }

    /*
    Hints
    -------------------------------------------------------------------
    */

    // Alle Hints anfragen
    request_hints(callback: Function) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('hints')
        .build()

      this.loadModel(url, callback);
    }

    //TODO: id/order POST ???

    // Konsumiere einen Hinweis
    request_oneHint(id: number, callback: Function) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('hints')
        .setUrlPath(id.toString())
        .build()

      this.loadModel(url, callback);
    }

    // Einen neuen Hint anhängen. Parent angeben
    post_appendHint(id: number, newHint: any) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('hints')
        .setUrlPath(id.toString())
        .build()

      this.http_post(url, newHint);
    }

    delete_oneHint(id: number) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('hints')
        .setUrlPath(id.toString())
        .build()

      this.http_delete(url);
    }

    update_oneHint(id: number, updateData: any) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('hints')
        .setUrlPath(id.toString())
        .build()

      this.http_put(url, updateData);
    }

    /*
    Module
    -------------------------------------------------------------------
    */

    

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
