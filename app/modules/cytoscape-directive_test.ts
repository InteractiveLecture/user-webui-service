///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('cytoscape', function() {
  var scope
    , element;

  beforeEach(angular.mock.module('modules', 'modules/cytoscape-directive.tpl.html'));

  beforeEach(inject(function($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<cytoscape></cytoscape>'))(scope);
  }));

});
