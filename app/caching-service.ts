///<reference path='..//typings/tsd.d.ts' />
module Caching {
  'use strict';

  export class CachingService {

    // Array welches als Speicher der Cachedaten dient.
    private cacheArray: lectureDefinitions.models.BaseModel[] = [];
    private cacheProfile: any;

    public static $inject: string[] = [
    ];

    constructor() {
    }

    get(): string {
      return 'CachingService';
    }

    // Save Function zum einspeichern in den Cache. Aufruf ist dem Servicenutzer
    // überlassen
    save(uuid: string, value: lectureDefinitions.models.BaseModel) {
      this.cacheArray[uuid] = value;
    }

    // loadFunction zum auslesen aus dem Cache.
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
