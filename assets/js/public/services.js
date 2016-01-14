var vehicleServices = angular.module('app.vehicleServices',[]);	

function VehicleListingServices($http) {
	var listingApi = {},
		url = '';
	listingApi.getVehicles = function(queryString) {
		url = '/api/vehicle/search';
		if(queryString)
			url += '?' + queryString;
		return $http({
			url: '/api/vehicle/search?' + queryString
		});
	}
	listingApi.getVehicle = function(id) {
		return $http({
			url: '/api/vehicle/search/' + id
		});
	}
	return listingApi;
}
VehicleListingServices.$inject = ['$http'];

vehicleServices.factory('VehicleListingServices', VehicleListingServices);
