///<reference path='../../typings/tsd.d.ts' />

module lectureDefinitions.models {

  export class BaseModel implements interfaces.Linkable {
    links: models.Link[]
    cacheIndex: string
    id: number
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
    cacheIndex: string = 'topics'
    topicName: string
    topicDescription: string
  }

  export class Module extends models.BaseModel {
    cacheIndex: string = 'module'
    description: string
  }

  export class Exercise extends models.BaseModel {
    cacheIndex: string = 'exercise'
    task: string
    points: number
  }

  export class Tutorial extends models.BaseModel {
    cacheIndex: string = 'tutorial'
    id: number
    name: string
    description: string
  }

  export class Profile extends models.BaseModel {
    cacheIndex: string = 'profile'
    email: string = this.user_name + "@hochschule-trier.de"
    user_name: string
    passwort: string
    exp: number
    authorities: string[]
    jti: string
    client_id: string
  }

  export class Hint {
    description: string
  }

  export class Link {
    rel: string
    href: string
  }

  export class TopicPatch {
    version: number
    topicID: string
    operations: Operation[]
    // TODO: Trash nicht per HTTP mitschicken.
    trash: Operation[]


    deleteOperation(path: string) {
      this.operations.push(new Operation(OperationsType.REMOVE, path, null, null ))
      this.trash = new Array()
    }

    addOperation(path: string, value:string) {
      this.operations.push(new Operation(OperationsType.ADD, path, null, value ))
      this.trash = new Array()
    }

    replaceOperation(path: string, value:string) {
      this.operations.push(new Operation(OperationsType.REPLACE, path, null, value ))
      this.trash = new Array()
    }

    moveOperation(path: string, from:string) {
      this.operations.push(new Operation(OperationsType.REPLACE, path, from, null ))
      this.trash = new Array()
    }

    redo() {
      this.operations.push(this.trash.pop())
    }

    undo() {
      this.trash.push(this.operations.pop())
    }
  }

  export enum OperationsType{
    ADD,
    REMOVE,
    COPY,
    REPLACE,
    MOVE,
    TEST
  }

  class Operation{

    constructor (operationstype: OperationsType, path: string, from: string, value: string) {
      this.operationstype =operationstype
      this.path = path
      this.from = from
      this.value= value
    }

    operationstype: OperationsType
    path: string
    from: string
    value: string
  }



  // Ende Modul
}
