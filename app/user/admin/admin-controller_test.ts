///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('AdminCtrl', function() {
  var ctrl: any;
  var backend: ng.IHttpBackendService

  beforeEach(angular.mock.module('user.admin'));

  beforeEach(inject(function($rootScope: ng.IRootScopeService, $controller: ng.IControllerService, $httpBackend: ng.IHttpBackendService) {
    ctrl = $controller('AdminCtrl');
    backend = $httpBackend
    $httpBackend.whenPOST('/users/1').respond(true)
  }));

  it('should have ctrlName as AdminCtrl', function() {
    expect(ctrl.ctrlName).toEqual('AdminCtrl');
  });

  it('should call the Server', function() {
    backend.expectPOST('/users/1')
    ctrl.postNewUser({ id: 1, username: 'chris', role: 'USER' })
    backend.flush()
  })

});
