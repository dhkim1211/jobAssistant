angular.module('restaurantPOS')
.controller('JobDetailCtrl', ['$scope', '$http', '$location', '$rootScope', '$state', '$stateParams',
	function($scope, $http, $location, $rootScope, $state, $stateParams) {
		$scope.detail = $stateParams.details;

		$scope.formData = {status: '', duedate: '', contact: '', comment: ''};

		$scope.statuses = [
			{name: 'Interested', value: 'Interested'},
			{name: 'Applied', value: 'Applied'},
			{name: 'Interviewing', value: 'Interviewing'},
			{name: 'Job Offered', value: 'Job Offered'},
			{name: 'Not Interested', value: 'Not Interested'}
		]

		$scope.status = $scope.detail.status;

		if ($scope.detail.contact) {
			$scope.contact = $scope.detail.contact;
		} else {
			$scope.contact = '';
		}
		
		if ($scope.detail.comment) {
			$scope.comment = $scope.detail.comment;
		} else {
			$scope.comment = '';
		}

		var currentTime;

		if ($scope.detail.duedate === null) {
			currentTime = new Date();
		} else {
			currentTime = $scope.detail.duedate;
		}
		
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
		    console.log($scope.formData.duedate);

		};
		$scope.onSet = function () {
		    console.log('onSet');
		    console.log($scope.currentTime);
		};
		$scope.onStop = function () {
		    console.log('onStop');
		};

		$scope.updateJobInfo = function() {
			$http({
				url: '/v1/jobs/updatejob/'+ $scope.detail._id,
				method: 'PUT',
				data: {
					status: $scope.formData.status.name,
					duedate: $scope.formData.duedate,
					contact: $scope.formData.contact,
					comment: $scope.formData.comment,
					id: $scope.detail._id
				}
			}).success(function(data) {
				event.preventDefault();
				$state.go('profile');
				console.log(data);
				console.log($scope.formData.status);
				console.log($scope.formData.contact);
				console.log($scope.formData.comment);				
			})
		}

		$scope.message = "Updated!";
}]);







