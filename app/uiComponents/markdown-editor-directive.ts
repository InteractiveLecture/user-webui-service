///<reference path='../../typings/tsd.d.ts' />
module MarkdownEditor {
  'use strict';

  /**
  * @ngdoc directive
  * @name uiComponents.directive:markdownEditor
  * @restrict EA
  * @element
  *
  * @description
  *
  * @example
    <example module="uiComponents">
      <file name="index.html">
        <markdown-editor></markdown-editor>
      </file>
    </example>
  *
  */
  angular
    .module('uiComponents')
    .directive('markdownEditor', markdownEditor);

  function markdownEditor(): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: 'uiComponents/markdown-editor-directive.tpl.html',
      replace: false,
      controllerAs: 'markdownEditor',
      controller: function () {
        var vm = this
        vm.editor = ace.edit("editor")
        vm.editor.setTheme("ace/theme/chrome")
        vm.editor.getSession().setMode("ace/mode/markdown")
        vm.editor.setOptions({
          fontSize: "12pt"
        });
      },
      link: function (scope: ng.IScope, element: JQuery, attrs: any) {
        /*jshint unused:false */
        /*eslint "no-unused-vars": [2, {"args": "none"}]*/
      }
    };
  }
}
