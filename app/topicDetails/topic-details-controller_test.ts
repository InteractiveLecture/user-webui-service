///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('TopicDetailsCtrl', function() {
  var ctrl: any;

  beforeEach(module('topicDetails'));

  beforeEach(inject(function($rootScope: any, $controller: any, $routeParams: any) {
    ctrl = $controller('TopicDetailsCtrl', {
      $routeParams: { id: 80 }
    });
  }));

  it('should read the RouteParams', function() {
    expect(ctrl.topicsId).toEqual(80);
  });

});
