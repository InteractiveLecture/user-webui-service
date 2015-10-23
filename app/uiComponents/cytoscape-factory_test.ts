///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Cytoscape', function () {
  var factory;

  beforeEach(module('uiComponents'));

  beforeEach(inject(function (Cytoscape) {
    factory = Cytoscape;
  }));

  it('should have someValue be Cytoscape', function () {
    expect(factory.someValue).toEqual('Cytoscape');
  });

  it('should have someMethod return Cytoscape', function () {
    expect(factory.someMethod()).toEqual('Cytoscape');
  });

});
