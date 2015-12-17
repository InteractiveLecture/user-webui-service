///<reference path='..//typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Caching', function() {
  var service: any;
  var topic = new lectureDefinitions.models.Topic(JSON.parse('{"topicDescription": "Eine Einführung in die Programmierung mit Java"}'));
  var uuid = '5d00995a-efc4-43ec-a93e-9e1db2a66fda'

  beforeEach(module('interactiveLectureWebFrontend'));

  beforeEach(inject(function(CachingService: any) {
    this.service = CachingService
  }));

  it('should equal Caching', function() {
    expect(this.service.get()).toEqual('CachingService')
  });

  it('should save and load any BaseModel', function() {
    this.service.save(this.uuid, this.topic)
    expect(this.service.loadTopic(uuid)).toEqual(this.topic)
  })

});
