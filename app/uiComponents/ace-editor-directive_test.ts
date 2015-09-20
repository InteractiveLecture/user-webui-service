///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('aceEditor', function () {
  var scope
    , element;

  beforeEach(module('uiComponents', 'ui-components/ace-editor-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<ace-editor></ace-editor>'))(scope);
  }));


});
