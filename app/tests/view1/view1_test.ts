/// <reference path="../../ts/global.d.ts" />

'use strict';

describe('starterApp.view1 module', function() {

  beforeEach(angular.mock.module('starterApp.view1'));

  describe('view1 controller', function(){

    it('should ....', inject(function($rootScope: ng.IRootScopeService, $controller: ng.IControllerService) {
      var scope = $rootScope.$new();
      var view1Ctrl = $controller('View1Ctrl', {$scope: scope});
      expect(view1Ctrl).toBeDefined();
    }));

  });
});