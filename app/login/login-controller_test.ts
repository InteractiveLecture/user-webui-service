///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('LoginCtrl', function() {
  var ctrl: any
  var dummyLogin: any
  var dummyNotLogin: any


  beforeEach(module('login'));

  beforeEach(inject(function($rootScope: any, $controller: any, $httpBackend: ng.IHttpBackendService) {
    ctrl = $controller('LoginCtrl')
    dummyLogin = { kennung: "cremerm", passwort: "4321" }
    dummyNotLogin = { kennung: "djfhddskfsjk", passwort: "jdkfskh" }
    this.$httpBackend = $httpBackend

    this.$httpBackend.whenPOST('/authentication-service/oauth/token').respond((method: any, url: any, data: any) => {
      console.log(data)
      if (data == 'username=cremerm&password=4321&client_id=user-web-client&client_secret=user-web-client-secret&grant_type=password') {
        return [200, { access_token: "1234", refresh_token: "newToken" }]
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

  it('should login me', function() {
    ctrl.attemptLogin(dummyLogin)
    this.$httpBackend.flush()
    expect(localStorage.getItem('id_token')).toEqual("1234")
    expect(localStorage.getItem('refresh_token')).toEqual("newToken")
    this.$httpBackend.resetExpectations()
  });

  it('should not login me', function() {
    ctrl.attemptLogin(dummyNotLogin)
    this.$httpBackend.flush()
    expect(ctrl.userData.passwort).toEqual("")
    this.$httpBackend.resetExpectations()
  });

});
