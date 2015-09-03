/* global describe, beforeEach, it, browser, expect */
'use strict';

var TutorialVideoPagePo = require('./tutorial-video.po');

describe('Tutorial video page', function () {
  var tutorialVideoPage;

  beforeEach(function () {
    tutorialVideoPage = new TutorialVideoPagePo();
    browser.get('/#/tutorial-video');
  });

  it('should say TutorialVideoCtrl', function () {
    expect(tutorialVideoPage.heading.getText()).toEqual('tutorialVideo');
    expect(tutorialVideoPage.text.getText()).toEqual('TutorialVideoCtrl');
  });
});
