///<reference path='../../typings/tsd.d.ts' />
module Cytoscape {
  'use strict';

  /**
  * @ngdoc directive
  * @name uiComponents.directive:cytoscape
  * @restrict EA
  * @element
  *
  * @description
  *
  * @example
    <example module="uiComponents">
      <file name="index.html">
        <cytoscape></cytoscape>
      </file>
    </example>
  *
  */
  angular
    .module('uiComponents')
    .directive('cytoscape', cytoscape);

  function cytoscape(CytoscapeFactory: any): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: 'uiComponents/cytoscape-directive.tpl.html',
      replace: false,
      controllerAs: 'cytoscape',
      controller: function () {
        var vm = this;
        var cy: Cy.Instance;
        CytoscapeFactory.renderCyto().then((result: any)=> {
          cy = result;
        },
      ()=> {console.log('Cytoscape.js arbeitet nicht richtig')});
      },
      link: function (scope: ng.IScope, element: JQuery, attrs: any) {
        /*jshint unused:false */
        /*eslint "no-unused-vars": [2, {"args": "none"}]*/
      }
    };
  }
}
