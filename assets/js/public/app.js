angular.module('app',['ngRoute',
	'app.VehicleListingController',
	'app.vehicleServices']
	).config(['$routeProvider', function($routeProvider){
		$routeProvider
			.when('/',{
				templateUrl: 'js/public/homepage/home.html'
			})
			.when('/used-trucks/:city/:brand/:modal',{
				templateUrl: 'js/public/homepage/home.html',
				controller: 'VehicleListingController as listingController'
			})
	}]);