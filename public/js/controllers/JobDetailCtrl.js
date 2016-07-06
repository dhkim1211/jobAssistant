angular.module('restaurantPOS')
.controller('JobDetailCtrl', ['$scope', '$http', '$location', '$rootScope', '$state', '$stateParams',
	function($scope, $http, $location, $rootScope, $state, $stateParams) {
		$scope.detail = $stateParams.details;

		$scope.statuses = [
			'Interested',
			'Applied',
			'Interviewing',
			'Job Offered',
			'Not Interested'
		]

		$scope.status = $scope.detail.status;

		$scope.contact = '';
		$scope.comment = '';

		var currentTime = new Date();
		$scope.currentTime = currentTime;
		$scope.month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		$scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		$scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		$scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
		$scope.disable = [false, 1, 7];
		$scope.today = 'Today';
		$scope.clear = 'Clear';
		$scope.close = 'Close';
		$scope.onStart = function () {
		    console.log('onStart');
		};
		$scope.onRender = function () {
		    console.log('onRender');
		};
		$scope.onOpen = function () {
		    console.log('onOpen');
		};
		$scope.onClose = function () {
		    console.log('onClose');
			// $http({
			// 	url: '/v1/jobs/setdate',
			// 	method: 'PUT',
			// 	data: {
			// 		duedate: $scope.currentTime,
			// 		id: $scope.detail._id
			// 	}
			// }).success(function(data) {
			// 	event.preventDefault();
			// 	$state.go('profile');
			// })
		};
		$scope.onSet = function () {
		    console.log('onSet');
		};
		$scope.onStop = function () {
		    console.log('onStop');
		};
}]);