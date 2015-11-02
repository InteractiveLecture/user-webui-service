///<reference path='../typings/tsd.d.ts' />
module CallBackend {
  'use strict';

  export class CallBackendService implements lectureDefinitions.interfaces.ModelService {

    cache: Caching.CachingService;
    $routeParams: any;
    $http: ng.IHttpService;
    jwtHelper: ng.jwt.IJwtHelper;


    public static $inject: string[] = [
      'CachingService',
      '$routeParams',
      '$http',
      'jwtHelper'
    ];

    // Dependency einbinden
    constructor(CachingService: Caching.CachingService, $routeParams: any, $http: ng.IHttpService, jwtHelper: any) {
      var vm = this;
      vm.cache = CachingService;
      vm.$routeParams = $routeParams;
      vm.$http = $http;
      vm.jwtHelper = jwtHelper;

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
      //TODO: Richtiger HTTP-Request für loadModel.
      var jsonResult = JSON.parse('{"links":[{"rel":"self","href":"http://localhost:8080/topics"}],"content":[{"topicName":"Programmierung","id":"1", "topicDescription":"Eine Einführung in die Programmierung mit Java","links":[{"rel":"self","href":"http://localhost:8080/topics/1"},{"rel":"modules","href":"http://localhost:8080/topics/1/modules"},{"rel":"root-module","href":"http://localhost:8080/modules/1"},{"rel":"officers","href":"http://localhost:8080/topics/1/officers"},{"rel":"assistants","href":"http://localhost:8080/topics/1/assistants"}]},{"topicName":"Mathematik","id":"2","topicDescription":"Mathematik für Wirtschaftswissenschaftler","links":[{"rel":"self","href":"http://localhost:8080/topics/2"},{"rel":"modules","href":"http://localhost:8080/topics/2/modules"},{"rel":"root-module","href":"http://localhost:8080/modules/4"},{"rel":"officers","href":"http://localhost:8080/topics/2/officers"},{"rel":"assistants","href":"http://localhost:8080/topics/2/assistants"}]},{"topicName":"Statistik","id":"3","topicDescription":"Deskriptive und induktive Statistik","links":[{"rel":"self","href":"http://localhost:8080/topics/3"},{"rel":"modules","href":"http://localhost:8080/topics/3/modules"},{"rel":"root-module","href":"http://localhost:8080/modules/5"},{"rel":"officers","href":"http://localhost:8080/topics/3/officers"},{"rel":"assistants","href":"http://localhost:8080/topics/3/assistants"}]},{"topicName":null,"topicDescription":null,"links":[{"rel":"self","href":"http://localhost:8080/topics/0"},{"rel":"modules","href":"http://localhost:8080/topics/0/modules"},{"rel":"officers","href":"http://localhost:8080/topics/0/officers"},{"rel":"assistants","href":"http://localhost:8080/topics/0/assistants"}]}],"page":{"size":20,"totalElements":4,"totalPages":1,"number":0}}');
      callback(jsonResult.content.map((item: any) => new lectureDefinitions.models.BaseModel(item)));
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

    // Gibt die eingetippten Daten ans Backend weiter. resultat wird im Cache gespeichert und zurückgegeben
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
    Generieren der ServeranfrageUrls
    ---------------------------------------------------------------------------
    */

    // Return lecture-service/topics/<ID>
    topic_path(topicId: number): string {
      return new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('topics')
        .setUrlPath(topicId.toString())
        .build()
    }

    // Exercise einer bestimmten ID anfragen
    // GET, DELETE, PUT,
    exercise_id_path(exerciseId:number): string {
      return new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('exercises')
        .setUrlPath(exerciseId.toString())
        .build()
    }

    // Exercise einer bestimmten ID anfragen
    // POST,
    exercise_child_path(exerciseId:number): string {
      return new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('exercises')
        .setUrlPath(exerciseId.toString())
        .build()
    }

    // Exercise beendet
    // POST
    exercise_success_path(exerciseId:number): string {
      return new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('exercises')
        .setUrlPath(exerciseId.toString())
        .setUrlPath('success')
        .build()
    }

    // Neues Root Hint einfügen
    // POST
    exercise_roothint_path(exerciseId:number): string {
      return new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('exercises')
        .setUrlPath(exerciseId.toString())
        .setUrlPath('hints')
        .build()
    }

    // Hints anzeigen nach standard
    // GET
    exercise_hint_path(exerciseId:number): string {
      return new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('exercises')
        .setUrlPath(exerciseId.toString())
        .setUrlPath('hints')
        .build()
    }

    // Hints anzeigen nach eigener Pagegröße
    // GET
    exercise_hint_pageable_path(exerciseId:number, pagenumber:number, pagesize:number) {
      return new lectureDefinitions.models.UrlBuilder()
        .setHost('lecture-service')
        .setUrlPath('exercises')
        .setUrlPath(exerciseId.toString())
        .setUrlPath('hints')
        .setQuery('page='+ pagenumber)
        .setQuery('pagesize=' + pagesize)
        .build()
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
