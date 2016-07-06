angular.module('restaurantPOS')
.controller('MyJobsCtrl', ['$scope', '$http', '$location', '$rootScope', '$state', '$window',
	function($scope, $http, $location, $rootScope, $state, $window) {

		//GET SAVED JOBS
		$http.get('/v1/jobs').then(function(data) {
			$scope.myjobs = data;
		}) 

		$scope.newTab = function(url) {
			$window.open(url, '_blank');
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
				$scope.companies = data;
				$state.go('companies', {companies: data});
				console.log(data)
			})
		}

		$scope.getDetails = function(a) {
			$http({
				url: '/v1/jobs/details',
				method: 'GET',
				params: {
					id: a
				}
			}).success(function(data) {
				event.preventDefault();
				$state.go('jobdetails', {details: data});
				console.log(data)
			})
		}

}]);