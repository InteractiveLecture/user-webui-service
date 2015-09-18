///<reference path='../../typings/tsd.d.ts' />
module topicOverview {
  'use strict';

  /* @ngdoc object
  * @name topicOverview
  * @description
  * Module zur Übersicht der verschiedenen Themen
  */
  angular
    .module('topicOverview', [
      'ngNewRouter',
      'uiComponents',
      'interactiveLectureWebFrontend'
    ]);
}
