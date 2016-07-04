angular.module('restaurantPOS')
.controller('CompaniesCtrl', ['$scope', '$http', '$location', '$rootScope', '$state',
	function($scope, $http, $location, $rootScope, $state) {
		$scope.companies = $state.params.companies;

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
				$state.go('jobs', {jobs: data});
				
				console.log(data);
			})
		}
}]);