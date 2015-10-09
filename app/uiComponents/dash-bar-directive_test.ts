///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('dashBar', function () {
  var scope
    , element;

  beforeEach(module('uiComponents', 'uiComponents/dash-bar-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<dash-bar></dash-bar>'))(scope);
  }));


});
