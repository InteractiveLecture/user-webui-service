///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('TutorialTextCtrl', function() {
  var ctrl;

  beforeEach(module('tutorialText'));

  beforeEach(inject(function($rootScope: any, $controller: any, $routeParams: any) {
    ctrl = $controller('TutorialTextCtrl', {
      $routeParams: { id: 25 }
    });
  }));

  it('should have ctrlName as TutorialTextCtrl', function() {
    expect(ctrl.ctrlName).toEqual('TutorialTextCtrl');
  });

  it('should read the RouteParams', function() {
    expect(ctrl.moduleId).toEqual(25);
  });

});
