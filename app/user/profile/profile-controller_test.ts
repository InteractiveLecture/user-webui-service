///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('ProfileCtrl', function () {
  var ctrl;

  beforeEach(angular.mock.module('user.profile'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('ProfileCtrl');
  }));

  it('should have ctrlName as ProfileCtrl', function () {
    expect(ctrl.ctrlName).toEqual('ProfileCtrl');
  });

});
