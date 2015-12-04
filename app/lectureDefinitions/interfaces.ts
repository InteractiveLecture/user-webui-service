///<reference path='../../typings/tsd.d.ts' />
// Selbstdefinierte Interfaces des Lecture Service.
module lectureDefinitions.interfaces {

  export interface ModelService {
      loadModel(linkUrl: string, callback: any): void;
  }
}
