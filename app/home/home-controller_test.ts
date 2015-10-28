///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('HomeCtrl', function() {
  var ctrl: any;

  beforeEach(module('home'));

  beforeEach(inject(function($rootScope: any, $controller: any) {
    ctrl = $controller('HomeCtrl');
  }));

});
