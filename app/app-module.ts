///<reference path='../typings/tsd.d.ts' />
module interactiveLectureWebFrontend {
  'use strict';

  /* @ngdoc object
   * @name interactiveLectureWebFrontend
   * @description
   *
   */
  var app = angular
    .module('interactiveLectureWebFrontend', [
      'ngNewRouter',
      'home',
      'login',
      'profile',
      'moduleOverview',
      'topicOverview',
      'topicDetails',
      'tutorialText',
      'tutorialVideo',
      'exerciseOverview',
      'exerciseWorksheet'
    ]);

    app.config(['$componentLoaderProvider', ($componentLoaderProvider: any) => {
      // Die generierten Controller nutzen
      $componentLoaderProvider.setCtrlNameMapping((name: string) => {
        // name is component name
        return name[0].toUpperCase() + name.substr(1) + 'Ctrl';
      });
      // Die generierten Templates nutzen
      $componentLoaderProvider.setTemplateMapping((name: string) => {
        // name is component name
        return name +'/'+ name + '.tpl.html';
      });
    }]);

}
