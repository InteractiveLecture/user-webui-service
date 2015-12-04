///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('TopicEditCtrl', function() {
  var ctrl: any;

  beforeEach(module('topicEdit'));

  beforeEach(inject(function($rootScope: any, $controller: any) {
    ctrl = $controller('TopicEditCtrl');
  }));


});
