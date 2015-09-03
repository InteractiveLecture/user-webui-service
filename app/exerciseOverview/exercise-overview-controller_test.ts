///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('ExerciseOverviewCtrl', function() {
  var ctrl;

  beforeEach(module('exerciseOverview'));

  beforeEach(inject(function($rootScope, $controller) {
    ctrl = $controller('ExerciseOverviewCtrl');
  }));

  it('should have ctrlName as ExerciseOverviewCtrl', function() {
    expect(ctrl.ctrlName).toEqual('ExerciseOverviewCtrl');
  });

});
