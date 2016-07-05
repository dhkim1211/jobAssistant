angular.module('restaurantPOS')
.controller('JobsCtrl', ['$scope', '$http', '$location', '$rootScope', '$state',
	function($scope, $http, $location, $rootScope, $state) {
		$scope.jobs = $state.params.jobs;

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

		$scope.saveJob = function(a, b, c, d, e) {
			$http({
				url: '/v1/jobs',
				method: 'POST',
				data: {
					jobtitle: a,
					company: b,
					location: c,
					description: d,
					url: e
				}
			}).success(function(data) {
				event.preventDefault();
				$state.go('profile');
			})
		}
		
		$scope.newTab = function(url) {
			$window.open(url, '_blank');
		}
}]);