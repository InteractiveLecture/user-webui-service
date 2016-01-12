///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('OverviewCtrl', function() {
  var ctrl: any;
  var scope: any;

  beforeEach(angular.mock.module('modules.overview'));

  beforeEach(inject(function($rootScope: ng.IRootScopeService, $controller: ng.IControllerService) {
    scope = $rootScope.$new()
    ctrl = $controller('ModuleOverviewCtrl', { '$scope': scope });
  }));

  it('should have ctrlName as OverviewCtrl', function() {
    expect(ctrl.ctrlName).toEqual('OverviewCtrl');
  });

});
