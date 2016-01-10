///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('ScriptCtrl', function() {
  var ctrl: any;

  beforeEach(angular.mock.module('upload.script'));

  beforeEach(inject(function($rootScope: ng.IRootScopeService, $controller: ng.IControllerService) {
    ctrl = $controller('UploadScriptCtrl');
  }));

  it('should have ctrlName as ScriptCtrl', function() {
    expect(ctrl.ctrlName).toEqual('ScriptCtrl');
  });

});
