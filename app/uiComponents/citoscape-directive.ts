///<reference path='../../typings/tsd.d.ts' />
module Citoscape {
  'use strict';

  /**
  * @ngdoc directive
  * @name uiComponents.directive:citoscape
  * @restrict EA
  * @element
  *
  * @description
  *
  * @example
    <example module="uiComponents">
      <file name="index.html">
        <citoscape></citoscape>
      </file>
    </example>
  *
  */
  angular
    .module('uiComponents')
    .directive('citoscape', citoscape);

  function citoscape(): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: 'uiComponents/citoscape-directive.tpl.html',
      replace: false,
      controllerAs: 'citoscape',
      controller: function () {
        var vm = this;
      },
      link: function (scope: ng.IScope, element: JQuery, attrs: any) {
        /*jshint unused:false */
        /*eslint "no-unused-vars": [2, {"args": "none"}]*/
      }
    };
  }
}
