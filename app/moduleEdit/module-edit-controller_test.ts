///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('ModuleEditCtrl', function() {
  var ctrl: any;

  beforeEach(module('moduleEdit'));

  beforeEach(inject(function($rootScope: any, $controller: any) {
    ctrl = $controller('ModuleEditCtrl');
  }));

});
