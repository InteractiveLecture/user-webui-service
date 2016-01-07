/* global describe, beforeEach, it, browser, expect */
'use strict';

var VideoPagePo = require('./video.po');

describe('Video page', function () {
  var videoPage;

  beforeEach(function () {
    videoPage = new VideoPagePo();
    browser.get('/#/video');
  });

  it('should say VideoCtrl', function () {
    expect(videoPage.heading.getText()).toEqual('video');
    expect(videoPage.text.getText()).toEqual('VideoCtrl');
  });
});
