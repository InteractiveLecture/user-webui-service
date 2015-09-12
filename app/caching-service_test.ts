///<reference path='..//typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Caching', function () {
  var service: any;
  var topic = new lectureDefinitions.models.Topic(JSON.parse('{"topicName": "Programmierung","topicDescription": "Eine Einführung in die Programmierung mit Java","links": [{"rel": "self","href": "http://localhost:8080/topics/1"},{"rel": "modules","href": "http://localhost:8080/topics/1/modules"},{"rel": "root-module","href": "http://localhost:8080/modules/1"},{"rel": "officers","href": "http://localhost:8080/topics/1/officers"},{"rel": "assistants","href": "http://localhost:8080/topics/1/assistants"}]}'));

  beforeEach(module('interactiveLectureWebFrontend'));

  beforeEach(inject(function (CachingService: any) {
    this.service = CachingService;
  }));

  it('should equal Caching', function () {
    expect(this.service.get()).toEqual('CachingService');
  });

  it('should save and load the lectureDefinitions Object', function () {
    this.service.save('topic', topic);
    expect(this.service.load('topic').topicName).toEqual(topic.topicName);
  })

});
