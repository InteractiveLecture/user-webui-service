///<reference path='..//typings/tsd.d.ts' />
module Caching {
  'use strict'

  export class CachingService {

    // Speicher des Cache
    private cacheData: lectureDefinitions.models.BaseModel[] = []
    private backend: CallBackend.CallBackendService

    /**
     * Cache für die einzelnen Models definieren
     * Beispiele:
     * loadTopic()
     * loadExercise()
     *
     * save implizit über Load(), außer bei Post requests mit eigner Id
     */

    public static $inject: string[] = [
      'CallBackendService'
    ]

    /**
     * Einbinden der Dependency's
     */
    constructor(backend: CallBackend.CallBackendService) {
      var vm = this
      vm.backend = backend
    }

    /**
     * Service identifizieren
     * @return {string} [ServiceName]
     */
    get(): string {
      return 'CachingService';
    }

    /**
     * Save Function zum einspeichern in den Cache. Aufruf ist dem Servicenutzer
     * überlassen
     * @param  {string}                              uuid  [Eine einzigartige uuid funktioniert als index um den value wieder zu finden]
     * @param  {lectureDefinitions.models.BaseModel} value [Ein Model des Projektes wird eingespeichert]
     */
    save(uuid: string, value: lectureDefinitions.models.BaseModel) {
      this.cacheData[uuid] = value;
    }

    /**
     * Lädt ein Topic aus dem cache, falls das nicht gefunden wird, wird eine
     * Request an das Backend geschickt
     * @param  {string}                          uuid [Index]
     * @return {lectureDefinitions.models.Topic}      [Topic zur uuid]
     */
    loadTopic(uuid: string): lectureDefinitions.models.Topic {
      if (uuid in this.cacheData) {
        return <lectureDefinitions.models.Topic>this.cacheData[uuid]
      }
      else {
        this.backend.loadModel(uuid, (modelData: lectureDefinitions.models.BaseModel) => {
          if (modelData == null || modelData == undefined) {
            return null
          }
          else {
            this.save(uuid, modelData)
            return <lectureDefinitions.models.Topic>modelData
          }
        })
      }
    }

    /**
     * Lädt ein Module aus dem cache, falls das nicht gefunden wird, wird eine
     * Request an das Backend geschickt
     * @param  {string}                           uuid [Index]
     * @return {lectureDefinitions.models.Module}      [Module zur uuid]
     */
    loadModule(uuid: string): lectureDefinitions.models.Module {
      if (uuid in this.cacheData) {
        return <lectureDefinitions.models.Module>this.cacheData[uuid]
      }
      else {
        this.backend.loadModel(uuid, (modelData: lectureDefinitions.models.BaseModel) => {
          if (modelData == null || modelData == undefined) {
            return null
          }
          else {
            this.save(uuid, modelData)
            return <lectureDefinitions.models.Module>modelData
          }
        })
      }
    }

    /**
     * Lädt ein Exercise aus dem cache, falls das nicht gefunden wird, wird eine
     * Request an das Backend geschickt
     * @param  {string}                             uuid [Index]
     * @return {lectureDefinitions.models.Exercise}      [Exercise zur uuid]
     */
    loadExercise(uuid: string): lectureDefinitions.models.Exercise {
      if (uuid in this.cacheData) {
        return <lectureDefinitions.models.Exercise>this.cacheData[uuid]
      }
      else {
        this.backend.loadModel(uuid, (modelData: lectureDefinitions.models.BaseModel) => {
          if (modelData == null || modelData == undefined) {
            return null
          }
          else {
            this.save(uuid, modelData)
            return <lectureDefinitions.models.Exercise>modelData
          }
        })
      }
    }

    /**
     * Lädt ein Task aus dem cache, falls das nicht gefunden wird, wird eine
     * Request an das Backend geschickt
     * @param  {string}                         uuid [Index]
     * @return {lectureDefinitions.models.Task}      [Task zur uuid]
     */
    loadTask(uuid: string): lectureDefinitions.models.Task {
      if (uuid in this.cacheData) {
        return <lectureDefinitions.models.Task>this.cacheData[uuid]
      }
      else {
        this.backend.loadModel(uuid, (modelData: lectureDefinitions.models.BaseModel) => {
          if (modelData == null || modelData == undefined) {
            return null
          }
          else {
            this.save(uuid, modelData)
            return <lectureDefinitions.models.Task>modelData
          }
        })
      }
    }

    /**
     * Lädt ein Hint aus dem cache, falls das nicht gefunden wird, wird eine
     * Request an das Backend geschickt
     * @param  {string}                         uuid [Index]
     * @return {lectureDefinitions.models.Hint}      [Hint zur uuid]
     */
    loadHint(uuid: string): lectureDefinitions.models.Hint {
      if (uuid in this.cacheData) {
        return <lectureDefinitions.models.Hint>this.cacheData[uuid]
      }
      else {
        this.backend.loadModel(uuid, (modelData: lectureDefinitions.models.BaseModel) => {
          if (modelData == null || modelData == undefined) {
            return null
          }
          else {
            this.save(uuid, modelData)
            return <lectureDefinitions.models.Hint>modelData
          }
        })
      }
    }

    /**
     * Lädt einen User aus dem cache, falls das nicht gefunden wird, wird eine
     * Request an das Backend geschickt
     * @param  {string}                         uuid [Index]
     * @return {lectureDefinitions.models.User}      [User mit der uuid]
     */
    loadUser(uuid: string): lectureDefinitions.models.User {
      if (uuid in this.cacheData) {
        return <lectureDefinitions.models.User>this.cacheData[uuid]
      }
      else {
        this.backend.loadModel(uuid, (modelData: lectureDefinitions.models.BaseModel) => {
          if (modelData == null || modelData == undefined) {
            return null
          }
          else {
            this.save(uuid, modelData)
            return <lectureDefinitions.models.User>modelData
          }
        })
      }
    }

    // Ende Module
  }

  /**
   * @ngdoc service
   * @name interactiveLectureWebFrontend.service:CachingService
   *
   * @description
   * Cache zum Speichern häufig genutzer Daten.
   */
  angular
    .module('interactiveLectureWebFrontend')
    .service('CachingService', CachingService);
}
