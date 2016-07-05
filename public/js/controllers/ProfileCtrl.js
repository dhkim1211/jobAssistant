angular.module('restaurantPOS')
.controller('ProfileCtrl', ['$scope', '$http', '$location', '$rootScope', '$state',
	function($scope, $http, $location, $rootScope, $state) {

		//GET COMPANIES SEARCH FROM PAGE 
		
			$http({
				url: '/v1/profile',
				method: 'GET'
			}).success(function(data) {
				event.preventDefault();
				
				$scope.profile = data;
				$state.go('profile', {profile: data})
				console.log(data)
			})
		
}]);