///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('TutorialVideoCtrl', function() {
  var ctrl;

  beforeEach(module('tutorialVideo'));

  beforeEach(inject(function($rootScope: any, $controller: any, $routeParams: any) {
    ctrl = $controller('TutorialVideoCtrl', {
      $routeParams: { id: 42 }
    });
  }));

  it('should have ctrlName as TutorialVideoCtrl', function() {
    expect(ctrl.ctrlName).toEqual('TutorialVideoCtrl');
  });

  it('should read the RouteParams', function() {
    expect(ctrl.moduleId).toEqual(42);
  });

});
