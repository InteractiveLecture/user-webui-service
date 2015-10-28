///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('ExerciseOverviewCtrl', function() {
  var ctrl: any;

  beforeEach(module('exerciseOverview'));

  beforeEach(inject(function($rootScope: any, $controller: any, $routeParams: any) {
    ctrl = $controller('ExerciseOverviewCtrl', {
      $routeParams: { id: 20 }
    });
  }));

  it('should read the RouteParams', function() {
    expect(ctrl.moduleId).toEqual(20);
  });
});
