/* global describe, beforeEach, it, browser, expect */
'use strict';

var ExerciseOverviewPagePo = require('./exercise-overview.po');

describe('Exercise overview page', function () {
  var exerciseOverviewPage;

  beforeEach(function () {
    exerciseOverviewPage = new ExerciseOverviewPagePo();
    browser.get('/#/exercise-overview');
  });

  it('should say ExerciseOverviewCtrl', function () {
    expect(exerciseOverviewPage.heading.getText()).toEqual('exerciseOverview');
    expect(exerciseOverviewPage.text.getText()).toEqual('ExerciseOverviewCtrl');
  });
});
