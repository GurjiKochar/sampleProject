var vehicleController = angular.module('app.VehicleListingController',[]);
function VehicleListingController(){
	console.log('controller created');
}
VehicleListingController.$inject = [];

vehicleController.controller('VehicleListingController', VehicleListingController);