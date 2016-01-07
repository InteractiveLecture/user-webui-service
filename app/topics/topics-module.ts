///<reference path='../../typings/tsd.d.ts' />
module topics {
  'use strict';

  /* @ngdoc object
  * @name topics
  * @description
  *
  */
  angular
    .module('topics', [
      'topics.details',
      'topics.overview',
      'topics.edit'
    ]);
}
