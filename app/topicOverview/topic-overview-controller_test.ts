///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('TopicOverviewCtrl', function () {
  var ctrl;

  beforeEach(module('topicOverview'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('TopicOverviewCtrl');
  }));

  it('should have ctrlName as TopicOverviewCtrl', function () {
    expect(ctrl.ctrlName).toEqual('TopicOverviewCtrl');
  });

});
