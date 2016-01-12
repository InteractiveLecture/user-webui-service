///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('ScriptCtrl', function() {
  var ctrl: any
  var backend: ng.IHttpBackendService

  beforeEach(angular.mock.module('upload.script'));

  beforeEach(inject(function($rootScope: ng.IRootScopeService, $controller: ng.IControllerService, $httpBackend: ng.IHttpBackendService) {
    ctrl = $controller('UploadScriptCtrl');
    backend = $httpBackend
    $httpBackend.whenPOST('/scripte').respond(true)
  }));

  it('should have ctrlName as ScriptCtrl', function() {
    expect(ctrl.ctrlName).toEqual('ScriptCtrl');
  });

  it('should post Scriptcontent', function() {
    backend.expectPOST('/scripte')
    ctrl.postScriptContent('Lernen')
    backend.flush()
  })

  it('should not Post the predefined Text', function() {
    ctrl.postScriptContent('Ihr Script hier einfügen')
    expect(ctrl.error).toEqual('noContent');
  })

});
