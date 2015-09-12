///<reference path='..//typings/tsd.d.ts' />
module Caching {
  'use strict';

  export class CachingService {

    // Array welches als Speicher der Cachedaten dient.
    private cacheArray: lectureDefinitions.models.BaseModel[] = [];

    public static $inject: string[] = [
    ];

    constructor() {
    }

    get(): string {
      return 'CachingService';
    }

    // Save Function zum einspeichern in den Cache. Aufruf ist dem Servicenutzer
    // überlassen
    save(url: string, value: lectureDefinitions.models.BaseModel) {
      this.cacheArray[url] = value;
    }

    // loadFunction zum auslesen aus dem Cache.
    load(url: string): lectureDefinitions.models.BaseModel {
      return this.cacheArray[url];
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
