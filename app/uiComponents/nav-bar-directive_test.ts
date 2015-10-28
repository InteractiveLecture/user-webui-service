///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('navBar', function() {
  var scope: any
    , element: any;

  beforeEach(module('uiComponents', 'uiComponents/nav-bar-directive.tpl.html'));

  beforeEach(inject(function($compile: any, $rootScope: any) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<nav-bar></nav-bar>'))(scope);
  }));


});
