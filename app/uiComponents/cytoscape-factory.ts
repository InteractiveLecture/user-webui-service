///<reference path='../../typings/tsd.d.ts' />
module CytoscapeFactory {
  'use strict';

  /**
  * @ngdoc service
  * @name uiComponents.factory:Cytoscape
  *
  * @description
  * Bäume grafisch erzeugen
  */
  angular
    .module('uiComponents')
    .factory('CytoscapeFactory', CytoscapeFactory);

  interface CytoscapeInterface {
    renderCyto?: Function
  }

  function CytoscapeFactory($q: any) {
    var CytoscapeBase: CytoscapeInterface = {};
    CytoscapeBase.renderCyto = function() {
      var deferred = $q.defer();
      console.log("go in factory");
      angular.element(document).ready(() => { // On DOM Ready
        var cy = cytoscape({
          // Container zum rendern des Graphen festlegen
          container: document.getElementById('cy'),
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
            nodes: [
              { data: { id: 'j', name: 'Jerry' } },
              { data: { id: 'e', name: 'Elaine' } }
            ],
            // Kanten bestimmen
            edges: [
              { data: { source: 'j', target: 'e' } }
            ]
          },
          layout: {
            // Layout betsimmen
            name: 'grid',
            padding: 10
          },
          ready: () => {
            // Promise soll das Cytoscape.js Objekt übergeben sobald es fertig initialisiert ist
            deferred.resolve(this);
          }
        });
      }) // On DOM Ready
      return deferred.promise;
    };
    return CytoscapeBase;
  }
}
