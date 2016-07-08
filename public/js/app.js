angular.module('restaurantPOS', ['ui.router', 'ui.materialize'])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
			function($stateProvider, $urlRouterProvider, $locationProvider) {
				$stateProvider
					.state('home', {
						url: '/',
						templateUrl:'/views/landingpage.html',
						controller: 'MainCtrl'
					})
					.state('search', {
						url: '/search',
						templateUrl: '/views/search.html',
						controller: 'MainCtrl'
					})
					.state('jobs', {
						url: '/jobs',
						templateUrl: '/views/jobs.html',
						params: {
							jobs: null
						},
						controller: 'JobsCtrl'
					})
					.state('careers', {
						url: '/careers',
						templateUrl: '/views/careers.html',
						params: {
							careers: null
						},
						controller: 'CareersCtrl'
					})
					.state('companies', {
						url: '/companies',
						templateUrl: '/views/companies.html',
						params: {
							companies: null
						},
						controller: 'CompaniesCtrl'
					})
					.state('login', {
						url: '/login',
						templateUrl: '/views/login.html',
						controller: 'MainCtrl'
					})
					.state('register', {
						url: '/register',
						templateUrl: '/views/register.html',
						controller: 'MainCtrl'
					})
					.state('profile', {
						url: '/profile',
						views: {
							'': {
								templateUrl: '/views/profile.html',
								controller: 'ProfileCtrl'
							},
							'myjobs@profile': {
								templateUrl: '/views/myjobs.html',
								controller: 'MyJobsCtrl'
							}
						}
					})
					.state('jobdetails', {
						url: '/jobdetails',
						templateUrl: '/views/jobdetails.html',
						params: {
							details: null
						},
						controller: 'JobDetailCtrl'
					})
					.state('logout', {
						url: '/logout',
						controller: function($window, $state) {
							// User.logout();
							$state.go('logout');
							$window.location.reload();
						}
					})
				$locationProvider.html5Mode(true);
	}])