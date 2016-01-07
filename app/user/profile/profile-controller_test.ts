///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('ProfileCtrl', function() {
  var ctrl: any;

  beforeEach(angular.mock.module('user.profile'));

  beforeEach(inject(function($rootScope: ng.IRootScopeService, $controller: ng.IControllerService) {
    ctrl = $controller('ProfileCtrl');
  }));

  it('should have ctrlName as ProfileCtrl', function() {
    expect(ctrl.ctrlName).toEqual('ProfileCtrl');
  });

});
