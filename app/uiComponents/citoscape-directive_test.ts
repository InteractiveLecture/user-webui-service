///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('citoscape', function() {
  var scope: any
    , element: any;

  beforeEach(module('uiComponents', 'ui-components/citoscape-directive.tpl.html'));

  beforeEach(inject(function($compile: any, $rootScope: any) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<citoscape></citoscape>'))(scope);
  }));


});
