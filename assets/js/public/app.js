angular.module('app',['ngRoute','app.VehicleListingController']).config(['$routeProvider', function($routeProvider){
		$routeProvider
			.when('/',{
				templateUrl: 'js/public/homepage/home.html'
			})
			.when('/used-trucks/:city/:brand/:modal',{
				templateUrl: 'results/vehicle.html',
				controller: 'VehicleListingController as listingController'
			})
	}]);