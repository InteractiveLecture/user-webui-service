///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('LoginCtrl', function() {
  var ctrl: any;
  var dummyLogin: any
  var dummyNotLogin: any

  beforeEach(angular.mock.module('user.login'));

  beforeEach(inject(function($rootScope: ng.IRootScopeService, $controller: ng.IControllerService, $httpBackend: ng.IHttpBackendService) {
    ctrl = $controller('LoginCtrl')
    dummyLogin = { username: "cremerm", password: "4321" }
    dummyNotLogin = { username: "djfhddskfsjk", password: "jdkfskh" }
    this.$httpBackend = $httpBackend

    this.$httpBackend.whenPOST('/login').respond((method: any, url: any, data: any) => {
      if (data == 'username=cremerm&password=4321&client_id=user-web-client&client_secret=user-web-client-secret&grant_type=password') {
        return [200, { access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ", refresh_token: "newToken" }]
      }
      else {
        return [401, null]
      }
    })
  }))

  afterEach(function() {
    this.$httpBackend.verifyNoOutstandingExpectation()
    this.$httpBackend.verifyNoOutstandingRequest()
  })

  it('should have ctrlName as LoginCtrl', function() {
    expect(ctrl.ctrlName).toEqual('LoginCtrl');
  })

  it('should login me', function() {
    ctrl.attemptLogin(dummyLogin)
    this.$httpBackend.flush()
    expect(localStorage.getItem('id_token')).toEqual("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ")
    expect(localStorage.getItem('refresh_token')).toEqual("newToken")
  })

  it('should not login me', function() {
    ctrl.attemptLogin(dummyNotLogin)
    this.$httpBackend.flush()
    expect(ctrl.userData.password).toEqual("")
  })

})
