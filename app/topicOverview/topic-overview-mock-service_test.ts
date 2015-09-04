///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('TopicOverview', function () {
  var service: lectureDefinitions.interfaces.ModelService;

  beforeEach(module('topicOverview'));

  beforeEach(inject(function (TopicOverviewMockService: lectureDefinitions.interfaces.ModelService) {
    this.service = TopicOverviewMockService;

  }));

  it('should equal TopicOverviewMockService', function () {
    expect(this.service.get()).toEqual('TopicOverviewMockService')
  });

  it('should transform to Topic', function () {
      this.service.loadModel('hugo', (topics: lectureDefinitions.models.Topic[])=> {
        expect(topics.length).toEqual(4);
        expect(topics[0].getUrlFor('self')).toEqual('http://localhost:8080/topics/1');
      });
  });


});
