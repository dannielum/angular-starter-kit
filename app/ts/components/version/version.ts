/// <reference path="../../global.d.ts" />

module starter {
    'use strict';

    angular.module('starterApp.version', [])
        .value('version', '0.1')
        .filter('interpolate', ['version', InterpolateFilter.Factory])
        .directive('appVersion', ['version', (version: string) => new AppVersionDirective(version)]);
}
