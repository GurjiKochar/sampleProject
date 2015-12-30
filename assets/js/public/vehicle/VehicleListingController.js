var vehicleController = angular.module('app.VehicleListingController',[]);
function VehicleListingController($scope,$routeParams, VehicleListingServices){
	VehicleListingServices.getVehicles().success(function(response){
		$scope.vehicles = response.rows;
	});
}
VehicleListingController.$inject = ['$scope','$routeParams','VehicleListingServices'];

vehicleController.controller('VehicleListingController', VehicleListingController);