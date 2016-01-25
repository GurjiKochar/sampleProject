angular.module('app',['ui.router',
	'app.AdminPanelController',
	'app.vehicleController',
	'app.vehicleServices',
	'app.UserDashboardController']
	).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
		
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home',{
				url: '/',
				templateUrl: 'templates/home.html'
			})
			.state('results',{
				url: '/used-trucks/:city?/:brand?/:modal?',
				templateUrl: 'templates/vehicleListing.html',
				controller: 'VehicleListingController as listingController'
			})
			.state('adminPanel',{
				url: '/admin-panel',
				templateUrl: 'templates/adminPanel.html',
				controller: 'AdminPanelController as adminController'
			})
			.state('sellVehicle', {
				url: '/sell-vehicle',
				templateUrl: 'templates/sellVehicle.html',
				controller: 'SellVehicleController'
			})
			.state('userDashboard', {
				url: '/my-dashboard',
				templateUrl: 'templates/userDashboard.html',
				controller: 'UserDashboardController'
			})
			.state('product',{
				url: '/used-truck/:slug',
				templateUrl: 'templates/vehicleDetail.html',
				controller: 'VehicleDetailController'
			})
	}]);
