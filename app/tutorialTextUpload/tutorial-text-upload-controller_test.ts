///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('TutorialTextUploadCtrl', function () {
  var ctrl;

  beforeEach(module('tutorialTextUpload'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('TutorialTextUploadCtrl');
  }));

  it('should have ctrlName as TutorialTextUploadCtrl', function () {
    expect(ctrl.ctrlName).toEqual('TutorialTextUploadCtrl');
  });

});
