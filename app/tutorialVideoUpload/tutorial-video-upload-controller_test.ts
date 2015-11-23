///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('TutorialVideoUploadCtrl', function () {
  var ctrl;

  beforeEach(module('tutorialVideoUpload'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('TutorialVideoUploadCtrl');
  }));

  it('should have ctrlName as TutorialVideoUploadCtrl', function () {
    expect(ctrl.ctrlName).toEqual('TutorialVideoUploadCtrl');
  });

});
