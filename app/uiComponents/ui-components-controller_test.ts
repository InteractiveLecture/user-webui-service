///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('UiComponentsCtrl', function () {
  var ctrl;

  beforeEach(module('uiComponents'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('UiComponentsCtrl');
  }));

  it('should have ctrlName as UiComponentsCtrl', function () {
    expect(ctrl.ctrlName).toEqual('UiComponentsCtrl');
  });

});
