///<reference path='../../typings/tsd.d.ts' />

module lectureDefinitions.models {

  export var testdata = '{"id":"b8c98f3e-bb7c-39e7-a3ce-e479c7892882","name":"Grundlagen der Programmierung mit Java","description":"bla","version":1,"authorities":[{"user_id":"233804c6-55b8-3807-9733-9c090d75decf","kind":"OFFICER"}], "modules": [{"id":"98bf99f7-3fed-3fd0-b43e-0b0f376b3607","level":0,"paths":["/98bf99f7-3fed-3fd0-b43e-0b0f376b3607"],"description":"foo","topic_id":"b8c98f3e-bb7c-39e7-a3ce-e479c7892882","video_id":"62a69684-d4f0-3cbe-9016-58d1bf67b42a","script_id":"3d6cf4b2-37e1-3d38-9251-3636bab8bb9e"},{"id":"a9a0ad45-2d48-3f7b-bb7e-93340887a3ed","level":1,"paths":["/98bf99f7-3fed-3fd0-b43e-0b0f376b3607/a9a0ad45-2d48-3f7b-bb7e-93340887a3ed"],"description":"bar","topic_id":"b8c98f3e-bb7c-39e7-a3ce-e479c7892882","video_id":"62a69684-d4f0-3cbe-9016-58d1bf67b42a","script_id":"3d6cf4b2-37e1-3d38-9251-3636bab8bb9e"},{"id":"6d22f47b-5627-3b6b-b110-b1c7b65ec51f","level":2,"paths":["/98bf99f7-3fed-3fd0-b43e-0b0f376b3607/a9a0ad45-2d48-3f7b-bb7e-93340887a3ed/6d22f47b-5627-3b6b-b110-b1c7b65ec51f"],"description":"bli","topic_id":"b8c98f3e-bb7c-39e7-a3ce-e479c7892882","video_id":"62a69684-d4f0-3cbe-9016-58d1bf67b42a","script_id":"3d6cf4b2-37e1-3d38-9251-3636bab8bb9e"},{"id":"76ca2474-f18f-39e7-9a11-21f5981685d6","level":3,"paths":["/98bf99f7-3fed-3fd0-b43e-0b0f376b3607/a9a0ad45-2d48-3f7b-bb7e-93340887a3ed/6d22f47b-5627-3b6b-b110-b1c7b65ec51f/76ca2474-f18f-39e7-9a11-21f5981685d6"],"description":"blubb","topic_id":"b8c98f3e-bb7c-39e7-a3ce-e479c7892882","video_id":"62a69684-d4f0-3cbe-9016-58d1bf67b42a","script_id":"3d6cf4b2-37e1-3d38-9251-3636bab8bb9e"},{"id":"921f23fb-de2a-32cf-855b-8d57ac12f7d1","level":3,"paths":["/98bf99f7-3fed-3fd0-b43e-0b0f376b3607/a9a0ad45-2d48-3f7b-bb7e-93340887a3ed/6d22f47b-5627-3b6b-b110-b1c7b65ec51f/921f23fb-de2a-32cf-855b-8d57ac12f7d1"],"description":"bla","topic_id":"b8c98f3e-bb7c-39e7-a3ce-e479c7892882","video_id":"62a69684-d4f0-3cbe-9016-58d1bf67b42a","script_id":"3d6cf4b2-37e1-3d38-9251-3636bab8bb9e"},{"id":"834e4592-5a04-32ed-8b44-6c5d2d187c55","level":4,"paths":["/98bf99f7-3fed-3fd0-b43e-0b0f376b3607/a9a0ad45-2d48-3f7b-bb7e-93340887a3ed/6d22f47b-5627-3b6b-b110-b1c7b65ec51f/76ca2474-f18f-39e7-9a11-21f5981685d6/834e4592-5a04-32ed-8b44-6c5d2d187c55","/98bf99f7-3fed-3fd0-b43e-0b0f376b3607/a9a0ad45-2d48-3f7b-bb7e-93340887a3ed/6d22f47b-5627-3b6b-b110-b1c7b65ec51f/921f23fb-de2a-32cf-855b-8d57ac12f7d1/834e4592-5a04-32ed-8b44-6c5d2d187c55"],"description":"bazz","topic_id":"b8c98f3e-bb7c-39e7-a3ce-e479c7892882","video_id":"62a69684-d4f0-3cbe-9016-58d1bf67b42a","script_id":"3d6cf4b2-37e1-3d38-9251-3636bab8bb9e"}]}'

  export class BaseModel {
    cacheIndex: string
    id: number
    constructor(object: any) {
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }
  }

  export class Topic extends models.BaseModel {
    cacheIndex: string = 'topics'
    topicDescription: string
    modules: Module[]

  }

  export class Module extends models.BaseModel {
    cacheIndex: string = 'module'
    description: string
  }

  export class Exercise extends models.BaseModel {
    cacheIndex: string = 'exercise'
    task: string
    points: number
    title: string
    description: string
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

  export class LecturePatch {
    version: number
    operations: Operation[]
    // TODO: Trash nicht per HTTP mitschicken.
    trash: Operation[]

    constructor() {
      this.operations = new Array()
    }

    deleteOperation(path: string) {
      this.operations.push(new Operation(OperationsType[OperationsType.REMOVE], path, null, null))
      this.trash = new Array()
    }

    addOperation(path: string, value: string) {
      this.operations.push(new Operation(OperationsType[OperationsType.ADD], path, null, value))
      this.trash = new Array()
    }

    replaceOperation(path: string, value: string) {
      this.operations.push(new Operation(OperationsType[OperationsType.REPLACE], path, null, value))
      this.trash = new Array()
    }

    moveOperation(from: string, path: string) {
      this.operations.push(new Operation(OperationsType[OperationsType.MOVE], path, from, null))
      this.trash = new Array()
    }

    // TODO: Rückmeldung über das Ergebnis vielleicht sinnvoll
    redo() {
      if (this.trash !== undefined) {
        if (this.trash[0] !== undefined) {
          this.operations.push(this.trash.pop())
        }
      }
    }

    undo() {
      if (this.operations[0] !== undefined) {
        this.trash.push(this.operations.pop())
      }
    }

  }

  export enum OperationsType {
    ADD,
    REMOVE,
    COPY,
    REPLACE,
    MOVE,
    TEST
  }

  export class Operation {

    constructor(operationstype: string, path: string, from: string, value: string) {
      this.operationstype = operationstype
      this.path = path
      this.from = from
      this.value = value
    }

    operationstype: string
    path: string
    from: string
    value: string
  }



  // Ende Modul
}
