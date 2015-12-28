var vehicleController = angular.module('app.VehicleListingController',[]);
function VehicleListingController(VehicleListingServices){
	VehicleListingServices.getVehicles().success(function(response){
		console.log(response);
	});
	console.log('controller created');
}
VehicleListingController.$inject = ['VehicleListingServices'];

vehicleController.controller('VehicleListingController', VehicleListingController);