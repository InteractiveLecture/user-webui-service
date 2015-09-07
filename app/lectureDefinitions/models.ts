///<reference path='../../typings/tsd.d.ts' />

module lectureDefinitions.models {

  export class BaseModel implements interfaces.Linkable {
    links: models.Link[];
    cacheIndex: string;
    id: number;
    constructor(object: any) {
      this.links = object.links;
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

    getUrlFor(name: string): string {
      var result = this.links.filter((link) => name === link.rel)
      if (result.length > 0) {
        return result[0].href;
      }
      return null;
    }

    getPageFor(name: string, page: number, size: number, sort: string = null): string {
      var result = this.getUrlFor(name);
      if (result === null) {
        return null;
      }
      result += '?page=' + page + '&size=' + size;
      if (sort === null) {
        return result;
      }
      return result + '&sort=' + sort;
    }

  }

  export class Topic extends models.BaseModel {
    cacheIndex: string = 'topics';
    topicName: string;
    topicDescription: string;
  }

  export class Module extends models.BaseModel {
    cacheIndex: string = 'module';
    description: string;
  }

  export class Exercise extends models.BaseModel {
    cacheIndex: string = 'exercise';
    task: string;
    points: number;
  }

  export class Tutorial extends models.BaseModel {
    cacheIndex: string = 'tutorial';
    id: number;
    name: string;
    description: string;
  }

  export class Profile extends models.BaseModel {
    cacheIndex: string = 'profile';
    email: string;
  }

  export class Hint {
    description: string;
  }

  export class Link {
    rel: string;
    href: string;
  }


}
