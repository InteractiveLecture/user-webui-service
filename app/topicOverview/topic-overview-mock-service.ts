///<reference path='../../typings/tsd.d.ts' />
module TopicOverview {
  'use strict';

  export class TopicOverviewMockService implements lectureDefinitions.interfaces.ModelService {

    public static IID: string = 'TopicOverviewMockService';

    public static $inject: string[] = [
    ];

    constructor() {
    }

    get(): string {
      return 'TopicOverviewMockService';
    }


    loadModel(linkUrl: string, callback: any): void {
        var jsonResult = JSON.parse('{"links":[{"rel":"self","href":"http://localhost:8080/topics"}],"content":[{"topicName":"Programmierung","topicDescription":"Eine Einführung in die Programmierung mit Java","links":[{"rel":"self","href":"http://localhost:8080/topics/1"},{"rel":"modules","href":"http://localhost:8080/topics/1/modules"},{"rel":"root-module","href":"http://localhost:8080/modules/1"},{"rel":"officers","href":"http://localhost:8080/topics/1/officers"},{"rel":"assistants","href":"http://localhost:8080/topics/1/assistants"}]},{"topicName":"Mathematik","topicDescription":"Mathematik für Wirtschaftswissenschaftler","links":[{"rel":"self","href":"http://localhost:8080/topics/2"},{"rel":"modules","href":"http://localhost:8080/topics/2/modules"},{"rel":"root-module","href":"http://localhost:8080/modules/4"},{"rel":"officers","href":"http://localhost:8080/topics/2/officers"},{"rel":"assistants","href":"http://localhost:8080/topics/2/assistants"}]},{"topicName":"Statistik","topicDescription":"Deskriptive und induktive Statistik","links":[{"rel":"self","href":"http://localhost:8080/topics/3"},{"rel":"modules","href":"http://localhost:8080/topics/3/modules"},{"rel":"root-module","href":"http://localhost:8080/modules/5"},{"rel":"officers","href":"http://localhost:8080/topics/3/officers"},{"rel":"assistants","href":"http://localhost:8080/topics/3/assistants"}]},{"topicName":null,"topicDescription":null,"links":[{"rel":"self","href":"http://localhost:8080/topics/0"},{"rel":"modules","href":"http://localhost:8080/topics/0/modules"},{"rel":"officers","href":"http://localhost:8080/topics/0/officers"},{"rel":"assistants","href":"http://localhost:8080/topics/0/assistants"}]}],"page":{"size":20,"totalElements":4,"totalPages":1,"number":0}}');
        callback(jsonResult.content.map((item: any) => new lectureDefinitions.models.Topic(item)));
    }
  }

  /**
   * @ngdoc service
   * @name topicOverview.service:TopicOverview
   *
   * @description
   *
   */
  angular
    .module('topicOverview')
    .service( TopicOverviewMockService.IID, TopicOverviewMockService);
}
