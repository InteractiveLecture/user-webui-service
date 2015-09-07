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

    save(url: string, value: lectureDefinitions.models.BaseModel) {
      this.cacheArray[url] = value;
      console.log('gespeichert wurde ' + value);
    }

    load(url: string): lectureDefinitions.models.BaseModel {
      console.log('zurück kommt ' + this.cacheArray[url]);
      return this.cacheArray[url];

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
