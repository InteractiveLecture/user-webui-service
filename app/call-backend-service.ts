///<reference path='../typings/tsd.d.ts' />
module CallBackend {
  'use strict';

  export class CallBackendService implements lectureDefinitions.interfaces.ModelService {

    cache: Caching.CachingService;
    $routeParams: any;
    $http: any;
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
      vm.$routeParams =$routeParams;
      vm.$http = $http;
      vm.jwtHelper = jwtHelper;

    }

    get(): string {
      return 'CallBackendService';
    }

    // TODO: Implentieren der Methode ohne Pseudocode
    getLoadingUrl() {
      // if (elementAngeklickt) {
      //    if (angeklicktesElement.needPage) {
      //       angeklicktesElement.getPageFor(woDerUserHinWill)
      //    }
      //      angeklicktesElement.getUrlFor(woDerUserHinWill)
      // }
      // else {
      // erzeugeEineUrl(routeParams, woDerUserHinWill)
      //}
      console.log("die Methode getLoadingUrl muss Implentiert werden");
      // erzeugeEineUrl(routeParams, woDerUserHinWill) {
      // url = woDerUserHinWill.split -> (anpassenAnBackendUrl)
      // return url.routeParamsEinfügen(routeParams);
      // }
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
          (token:any)=> {callback(null,token.data)},
          (error:any)=> {callback(error,null)}
      )
        /* HTTP-Request zum Backend -> Ergebnis ist das Token
           var token = "eyJhbGciOiJSUzI1NiJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbIm9wZW5pZCJdLCJpZCI6MSwiZXhwIjoxNDQ0NTMxOTg0LCJhdXRob3JpdGllcyI6WyJhZG1pbiJdLCJqdGkiOiI4ZTZhYzVkMS0zNGFhLTQ1YTEtYTZmYy02YmU3MzRhMTgwZjciLCJjbGllbnRfaWQiOiJ1c2VyLXdlYi1jbGllbnQifQ.X3gGBmqimFGfb4pIR_J4C9gqi3W4E1x80E8xp7jSXiKxMBQTPhRHG7cmGJjTy2HDx5xogQjhTFgg2qa3iStY6hKJXm6PDSu6478gKhBZNaF4OQvbSC9NmT8jFaoY_vWqAWFkAshQQBeHIoqFXFdB3K_0ia6Vn_UEdm-zAti-rPlE5xxykEJWhWGaNIndoMyfAM3zcrPe2GlVbPAz-LbJFEnRYkRLrtmIRX7Nu1LQWEydwvJ8zLe5prNoN_6XXid1rm6x727REJ2Mlqffh5EX3CWXsWmznXuv_-0lraPdpEpCWC3Teeg2fIreuSL0DKLxgxOTmE0CxO_jST8lb7Q0Sw"
           localStorage.setItem('id_tocken', token);
           var dummyProfile = new lectureDefinitions.models.Profile(this.jwtHelper.decodeToken(token));

           //var dummyProfile: lectureDefinitions.models.Profile = new lectureDefinitions.models.Profile({ 'id': 90, 'kennung': 'cremerm', 'passwort': '1234', 'email': 'cremerm@hochschule-trier.de', 'links': null, 'cacheIndex': 'profile', 'gender': 'male', 'birth': '19.02.1993' });
           this.cache.save('profile', dummyProfile);
           return dummyProfile;*/
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
