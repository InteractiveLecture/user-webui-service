///<reference path='../typings/tsd.d.ts' />
module CallBackend {
  'use strict';

  export class CallBackend implements lectureDefinitions.interfaces.ModelService{

    public static IID: string = "CallBackendService";

    public static $inject: string[] = [
    ];

    constructor() {
    }

    get(): string {
      return 'CallBackendService';
    }

    loadModel(linkUrl: string, callback: any) {
      var jsonResult = JSON.parse('{"links":[{"rel":"self","href":"http://localhost:8080/topics"}],"content":[{"topicName":"Programmierung","topicDescription":"Eine Einführung in die Programmierung mit Java","links":[{"rel":"self","href":"http://localhost:8080/topics/1"},{"rel":"modules","href":"http://localhost:8080/topics/1/modules"},{"rel":"root-module","href":"http://localhost:8080/modules/1"},{"rel":"officers","href":"http://localhost:8080/topics/1/officers"},{"rel":"assistants","href":"http://localhost:8080/topics/1/assistants"}]},{"topicName":"Mathematik","topicDescription":"Mathematik für Wirtschaftswissenschaftler","links":[{"rel":"self","href":"http://localhost:8080/topics/2"},{"rel":"modules","href":"http://localhost:8080/topics/2/modules"},{"rel":"root-module","href":"http://localhost:8080/modules/4"},{"rel":"officers","href":"http://localhost:8080/topics/2/officers"},{"rel":"assistants","href":"http://localhost:8080/topics/2/assistants"}]},{"topicName":"Statistik","topicDescription":"Deskriptive und induktive Statistik","links":[{"rel":"self","href":"http://localhost:8080/topics/3"},{"rel":"modules","href":"http://localhost:8080/topics/3/modules"},{"rel":"root-module","href":"http://localhost:8080/modules/5"},{"rel":"officers","href":"http://localhost:8080/topics/3/officers"},{"rel":"assistants","href":"http://localhost:8080/topics/3/assistants"}]},{"topicName":null,"topicDescription":null,"links":[{"rel":"self","href":"http://localhost:8080/topics/0"},{"rel":"modules","href":"http://localhost:8080/topics/0/modules"},{"rel":"officers","href":"http://localhost:8080/topics/0/officers"},{"rel":"assistants","href":"http://localhost:8080/topics/0/assistants"}]}],"page":{"size":20,"totalElements":4,"totalPages":1,"number":0}}');
      callback(jsonResult.content.map((item: any) => new lectureDefinitions.models.BaseModel(item)));
    }

  }

  /**
   * @ngdoc service
   * @name interactiveLectureWebFrontend.service:CallBackend
   *
   * @description
   *
   */
  angular
    .module('interactiveLectureWebFrontend')
    .service(CallBackend.IID, CallBackend);
}
