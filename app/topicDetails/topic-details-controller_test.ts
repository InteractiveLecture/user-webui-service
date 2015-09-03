///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('TopicDetailsCtrl', function () {
  var ctrl;

  beforeEach(module('topicDetails'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('TopicDetailsCtrl');
  }));

  it('should have ctrlName as TopicDetailsCtrl', function () {
    expect(ctrl.ctrlName).toEqual('TopicDetailsCtrl');
  });

});
