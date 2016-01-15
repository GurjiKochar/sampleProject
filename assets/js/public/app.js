angular.module('app',['ngRoute',
	'app.AdminPanelController',
	'app.vehicleController',
	'app.vehicleServices',
	'app.UserDashboardController']
	).config(['$routeProvider', function($routeProvider){
		$routeProvider
			.when('/',{
				templateUrl: 'templates/home.html'
			})
			.when('/used-trucks/:city?/:brand?/:modal?',{
				templateUrl: 'templates/vehicleListing.html',
				controller: 'VehicleListingController as listingController'
			})
			.when('/admin-panel',{
				templateUrl: 'templates/adminPanel.html',
				controller: 'AdminPanelController as adminController'
			})
			.when('/sell-vehicle', {
				templateUrl: 'templates/sellVehicle.html',
				controller: 'SellVehicleController'
			})
			.when('/my-dashboard', {
				templateUrl: 'templates/userDashboard.html',
				controller: 'UserDashboardController'
			})
			.when('/used-truck/:id',{
				templateUrl: 'templates/vehicleDetail.html',
				controller: 'VehicleDetailController'
			})
	}]);
