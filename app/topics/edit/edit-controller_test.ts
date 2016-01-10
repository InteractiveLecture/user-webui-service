///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('EditCtrl', function() {
  var ctrl: any;

  beforeEach(angular.mock.module('topics.edit'));

  beforeEach(inject(function($rootScope: ng.IRootScopeService, $controller: ng.IControllerService) {
    ctrl = $controller('TopicEditCtrl');
  }));

  it('should have ctrlName as EditCtrl', function() {
    expect(ctrl.ctrlName).toEqual('EditCtrl');
  });

});
