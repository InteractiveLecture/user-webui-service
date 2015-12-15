///<reference path='..//typings/tsd.d.ts' />
module Caching {
  'use strict'

  export class CachingService {

    // Speicher des Cache
    private cacheArray: lectureDefinitions.models.BaseModel[] = []
    // TODO: cacheProfile Sinn prüfen
    private cacheProfile: any

    public static $inject: string[] = [
    ]

    /**
     * Einbinden der Dependency's
     */
    constructor() {
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
      this.cacheArray[uuid] = value;
    }

    /**
     * Load Function zum auslesen aus dem Cache.
     * @param  {string}                              uuid [Eine einzigartige uuid funktioniert als index um den value wieder zu finden]
     * @return {lectureDefinitions.models.BaseModel}      [Gesuchte Modeldaten]
     */
    load(uuid: string): lectureDefinitions.models.BaseModel {
      return this.cacheArray[uuid];
    }



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
