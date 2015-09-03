///<reference path='..//typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('RouteCtrl', function () {
  var ctrl;

  beforeEach(module('interactiveLectureWebFrontend'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('RouteCtrl');
  }));

  it('should have ctrlName as RouteCtrl', function () {
    expect(ctrl.ctrlName).toEqual('RouteCtrl');
  });

});
