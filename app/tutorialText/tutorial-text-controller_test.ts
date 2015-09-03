///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('TutorialTextCtrl', function () {
  var ctrl;

  beforeEach(module('tutorialText'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('TutorialTextCtrl');
  }));

  it('should have ctrlName as TutorialTextCtrl', function () {
    expect(ctrl.ctrlName).toEqual('TutorialTextCtrl');
  });

});
