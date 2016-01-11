///<reference path='../../typings/tsd.d.ts' />

module lectureDefinitions.models {

  // Testdaten
  export var testdata = '{"id":"b8c98f3e-bb7c-39e7-a3ce-e479c7892882","name":"Grundlagen der Programmierung mit Java","description":"bla","version":1,"authorities":[{"user_id":"233804c6-55b8-3807-9733-9c090d75decf","kind":"OFFICER"}], "modules": [{"id":"98bf99f7-3fed-3fd0-b43e-0b0f376b3607","level":0,"paths":["/98bf99f7-3fed-3fd0-b43e-0b0f376b3607"],"description":"foo","topic_id":"b8c98f3e-bb7c-39e7-a3ce-e479c7892882","video_id":"62a69684-d4f0-3cbe-9016-58d1bf67b42a","script_id":"3d6cf4b2-37e1-3d38-9251-3636bab8bb9e"},{"id":"a9a0ad45-2d48-3f7b-bb7e-93340887a3ed","level":1,"paths":["/98bf99f7-3fed-3fd0-b43e-0b0f376b3607/a9a0ad45-2d48-3f7b-bb7e-93340887a3ed"],"description":"bar","topic_id":"b8c98f3e-bb7c-39e7-a3ce-e479c7892882","video_id":"62a69684-d4f0-3cbe-9016-58d1bf67b42a","script_id":"3d6cf4b2-37e1-3d38-9251-3636bab8bb9e"},{"id":"6d22f47b-5627-3b6b-b110-b1c7b65ec51f","level":2,"paths":["/98bf99f7-3fed-3fd0-b43e-0b0f376b3607/a9a0ad45-2d48-3f7b-bb7e-93340887a3ed/6d22f47b-5627-3b6b-b110-b1c7b65ec51f"],"description":"bli","topic_id":"b8c98f3e-bb7c-39e7-a3ce-e479c7892882","video_id":"62a69684-d4f0-3cbe-9016-58d1bf67b42a","script_id":"3d6cf4b2-37e1-3d38-9251-3636bab8bb9e"},{"id":"76ca2474-f18f-39e7-9a11-21f5981685d6","level":3,"paths":["/98bf99f7-3fed-3fd0-b43e-0b0f376b3607/a9a0ad45-2d48-3f7b-bb7e-93340887a3ed/6d22f47b-5627-3b6b-b110-b1c7b65ec51f/76ca2474-f18f-39e7-9a11-21f5981685d6"],"description":"blubb","topic_id":"b8c98f3e-bb7c-39e7-a3ce-e479c7892882","video_id":"62a69684-d4f0-3cbe-9016-58d1bf67b42a","script_id":"3d6cf4b2-37e1-3d38-9251-3636bab8bb9e"},{"id":"921f23fb-de2a-32cf-855b-8d57ac12f7d1","level":3,"paths":["/98bf99f7-3fed-3fd0-b43e-0b0f376b3607/a9a0ad45-2d48-3f7b-bb7e-93340887a3ed/6d22f47b-5627-3b6b-b110-b1c7b65ec51f/921f23fb-de2a-32cf-855b-8d57ac12f7d1"],"description":"bla","topic_id":"b8c98f3e-bb7c-39e7-a3ce-e479c7892882","video_id":"62a69684-d4f0-3cbe-9016-58d1bf67b42a","script_id":"3d6cf4b2-37e1-3d38-9251-3636bab8bb9e"},{"id":"834e4592-5a04-32ed-8b44-6c5d2d187c55","level":4,"paths":["/98bf99f7-3fed-3fd0-b43e-0b0f376b3607/a9a0ad45-2d48-3f7b-bb7e-93340887a3ed/6d22f47b-5627-3b6b-b110-b1c7b65ec51f/76ca2474-f18f-39e7-9a11-21f5981685d6/834e4592-5a04-32ed-8b44-6c5d2d187c55","/98bf99f7-3fed-3fd0-b43e-0b0f376b3607/a9a0ad45-2d48-3f7b-bb7e-93340887a3ed/6d22f47b-5627-3b6b-b110-b1c7b65ec51f/921f23fb-de2a-32cf-855b-8d57ac12f7d1/834e4592-5a04-32ed-8b44-6c5d2d187c55"],"description":"bazz","topic_id":"b8c98f3e-bb7c-39e7-a3ce-e479c7892882","video_id":"62a69684-d4f0-3cbe-9016-58d1bf67b42a","script_id":"3d6cf4b2-37e1-3d38-9251-3636bab8bb9e"}]}'

  export var testTree = JSON.parse(`[{
    "id": "98bf99f7-3fed-3fd0-b43e-0b0f376b3607",
    "level": 0,
    "paths": ["/98bf99f7-3fed-3fd0-b43e-0b0f376b3607"],
    "description": "foo",
    "topic_id": "b8c98f3e-bb7c-39e7-a3ce-e479c7892882",
    "video_id": "62a69684-d4f0-3cbe-9016-58d1bf67b42a",
    "script_id": "3d6cf4b2-37e1-3d38-9251-3636bab8bb9e",
    "children": ["a9a0ad45-2d48-3f7b-bb7e-93340887a3ed"]
  }, {
    "id": "a9a0ad45-2d48-3f7b-bb7e-93340887a3ed",
    "level": 1,
    "paths": ["/98bf99f7-3fed-3fd0-b43e-0b0f376b3607/a9a0ad45-2d48-3f7b-bb7e-93340887a3ed"],
    "description": "bar",
    "topic_id": "b8c98f3e-bb7c-39e7-a3ce-e479c7892882",
    "video_id": "62a69684-d4f0-3cbe-9016-58d1bf67b42a",
    "script_id": "3d6cf4b2-37e1-3d38-9251-3636bab8bb9e",
    "children": ["6d22f47b-5627-3b6b-b110-b1c7b65ec51f"]
  }, {
    "id": "6d22f47b-5627-3b6b-b110-b1c7b65ec51f",
    "level": 2,
    "paths": ["/98bf99f7-3fed-3fd0-b43e-0b0f376b3607/a9a0ad45-2d48-3f7b-bb7e-93340887a3ed/6d22f47b-5627-3b6b-b110-b1c7b65ec51f"],
    "description": "bli",
    "topic_id": "b8c98f3e-bb7c-39e7-a3ce-e479c7892882",
    "video_id": "62a69684-d4f0-3cbe-9016-58d1bf67b42a",
    "script_id": "3d6cf4b2-37e1-3d38-9251-3636bab8bb9e",
    "children": ["921f23fb-de2a-32cf-855b-8d57ac12f7d1", "76ca2474-f18f-39e7-9a11-21f5981685d6"]
  }, {
    "id": "76ca2474-f18f-39e7-9a11-21f5981685d6",
    "level": 3,
    "paths": ["/98bf99f7-3fed-3fd0-b43e-0b0f376b3607/a9a0ad45-2d48-3f7b-bb7e-93340887a3ed/6d22f47b-5627-3b6b-b110-b1c7b65ec51f/76ca2474-f18f-39e7-9a11-21f5981685d6"],
    "description": "blubb",
    "topic_id": "b8c98f3e-bb7c-39e7-a3ce-e479c7892882",
    "video_id": "62a69684-d4f0-3cbe-9016-58d1bf67b42a",
    "script_id": "3d6cf4b2-37e1-3d38-9251-3636bab8bb9e",
    "children": ["834e4592-5a04-32ed-8b44-6c5d2d187c55"]
  }, {
    "id": "921f23fb-de2a-32cf-855b-8d57ac12f7d1",
    "level": 3,
    "paths": ["/98bf99f7-3fed-3fd0-b43e-0b0f376b3607/a9a0ad45-2d48-3f7b-bb7e-93340887a3ed/6d22f47b-5627-3b6b-b110-b1c7b65ec51f/921f23fb-de2a-32cf-855b-8d57ac12f7d1"],
    "description": "bla",
    "topic_id": "b8c98f3e-bb7c-39e7-a3ce-e479c7892882",
    "video_id": "62a69684-d4f0-3cbe-9016-58d1bf67b42a",
    "script_id": "3d6cf4b2-37e1-3d38-9251-3636bab8bb9e",
    "children": ["834e4592-5a04-32ed-8b44-6c5d2d187c55"]
  }, {
    "id": "834e4592-5a04-32ed-8b44-6c5d2d187c55",
    "level": 4,
    "paths": ["/98bf99f7-3fed-3fd0-b43e-0b0f376b3607/a9a0ad45-2d48-3f7b-bb7e-93340887a3ed/6d22f47b-5627-3b6b-b110-b1c7b65ec51f/76ca2474-f18f-39e7-9a11-21f5981685d6/834e4592-5a04-32ed-8b44-6c5d2d187c55", "/98bf99f7-3fed-3fd0-b43e-0b0f376b3607/a9a0ad45-2d48-3f7b-bb7e-93340887a3ed/6d22f47b-5627-3b6b-b110-b1c7b65ec51f/921f23fb-de2a-32cf-855b-8d57ac12f7d1/834e4592-5a04-32ed-8b44-6c5d2d187c55"],
    "description": "bazz",
    "topic_id": "b8c98f3e-bb7c-39e7-a3ce-e479c7892882",
    "video_id": "62a69684-d4f0-3cbe-9016-58d1bf67b42a",
    "script_id": "3d6cf4b2-37e1-3d38-9251-3636bab8bb9e",
    "children": [null]
  }]`)
  /**
   * Basismodel der Daten für dieses Projekt
   */
  export class BaseModel {
    id: string
    //
    constructor(object: any) {
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }
  }

  /**
   * Die Topics, also Vorlesungen der Interactive Lecture
   */
  export class Topic extends models.BaseModel {
    name: string
    description: string
    // Größer 0 keine komma
    version: number
    module: Module[]
    authorities: authority[]
  }

  export class authority {
    user_id: string
    topic_id: string
    kind: string
  }
  /**
   * Die Module, also Themen der Interactive Lecture
   */
  export class Module extends models.BaseModel {
    topic_id: string
    video_id: string
    script_id: string
    description: string
    // Größer 0 keine komma
    version: number
    exercises: Exercise[]
  }

  /**
   * Die Exercises, also Übungen der Interactive Lecture
   */
  export class Exercise extends models.BaseModel {
    module_id: string
    backend: string
    version: number
    task: string[]
  }

  /**
   * Task des Interactive Lecture
   */
  export class Task extends models.BaseModel {
    exercise_id: string
    // Gleich der Arrayposition
    position: number
    content: string
    // Id's der Hinweise
    hints: string[]
  }

  /**
   * Die Hints, also Hinweise der Interactive Lecture
   */
  export class Hint extends models.BaseModel {
    task_id: string
    content: string
    position: number
    // Int
    cost: number
  }

  /**
   * Definiert alles was History Klassen gemeinsam haben
   */
  export class BaseHistoryEntry {
    user_id: string
    amount: number
    time: Date
    state: string
  }

  /**
   * Angefangen und Abgeschlossene Module
   */
  export class ModuleProgressHistoryEntry extends models.BaseHistoryEntry {
    module_id: string
  }

  /**
   * Angefangen und Abgeschlossene Exercises
   */
  export class ExerciseProgressHistoryEntry extends models.BaseHistoryEntry {
    exercise_id: string
  }

  /**
   * Welche Hints hat der User benutzt
   */
  export class HintPurchaseHistoryEntry {
    user_id: string
    amount: number
    time: Date
  }

  /**
   * Zeigt die Kredits zum Kauf der Hints an
   */
  export class TopicBalance {
    user_id: string
    topic_id: string
    amount: number
  }


  /**
   * Die Profile, also Nutzerprofile der Interactive Lecture
   */
  export class User extends models.BaseModel {
    username: string
  }

  /**
   * Report für die Exercises zu korrigieren
   */
  export class CompilationReport {
    date: Date
    errors: CompilationDiagnostic[]
    warnings: CompilationDiagnostic[]

    /**
     * Prüft ob Fehler vorhanden sind
     * @return {boolean} [true = Fehler]
     */
    hasErrors(): boolean {
      return this.errors.length > 0
    }

    /**
     * Prüft ob Warrnungen vorhanden sind
     * @return {boolean} [true = Warnung]
     */
    hasWarnings(): boolean {
      return this.warnings.length > 0
    }
  }

  /**
   * Ergebnisse der Exercise des Users nach einer Kontrolle des Backends
   */
  export class CompilationDiagnostic {
    classname: string
    code: string
    colNumber: number
    endPosition: number
    startPosition: number
    lineNumber: number
    message: string
    position: number
    noPosition: boolean
  }

  /**
   * Momentaner Stand des Server für den User
   */
  export class SourceContainer {
    userId: string
    taskId: string
    // Key Klassenname, Value SourceCode
    // Wenn leer = Exercise nicht begonnen
    map: any
    submissionDate: Date
    compilationReport: CompilationReport
  }

  /**
   * Junit TestReport
   */
  export class TestReport {
    allPassed: boolean
    testResults: TestResult[]
  }

  /**
   * Junit Result
   */
  export class TestResult {
    successful: boolean
    Failures: Failure[]
  }

  /**
   * Fehler im TestResult
   */
  export class Failure {
    message: string
    className: string
    methodName: string
  }

  /**
   * Der LecturePatch stellt die JsonPatches dar die zwischen Backend und Frontend verschickt werden
   */
  export class LecturePatch {

    version: number
    operations: Operation[]
    // TODO: Trash nicht per HTTP mitschicken.
    trash: Operation[]

    constructor() {
      this.operations = new Array()
    }

    /**
     * Delete Transaktion darstellen per JsonPatch
     * @param  {string} path [Pfad im ModuleTree]
     */
    deleteOperation(path: string) {
      this.operations.push(new Operation(OperationsType[OperationsType.REMOVE], path, null, null))
      this.trash = new Array()
    }

    /**
     * Add Transaktion darstellen per JsonPatch
     * @param  {string} path  [Pfad im ModuleTree]
     * @param  {string} value [Wert der in der angegebenen Stelle hinzugefügt werdenn soll]
     */
    addOperation(path: string, value: any) {
      this.operations.push(new Operation(OperationsType[OperationsType.ADD], path, null, value))
      this.trash = new Array()
    }

    /**
     * Replace Transaktion darstellen per JsonPatch
     * @param  {string} path  [Pfad im ModuleTree]
     * @param  {string} value [Wert der eingefügt wird]
     */
    replaceOperation(path: string, value: any) {
      this.operations.push(new Operation(OperationsType[OperationsType.REPLACE], path, null, value))
      this.trash = new Array()
    }

    /**
     * Move Transaktion darstellen per JsonPatch
     * @param  {string} from [Von welchem Pfad wird bewegt?]
     * @param  {string} path [Wohin wird bewegt?]
     */
    moveOperation(from: string, path: string) {
      this.operations.push(new Operation(OperationsType[OperationsType.MOVE], path, from, null))
      this.trash = new Array()
    }

    /**
     * Eine zurückgenommene Aktion wieder einfügen
     */
    redo() {
      // TODO: Rückmeldung über das Ergebnis vielleicht sinnvoll
      if (this.trash !== undefined) {
        if (this.trash[0] !== undefined) {
          this.operations.push(this.trash.pop())
        }
      }
    }

    /**
     * Eine Operation des Patches rückgängig machen
     */
    undo() {
      if (this.operations[0] !== undefined) {
        this.trash.push(this.operations.pop())
      }
    }

  }

  /**
   * Operationen die ein JsonPatch durchführen kann
   */
  export enum OperationsType {
    ADD,
    REMOVE,
    COPY,
    REPLACE,
    MOVE,
    TEST
  }

  /**
   * Operationen des JsonPatch als JavaScript Objekt
   */
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
