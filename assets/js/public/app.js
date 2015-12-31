angular.module('app',['ngRoute',
	'app.VehicleListingController',
	'app.AdminPanelController',
	'app.vehicleServices']
	).config(['$routeProvider', function($routeProvider){
		$routeProvider
			.when('/',{
				templateUrl: 'js/public/homepage/home.html'
			})
			.when('/used-trucks/:city/:brand/:modal',{
				templateUrl: 'templates/vehicleListing.html',
				controller: 'VehicleListingController as listingController'
			})
			.when('/admin-panel',{
				templateUrl: 'templates/adminPanel.html',
				controller: 'AdminPanelController as adminController'
			})
	}]);