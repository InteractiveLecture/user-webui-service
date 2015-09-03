/* global describe, beforeEach, it, browser, expect */
'use strict';

var TutorialTextPagePo = require('./tutorial-text.po');

describe('Tutorial text page', function () {
  var tutorialTextPage;

  beforeEach(function () {
    tutorialTextPage = new TutorialTextPagePo();
    browser.get('/#/tutorial-text');
  });

  it('should say TutorialTextCtrl', function () {
    expect(tutorialTextPage.heading.getText()).toEqual('tutorialText');
    expect(tutorialTextPage.text.getText()).toEqual('TutorialTextCtrl');
  });
});
