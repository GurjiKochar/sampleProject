angular.module('app',['ngRoute',
	'app.vehicleController',
	'app.vehicleServices']
	).config(['$routeProvider', function($routeProvider){
		$routeProvider
			.when('/',{
				templateUrl: 'templates/home.html'
			})
			.when('/used-trucks/:city?/:brand?/:modal?',{
				templateUrl: 'templates/vehicleListing.html',
				controller: 'VehicleListingController as listingController'
			})
			.when('/sell-vehicle', {
				templateUrl: 'templates/sellVehicle.html',
				controller: 'SellVehicleController'
			})
	}]);