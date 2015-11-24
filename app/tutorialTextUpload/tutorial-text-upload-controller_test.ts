///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('TutorialTextUploadCtrl', function () {
  var ctrl:any;

  beforeEach(module('tutorialTextUpload'));

  beforeEach(inject(function ($rootScope:any, $controller:any) {
    ctrl = $controller('TutorialTextUploadCtrl');
  }));



});
