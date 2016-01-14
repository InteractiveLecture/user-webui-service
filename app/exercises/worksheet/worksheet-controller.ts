///<reference path='../../../typings/tsd.d.ts' />
module exercises {
  'use strict';

  interface uiTab {
    title: string
    visible: boolean
    active: string
    session: AceAjax.IEditSession
  }

  class WorksheetCtrl {

    ctrlName: string
    aceTabs: any[]
    patcher: any
    timerActiv: any
    aceOptions: any
    lastSelected: number
    testResults: string
    websocket: WebSocket
    compileReport: lectureDefinitions.models.CompilationReport

    $timeout: ng.ITimeoutService
    $log: ng.ILogService

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: string[] = [
      '$timeout',
      '$log'
    ];

    // dependencies are injected via AngularJS $injector
    constructor($timeout: ng.ITimeoutService, $log: ng.ILogService) {
      var vm = this
      vm.ctrlName = 'WorksheetCtrl'
      vm.$log = $log
      vm.aceTabs = []
      vm.lastSelected = 0
      vm.initTab()
      vm.$timeout = $timeout
      vm.patcher = new diff_match_patch()
      vm.websocket = new WebSocket('ws://java')
      vm.websocket.onmessage = (event: MessageEvent) => { vm.javaEvaluationListener(event.data) }
      vm.aceOptions = {
        mode: 'java',
        theme: 'eclipse',
        onLoad: (_editor: AceAjax.Editor) => {
          console.log('ace tab ready')
          this.aceTabs[this.aceTabs.length - 1].session = _editor.getSession()
        }
      }
      $log.debug('controller ' + vm.ctrlName + ' is working')
    }

    javaEvaluationListener(report: lectureDefinitions.models.CompilationReport) {
      this.compileReport = report
      if (!report.hasErrors) {
        this.compileReport.errors.forEach((error: lectureDefinitions.models.CompilationDiagnostic) => {
          if (error.noPosition) {
            this.testResults == 'Die Datei ' + error.classname + ' konnte nicht kompiliert werden'
          } else {
            this.aceTabs.forEach((tab: uiTab) => {
              if (tab.title == error.classname) {
                var tabnumber = this.aceTabs.indexOf(tab)
                this.highlightError(error.code, error.lineNumber, error.colNumber, tab)
              }
            })
          }
        })
      }
    }

    private highlightError(code: any, lineNumber: number, colNumber: number, tab: uiTab) {
      tab.session.setAnnotations([{
        row: lineNumber,
        column: colNumber,
        text: code,
        type: "error"
      }])
    }

    initTab() {
      this.aceTabs.push({ title: "New Class", visible: true, active: 'active', content: '', session: null, lastShot: '' })
    }

    /**
     * Ein Tab des AceEditors löschen
     */
    deleteTab(index: number) {
      if (this.aceTabs.length > 1) {
        this.aceTabs.splice(index, 1)
        if (this.aceTabs[index].active == '') {
          if ((index - 1) > -1) {
            this.selectOne(index - 1)
          } else {
            this.selectOne(0)
          }
        }
      }
    }

    /**
     * Ein Tab im AceEditor wählen und damit sichtbar machen
     * @param  {any}    data [Tab, welches sichtbar sein soll]
     */
    selectOne(index: number) {
      this.deselectAll()
      this.lastSelected = index
      this.aceTabs[index].visible = true
      this.aceTabs[index].active = 'active'
      this.$log.debug(this.aceTabs[index])
    }

    /**
     * Versteckt alle Tabs indem die tab.visible Eigenschaft auf false gesetzt wird
     */
    deselectAll() {
      angular.forEach(this.aceTabs, (tabs) => {
        tabs.visible = false
        tabs.active = ''
      })
    }

    /**
     * Fügt ein neues Tab hinzu und setzt es visible
     */
    addTab() {
      this.deselectAll()
      this.initTab()
    }

    /**
     * Generiert einen Patch für das Backend nach jeder Eingabe des Nutzers
     */
    generatePatch(): any[] {
      var result: any[] = []
      this.aceTabs.forEach((tab) => {
        if (tab.title != 'unbekannte Klasse' && tab.title != 'New Class') {
          var patch = this.useDiffMatchPatch(tab.lastShot, tab.content)
          if (patch != '') {
            result.push({ fileName: tab.title, content: patch })
            tab.lastShot = tab.content
          }
        }
      })
      return result
    }

    /**
     * DiffMatchPatch aufrufen
     * @param  {string} lastShot [Letzte Version der Eingabe]
     * @param  {string} shot     [Aktuelle Version der Eingabe]
     * @return {string}          [Der Patch für die beiden Eingaben]
     */
    useDiffMatchPatch(lastShot: string, shot: string): string {
      return this.patcher.patch_toText(this.patcher.patch_make(this.patcher.diff_main(lastShot, shot)))
    }

    /**
     * OnChangeListener für den Inhalt des Ace-Editors
     * @param  {number} index [Index des Tabs, welches sich ändert]
     */
    acechange(index: number) {
      // TODO: websocket instanziieren
      var matches = /(.*?)(?=\s+|$|extends|implements|\{)/m.exec(this.aceTabs[index].content.replace(/([\n\r\s]*(public)+(\s|$)*)?(class|interface|@interface|enum)(\s|$)*/, ''))
      var className = /[a-z\W\d_]/.test(matches[0][0]) ? "unbekannte Klasse" : matches[0] + ".java"
      this.aceTabs[index].title = className

      // Mock Highlight
      this.highlightError('Da steht was falsches', 1, 2, this.aceTabs[index])

      // Wenn noch nicht getippt würde, braucht der Timer nicht gecancelt werden
      if (this.timerActiv != null) {
        // Timeout abbrechen, falls erneut getippt wird
        this.$timeout.cancel(this.timerActiv)
      }
      // Fehler ausgeben
      //this.websocket.onerror = (error: any) => console.log(error)
      // Nachrichten / success ausgeben
      //this.websocket.onmessage = (message: any) => console.log(message)
      /*
      Timeout nutzen.
      Sobald der User tippt geht ein Timer von 1,5 Sekunden los.
      Wenn er aufhört zu tippen läuft der Timer durch und Der Patch wird
      zum Server verschickt.
      */
      this.timerActiv = this.$timeout(() => {
        var patch = this.generatePatch()
        console.log(patch)
        console.log(this.aceTabs)
        //  this.websocket.send(this.patcher.patch_toText(patch))
      }, 1500)
    }

  }


  /**
  * @ngdoc object
  * @name exercises.worksheet.controller:WorksheetCtrl
  *
  * @description
  *
  */
  angular
    .module('exercises.worksheet')
    .controller('ExerciseWorksheetCtrl', WorksheetCtrl);
}
