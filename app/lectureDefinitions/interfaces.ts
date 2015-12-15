///<reference path='../../typings/tsd.d.ts' />
// Selbstdefinierte Interfaces des Lecture Service.
module lectureDefinitions.interfaces {

  /**
   * Definiert die Methoden die ein Service benötigt um Daten zu beschaffen
   */
  export interface ModelService {
    loadModel(linkUrl: string, callback: any): void;
  }
}
