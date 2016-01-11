///<reference path='../../typings/tsd.d.ts' />
module Cytoscape {
  'use strict';

  /**
  * @ngdoc directive
  * @name modules.directive:cytoscape
  * @restrict EA
  * @element
  *
  * @description
  *
  * @example
    <example module="modules">
      <file name="index.html">
        <cytoscape></cytoscape>
      </file>
    </example>
  *
  */
  angular
    .module('modules')
    .directive('cytoscape', cytoscape);

  function cytoscape(CytoscapeFactory: Cytoscape.CytoscapeInterface): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {
        nodes: '=',
        edges: '='
      },
      templateUrl: 'modules/cytoscape-directive.tpl.html',
      replace: false,
      controllerAs: 'cytoscape',
      controller: function($scope: any) {
        var vm = this
        vm.name = 'cytoscape'
        var cy: Cy.Instance
        CytoscapeFactory.renderCyto($scope.nodes, $scope.edges).then((result: any) => {
          cy = result;
        },
          () => { console.log("Cytoscape.js isn't working") });
      },
      link: function(scope: ng.IScope, element: JQuery, attrs: any) {
        /*jshint unused:false */
        /*eslint "no-unused-vars": [2, {"args": "none"}]*/
      }
    };
  }
}
