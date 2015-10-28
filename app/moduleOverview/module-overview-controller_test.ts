///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('ModuleOverviewCtrl', function() {
  var ctrl: any;

  beforeEach(module('moduleOverview'));

  beforeEach(inject(function($rootScope: any, $controller: any, $routeParams: any) {
    ctrl = $controller('ModuleOverviewCtrl', {
      $routeParams: { id: 12 }
    });
  }));

  it('should read the RouteParams', function() {
    expect(ctrl.topicsId).toEqual(12);
  });
});
