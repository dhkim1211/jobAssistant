angular.module('restaurantPOS', ['ui.router'])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
			function($stateProvider, $urlRouterProvider, $locationProvider) {
				$stateProvider
					.state('home', {
						url: '/',
						templateUrl:'/views/landingpage.html',
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
				$locationProvider.html5Mode(true);
	}])