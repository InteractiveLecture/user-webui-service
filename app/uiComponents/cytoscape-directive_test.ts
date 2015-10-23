///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('cytoscape', function () {
  var scope
    , element;

  beforeEach(module('uiComponents', 'ui-components/cytoscape-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<cytoscape></cytoscape>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().cytoscape.name).toEqual('cytoscape');
  });

});
