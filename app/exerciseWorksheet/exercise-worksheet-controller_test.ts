///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('ExerciseWorksheetCtrl', function () {
  var ctrl;

  beforeEach(module('exerciseWorksheet'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('ExerciseWorksheetCtrl');
  }));

  it('should have ctrlName as ExerciseWorksheetCtrl', function () {
    expect(ctrl.ctrlName).toEqual('ExerciseWorksheetCtrl');
  });

});
