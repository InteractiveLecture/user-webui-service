///<reference path='..//typings/tsd.d.ts' />
module Caching {
  'use strict';

  export class Caching {
    private cacheArray: lectureDefinitions.models.BaseModel[] = [];

    public static $inject: string[] = [
    ];

    constructor() {
    }

    get(): string {
      return 'Caching';
    }

    save(index: string,value: lectureDefinitions.models.BaseModel) {
      this.cacheArray[index] = value;
      console.log('gespeichert wurde ' + value);
    }

    load(index: string) {
      console.log('zurück kommt '+ this.cacheArray[index]);
      return this.cacheArray[index];

    }
  }

  /**
   * @ngdoc service
   * @name interactiveLectureWebFrontend.service:Caching
   *
   * @description
   *
   */
  angular
    .module('interactiveLectureWebFrontend')
    .service('Caching', Caching);
}
