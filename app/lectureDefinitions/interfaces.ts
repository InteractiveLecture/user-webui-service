///<reference path='../../typings/tsd.d.ts' />
// Selbstdefinierte Interfaces des Lecture Service.
module lectureDefinitions.interfaces {

  export interface Linkable {
    links: models.Link[];
    getUrlFor(name: string): string;
    getPageFor(name: string, page: number, size: number, sort: string): string;
  }

  export interface ModelService {
      loadModel(linkUrl: string, callback: any): void;
  }
}
