///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('AdminCtrl', function () {
  var ctrl;

  beforeEach(angular.mock.module('user.admin'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('AdminCtrl');
  }));

  it('should have ctrlName as AdminCtrl', function () {
    expect(ctrl.ctrlName).toEqual('AdminCtrl');
  });

});
