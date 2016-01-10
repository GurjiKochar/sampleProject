var vehicleController = angular.module('app.vehicleController',['ngFileUpload']);
function VehicleListingController($scope,$routeParams, VehicleListingServices){
	VehicleListingServices.getVehicles().success(function(response){
		$scope.vehicles = response.rows;
	});
}
VehicleListingController.$inject = ['$scope','$routeParams','VehicleListingServices'];

vehicleController.controller('VehicleListingController', VehicleListingController);


function SellVehicleController($scope, $http, Upload){
	// set-up loading state
	$scope.sellVehicleForm = {
		loading: false
	}

	$http({
	  method: 'GET',
	  url: '/api/manufacturer/all'
	}).then(function successCallback(response) {
	    $scope.sellVehicleForm.manufacturer = response.data;
	  }, function errorCallback(response) {
	});


	$http({
	  method: 'GET',
	  url: '/api/bodytype/all'
	}).then(function successCallback(response) {
	    $scope.sellVehicleForm.bodyType = response.data;
	}, function errorCallback(response) {
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

	$scope.upload = function (files, vehicleId) {
		var url = '/vehicle/' + vehicleId + "/photos";
    if (files ) {
        Upload.upload({url:url, data: {file: files}}).then(function(response){

        }, function(response){

        }, function(evt){

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
		.then(function onSuccess(response){
			if ($scope.sellVehicleForm.photos) {
	      $scope.upload($scope.sellVehicleForm.photos, response.data.id);
	    }
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

}

SellVehicleController.$inject = ['$scope', '$http', 'Upload'];
vehicleController.controller('SellVehicleController', SellVehicleController);
vehicleController.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);