///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('ModuleOverviewCtrl', function () {
  var ctrl;

  beforeEach(module('moduleOverview'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('ModuleOverviewCtrl');
  }));

  it('should have ctrlName as ModuleOverviewCtrl', function () {
    expect(ctrl.ctrlName).toEqual('ModuleOverviewCtrl');
  });

});
