///<reference path='..//typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('CallBackend', function () {
  var service: lectureDefinitions.interfaces.ModelService;

  beforeEach(module('interactiveLectureWebFrontend'));

  beforeEach(inject(function (CallBackendService: lectureDefinitions.interfaces.ModelService) {
    this.service = CallBackendService;
  }));

  it('should equal CallBackend', function () {
    expect(this.service.get()).toEqual('CallBackendService');
  });
  it('should transform to Topic', function () {
      this.service.loadModel('herbert', (models: lectureDefinitions.models.BaseModel[])=> {
        expect(models.length).toEqual(4);
        expect(models[0].getUrlFor('self')).toEqual('http://localhost:8080/topics/1');
      });
  });

});
