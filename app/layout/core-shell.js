(function(angular){

	"use strict";

	/**
	* @memberOf lsLenderApp
	* @param {Service} $scope glue between view and controller
	* 
	* @description ... (mean non-terminal in angular) it should continue to match routes in child components
	*/

	/* @ngInject */
	function shellComponentCtrl($scope, $rootScope, $rootRouter, $timeout){
		var vm = this;

		vm.heading        = 'Shell successfully launched';
		vm.hideNav        = true;
		vm.selectedMenu   = null;
		vm.showLoadingBar = false;

		/*/* Toggle top nav based if login page or not */
		$scope.$on('hideNavFlag', function(event, data){
			vm.hideNav = data;
			//console.log('hideNavFlag fired ' + vm.hideNav);
		});

		 // Highlight current menu item on view 
		$scope.$on('setActiveMenu', function(event, data){
			vm.selectedMenu = data;
		});
		
		/* Actiavte loading bar on view */
		$scope.$on('setLoadingBar', function(event, data){
			vm.showLoadingBar = data;
		});

		//console.log(vm.$router);

		/* To callback after dom loadded */
		$timeout(function () {
		},0);

	}

	angular.module('lsLenderApp')
		.component('shellComp', {
			templateUrl: 'app/layout/core-shell.html',
			controller: shellComponentCtrl,
			controllerAs: 'shellCtrl',
			// bindings: {$router: '<'}, // need to only use with child components
			$routeConfig: [
      			// {path: '/',    redirectTo: ['Login']},
				// {path: '/', name: 'Login', component: 'loginComponent', useAsDefault: true}
				{path: '/', name: 'Login', component: 'loginComponent'}
			]
		});

})(window.angular);