///<reference path='..//typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Caching', function () {
  var service: any;
  var topic = new lectureDefinitions.models.Topic(JSON.parse('{"topicDescription": "Eine Einführung in die Programmierung mit Java"}'));

  beforeEach(module('interactiveLectureWebFrontend'));

  beforeEach(inject(function (CachingService: any) {
    this.service = CachingService;
  }));

  it('should equal Caching', function () {
    expect(this.service.get()).toEqual('CachingService');
  });

  it('should save and load the lectureDefinitions Object', function () {
    this.service.save('topic', topic);
    expect(this.service.load('topic').topicDescription).toEqual(topic.topicDescription);
  })

});
