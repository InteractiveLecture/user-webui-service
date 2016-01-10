///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('WorksheetCtrl', function() {
  var ctrl: any;

  beforeEach(angular.mock.module('exercises.worksheet'));

  beforeEach(inject(function($rootScope: ng.IRootScopeService, $controller: ng.IControllerService) {
    ctrl = $controller('ExerciseWorksheetCtrl');
  }))

  it('should have ctrlName as WorksheetCtrl', function() {
    expect(ctrl.ctrlName).toEqual('WorksheetCtrl');
  })

  it('should return an Array of changes', function() {
    expect(ctrl.aceTabs.length).toBe(1)
    ctrl.aceTabs[0].content = 'public class Hund {}'
    ctrl.aceTabs[0].title = 'Hund.java'
    var patch1 = ctrl.generatePatch()
    expect(patch1[0].fileName).toEqual('Hund.java')
    expect(patch1[0].content.length).toBeGreaterThan(1)

    ctrl.addTab()
    ctrl.aceTabs[1].content = 'test2'
    var patch2 = ctrl.generatePatch()
    expect(patch2.length).toBe(0)
  })

});
