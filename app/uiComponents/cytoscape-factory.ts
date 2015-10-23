///<reference path='../../typings/tsd.d.ts' />
module CytoscapeFactory {
  'use strict';

  /**
  * @ngdoc service
  * @name uiComponents.factory:Cytoscape
  *
  * @description
  *
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
          container: document.getElementById('cy'),
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
            nodes: [
              { data: { id: 'j', name: 'Jerry' } },
              { data: { id: 'e', name: 'Elaine' } },
              { data: { id: 'k', name: 'Kramer' } },
              { data: { id: 'g', name: 'George' } }
            ],
            edges: [
              { data: { source: 'j', target: 'e' } },
              { data: { source: 'j', target: 'k' } },
              { data: { source: 'j', target: 'g' } },
              { data: { source: 'e', target: 'j' } },
              { data: { source: 'e', target: 'k' } },
              { data: { source: 'k', target: 'j' } },
              { data: { source: 'k', target: 'e' } },
              { data: { source: 'k', target: 'g' } },
              { data: { source: 'g', target: 'j' } }
            ]
          },
          layout: {
            name: 'grid',
            padding: 10
          },
          ready: () => {
            deferred.resolve(this);
          }
        });
      }) // On DOM Ready

      return deferred.promise;

    };
    return CytoscapeBase;
  }
}
