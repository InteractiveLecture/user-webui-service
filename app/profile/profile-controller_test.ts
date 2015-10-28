///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('ProfileCtrl', function() {
  var ctrl: any;

  beforeEach(module('profile'));

  beforeEach(inject(function($rootScope: any, $controller: any) {
    ctrl = $controller('ProfileCtrl');
  }));

});
