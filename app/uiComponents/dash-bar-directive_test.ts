///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('dashBar', function() {
  var scope: any
    , element: any;

  beforeEach(module('uiComponents', 'uiComponents/dash-bar-directive.tpl.html'));

  beforeEach(inject(function($compile: any, $rootScope: any) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<dash-bar></dash-bar>'))(scope);
  }));


});
