///<reference path='../../typings/tsd.d.ts' />

module lectureDefinitions.models {

  export class BaseModel implements interfaces.Linkable {
    links: models.Link[];

    constructor(object: any) {
      this.links = object.links;
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
    topicName: string;
    topicDescription: string;

    constructor(object: any) {
      super(object);
      this.topicName = object.topicName;
      this.topicDescription = object.topicDescription;
    }
  }

  export class Module extends models.BaseModel {
    id: number;
    name: string;
    description: string;
  }

  export class Exercise extends models.BaseModel {
    id: number;
    name: string;
    description: string;
  }

  export class Tutorial extends models.BaseModel {
    id: number;
    name: string;
    description: string;
  }

  export class Profile extends models.BaseModel {
    id: number;
    name: string;
    description: string;
  }

  export class Link {
    rel: string;
    href: string;
  }
}
