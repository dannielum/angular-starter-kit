/// <reference path="../../ts/global.d.ts" />

'use strict';

describe('starterApp.view2 module', function() {

  beforeEach(angular.mock.module('starterApp.view2'));

  describe('view2 controller', function(){

    it('should ....', inject(function($rootScope: ng.IRootScopeService, $controller: ng.IControllerService) {
      var scope = $rootScope.$new();
      var view2Ctrl = $controller('View2Ctrl', {$scope: scope});
      expect(view2Ctrl).toBeDefined();
    }));

  });
});