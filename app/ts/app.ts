/// <reference path="global.d.ts" />

module starter {
    'use strict';

    angular.module('starterApp', ['ngRoute', 'starterApp.view1', 'starterApp.view2', 'starterApp.version'])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) {
            // $locationProvider.html5Mode(true); 
            
            $routeProvider.otherwise({redirectTo: '/view1'});
        }]);
}
