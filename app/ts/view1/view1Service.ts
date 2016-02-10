/// <reference path="../global.d.ts" />

module starter {
	'use strict';
    
    export interface IView1Service {
        cache: ng.ICacheObject;
		getItemById (id: number): ng.IPromise<any>;
		serviceResource: ng.resource.IResourceClass<any>;
	}

    export class View1Service implements IView1Service {

		public static $inject = [
			'$resource',
            '$q',
            '$cacheFactory'
		];
        
		constructor ( 
			private $resource: ng.resource.IResourceService,
            private $q: ng.IQService,
            private $cacheFactory: ng.ICacheFactoryService,
            private global_vars: IGlobalVars
		) {
            this.cache = this.$cacheFactory('View1Service');
		}
        
        cache: ng.ICacheObject;
        
        serviceResource = this.$resource('<some_api_path>' + '/item/:id', {
            id: '@id'
        }, { 
            'get': {
                method: 'GET'
            }
        });
		
        getItemById (id: number): ng.IPromise<any> {
            var cacheKey = 'getItemById_' + id;
            var result = this.cache.get(cacheKey);
            var deferred = this.$q.defer();
            if (!angular.isUndefined(result)) {
                deferred.resolve(result);
            }
            else {
                this.serviceResource.get({ 
                    'id': id
                }, (res) => {
                    this.cache.put(cacheKey, res);
                    deferred.resolve(res);
                }, function (err) {
                    deferred.reject(err);
                });
            }
            return deferred.promise;
        }
    }
}
