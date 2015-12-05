///<reference path='../../typings/tsd.d.ts' />
///<reference path='./models.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('models.BaseModel', function() {
  var topic = new lectureDefinitions.models.Topic(JSON.parse('{"topicName": "Programmierung","topicDescription": "Eine Einführung in die Programmierung mit Java","links": [{"rel": "self","href": "http://localhost:8080/topics/1"},{"rel": "modules","href": "http://localhost:8080/topics/1/modules"},{"rel": "root-module","href": "http://localhost:8080/modules/1"},{"rel": "officers","href": "http://localhost:8080/topics/1/officers"},{"rel": "assistants","href": "http://localhost:8080/topics/1/assistants"}]}'));

  it('should add an Value to the path', function() {
    var patch = new lectureDefinitions.models.LecturePatch()
    patch.addOperation("/topics", "Programmierung")
    expect(patch.operations.length).toBe(1)
    expect(patch.operations[0].path).toEqual("/topics")
    expect(patch.operations[0].value).toEqual("Programmierung")
    expect(patch.operations[0].operationstype).toEqual('ADD')
  });

  it('should take more than one Patch', function() {
    var patch = new lectureDefinitions.models.LecturePatch()
    patch.addOperation("/topics/1", "Programmierung")
    patch.replaceOperation("/topics/1", "Mathematik")
    patch.addOperation("/topics/2", "Statistik")
    expect(patch.operations.length).toBe(3)
  })

  it('should delete an Path', function() {
    var patch = new lectureDefinitions.models.LecturePatch()
    patch.deleteOperation("/topics")
    expect(patch.operations.length).toBe(1)
    expect(patch.operations[0].operationstype).toEqual('REMOVE')
  });

  it('should move the value to the location', function() {
    var patch = new lectureDefinitions.models.LecturePatch()
    patch.moveOperation('topics/1', 'topics/2')
    expect(patch.operations.length).toBe(1)
    expect(patch.operations[0].path).toEqual('topics/2')
    expect(patch.operations[0].from).toEqual('topics/1')
    expect(patch.operations[0].operationstype).toEqual('MOVE')
  });

  it('should replace an value at Path', function() {
    var patch = new lectureDefinitions.models.LecturePatch()
    patch.replaceOperation("/topics/7", "anderer Eintrag")
    expect(patch.operations.length).toBe(1)
    expect(patch.operations[0].path).toEqual("/topics/7")
    expect(patch.operations[0].value).toEqual("anderer Eintrag")
    expect(patch.operations[0].operationstype).toEqual('REPLACE')
  });

  it('should undo a patch', function() {
    var patch = new lectureDefinitions.models.LecturePatch()
    patch.addOperation("/topics/1", "Eintrag")
    expect(patch.operations.length).toBe(1)
    patch.undo()
    expect(patch.operations.length).toBe(0)
  });

  it('should redo a patch that was removed', function() {
    var patch = new lectureDefinitions.models.LecturePatch()
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
    var patch = new lectureDefinitions.models.LecturePatch()
    patch.addOperation("/topics/1", "Eintrag")
    expect(patch.operations.length).toBe(1)
    patch.undo()
    expect(patch.operations.length).toBe(0)
    patch.addOperation("modules/1/exercise", "Eintrag")
    expect(patch.operations.length).toBe(1)
    patch.redo()
    expect(patch.operations.length).toBe(1)
  });

  it('should not undo nothing', function() {
    var patch = new lectureDefinitions.models.LecturePatch()
    expect(patch.operations.length).toBe(0)
    patch.undo()
    expect(patch.operations.length).toBe(0)
  })

  it('should not redo nothing', function() {
    var patch = new lectureDefinitions.models.LecturePatch()
    expect(patch.operations.length).toBe(0)
    patch.redo()
    expect(patch.operations.length).toBe(0)
  })

  // Ende der Tests
});
