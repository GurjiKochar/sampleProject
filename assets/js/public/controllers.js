var vehicleController = angular.module('app.vehicleController',['ngFileUpload','ui.bootstrap','jkuri.gallery']);
function VehicleListingController($scope,$routeParams, VehicleListingServices){
	VehicleListingServices.getVehicles().success(function(response){
		$scope.vehicles = response.rows;
	});
}
VehicleListingController.$inject = ['$scope','$routeParams','VehicleListingServices'];

vehicleController.controller('VehicleListingController', VehicleListingController);
//VehicleDetailController

function VehicleDetailController($scope, $routeParams, VehicleListingServices) {
	$scope.product = {};
	var id = $routeParams.slug.split("-")[$routeParams.slug.split("-").length - 1];
	VehicleListingServices.getVehicle(id).success(function(response){
		if(response && response.rows && response.rows[0]){
			var data = response.rows[0];
			$scope.product = data;
			$scope.product.VehiclePhotos = data.VehiclePhotos.map(function(photo){
				return {
					img:photo.url,
					thumb:photo.url,
					url:photo.url
				};
			});
			var tmpArray = [data.yearOfManufacture, data.Manufacturer.name, data.Model.name, data.BodyType.name];
			$scope.display_name =  tmpArray.join(" "); 
		}
		
	})
}
VehicleDetailController.$inject = ['$scope','$routeParams','VehicleListingServices'];

vehicleController.controller('VehicleDetailController', VehicleDetailController);


//SellVehicleController

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
	    $scope.sellVehicleForm.bodyTypes = response.data;
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
		var man_id = $scope.sellVehicleForm.make.id;
		console.log(man_id);
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
    if (files && files.length) {
    		for (var i = 0; i < files.length; i++) {
          Upload.upload({url:url, data: {file: files[i]}}).then(function(response){

	        }, function(response){

	        }, function(evt){

	        });
        }
        
    }
  }

	$scope.submitSellVehicleForm = function(){

		// Set the loading state (i.e. show loading spinner)
		$scope.sellVehicleForm.loading = true;
		
		// Submit request to Sails.
		$http.post('/vehicle', {
			manufacturerId: $scope.sellVehicleForm.make.id,
			manufacturer : $scope.sellVehicleForm.make.name,
			modelId: $scope.sellVehicleForm.model.id,
			model : $scope.sellVehicleForm.model.name,
			bodyTypeId: $scope.sellVehicleForm.bodyType.id,
			bodyType : $scope.sellVehicleForm.bodyType.name,
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