/* global describe, beforeEach, it, browser, expect */
'use strict';

var TopicEditPagePo = require('./topic-edit.po');

describe('Topic edit page', function () {
  var topicEditPage;

  beforeEach(function () {
    topicEditPage = new TopicEditPagePo();
    browser.get('/#/topic-edit');
  });

  it('should say TopicEditCtrl', function () {
    expect(topicEditPage.heading.getText()).toEqual('topicEdit');
    expect(topicEditPage.text.getText()).toEqual('TopicEditCtrl');
  });
});
