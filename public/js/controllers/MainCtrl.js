angular.module('restaurantPOS')
.controller('MainCtrl', ['$scope', '$http', '$location', '$rootScope', '$state', '$window',
	function($scope, $http, $location, $rootScope, $state, $window) {
		$scope.formData = {keyword:'', location:'', country:''};
		$scope.views = 'search';

		$scope.newTab = function(url) {
			$window.open(url, '_blank');
		}
		
		//GET JOB SEARCH RESULTS
		$scope.submit = function() {
			console.log($scope.formData.country)
			$http({
				url: '/v1/jobsearch',
				method: 'GET',
				params: {
					keyword: $scope.formData.keyword,
					location: $scope.formData.location
				}
			}).success(function(data){
				$scope.views = 'jobs';
				$scope.jobs = data;
				$state.go('jobs', {jobs: data});
				
				console.log(data);
			})
		}
	///}])

		//GET CAREERS SEARCH RESULTS
		$scope.submitProgress = function() {
			$http({
				url: '/v1/jobprogress',
				method: 'GET',
				params: {
					jobtitle: $scope.formData.jobtitle
				}
			}).success(function(data){
				event.preventDefault();
				$scope.views = 'careers';
				$scope.careers = data;
				$state.go('careers', {careers: data})
				
				console.log(data);
			})
		}

		//GET COMPANIES SEARCH RESULTS
		$scope.searchCompany = function() {
			$http({
				url: '/v1/employers',
				method: 'GET',
				params: {
					keyword: $scope.formData.companyname,
					location: $scope.formData.companylocation
				}
			}).success(function(data) {
				event.preventDefault();
				$scope.views = 'companies';
				$scope.companies = data;
				$state.go('companies', {companies: data})
				console.log(data)
			})
		}

		//GET COMPANIES SEARCH FROM PAGE 
		$scope.searchCompanyTwo = function(a, b) {
			$http({
				url: '/v1/employers',
				method: 'GET',
				params: {
					keyword: a,
					location: b
				}
			}).success(function(data) {
				event.preventDefault();
				$scope.views = 'companies';
				$scope.companies = data;
				console.log(data)
			})
		}

		//GET SPECIFIC COMPANY'S JOBS
		$scope.searchCompanyJobs = function(a) {
			$http({
				url: 'v1/jobsearchbyco',
				method: 'GET',
				params: {
					company: a
				}
			}).success(function(data){
				event.preventDefault();
				$scope.views = 'jobs';
				$scope.jobs = data;
				//$state.go('jobs')
				
				console.log(data);
			})
		}
		
		
	}])