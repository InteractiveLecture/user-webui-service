///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('TutorialVideoUploadCtrl', function () {
  var ctrl:any;

  beforeEach(module('tutorialVideoUpload'));

  beforeEach(inject(function ($rootScope:any, $controller:any) {
    ctrl = $controller('TutorialVideoUploadCtrl');
  }));

});
