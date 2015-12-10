///<reference path='../../typings/tsd.d.ts' />
module AceEditor {
  'use strict';

  /**
  * @ngdoc directive
  * @name uiComponents.directive:aceEditor
  * @restrict EA
  * @element
  *
  * @description
  *
  * @example
    <example module="uiComponents">
      <file name="index.html">
        <ace-editor></ace-editor>
      </file>
    </example>
  *
  */
  angular
    .module('uiComponents')
    .directive('aceEditor', aceEditor)

  function aceEditor(): ng.IDirective {
    return {
      restrict: 'EA',
      templateUrl: 'uiComponents/ace-editor-directive.tpl.html',
      replace: false,
      controllerAs: 'aceEditor',
      controller: function($timeout: ng.ITimeoutService) {
        var vm = this
        vm.currentTab = 1
        // TODO: Dummy ersetzen
        vm.javaClasses = [{id: 1}, {id: 2}]
        console.log(vm.currentTab)
        console.log(vm.javaClasses)
        // Using Websocket
        vm.socketEnd = new WebSocket("ws://localhost:8000/java-backend", []);
        // Using diff_match_patch
        vm.patcher = new diff_match_patch()
        // Using ace-editor & config
        vm.editor = ace.edit("editor");
        vm.editor.setTheme("ace/theme/chrome");
        vm.editor.getSession().setMode("ace/mode/javascript");
        vm.editor.setOptions({
          fontSize: "16pt"
        });

        // Eventlistener ON
        vm.lastShot =""
        vm.timer
        vm.editor.on('change', (eingabe: any) => {
          // Wenn noch nicht getippt würde, braucht der Timer nicht gecancelt werden
          if(vm.timer != null) {
          // Timeout abbrechen, falls erneut getippt wird
          $timeout.cancel(vm.timer)
          }
          // Fehler ausgeben
          vm.socketEnd.onerror((err:any)=> console.log(err))
          // Nachrichten / success ausgeben
          vm.socketEnd.onmessage((message:any)=> console.log(message))
          /*
          Timeout nutzen.
          Sobald der User tippt geht ein Timer von 1,5 Sekunden los.
          Wenn er aufhört zu tippen läuft der Timer durch und Der Patch wird
          zum Server verschickt.
          */
          vm.timer = $timeout(()=> {
            var shot = vm.editor.getValue()
            var patch = vm.patcher.patch_make(vm.patcher.diff_main(vm.lastShot, shot))
            console.log(patch)
            vm.lastShot = shot;
            vm.socketEnd.send(vm.patcher.patch_toText(patch))
          }, 1500)
        })

      },
      link: function(scope: ng.IScope, element: JQuery, attrs: any) {
        /*jshint unused:false */
        /*eslint "no-unused-vars": [2, {"args": "none"}]*/
      }
    };
  }
}
