///<reference path='../../typings/tsd.d.ts' />
module modules {
  'use strict';

  /* @ngdoc object
  * @name modules
  * @description
  *
  */
  angular
    .module('modules', [
      'modules.overview',
      'modules.edit'
    ]);
}
