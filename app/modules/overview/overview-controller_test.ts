///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('OverviewCtrl', function () {
  var ctrl;

  beforeEach(angular.mock.module('modules.overview'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('OverviewCtrl');
  }));

  it('should have ctrlName as OverviewCtrl', function () {
    expect(ctrl.ctrlName).toEqual('OverviewCtrl');
  });

});
