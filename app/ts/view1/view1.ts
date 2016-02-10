/// <reference path="../global.d.ts" />

module starter {
    'use strict';

    angular.module('starterApp.view1', ['ngRoute', 'ngResource'])
        .config(['$routeProvider', function ($routeProvider: ng.route.IRouteProvider) {
            $routeProvider.when('/view1', {
                templateUrl: 'partials/view1/view1.html',
                controller: 'View1Ctrl'
            });
        }])
        .service('View1Service', View1Service)
        .controller('View1Ctrl', View1Ctrl);
}
