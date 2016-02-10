/// <reference path="../global.d.ts" />

module starter {
	'use strict';
	
	export interface IView2CtrlScope extends ng.IScope {
	}

	export class View2Ctrl {
		public static $inject = [
			'$scope'
		];

		constructor(
			private $scope: IView2CtrlScope
		) {
		}
	}
}
