/// <reference path="../global.d.ts" />

module starter {
    'use strict';

    angular.module('starterApp.view2', ['ngRoute'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/view2', {
                templateUrl: 'partials/view2/view2.html',
                controller: 'View2Ctrl'
            });
        }])
        .controller('View2Ctrl', View2Ctrl);
}
