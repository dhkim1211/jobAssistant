angular.module('restaurantPOS', ['ui.router'])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
			function($stateProvider, $urlRouterProvider, $locationProvider) {
				$stateProvider
					.state('home', {
						url: '/',
						templateUrl:'/views/landingpage.html',
						controller: 'MainCtrl'
					})
				$locationProvider.html5Mode(true);
	}])