/* global describe, beforeEach, it, browser, expect */
'use strict';

var TopicOverviewPagePo = require('./topic-overview.po');

describe('Topic overview page', function () {
  var topicOverviewPage;

  beforeEach(function () {
    topicOverviewPage = new TopicOverviewPagePo();
    browser.get('/#/topic-overview');
  });

  it('should say TopicOverviewCtrl', function () {
    expect(topicOverviewPage.heading.getText()).toEqual('topicOverview');
    expect(topicOverviewPage.text.getText()).toEqual('TopicOverviewCtrl');
  });
});
