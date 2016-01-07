///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('WorksheetCtrl', function() {
  var ctrl: any;

  beforeEach(angular.mock.module('exercises.worksheet'));

  beforeEach(inject(function($rootScope: ng.IRootScopeService, $controller: ng.IControllerService) {
    ctrl = $controller('WorksheetCtrl');
  }));

  it('should have ctrlName as WorksheetCtrl', function() {
    expect(ctrl.ctrlName).toEqual('WorksheetCtrl');
  });

});
