///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Cytoscape', function() {
  var factory;

  beforeEach(angular.mock.module('modules'));

  beforeEach(inject(function(Cytoscape) {
    factory = Cytoscape;
  }));

});
