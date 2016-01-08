///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('cytoscape', function() {
  var scope: any
    , element: any;

  beforeEach(angular.mock.module('modules', 'modules/cytoscape-directive.tpl.html'));

  beforeEach(inject(function($compile: ng.ICompileService, $rootScope: ng.IRootScopeService) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<cytoscape></cytoscape>'))(scope);
  }));

});
