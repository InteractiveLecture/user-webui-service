///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('AdminCtrl', function () {
  var ctrl: any;

  beforeEach(angular.mock.module('user.admin'));

  beforeEach(inject(function ($rootScope: ng.IRootScopeService, $controller: ng.IControllerService) {
    ctrl = $controller('AdminCtrl');
  }));

  it('should have ctrlName as AdminCtrl', function () {
    expect(ctrl.ctrlName).toEqual('AdminCtrl');
  });

});
