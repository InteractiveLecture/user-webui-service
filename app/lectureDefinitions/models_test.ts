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

  it('should add an Value to the path', function() {
    var patch = new lectureDefinitions.models.TopicPatch("1")
    patch.addOperation("/topics", "Programmierung")
    expect(patch.operations.length).toBe(1)
    expect(patch.operations[0].path).toEqual("/topics")
    expect(patch.operations[0].value).toEqual("Programmierung")
    expect(patch.operations[0].operationstype).toEqual(lectureDefinitions.models.OperationsType.ADD)
    patch = null
  });

  it('should take more than one Patch', function() {
    var patch = new lectureDefinitions.models.TopicPatch("1")
    patch.addOperation("/topics", "Programmierung")
    patch.addOperation("/topics", "Mathematik")
    patch.addOperation("/topics", "Statistik")
    expect(patch.operations.length).toBe(3)
    patch = null
  })

  it('should delete an Path', function() {
    var patch = new lectureDefinitions.models.TopicPatch("1")
    patch.deleteOperation("/topics")
    expect(patch.operations.length).toBe(1)
    expect(patch.operations[0].operationstype).toEqual(lectureDefinitions.models.OperationsType.REMOVE)
    patch = null
  });

  it('should move the value to the location', function() {
    var patch = new lectureDefinitions.models.TopicPatch("1")
    patch.moveOperation('topics/1', 'topics/2')
    expect(patch.operations.length).toBe(1)
    expect(patch.operations[0].path).toEqual('topics/2')
    expect(patch.operations[0].from).toEqual('topics/1')
    expect(patch.operations[0].operationstype).toEqual(lectureDefinitions.models.OperationsType.MOVE)
    patch = null
  });

  it('should replace an value at Path', function() {
    var patch = new lectureDefinitions.models.TopicPatch("1")
    patch.replaceOperation("/topics/7", "anderer Eintrag")
    expect(patch.operations.length).toBe(1)
    expect(patch.operations[0].path).toEqual("/topics/7")
    expect(patch.operations[0].value).toEqual("anderer Eintrag")
    expect(patch.operations[0].operationstype).toEqual(lectureDefinitions.models.OperationsType.REPLACE)
    patch = null
  });

  it('should undo a patch', function() {
    var patch = new lectureDefinitions.models.TopicPatch("1")
    patch.addOperation("/topics/1", "Eintrag")
    expect(patch.operations.length).toBe(1)
    patch.undo()
    expect(patch.operations.length).toBe(0)
  });

  it('should redo a patch that was removed', function() {
    var patch = new lectureDefinitions.models.TopicPatch("1")
    patch.addOperation("/topics/1", "Eintrag")
    expect(patch.operations.length).toBe(1)
    patch.undo()
    expect(patch.operations.length).toBe(0)
    patch.redo()
    expect(patch.operations.length).toBe(1)
    expect(patch.operations[0].path).toEqual("/topics/1")
    expect(patch.operations[0].value).toEqual("Eintrag")
  });

  it('should not redo something after an Operation', function() {
    var patch = new lectureDefinitions.models.TopicPatch("1")
    patch.addOperation("/topics/1", "Eintrag")
    expect(patch.operations.length).toBe(1)
    patch.undo()
    expect(patch.operations.length).toBe(0)
    patch.addOperation("modules/1/exercise","Eintrag" )
    expect(patch.operations.length).toBe(1)
    patch.redo()
    expect(patch.operations.length).toBe(1)
  });

  // TODO: Mehr Fälle von Undo und Redo testen

  // Ende der Tests
});
