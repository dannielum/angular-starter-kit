/// <reference path="../global.d.ts" />

module starter {
	'use strict';
	
	export interface IView1CtrlScope extends ng.IScope {
        item: any;
	}

	export class View1Ctrl {
		public static $inject = [
			'$scope',
			'View1Service'
		];

		constructor(
			private $scope: IView1CtrlScope,
			private View1Service: IView1Service
		) {
            View1Service.getItemById(1).then((data) => {
                $scope.item = data;
            }, (error) => {
                console.log(error);
            });
		}
	}
}
