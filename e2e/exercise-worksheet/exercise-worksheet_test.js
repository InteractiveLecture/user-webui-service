/* global describe, beforeEach, it, browser, expect */
'use strict';

var ExerciseWorksheetPagePo = require('./exercise-worksheet.po');

describe('Exercise worksheet page', function () {
  var exerciseWorksheetPage;

  beforeEach(function () {
    exerciseWorksheetPage = new ExerciseWorksheetPagePo();
    browser.get('/#/exercise-worksheet');
  });

  it('should say ExerciseWorksheetCtrl', function () {
    expect(exerciseWorksheetPage.heading.getText()).toEqual('exerciseWorksheet');
    expect(exerciseWorksheetPage.text.getText()).toEqual('ExerciseWorksheetCtrl');
  });
});
