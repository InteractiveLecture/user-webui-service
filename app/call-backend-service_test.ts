///<reference path='..//typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('CallBackend', function() {
  var service: lectureDefinitions.interfaces.ModelService;
  var topic = new lectureDefinitions.models.Topic(JSON.parse('{"topicName": "Programmierung","topicDescription": "Eine Einführung in die Programmierung mit Java","links": [{"rel": "self","href": "http://localhost:8080/topics/1"},{"rel": "modules","href": "http://localhost:8080/topics/1/modules"},{"rel": "root-module","href": "http://localhost:8080/modules/1"},{"rel": "officers","href": "http://localhost:8080/topics/1/officers"},{"rel": "assistants","href": "http://localhost:8080/topics/1/assistants"}]}'));
  var httpBackend: ng.IHttpBackendService;

  beforeEach(module('interactiveLectureWebFrontend'));

  beforeEach(inject(function(CallBackendService: lectureDefinitions.interfaces.ModelService, $httpBackend: ng.IHttpBackendService) {
    this.service = CallBackendService;
    this.httpBackend = $httpBackend
    this.httpBackend.when('GET', '/topics').respond(this.topic)
    this.httpBackend.when('DELETE', '/topics/1').respond(true)
  }));

  afterEach(function() {
    this.httpBackend.verifyNoOutstandingExpectation();
    this.httpBackend.verifyNoOutstandingRequest();
  });

  it('should equal CallBackend', function() {
    expect(this.service.get()).toEqual('CallBackendService');
  });

  it('should transform to Topic', function() {
    /* TODO: Neu implementieren
    this.service.loadModel('herbert', (models: lectureDefinitions.models.BaseModel[]) => {
      expect(models.length).toEqual(4);
      expect(models[0].getUrlFor('self')).toEqual('http://localhost:8080/topics/1');
    });*/
  });

  it('should return an id', function() {
    expect(this.service.extractId('topics', 'http://localhost:8080/topics/1')).toEqual(1);
    expect(this.service.extractId('hugo', 'http://localhost:8080/topics/1')).toEqual(null);
    expect(this.service.extractId('module', 'http://localhost:8080/module/test')).toEqual(null);
  })

  it('should perform a HTTP GET', function() {
    var temp: any;
    this.service.http_get('/topics', (response: any) => temp = response)
    this.httpBackend.flush()
    expect(temp.data).toEqual(this.topic)
  })

  it('should perform a HTTP DELETE', function() {
    this.httpBackend.expectDELETE('/topics/1')
    this.service.http_delete('/topics/1')
    this.httpBackend.flush()
  })



});
