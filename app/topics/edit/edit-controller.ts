///<reference path='../../../typings/tsd.d.ts' />
module topics {
  'use strict';

  class EditCtrl {

    ctrlName: string
    description: string
    relatedText: any[]
    relatedVideos: any[]
    cachingService: Caching.CachingService
    workingTopic: lectureDefinitions.models.Topic
    patch: lectureDefinitions.models.LecturePatch
    deleteId: string
    addId: string
    moveId: string
    scriptId: string
    videoId: string
    rfc4122: any

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: string[] = [
      'CallBackendService',
      'CachingService',
      'rfc4122'
    ];

    // dependencies are injected via AngularJS $injector
    constructor(cachingService: Caching.CachingService, rfc4122: any) {
      var vm = this
      vm.ctrlName = 'EditCtrl'
      vm.rfc4122 = rfc4122
      vm.patch = new lectureDefinitions.models.LecturePatch()
      //vm.workingTopic = <lectureDefinitions.models.Topic>cachingService.load($routeParams.id)
      vm.workingTopic = new lectureDefinitions.models.Topic(JSON.parse(lectureDefinitions.models.testdata))
      // Beispiele für Videos, Texte
    }



    /**
     * Einen Delete Patch generieren
     * @param  {string} deleteId [Welches Module wird gelöscht]
     */
    generateDeleteModulePatch(deleteId: string) {
      var path = "/modules/" + deleteId
      this.patch.deleteOperation(path)
    }

    /**
     * Einen Add Patch generieren
     * @param  {string} addId       [Id des neuen Modules]
     * @param  {string} description [Modulebeschreibung]
     */
    generateAddModulePatch(description: string, video_id: string, script_id: string) {
      var path = "/modules/"
      var value = {
        id: this.rfc4122.v4(),
        description: description,
        video_id: video_id,
        script_id: script_id
      }
      this.patch.addOperation(path, value)
    }

    /**
     * Move Patch generieren
     * @param  {string} moveId  [Welches Module wird bewegt]
     * @param  {any[]}  parents [Die neuen Eltern des Modules um den neuen Platz zu erkennen]
     * @return {[type]}         [description]
     */
    generateMoveModulePatch(moveId: string, parents: string[]) {
      var path = "/modules/parents" + moveId
      var value = parents
      this.patch.replaceOperation(path, value)
    }

    generateChangeTopicPatch(topic_id: string, description: string) {
      var path = "/description" + topic_id
      var value = description
      this.patch.replaceOperation(path, value)
    }

  }


  /**
  * @ngdoc object
  * @name topics.edit.controller:EditCtrl
  *
  * @description
  *
  */
  angular
    .module('topics.edit')
    .controller('EditCtrl', EditCtrl);
}
