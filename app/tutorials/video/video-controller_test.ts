///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('VideoCtrl', function() {
  var ctrl: any;

  beforeEach(angular.mock.module('tutorials.video'));

  beforeEach(inject(function($rootScope: ng.IRootScopeService, $controller: ng.IControllerService) {
    ctrl = $controller('VideoCtrl');
  }));

  it('should have ctrlName as VideoCtrl', function() {
    expect(ctrl.ctrlName).toEqual('VideoCtrl');
  });

});
