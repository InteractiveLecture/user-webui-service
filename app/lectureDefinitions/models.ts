///<reference path='../../typings/tsd.d.ts' />

module lectureDefinitions.models {

  export class BaseModel implements interfaces.Linkable {
    links: models.Link[];

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

    extractId(name: string, idName: string): number {

      var href = this.getUrlFor(name);

      if(href === null) {
        return null;
      }

      var elements: string[] = href.split("/");

      for(var i = 0; i < elements.length; i++) {
        if (elements[i] === idName) {
          if(i < elements.length) {
            if(!isNaN(parseInt(elements[i+1]))) {
              return parseInt(elements[i+1]);
            }
          }
        }
      }
      return null;
    }


  }

  export class Topic extends models.BaseModel {
    topicName: string;
    topicDescription: string;
  }

  export class Module extends models.BaseModel {
    description: string;
  }

  export class Exercise extends models.BaseModel {
    task: string;
    points: number;
  }

  export class Tutorial extends models.BaseModel {
    id: number;
    name: string;
    description: string;
  }

  export class Profile extends models.BaseModel {
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
