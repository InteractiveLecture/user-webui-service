///<reference path='../typings/tsd.d.ts' />
module CallBackend {
  'use strict';

  export class CallBackendService implements lectureDefinitions.interfaces.ModelService {

    public static $inject: string[] = [
      'CachingService'
    ];

    // CachingService einbinden
    constructor(private cache: Caching.CachingService) {
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
      var jsonResult = JSON.parse('{"links":[{"rel":"self","href":"http://localhost:8080/topics"}],"content":[{"topicName":"Programmierung","topicDescription":"Eine Einführung in die Programmierung mit Java","links":[{"rel":"self","href":"http://localhost:8080/topics/1"},{"rel":"modules","href":"http://localhost:8080/topics/1/modules"},{"rel":"root-module","href":"http://localhost:8080/modules/1"},{"rel":"officers","href":"http://localhost:8080/topics/1/officers"},{"rel":"assistants","href":"http://localhost:8080/topics/1/assistants"}]},{"topicName":"Mathematik","topicDescription":"Mathematik für Wirtschaftswissenschaftler","links":[{"rel":"self","href":"http://localhost:8080/topics/2"},{"rel":"modules","href":"http://localhost:8080/topics/2/modules"},{"rel":"root-module","href":"http://localhost:8080/modules/4"},{"rel":"officers","href":"http://localhost:8080/topics/2/officers"},{"rel":"assistants","href":"http://localhost:8080/topics/2/assistants"}]},{"topicName":"Statistik","topicDescription":"Deskriptive und induktive Statistik","links":[{"rel":"self","href":"http://localhost:8080/topics/3"},{"rel":"modules","href":"http://localhost:8080/topics/3/modules"},{"rel":"root-module","href":"http://localhost:8080/modules/5"},{"rel":"officers","href":"http://localhost:8080/topics/3/officers"},{"rel":"assistants","href":"http://localhost:8080/topics/3/assistants"}]},{"topicName":null,"topicDescription":null,"links":[{"rel":"self","href":"http://localhost:8080/topics/0"},{"rel":"modules","href":"http://localhost:8080/topics/0/modules"},{"rel":"officers","href":"http://localhost:8080/topics/0/officers"},{"rel":"assistants","href":"http://localhost:8080/topics/0/assistants"}]}],"page":{"size":20,"totalElements":4,"totalPages":1,"number":0}}');
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
    postUserData(userData: any) {
      if (userData.kennung == 'cremerm' && userData.passwort == 1234) {
        var dummyProfile: any = new lectureDefinitions.models.BaseModel({ 'id': 90,'kennung': 'cremerm', 'passwort': '1234', 'email': 'cremerm@hochschule-trier.de', 'links': null, 'cacheIndex': 'profile', 'gender': 'male', 'birth': '19.02.1993' });
        this.cache.save('profile', dummyProfile);
        return dummyProfile;
      }
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
