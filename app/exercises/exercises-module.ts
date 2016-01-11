///<reference path='../../typings/tsd.d.ts' />
module exercises {
  'use strict';

  /* @ngdoc object
  * @name exercises
  * @description
  *
  */
  angular
    .module('exercises', [
      'exercises.worksheet',
      'exercises.edit'
    ]);
}
