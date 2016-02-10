/// <reference path="../../global.d.ts" />

module starter {
    'use strict';
	
	export class AppVersionDirective implements ng.IDirective {
		public static $inject = [
			'version'
		];
		
		public restrict: string = 'A';
		public scope = {
		};
		
		constructor (
            private version: string
        ) {
		}
		
		public link: ng.IDirectiveLinkFn = (scope: any, elem: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
            elem.text(this.version);
		}
	}
}
