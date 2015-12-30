angular.module('app',['ngRoute',
	'app.VehicleListingController',
	'app.vehicleServices']
	).config(['$routeProvider', function($routeProvider){
		$routeProvider
			.when('/',{
				templateUrl: 'templates/homepage/home.html'
			})
			.when('/used-trucks/:city/:brand/:modal',{
				templateUrl: 'templates/vehicleListing.html',
				controller: 'VehicleListingController as listingController'
			})
	}]);