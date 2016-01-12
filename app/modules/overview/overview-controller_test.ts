///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('OverviewCtrl', function() {
  var ctrl: any;
  var scope: any;

  beforeEach(angular.mock.module('modules.overview'));

  beforeEach(inject(function($rootScope: ng.IRootScopeService, $controller: ng.IControllerService) {
    scope = $rootScope.$new()
    ctrl = $controller('ModuleOverviewCtrl', { '$scope': scope });

  }));

  it('should have ctrlName as OverviewCtrl', function() {
    expect(ctrl.ctrlName).toEqual('OverviewCtrl');
  });

  it('should evalute Script', function() {
    var node = lectureDefinitions.models.testTree[0]
    expect(ctrl.haveScript(node)).toEqual(true)
    node.script_id = null
    expect(ctrl.haveScript(node)).toEqual(false)
  })

  it('should evalute Video', function() {
    var node = lectureDefinitions.models.testTree[1]
    expect(ctrl.haveVideo(node)).toEqual(true)
    node.video_id = null
    console.log(node.video_id)
    expect(ctrl.haveVideo(node)).toEqual(false)
  })

});
