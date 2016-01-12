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
    loadTopicsPage(pageNumber: number, pageSize: number, callback: any): any
    loadOneTopic(topicId: string, callback: any): any
    loadModuleTree(topic_id: string, layer: number, ancestors: number, descedants: number, callback: any): any
    loadBalance(userId: string, callback: any): any
    loadExerciseHistory(userId: string, moduleId: string, callback: any): any
    loadExercise(exerciseId: string, callback: any): any
    getReasonableExercise(userId: string, moduleId: string, callback: any): any
    loadModule(moduleId: string, callback: any): any
    postScript(sciptContent: string, callback: any): any
    postUser(newUser: any, callback: any): any
    postNewPassword(newPassword: string, userId: string, callback: any): any
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
