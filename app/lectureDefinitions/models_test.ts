///<reference path='../../typings/tsd.d.ts' />
///<reference path='./models.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('models.BaseModel', function () {
  var topic = new lectureDefinitions.models.Topic(JSON.parse('{"topicName": "Programmierung","topicDescription": "Eine Einführung in die Programmierung mit Java","links": [{"rel": "self","href": "http://localhost:8080/topics/1"},{"rel": "modules","href": "http://localhost:8080/topics/1/modules"},{"rel": "root-module","href": "http://localhost:8080/modules/1"},{"rel": "officers","href": "http://localhost:8080/topics/1/officers"},{"rel": "assistants","href": "http://localhost:8080/topics/1/assistants"}]}'));

  it('should return a Url for the given name', function () {
      expect(topic.getUrlFor('self')).toEqual('http://localhost:8080/topics/1');
  });

  it('should return null', function () {
      expect(topic.getUrlFor('Hugo')).toBe(null);
  });

  it('should return a Url with page, size and sort', function () {
      expect(topic.getPageFor('self', 1, 20)).toBe('http://localhost:8080/topics/1?page=1&size=20');
  });

  it('should return a Url with page, size and sort', function () {
      expect(topic.getPageFor('self', 1, 20, 'id')).toBe('http://localhost:8080/topics/1?page=1&size=20&sort=id');
  });

  it('should return an id', function () {
      expect(topic.extractId('self', 'topics')).toEqual(1);
      expect(topic.extractId('hugo', '12')).toEqual(null);
      expect(topic.extractId('modules', 'modules')).toEqual(null);
  })


});
