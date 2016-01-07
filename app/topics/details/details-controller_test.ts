///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('DetailsCtrl', function () {
  var ctrl;

  beforeEach(angular.mock.module('topics.details'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('DetailsCtrl');
  }));

  it('should have ctrlName as DetailsCtrl', function () {
    expect(ctrl.ctrlName).toEqual('DetailsCtrl');
  });

});
