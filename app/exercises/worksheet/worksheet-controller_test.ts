///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('WorksheetCtrl', function() {
  var ctrl: any;
  var backend: ng.IHttpBackendService

  beforeEach(angular.mock.module('exercises.worksheet'));

  beforeEach(inject(function($rootScope: ng.IRootScopeService, $controller: ng.IControllerService, $httpBackend: ng.IHttpBackendService) {
    ctrl = $controller('ExerciseWorksheetCtrl');
    backend = $httpBackend

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

  it('should init one Tab', function() {
    expect(ctrl.aceTabs.length).toBe(1)
    ctrl.initTab()
    expect(ctrl.aceTabs.length).toBe(2)
  })

  it('should deselect all tabs', function() {
    ctrl.deselectAll()
    expect(ctrl.aceTabs[0].visible).toBe(false)
  })

  it('should select one tab', function() {
    ctrl.initTab()
    ctrl.initTab()
    expect(ctrl.aceTabs.length).toBe(3)
    ctrl.selectOne(0)
    expect(ctrl.aceTabs[0].visible).toBe(true)
    expect(ctrl.aceTabs[1].visible).toBe(false)
    expect(ctrl.aceTabs[2].visible).toBe(false)
  })

  it('should delete the selected Tab', function() {
    ctrl.deleteTab(0)
    expect(ctrl.aceTabs.length).toBe(1)
    ctrl.addTab()
    expect(ctrl.aceTabs.length).toBe(2)
    ctrl.deleteTab(1)
    expect(ctrl.aceTabs.length).toBe(1)
  })

  


});
