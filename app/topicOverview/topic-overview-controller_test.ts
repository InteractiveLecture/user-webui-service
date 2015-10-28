///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('TopicOverviewCtrl', function() {
  var ctrl: any;

  beforeEach(module('topicOverview'));

  beforeEach(inject(function($rootScope: any, $controller: any) {
    ctrl = $controller('TopicOverviewCtrl');
  }));

});
