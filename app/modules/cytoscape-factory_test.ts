///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Cytoscape', function() {
  var factory: any;

  beforeEach(angular.mock.module('modules'));

  beforeEach(inject(function(Cytoscape: any) {
    factory = Cytoscape;
  }));

});
