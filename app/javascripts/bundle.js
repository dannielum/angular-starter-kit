/// <reference path="../../global.d.ts" />
var starter;
(function (starter) {
    'use strict';
    var InterpolateFilter = (function () {
        function InterpolateFilter() {
        }
        InterpolateFilter.Factory = function (version) {
            return function (text) {
                return String(text).replace(/\%VERSION\%/mg, version);
            };
        };
        return InterpolateFilter;
    }());
    starter.InterpolateFilter = InterpolateFilter;
})(starter || (starter = {}));

/// <reference path="../../global.d.ts" />
var starter;
(function (starter) {
    'use strict';
    var AppVersionDirective = (function () {
        function AppVersionDirective(version) {
            var _this = this;
            this.version = version;
            this.restrict = 'A';
            this.scope = {};
            this.link = function (scope, elem, attrs) {
                elem.text(_this.version);
            };
        }
        AppVersionDirective.$inject = [
            'version'
        ];
        return AppVersionDirective;
    }());
    starter.AppVersionDirective = AppVersionDirective;
})(starter || (starter = {}));

/// <reference path="../../global.d.ts" />
var starter;
(function (starter) {
    'use strict';
    angular.module('starterApp.version', [])
        .value('version', '0.1')
        .filter('interpolate', ['version', starter.InterpolateFilter.Factory])
        .directive('appVersion', ['version', function (version) { return new starter.AppVersionDirective(version); }]);
})(starter || (starter = {}));

/// <reference path="../global.d.ts" />
var starter;
(function (starter) {
    'use strict';
    var View1Ctrl = (function () {
        function View1Ctrl($scope, View1Service) {
            this.$scope = $scope;
            this.View1Service = View1Service;
            View1Service.getItemById(1).then(function (data) {
                $scope.item = data;
            }, function (error) {
                console.log(error);
            });
        }
        View1Ctrl.$inject = [
            '$scope',
            'View1Service'
        ];
        return View1Ctrl;
    }());
    starter.View1Ctrl = View1Ctrl;
})(starter || (starter = {}));

/// <reference path="../global.d.ts" />
var starter;
(function (starter) {
    'use strict';
    var View1Service = (function () {
        function View1Service($resource, $q, $cacheFactory, global_vars) {
            this.$resource = $resource;
            this.$q = $q;
            this.$cacheFactory = $cacheFactory;
            this.global_vars = global_vars;
            this.serviceResource = this.$resource('<some_api_path>' + '/item/:id', {
                id: '@id'
            }, {
                'get': {
                    method: 'GET'
                }
            });
            this.cache = this.$cacheFactory('View1Service');
        }
        View1Service.prototype.getItemById = function (id) {
            var _this = this;
            var cacheKey = 'getItemById_' + id;
            var result = this.cache.get(cacheKey);
            var deferred = this.$q.defer();
            if (!angular.isUndefined(result)) {
                deferred.resolve(result);
            }
            else {
                this.serviceResource.get({
                    'id': id
                }, function (res) {
                    _this.cache.put(cacheKey, res);
                    deferred.resolve(res);
                }, function (err) {
                    deferred.reject(err);
                });
            }
            return deferred.promise;
        };
        View1Service.$inject = [
            '$resource',
            '$q',
            '$cacheFactory'
        ];
        return View1Service;
    }());
    starter.View1Service = View1Service;
})(starter || (starter = {}));

/// <reference path="../global.d.ts" />
var starter;
(function (starter) {
    'use strict';
    angular.module('starterApp.view1', ['ngRoute', 'ngResource'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/view1', {
                templateUrl: 'partials/view1/view1.html',
                controller: 'View1Ctrl'
            });
        }])
        .service('View1Service', starter.View1Service)
        .controller('View1Ctrl', starter.View1Ctrl);
})(starter || (starter = {}));

/// <reference path="../global.d.ts" />
var starter;
(function (starter) {
    'use strict';
    var View2Ctrl = (function () {
        function View2Ctrl($scope) {
            this.$scope = $scope;
        }
        View2Ctrl.$inject = [
            '$scope'
        ];
        return View2Ctrl;
    }());
    starter.View2Ctrl = View2Ctrl;
})(starter || (starter = {}));

/// <reference path="../global.d.ts" />
var starter;
(function (starter) {
    'use strict';
    angular.module('starterApp.view2', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/view2', {
                templateUrl: 'partials/view2/view2.html',
                controller: 'View2Ctrl'
            });
        }])
        .controller('View2Ctrl', starter.View2Ctrl);
})(starter || (starter = {}));

/// <reference path="global.d.ts" />
var starter;
(function (starter) {
    'use strict';
    angular.module('starterApp', ['ngRoute', 'starterApp.view1', 'starterApp.view2', 'starterApp.version'])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            // $locationProvider.html5Mode(true); 
            $routeProvider.otherwise({ redirectTo: '/view1' });
        }]);
})(starter || (starter = {}));

//# sourceMappingURL=maps/main.js.map