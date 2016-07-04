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
}]);