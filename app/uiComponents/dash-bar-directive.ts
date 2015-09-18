///<reference path='../../typings/tsd.d.ts' />
module DashBar {
  'use strict';

  /**
  * @ngdoc directive
  * @name uiComponents.directive:dashBar
  * @restrict EA
  * @element
  *
  * @description
  *
  * @example
    <example module="uiComponents">
      <file name="index.html">
        <dash-bar></dash-bar>
      </file>
    </example>
  *
  */
  angular
    .module('uiComponents')
    .directive('dashBar', dashBar);

  function dashBar(): ng.IDirective {
    return {
      scope: {},
      templateUrl: './uiComponents/dash-bar-directive.tpl.html',
      replace: false,
      controllerAs: 'dashBar',
      controller: function () {
        var vm = this;
        vm.name = 'dashBar';
      },
      link: function (scope: ng.IScope, element: JQuery, attrs: any) {
        /*jshint unused:false */
        /*eslint "no-unused-vars": [2, {"args": "none"}]*/
      }
    };
  }
}
