angular.module('restaurantPOS')
.controller('CareersCtrl', ['$scope', '$http', '$location', '$rootScope', '$state',
	function($scope, $http, $location, $rootScope, $state) {
		$scope.careers = $state.params.careers;

		//GET CAREERS SEARCH RESULTS
		$scope.submitProgressTwo = function(a) {
			$http({
				url: '/v1/jobprogress',
				method: 'GET',
				params: {
					jobtitle: a
				}
			}).success(function(data){
				event.preventDefault();
				$scope.views = 'careers';
				$scope.careers = data;
				$state.go('careers', {careers: data})
				
				console.log(data);
			})
		}

}]);