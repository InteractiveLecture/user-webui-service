///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('cytoscape', function() {
  var scope: any
    , element: any;

  beforeEach(module('uiComponents', 'ui-components/cytoscape-directive.tpl.html'));

  beforeEach(inject(function($compile: any, $rootScope: any) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<cytoscape></cytoscape>'))(scope);
  }));

});
