///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('LoginCtrl', function() {
  var ctrl: any;
  var dummyData: any;


  beforeEach(module('login'));

  beforeEach(inject(function($rootScope: any, $controller: any, $httpBackend: ng.IHttpBackendService) {
    ctrl = $controller('LoginCtrl')
    dummyData = { kennung: "cremerm", passwort: "4321" }
    this.httpBackend = $httpBackend
  }));

  it('should login me', function() {
    this.httpBackend.when('POST', '/authentication-service/oauth/token').respond({ access_token: "1234", refresh_token: "newToken" })
    ctrl.attemptLogin(dummyData)
    this.httpBackend.flush()
    expect(localStorage.getItem('id_token')).toEqual("1234")
    expect(localStorage.getItem('refresh_token')).toEqual("newToken")
  });

  it('should not login me', function() {
    //  this.httpBackend.when('POST', '/authentication-service/oauth/token').respond(null)
    //  ctrl.attemptLogin(dummyData)
    //  this.httpBackend.flush()
    //  expect(ctrl.userData.passwort).toEqual("")
    // TODO: Fehler abklären
  });

});
