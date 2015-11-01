///<reference path='../../typings/tsd.d.ts' />
///<reference path='./models.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('models.BaseModel', function() {
  var topic = new lectureDefinitions.models.Topic(JSON.parse('{"topicName": "Programmierung","topicDescription": "Eine Einführung in die Programmierung mit Java","links": [{"rel": "self","href": "http://localhost:8080/topics/1"},{"rel": "modules","href": "http://localhost:8080/topics/1/modules"},{"rel": "root-module","href": "http://localhost:8080/modules/1"},{"rel": "officers","href": "http://localhost:8080/topics/1/officers"},{"rel": "assistants","href": "http://localhost:8080/topics/1/assistants"}]}'));

  it('should return a Url for the given name', function() {
    expect(topic.getUrlFor('self')).toEqual('http://localhost:8080/topics/1');
  });

  it('should return null', function() {
    expect(topic.getUrlFor('Hugo')).toBe(null);
  });

  it('should return a Url with page, size and sort', function() {
    expect(topic.getPageFor('self', 1, 20)).toBe('http://localhost:8080/topics/1?page=1&size=20');
  });

  it('should return a Url with page, size and sort', function() {
    expect(topic.getPageFor('self', 1, 20, 'id')).toBe('http://localhost:8080/topics/1?page=1&size=20&sort=id');
  });

  it('should generate a valid URL', function() {
    var result = new lectureDefinitions.models.UrlBuilder()
      .setHost('goggle')
      .setDomain('de')
      .build();
    expect(result).toBe('http://goggle.de');
  })

  it('should generate URLs with all Attributes', function() {
    var result = new lectureDefinitions.models.UrlBuilder()
      .setHost('goggle')
      .setDomain('de')
      .setPort(80)
      .setUrlPath('bilder')
      .setQuery('name=hugo')
      .build();
    expect(result).toBe('http://goggle.de:80/bilder?name=hugo');
  })

  it('should generate URLs with more than one Query', function() {
    var result = new lectureDefinitions.models.UrlBuilder()
      .setHost('goggle')
      .setDomain('de')
      .setQuery('name=hugo')
      .setQuery('age=32')
      .setQuery('auth=true')
      .build();
    expect(result).toBe('http://goggle.de?name=hugo&age=32&auth=true');
  })

  it('should generate URLs without notice the order of the setter', function() {
    var result = new lectureDefinitions.models.UrlBuilder()
      .setUrlPath('bilder')
      .setHost('goggle')
      .setQuery('name=hugo')
      .setDomain('de')
      .build();
    expect(result).toBe('http://goggle.de/bilder?name=hugo');
  })

  it('should stack UrlPaths', function() {
    var result = new lectureDefinitions.models.UrlBuilder()
      .setUrlPath('bilder')
      .setHost('goggle')
      .setUrlPath('10-02-14')
      .build();
    expect(result).toBe('http://goggle/bilder/10-02-14');
  })

  it('should skip the Schema', function() {
    var result = new lectureDefinitions.models.UrlBuilder()
      .noScheme()
      .setUrlPath('bilder')
      .setHost('goggle')
      .setUrlPath('10-02-14')
      .build();
    expect(result).toBe('goggle/bilder/10-02-14');
  })
  // Ende der Tests
});
