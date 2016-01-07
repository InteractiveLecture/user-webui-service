///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('WorksheetCtrl', function () {
  var ctrl;

  beforeEach(angular.mock.module('exercises.worksheet'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('WorksheetCtrl');
  }));

  it('should have ctrlName as WorksheetCtrl', function () {
    expect(ctrl.ctrlName).toEqual('WorksheetCtrl');
  });

});
