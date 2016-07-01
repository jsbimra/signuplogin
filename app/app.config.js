(function(angular){

	"use strict";

	/**
    * @memberof lsLenderApp
    * @ngdoc value
    * @name value
    * @param {String} $routerRootComponent set default component value 'shellComp' to $routerRootComponent
    */
	angular.module('lsLenderApp').value('$routerRootComponent', 'shellComp');
	
	/*
		.config(['$routeProvider',function($routeProvider) {
			$routeProvider.when('/',{
				template: ''
		});
	*/
	
	angular.module('lsLenderApp').run(function($http) {
		$http.defaults.headers.common = 'application/json';
	});

})(window.angular);