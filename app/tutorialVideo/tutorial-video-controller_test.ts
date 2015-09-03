///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('TutorialVideoCtrl', function () {
  var ctrl;

  beforeEach(module('tutorialVideo'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('TutorialVideoCtrl');
  }));

  it('should have ctrlName as TutorialVideoCtrl', function () {
    expect(ctrl.ctrlName).toEqual('TutorialVideoCtrl');
  });

});
