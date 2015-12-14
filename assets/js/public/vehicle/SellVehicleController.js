angular.module('SellVehicleModule').controller('SellVehicleController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){
	// set-up loading state
	$scope.sellVehicleForm = {
		loading: false
	}

	$http({
	  method: 'GET',
	  url: '/api/manufacturer/all'
	}).then(function successCallback(response) {
	    // this callback will be called asynchronously
	    // when the response is available

	    console.log(response);
	    $scope.sellVehicleForm.manufacturer = response.data;
	  }, function errorCallback(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	    console.log(response);
	  });


	$http({
	  method: 'GET',
	  url: '/api/bodytype/all'
	}).then(function successCallback(response) {
	    // this callback will be called asynchronously
	    // when the response is available

	    console.log(response);
	    $scope.sellVehicleForm.bodyType = response.data;
	  }, function errorCallback(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	    console.log(response);
	  });

	
	$http({
	  method: 'GET',
	  url: '/api/cities/all'
	}).then(function successCallback(response) {
	    // this callback will be called asynchronously
	    // when the response is available

	    console.log(response);
	    $scope.sellVehicleForm.city = response.data;
	  }, function errorCallback(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	    console.log(response);
	  });

	$scope.unitChanged = function () {
		var man_id = $scope.sellVehicleForm.manufacturerId;
		if (man_id != "") {
			$http({
			  method: 'GET',
			  url: '/api/manufacturer/modelnames/'+man_id
			}).then(function successCallback(response) {
			    // this callback will be called asynchronously
			    // when the response is available

			    console.log(response);
			    $scope.sellVehicleForm.modelnames = response.data;
			  }, function errorCallback(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			    console.log(response);
			  });
		}
		
	}

	$scope.submitSellVehicleForm = function(){

		// Set the loading state (i.e. show loading spinner)
		$scope.sellVehicleForm.loading = true;

		// Submit request to Sails.
		$http.post('/vehicle', {
			manufacturerId: $scope.sellVehicleForm.manufacturerId,
			model: $scope.sellVehicleForm.model,
			bodyTypeId: $scope.sellVehicleForm.bodyTypeId,
			minPrice: $scope.sellVehicleForm.minPrice,
			maxPrice : $scope.sellVehicleForm.maxPrice,
			yearOfManufacture : $scope.sellVehicleForm.yearOfManufacture,
			cityId : $scope.sellVehicleForm.cityId,
			uploadFile : $scope.file
		})
		.then(function onSuccess(sailsResponse){
			window.location = '/';
		})
		.catch(function onError(sailsResponse){

		// Handle known error type(s).
		// If using sails-disk adpater -- Handle Duplicate Key
		console.log(sailsResponse);
		var emailAddressAlreadyInUse = sailsResponse.status == 409;

		if (emailAddressAlreadyInUse) {
			toastr.error('That email address has already been taken, please try again.', 'Error');
			return;
		}

		})
		.finally(function eitherWay(){
			$scope.sellVehicleForm.loading = false;
		})
	}

}]).directive('file', function () {
	    return {
	        scope: {
	            file: '='
	        },
	        link: function (scope, el, attrs) {
	            el.bind('change', function (event) {
	                var file = event.target.files[0];
	                scope.file = file ? file : undefined;
	                scope.$apply();
	            });
	        }
	    };
	});;