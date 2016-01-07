///<reference path='../../typings/tsd.d.ts' />
// Selbstdefinierte Interfaces des Lecture Service.
module lectureDefinitions.interfaces {

  export interface loginable {
    username: string
    password: string
  }

  export interface backendable {
    get(): string
    loadModel(id: string, callback: any): any
    postUserData(userData: lectureDefinitions.interfaces.loginable, callback: any): any
  }

  export interface cachable {
    cacheData: any
    callBackendService: lectureDefinitions.interfaces.backendable

    get(): string
    save(uuid: string, value: lectureDefinitions.models.BaseModel): any
  }

  export interface treeData {
    id: string
    level: number
    paths: string[]
    description: string
    topic_id: string
    video_id: string
    script_id: string
    children: string[]
  }
}
