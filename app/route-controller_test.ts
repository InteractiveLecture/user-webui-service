///<reference path='..//typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('RouteCtrl', function() {
  var ctrl: any
  var router: any

  beforeEach(module('interactiveLectureWebFrontend'));

  beforeEach(inject(function($rootScope: any, $controller: any, $router: any) {
    ctrl = $controller('RouteCtrl');
    router = $router
  }))

  it('should start and use the new Router', function() {
    expect(router.name).toBe('/')
    // Weitere Test wären mit e2e möglich
  })

});
