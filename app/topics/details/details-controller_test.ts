///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('DetailsCtrl', function() {
  var ctrl: any;

  beforeEach(angular.mock.module('topics.details'));

  beforeEach(inject(function($rootScope: ng.IRootScopeService, $controller: ng.IControllerService) {
    ctrl = $controller('DetailsCtrl');
  }));

  it('should have ctrlName as DetailsCtrl', function() {
    expect(ctrl.ctrlName).toEqual('DetailsCtrl');
  });

});
