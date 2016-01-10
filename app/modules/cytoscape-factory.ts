///<reference path='../../typings/tsd.d.ts' />
module Cytoscape {
  'use strict';

  /**
  * @ngdoc service
  * @name modules.factory:Cytoscape
  *
  * @description
  *
  */
  angular
    .module('modules')
    .factory('CytoscapeFactory', CytoscapeFactory)


  export interface CytoscapeInterface {
    renderCyto?: Function
  }

  function CytoscapeFactory($q: ng.IQService, $location: ng.ILocationService, $rootScope: ng.IRootScopeService) {
    var CytoscapeBase: CytoscapeInterface = {};
    CytoscapeBase.renderCyto = function(nodes: any, edges: any) {
      var deferred = $q.defer()
      var location = $location
      var rootScope = $rootScope
      console.log("go in factory");
      angular.element(document).ready(() => { // On DOM Ready
        var cy = cytoscape({
          // Container zum rendern des Graphen festlegen
          container: $('#cy')[0],
          // Aussehen des Graphen festlegen
          style: cytoscape.stylesheet()
            .selector('node')
            .css({
            'content': 'data(name)',
            'text-valign': 'center',
            'color': 'white',
            'text-outline-width': 2,
            'text-outline-color': '#888'
          })
            .selector('edge')
            .css({
            'target-arrow-shape': 'triangle'
          })
            .selector(':selected')
            .css({
            'background-color': 'black',
            'line-color': 'black',
            'target-arrow-color': 'black',
            'source-arrow-color': 'black'
          })
            .selector('.faded')
            .css({
            'opacity': 0.25,
            'text-opacity': 0
          }),
          elements: {
            // Knoten bestimmen
            nodes: nodes,
            // Kanten bestimmen
            edges: edges
          },
          layout: {
            name: 'breadthfirst',
            directed: true,
            padding: 5
          },
          ready: () => {
            // Promise soll das Cytoscape.js Objekt übergeben sobald es fertig initialisiert ist
            deferred.resolve(this);
            cy.on('tap', 'node', (event: any) => {
              var selected = event.cyTarget
              cy.elements().forEach((element: any) => {
                if (element.data().id != selected.data().id) {
                  element.data({ visible: false })
                } else {
                  selected.data({ visible: true })
                }
              })
              $rootScope.$apply()

            })

          }
        });
        cy.zoomingEnabled(false);
      }) // On DOM Ready

      return deferred.promise;
    };
    return CytoscapeBase;
  }
}
