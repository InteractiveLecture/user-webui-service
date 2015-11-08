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
    Dependency loadModel() -> http_get()
    ---------------------------------------------------------------------------
    */

    /*
    Exercises nach Readme des lecture-service
    -------------------------------------------------------------------
    */

    // Eine Exercise mit der ID X anfordern under per Callbackverwenden
    request_oneExercise(exerciseId: number, callback: Function) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('exercises')
        .setUrlPath(exerciseId.toString())
        .build()

      this.loadModel(url, callback);
    }

    // Eine Exercise mit ID x löschen
    delete_oneExercise(exerciseId: number) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('exercises')
        .setUrlPath(exerciseId.toString())
        .build()

      this.http_delete(url);
    }

    // Eine Exercise mit bestimmter ID updaten
    update_oneExercise(exerciseId: number, updateData: any) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('exercises')
        .setUrlPath(exerciseId.toString())
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

    // Erfolg einer Exercise posten. successData = Email des User als String
    post_exerciseSuccess(exerciseId: number, successData: any) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('exercises')
        .setUrlPath(exerciseId.toString())
        .setUrlPath('success')
        .build()

      this.http_post(url, successData);
    }

    // Neuen RootHint anlegen
    post_newRootHint(exerciseId: number, RootHint: any) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('exercises')
        .setUrlPath(exerciseId.toString())
        .setUrlPath('hints')
        .build()

      this.http_post(url, RootHint);
    }

    // Den RootHint der Exercise anfragen
    request_rootHint(exerciseId: number, callback: Function) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('exercises')
        .setUrlPath(exerciseId.toString())
        .setUrlPath('hints')
        .build()

      this.loadModel(url, callback);
    }

    /*
    Hints nach Readme des lecture-service
    -------------------------------------------------------------------
    */

    //TODO: id/order POST ???

    // Konsumiere einen Hinweis
    request_oneHint(hintId: number, callback: Function) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('hints')
        .setUrlPath(hintId.toString())
        .build()

      this.loadModel(url, callback);
    }

    // Einen neuen Hinweis anhängen. Parent angeben
    post_appendHint(hintId: number, newHint: any) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('hints')
        .setUrlPath(hintId.toString())
        .build()

      this.http_post(url, newHint);
    }

    // Lösche den Hinwweis
    delete_oneHint(hintId: number) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('hints')
        .setUrlPath(hintId.toString())
        .build()

      this.http_delete(url);
    }

    // Update den Hinweis
    update_oneHint(hintId: number, updateData: any) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('hints')
        .setUrlPath(hintId.toString())
        .build()

      this.http_put(url, updateData);
    }

    // Konsumiert einen Hint des Users. UserData = Email des Users
    post_consumeHint(hintId: number, userData: any) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('hints')
        .setUrlPath(hintId.toString())
        .build()

      this.http_post(url, userData);
    }

    /*
    Module nach Readme des lecture-service
    -------------------------------------------------------------------
    */

    // Kind Modul erstellen
    post_childModule(childData: any) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('modules')
        .build()

      this.http_post(url, childData);
    }

    // Ein einzelnes Modul anfordern
    request_oneModule(moduleId: number, callback: Function) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('modules')
        .setUrlPath(moduleId.toString())
        .build()

      this.loadModel(url, callback);
    }

    // updaten eines Modules
    update_oneModule(id: number, updateData: any) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('modules')
        .setUrlPath(id.toString())
        .build()

      this.http_put(url, updateData);
    }

    // Löschen eines Modules
    delete_oneModule(moduleId: number) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('modules')
        .setUrlPath(moduleId.toString())
        .build()

      this.http_delete(url);
    }

    // Anfragen der empfohlenen Module für das Modul mit der ID. Verwenden per Callback
    request_recommendedModules(moduleId: number, callback: Function) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('modules')
        .setUrlPath(moduleId.toString())
        .setUrlPath('recommendations')
        .build()

      this.loadModel(url, callback);
    }

    // Neue Empfehlung einfügen. ID des zu verwenden Modules nutzen
    post_addRecommendedModule(recommendationsId: number, moduledata: any) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('modules')
        .setUrlPath(recommendationsId.toString())
        .setUrlPath('recommendations')
        .build()

      this.http_post(url, moduledata);
    }

    // TODO: Fragen welche ID für welches Modul ist
    delete_removeRecommendedModule(moduleId: number, recommendationsId: number) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('modules')
        .setUrlPath(moduleId.toString())
        .setUrlPath('recommendations')
        .setUrlPath(recommendationsId.toString())
        .build()

      this.http_delete(url);
    }

    // Alle Aufgaben eines Modules anfragen
    request_moduleExercises(moduleId: number, callback: Function) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('modules')
        .setUrlPath(moduleId.toString())
        .setUrlPath('exercises')
        .build()

      this.loadModel(url, callback);
    }

    // Neue RootExercise für das Module erstelllen
    post_createRootExercise(moduleId: number, rootExerciseData: any) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('modules')
        .setUrlPath(moduleId.toString())
        .setUrlPath('exercises')
        .build()

      this.http_post(url, rootExerciseData);
    }

    /*
    Topics nach Readme des lecture-service
    -------------------------------------------------------------------
    */
    // Alle Topics abfragen. PAGEABLE
    request_topics(callback: Function) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('topics')
        .build()

      this.loadModel(url, callback);
    }

    // Erstelle ein neues Topic
    post_createTopic(newTopic: any) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('topics')
        .build()

      this.http_post(url, newTopic);
    }

    // Frage nach einem Topic
    request_oneTopic(topicId: number, callback: Function) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('topics')
        .setUrlPath(topicId.toString())
        .build()

      this.loadModel(url, callback);
    }

    // Lösche ein Topic
    delete_oneTopic(topicId: number) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('topics')
        .setUrlPath(topicId.toString())
        .build()

      this.http_delete(url);
    }

    // Update ein Topic
    update_oneTopic(topicId: number, updateData: any) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('topics')
        .setUrlPath(topicId.toString())
        .build()

      this.http_put(url, updateData);
    }

    // Erstelle einen neuen Officer für das Topic
    post_newOfficer(topicId: number, newOfficer: any) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('topics')
        .setUrlPath(topicId.toString())
        .setUrlPath('officers')
        .build()

      this.http_put(url, newOfficer);
    }

    // Lösche den Officer für das Topic
    delete_oneOfficer(topicId: number, officerId: number) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('topics')
        .setUrlPath(topicId.toString())
        .setUrlPath('officers')
        .setUrlPath(officerId.toString())
        .build()

      this.http_delete(url);
    }

    // Frage nach allen Officers des Topics
    request_officers(topicId: number, callback: Function) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('topics')
        .setUrlPath(topicId.toString())
        .setUrlPath('officers')
        .build()

      this.loadModel(url, callback);
    }

    // Erstelle einen neuen Assistant für das Topic
    post_newAssistant(topicId: number, newAssistant: any) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('topics')
        .setUrlPath(topicId.toString())
        .setUrlPath('assistants')
        .build()

      this.http_put(url, newAssistant);
    }

    // Lösche einen Assistant für das Topic
    delete_oneAssistant(topicId: number, assistantId: number) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('topics')
        .setUrlPath(topicId.toString())
        .setUrlPath('assistants')
        .setUrlPath(assistantId.toString())
        .build()

      this.http_delete(url);
    }

    // Frage nach allen Assistants für das Topic
    request_assistants(topicId: number, callback: Function) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('topics')
        .setUrlPath(topicId.toString())
        .setUrlPath('assistants')
        .build()

      this.loadModel(url, callback);
    }

    // Frage nach allen Modulen des Topics
    request_modulesOfTopic(topicId: number, callback: Function) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('topics')
        .setUrlPath(topicId.toString())
        .setUrlPath('modules')
        .build()

      this.loadModel(url, callback);
    }

    // Erstelle ein neues RootModule
    post_createRootModule(topicId: number, rootModule: any) {
      var url = new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('topics')
        .setUrlPath(topicId.toString())
        .setUrlPath('modules')
        .build()

      this.http_post(url, rootModule);
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
