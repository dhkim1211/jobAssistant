angular.module('restaurantPOS')
.controller('MyJobsCtrl', ['$scope', '$http', '$location', '$rootScope', '$state',
	function($scope, $http, $location, $rootScope, $state) {

		//GET SAVED JOBS
		$http.get('/v1/jobs').then(function(data) {
			$scope.myjobs = data;
		}) 
		
		$scope.newTab = function(url) {
			$window.open(url, '_blank');
		}
}]);