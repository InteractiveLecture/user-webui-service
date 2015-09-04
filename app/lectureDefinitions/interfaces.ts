///<reference path='../../typings/tsd.d.ts' />

module lectureDefinitions.interfaces {

  export interface Injectable {
    IID: string;
  }

  export interface Linkable {
    links: models.Link[];
    getUrlFor(name: string): string;
    getPageFor(name: string, page: number, size: number, sort: string): string;
  }

}
