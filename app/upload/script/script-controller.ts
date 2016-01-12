///<reference path='../../../typings/tsd.d.ts' />
module ScriptCtrl {
  'use strict';

  class ScriptCtrl {

    ctrlName: string
    script: string
    error: any
    callBackendService: lectureDefinitions.interfaces.backendable
    $log: ng.ILogService

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: string[] = [
      'CallBackendService',
      '$log'
    ];

    // dependencies are injected via AngularJS $injector
    constructor(callBackendService: lectureDefinitions.interfaces.backendable, $log: ng.ILogService) {
      var vm = this
      vm.callBackendService = callBackendService
      vm.ctrlName = 'ScriptCtrl'
      vm.script = 'Ihr Script hier einfügen'
      vm.$log = $log
      $log.debug('controller ' + vm.ctrlName + ' is working')
    }

    postScriptContent(content: string) {
      if (content == 'Ihr Script hier einfügen') {
        this.error = 'noContent'
      }
      else {
        this.$log.debug('poste: ' + this.script)
        this.callBackendService.postScript(this.script, (result: any) => {
          this.error = result.status
        })
      }
    }



  }


  /**
  * @ngdoc object
  * @name upload.script.controller:ScriptCtrl
  *
  * @description
  *
  */
  angular
    .module('upload.script')
    .controller('UploadScriptCtrl', ScriptCtrl);
}
