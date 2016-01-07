///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('ScriptCtrl', function () {
  var ctrl;

  beforeEach(angular.mock.module('upload.script'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('ScriptCtrl');
  }));

  it('should have ctrlName as ScriptCtrl', function () {
    expect(ctrl.ctrlName).toEqual('ScriptCtrl');
  });

});
