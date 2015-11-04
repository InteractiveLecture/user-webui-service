///<reference path='..//typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('CallBackend', function() {
  var service: lectureDefinitions.interfaces.ModelService;
  var topic = new lectureDefinitions.models.Topic(JSON.parse('{"topicName": "Programmierung","topicDescription": "Eine Einführung in die Programmierung mit Java","links": [{"rel": "self","href": "http://localhost:8080/topics/1"},{"rel": "modules","href": "http://localhost:8080/topics/1/modules"},{"rel": "root-module","href": "http://localhost:8080/modules/1"},{"rel": "officers","href": "http://localhost:8080/topics/1/officers"},{"rel": "assistants","href": "http://localhost:8080/topics/1/assistants"}]}'));

  beforeEach(module('interactiveLectureWebFrontend'));

  beforeEach(inject(function(CallBackendService: lectureDefinitions.interfaces.ModelService) {
    this.service = CallBackendService;
  }));

  it('should equal CallBackend', function() {
    expect(this.service.get()).toEqual('CallBackendService');
  });
  it('should transform to Topic', function() {
    this.service.loadModel('herbert', (models: lectureDefinitions.models.BaseModel[]) => {
      expect(models.length).toEqual(4);
      expect(models[0].getUrlFor('self')).toEqual('http://localhost:8080/topics/1');
    });
  });

  it('should return an id', function() {
    expect(this.service.extractId('topics', 'http://localhost:8080/topics/1')).toEqual(1);
    expect(this.service.extractId('hugo', 'http://localhost:8080/topics/1')).toEqual(null);
    expect(this.service.extractId('module', 'http://localhost:8080/module/test')).toEqual(null);
  })

// Routen Generieren Test

  it('should return lecture-service/topics/id', function() {
    var result = this.service.topic_path(1);
    expect(result).toEqual('http://lecture-service/topics/1');
  })

  // Routen für exercises
  it('should return lecture-service/exercises/id', function() {
    var result = this.service.exercise_id_path_get(1);
    expect(result).toEqual('http://lecture-service/exercises/1');
  })

  it('should return lecture-service/exercises/id', function() {
    var result = this.service.exercise_child_path_post(1);
    expect(result).toEqual('http://lecture-service/exercises/1');
  })

  it('should return lecture-service/exercises/id/success', function() {
    var result = this.service.exercise_success_path_post(1);
    expect(result).toEqual('http://lecture-service/exercises/1/success');
  })

  it('should return lecture-service/exercises/id/hints (root)', function() {
    var result = this.service.exercise_roothint_path_post(1);
    expect(result).toEqual('http://lecture-service/exercises/1/hints');
  })

  it('should return lecture-service/exercises/id/hints', function() {
    var result = this.service.exercise_hint_path_get(1);
    expect(result).toEqual('http://lecture-service/exercises/1/hints');
  })

  it('should return lecture-service/exercises/id/hints?page=number&pagesize=number', function() {
    var result = this.service.exercise_hint_pageable_path_get(1, 1, 20);
    expect(result).toEqual('http://lecture-service/exercises/1/hints?page=1&pagesize=20');
  })
  // exercises ende
  // hint

  

});
