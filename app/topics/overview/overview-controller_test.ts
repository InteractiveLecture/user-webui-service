///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('OverviewCtrl', function() {
  var ctrl: any;

  beforeEach(angular.mock.module('topics.overview'));

  beforeEach(inject(function($rootScope: ng.IRootScopeService, $controller: ng.IControllerService) {
    ctrl = $controller('TopicOverviewCtrl');
  }));

  it('should have ctrlName as OverviewCtrl', function() {
    expect(ctrl.ctrlName).toEqual('OverviewCtrl');
  });

});
