///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('ProfileCtrl', function() {
  var ctrl: any
  var backend: ng.IHttpBackendService

  beforeEach(angular.mock.module('user.profile'));

  beforeEach(inject(function($rootScope: ng.IRootScopeService, $controller: ng.IControllerService, $httpBackend: ng.IHttpBackendService) {
    ctrl = $controller('ProfileCtrl')
    ctrl.user = { id: 1 }
    backend = $httpBackend
    $httpBackend.whenPUT('/users/' + ctrl.user.id).respond(true)
  }));

  it('should have ctrlName as ProfileCtrl', function() {
    expect(ctrl.ctrlName).toEqual('ProfileCtrl');
  });

  it('should call the Server', function() {
    backend.expectPUT('/users/' + ctrl.user.id)
    ctrl.changePassword('hallo')
    backend.flush()
  })

});
