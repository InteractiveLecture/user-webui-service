///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('EditCtrl', function () {
  var ctrl;

  beforeEach(angular.mock.module('modules.edit'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('EditCtrl');
  }));

  it('should have ctrlName as EditCtrl', function () {
    expect(ctrl.ctrlName).toEqual('EditCtrl');
  });

});
