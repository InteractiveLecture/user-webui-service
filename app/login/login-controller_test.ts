///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('LoginCtrl', function() {
  var ctrl: any;
  var dummyData: any;


  beforeEach(module('login'));

  beforeEach(inject(function($rootScope: any, $controller: any) {
    ctrl = $controller('LoginCtrl');
  }));

  it('should login me', function() {
    //  expect(ctrl.attemptLogin(dummyData)).toBe(true);
    // TODO: Auf die Arbeit mit Token anpassen
  });

  it('shouldnt login me', function() {
    //  expect(ctrl.attemptLogin({ 'kennung': 'hugo', 'passwort': '4312' })).toBe(false);
    // TODO: Auf die Arbeit mit Token anpassen
  });

});
