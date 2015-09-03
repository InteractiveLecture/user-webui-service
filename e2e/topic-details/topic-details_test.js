/* global describe, beforeEach, it, browser, expect */
'use strict';

var TopicDetailsPagePo = require('./topic-details.po');

describe('Topic details page', function () {
  var topicDetailsPage;

  beforeEach(function () {
    topicDetailsPage = new TopicDetailsPagePo();
    browser.get('/#/topic-details');
  });

  it('should say TopicDetailsCtrl', function () {
    expect(topicDetailsPage.heading.getText()).toEqual('topicDetails');
    expect(topicDetailsPage.text.getText()).toEqual('TopicDetailsCtrl');
  });
});
