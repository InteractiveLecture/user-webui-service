///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('markdownEditor', function() {
  var scope: any
    , element: any;

  beforeEach(module('uiComponents', 'ui-components/markdown-editor-directive.tpl.html'));

  beforeEach(inject(function($compile: any, $rootScope: any) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<markdown-editor></markdown-editor>'))(scope);
  }));

});
