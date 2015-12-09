angular.module('HomepageModule').controller('HomepageController', ['$scope', '$http', 'toastr','$uibModal', function($scope, $http, toastr,$uibModal){

	$scope.items = ['item1', 'item2', 'item3'];

	$scope.animationsEnabled = true;
	
	$scope.openSignup = function (size) {

    var signupModalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });


    signupModalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };



  $scope.openLogin = function (size) {
    var loginModalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'loginModalContent',
      controller: 'loginModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });


    loginModalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

}]);


angular.module('HomepageModule').controller('ModalInstanceCtrl', ['$scope','$http', '$uibModalInstance', 'items', function($scope, $http, $uibModalInstance, items) {

	$scope.items = items;
	$scope.selected = {
		item: $scope.items[0]
	};
	$scope.signupForm = {
		loading: false
	}

	$scope.submitSignupForm = function(){

		// Set the loading state (i.e. show loading spinner)
		$scope.signupForm.loading = true;

		// Submit request to Sails.
		$http.post('/signup', {
			name: $scope.signupForm.name,
			mobileNumber: $scope.signupForm.mobileNumber,
			email: $scope.signupForm.email,
			password: $scope.signupForm.password
		})
		.then(function onSuccess(sailsResponse){
			window.location = '/';
		})
		.catch(function onError(sailsResponse){

		// Handle known error type(s).
		// If using sails-disk adpater -- Handle Duplicate Key
		var emailAddressAlreadyInUse = sailsResponse.status == 409;

		if (emailAddressAlreadyInUse) {
			toastr.error('That email address has already been taken, please try again.', 'Error');
			return;
		}

		})
		.finally(function eitherWay(){
			$scope.signupForm.loading = false;
		})
	}

}]);



angular.module('HomepageModule').controller('loginModalInstanceCtrl', ['$scope','$http', '$uibModalInstance', 'items', function($scope, $http, $uibModalInstance, items) {

	$scope.items = items;
	$scope.selected = {
		item: $scope.items[0]
	};
	$scope.loginForm = {
		loading: false
	}
	$scope.status = {
	    isopen: false
	  };

	  $scope.toggled = function(open) {
	    $log.log('Dropdown is now: ', open);
	  };

	  $scope.toggleDropdown = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();
	    $scope.status.isopen = !$scope.status.isopen;
	  };
	 $scope.submitLoginForm = function(){

		// Set the loading state (i.e. show loading spinner)
		$scope.loginForm.loading = true;

		// Submit request to Sails.
		$http.post('/login', {
			email: $scope.loginForm.email,
			password: $scope.loginForm.password
		})
		.then(function onSuccess(sailsResponse){
			window.location = '/';
		})
		.catch(function onError(sailsResponse){

		// Handle known error type(s).
		// If using sails-disk adpater -- Handle Duplicate Key
		if (sailsResponse.status === 400 || 404) {
        // $scope.loginForm.topLevelErrorMessage = 'Invalid email/password combination.';
        //
	        toastr.error('Invalid email/password combination.', 'Error', {
	          closeButton: true
	        });
	        return;
        }

			toastr.error('An unexpected error occurred, please try again.', 'Error', {
				closeButton: true
			});
			return;
		})
		.finally(function eitherWay(){
			$scope.loginForm.loading = false;
		})
	}

}]);