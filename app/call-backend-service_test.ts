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
    this.httpBackend.when('POST', '/authentication-service/oauth/token').respond(true)
    this.httpBackend.when('GET', '/topics/1').respond('{"links":[{"rel":"self","href":"http://localhost:8080/topics"}],"content":[{"topicName":"Programmierung","id":"1", "topicDescription":"Eine Einführung in die Programmierung mit Java","links":[{"rel":"self","href":"http://localhost:8080/topics/1"},{"rel":"modules","href":"http://localhost:8080/topics/1/modules"},{"rel":"root-module","href":"http://localhost:8080/modules/1"},{"rel":"officers","href":"http://localhost:8080/topics/1/officers"},{"rel":"assistants","href":"http://localhost:8080/topics/1/assistants"}]},{"topicName":"Mathematik","id":"2","topicDescription":"Mathematik für Wirtschaftswissenschaftler","links":[{"rel":"self","href":"http://localhost:8080/topics/2"},{"rel":"modules","href":"http://localhost:8080/topics/2/modules"},{"rel":"root-module","href":"http://localhost:8080/modules/4"},{"rel":"officers","href":"http://localhost:8080/topics/2/officers"},{"rel":"assistants","href":"http://localhost:8080/topics/2/assistants"}]},{"topicName":"Statistik","id":"3","topicDescription":"Deskriptive und induktive Statistik","links":[{"rel":"self","href":"http://localhost:8080/topics/3"},{"rel":"modules","href":"http://localhost:8080/topics/3/modules"},{"rel":"root-module","href":"http://localhost:8080/modules/5"},{"rel":"officers","href":"http://localhost:8080/topics/3/officers"},{"rel":"assistants","href":"http://localhost:8080/topics/3/assistants"}]},{"topicName":null,"topicDescription":null,"links":[{"rel":"self","href":"http://localhost:8080/topics/0"},{"rel":"modules","href":"http://localhost:8080/topics/0/modules"},{"rel":"officers","href":"http://localhost:8080/topics/0/officers"},{"rel":"assistants","href":"http://localhost:8080/topics/0/assistants"}]}],"page":{"size":20,"totalElements":4,"totalPages":1,"number":0}}')
  }))

  afterEach(function() {
    this.httpBackend.verifyNoOutstandingExpectation()
    this.httpBackend.verifyNoOutstandingRequest()
    this.httpBackend.resetExpectations()
  })

  it('should equal CallBackend', function() {
    expect(this.service.get()).toEqual('CallBackendService')
  })

  it('should transform to Topic', function() {
    this.service.loadModel('/topics/1', (models: lectureDefinitions.models.BaseModel[]) => {
      expect(models.length).toEqual(4)
      expect(models[0].getUrlFor('self')).toEqual('http://localhost:8080/topics/1')
    })
    this.httpBackend.flush()
  })

  it('should return an id', function() {
    expect(this.service.extractId('topics', 'http://localhost:8080/topics/1')).toEqual(1)
    expect(this.service.extractId('hugo', 'http://localhost:8080/topics/1')).toEqual(null)
    expect(this.service.extractId('module', 'http://localhost:8080/module/test')).toEqual(null)
  })

  it('should post userData to /authentication-service/oauth/token', function() {
    var userData = {kennung: "cremerm", passwort: "1234"}
    this.service.postUserData(userData, (err: any, res: any)=> {
      expect(res.data).toBe(true)
    })
    this.httpBackend.flush()
  })


});
