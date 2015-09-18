///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('navBar', function () {
  var scope
    , element;

  beforeEach(module('uiComponents', 'uiComponents/nav-bar-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<nav-bar></nav-bar>'))(scope);
  }));


});
