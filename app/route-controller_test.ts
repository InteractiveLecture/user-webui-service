///<reference path='..//typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('RouteCtrl', function() {
  var ctrl: any;

  beforeEach(module('interactiveLectureWebFrontend'));

  beforeEach(inject(function($rootScope: any, $controller: any) {
    ctrl = $controller('RouteCtrl');
  }));

});
