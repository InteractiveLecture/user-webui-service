///<reference path='../../typings/tsd.d.ts' />
module NavBar {
  'use strict';

  /**
  * @ngdoc directive
  * @name uiComponents.directive:navBar
  * @restrict EA
  * @element
  *
  * @description
  *
  * @example
    <example module="uiComponents">
      <file name="index.html">
        <nav-bar></nav-bar>
      </file>
    </example>
  *
  */
  angular
    .module('uiComponents')
    .directive('navBar', navBar);

  function navBar(CachingService: any): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: 'uiComponents/nav-bar-directive.tpl.html',
      replace: false,
      controllerAs: 'navBar',
      controller: function() {
        var vm = this
        vm.name = 'navBar'
      },
      link: function(scope: ng.IScope, element: JQuery, attrs: any) {
        /*jshint unused:false */
        /*eslint "no-unused-vars": [2, {"args": "none"}]*/
      }
    };
  }
}
