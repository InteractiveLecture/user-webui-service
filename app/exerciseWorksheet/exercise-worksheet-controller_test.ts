///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('ExerciseWorksheetCtrl', function() {
  var ctrl: any;
  var routeParams: any;

  beforeEach(module('exerciseWorksheet'));

  beforeEach(inject(function($rootScope: any, $controller: any, $routeParams: any) {
    ctrl = $controller('ExerciseWorksheetCtrl', {
      $routeParams: {id: 1, eId: 3}
    });
  }));

  it('should have ctrlName as ExerciseWorksheetCtrl', function() {
    expect(ctrl.ctrlName).toEqual('ExerciseWorksheetCtrl');
  });

  it('should read the RouteParams', function() {
    expect(ctrl.moduleId).toEqual(1);
    expect(ctrl.exerciseId).toEqual(3);
  });

});
