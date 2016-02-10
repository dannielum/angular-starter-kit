/// <reference path="../../ts/global.d.ts" />

'use strict';

describe('starterApp.version module', function() {
  beforeEach(angular.mock.module('starterApp.version'));

  describe('interpolate filter', function() {
    beforeEach(angular.mock.module(function($provide) {
      $provide.value('version', 'TEST_VER');
    }));

    it('should replace VERSION', inject(function(interpolateFilter) {
      expect(interpolateFilter('before %VERSION% after')).toEqual('before TEST_VER after');
    }));
  });
});
