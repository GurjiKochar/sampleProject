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
	return listingApi;
}
VehicleListingServices.$inject = ['$http'];

vehicleServices.factory('VehicleListingServices', VehicleListingServices);