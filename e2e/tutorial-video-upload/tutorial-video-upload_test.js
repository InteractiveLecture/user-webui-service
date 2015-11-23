/* global describe, beforeEach, it, browser, expect */
'use strict';

var TutorialVideoUploadPagePo = require('./tutorial-video-upload.po');

describe('Tutorial video upload page', function () {
  var tutorialVideoUploadPage;

  beforeEach(function () {
    tutorialVideoUploadPage = new TutorialVideoUploadPagePo();
    browser.get('/#/tutorial-video-upload');
  });

  it('should say TutorialVideoUploadCtrl', function () {
    expect(tutorialVideoUploadPage.heading.getText()).toEqual('tutorialVideoUpload');
    expect(tutorialVideoUploadPage.text.getText()).toEqual('TutorialVideoUploadCtrl');
  });
});
