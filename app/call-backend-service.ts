///<reference path='../typings/tsd.d.ts' />
module CallBackend {
  'use strict'

  export class CallBackendService {

    $http: ng.IHttpService
    jwtHelper: ng.jwt.IJwtHelper


    public static $inject: string[] = [
      '$http',
      'jwtHelper'
    ]

    /**
     * @param  {ng.IHttpService} $http     [HTTP anfragen stellen]
     * @param  {any}             jwtHelper [Jwt Token verarbeiten]
     */
    constructor($http: ng.IHttpService, jwtHelper: any) {
      var vm = this
      vm.$http = $http
      vm.jwtHelper = jwtHelper

    }

    /**
     * Service identifizieren
     * @return {string} [ServiceName]
     */
    get(): string {
      return 'CallBackendService';
    }

    beginExercise(exerciseId: string, taskPosition: number, callback: any) {
      this.$http({
        method: 'POST',
        url: '/exercises' + exerciseId + '/task/' + taskPosition// An das Backend
      }).then((result: any) => {
        callback(result.data)
      }, (err) => console.log(err))
    }

    /**
     * Modeldaten anhand der übergebenen Url laden. Die Verwendung der Daten
     * bestimmt der Nutzer per Callback
     * @param  {string} linkUrl  [Url wo die Ressourcen zu laden sind]
     * @param  {any}    callback [Callback damit der Aufrufer das Ergebnis verwenden kann]
     */
    loadModel(url: string, callback: any) {
      this.$http({
        method: 'GET',
        url: url // An das Backend
      }).then((result: any) => {
        var jsonResult = result.data;
        callback(jsonResult.content.map((item: any) => new lectureDefinitions.models.BaseModel(item)));
      }, (err) => console.log(err))
    }

    loadTopicsPage(pageNumber: number, pageSize: number, callback: any) {
      this.$http({
        method: 'GET',
        url: '/topics?page=' + pageNumber + '&size=' + pageSize
      }).then((result: any) => {
        callback(result.data)
      }, (err: any) => {
          console.log(err)
        })
    }

    loadOneTopic(topicId: string, callback: any) {
      this.$http({
        method: 'GET',
        url: '/topics/' + topicId
      }).then((result: any) => {
        callback(result.data)
      }, (err: any) => {
          console.log(err)
        })
    }

    loadModuleTree(topic_id: string, layer: number, ancestors: number, descedants: number, callback: any) {
      this.$http({
        method: 'GET',
        url: `/topics/${topic_id}/modules?layer=${layer}&ancestors=${ancestors}&descedants=${descedants}`
      }).then((result: any) => {
        callback(result.data)
      }, (err: any) => {
          console.log(err)
        })
    }

    loadBalance(userId: string, callback: any) {
      this.$http({
        method: 'GET',
        url: '/users/' + userId + '/balances/'
      }).then((result: any) => {
        callback(result.data)
      }, (err: any) => {
          console.log(err)
        })
    }

    loadExerciseHistory(userId: string, moduleId: string, callback: any) {
      this.$http({
        method: 'GET',
        url: '/users/' + userId + '/exercises' + '?module_id=' + moduleId
      }).then((result: any) => {
        callback(result.data)
      }, (err: any) => {
          console.log(err)
        })
    }

    loadExercise(exerciseId: string, callback: any) {
      this.$http({
        method: 'GET',
        url: '/exercises/' + exerciseId
      }).then((result: any) => {
        callback(result.data)
      }, (err: any) => {
          console.log(err)
        })
    }

    getReasonableExercise(userId: string, moduleId: string, callback: any) {
      this.loadExerciseHistory(userId, moduleId, (result: lectureDefinitions.models.ExerciseProgressHistoryEntry[]) => {
        this.loadExercise(this.chooseExercise(result, moduleId), callback)
      })
    }

    private chooseExercise(history: lectureDefinitions.models.ExerciseProgressHistoryEntry[], moduleId: string): string {
      var exercisesOfModule: lectureDefinitions.models.Exercise[]
      var hashmap: any[]
      var result: string
      this.loadModule(moduleId, (module: lectureDefinitions.models.Module) => {
        exercisesOfModule = module.exercises
      })
      history.forEach((entry) => {
        if (entry.state == 'BEGIN') {
          hashmap[entry.exercise_id] = true
        }
        if (entry.state == 'FINISH') {
          hashmap[entry.exercise_id] = false
        }
      })
      for (var key in hashmap) {
        if (hashmap[key]) {
          return key
        }
      }
      exercisesOfModule.forEach((exercise: lectureDefinitions.models.Exercise) => {
        if (!(exercise.id in hashmap)) {
          result = exercise.id
          return
        }
      })
      return result
    }

    loadModule(moduleId: string, callback: any) {
      this.$http({
        method: 'GET',
        url: '/modules/' + moduleId
      }).then((result: any) => {
        callback(result.data)
      }, (err: any) => {
          console.log(err)
        })
    }

    consumeHint(hintId: string, callback: any) {
      this.$http({
        method: 'POST',
        url: '/hint/' + hintId + '/consume'
      }).then((result: any) => {
        callback(result.data)
      }, (err: any) => {
          callback(err)
        })
    }

    postScript(sciptContent: string, callback: any) {
      this.$http({
        method: 'POST',
        url: '/scripte'
      }).then((result: any) => {
        callback(result.data)
      }, (err: any) => {
          callback(err)
        })
    }

    postUser(newUser: any, callback: any) {
      this.$http({
        method: 'POST',
        url: '/users/' + newUser.id
      }).then((result: any) => {
        callback(result.data)
      }, (err: any) => {
          callback(err)
        })
    }

    postNewPassword(newPassword: string, userId: string, callback: any) {
      this.$http({
        method: 'PUT',
        url: '/users/' + userId
      }).then((result: any) => {
        callback(result.data)
      }, (err: any) => {
          callback(err)
        })
    }

    /**
     * Gibt die eingetippten Daten ans Backend weiter. Das Resultat wird im Cache
     * gespeichert und zurückgegeben
     * @param  {loginable}    userData [Object, welches ein passwort und eine kennung ernhält]
     * @param  {any}    callback [Das Egebnis des Post's wird dem Aufrufer gezeigt]
     */
    postUserData(userData: lectureDefinitions.interfaces.loginable, callback: any) {
      var username = userData.username
      var password = userData.password
      var clientId = "user-web-client"
      var clientSecret = "user-web-client-secret"
      var grant_type = "password"
      var data = `username=${username}&password=${password}&client_id=${clientId}&client_secret=${clientSecret}&grant_type=${grant_type}`
      var req = {
        method: 'POST',
        url: '/login',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      }
      this.$http(req).then(
        (token: any) => { callback(null, token) },
        (error: any) => { callback(error, null) }
        )
    }
  }


  /**
   * @ngdoc service
   * @name interactiveLectureWebFrontend.service:CallBackend
   *
   * @description
   * Kommunikation mit dem Backend.
   * WICHTIG: Jeder Konsument braucht die Dependency 'interactiveLectureWebFrontend'
   */
  angular
    .module('webUiService')
    .service('CallBackendService', CallBackendService);
}
