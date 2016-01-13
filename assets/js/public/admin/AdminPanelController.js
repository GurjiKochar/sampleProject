var adminController = angular.module('app.AdminPanelController',['ngRoute','ui.bootstrap']);
function AdminPanelController($scope,$http,$routeParams, VehicleListingServices){
	

  $http({
    method: 'GET',
    url: '/api/admin/vehicle/search?published=false'
  }).then(function successCallback(response) {
      $scope.vehicles = response.data.rows;
    }, function errorCallback(response) {
  });


	$scope.myInterval = 5000;
  $scope.noWrapSlides = false;

  $scope.publishVehicle = function(vehicleId) {

    $http({
      method: 'PUT',
      url: '/api/admin/vehicle/'+vehicleId,
      data : {isPublished : true}
    }).then(function successCallback(response) {
      $http({
        method: 'GET',
        url: '/api/admin/vehicle/search?published=false'
      }).then(function successCallback(response) {
        $scope.vehicles = response.data.rows;
      }, function errorCallback(response) {
      });
    }, function errorCallback(response) {
    });
  };
}
AdminPanelController.$inject = ['$scope','$http','$routeParams','VehicleListingServices'];

adminController.controller('AdminPanelController', AdminPanelController);

function QuotesController($scope,$http,$routeParams){
  

  $http({
    method: 'GET',
    url: '/api/vehicle/bid'
  }).then(function successCallback(response) {
      $scope.quotes = response.data.rows;
    }, function errorCallback(response) {
  });

}
QuotesController.$inject = ['$scope','$http','$routeParams'];

adminController.controller('QuotesController', QuotesController);

adminController.directive('timeline',['$scope','VehicleListingServices',function($scope,VehicleListingServices) {
    VehicleListingServices.getVehicles().success(function(response){
		var vehicles = response.rows;
	});
	return {
        templateUrl:'templates/directives/timeline/timeline.html',
        restrict: 'E',
        replace: true,
        scope : {
        	vehicles :vehicles
        }
    }
  }]);

  adminController.directive('notifications',function(){
		return {
        templateUrl:'templates/directives/notifications/notifications.html',
        restrict: 'E',
        replace: true,
    	}
	});

  adminController.directive('sidebar',['$location',function () {  
  	return {
      templateUrl:'templates/directives/sidebar/sidebar.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller:function($scope){
        $scope.selectedMenu = 'dashboard';
        $scope.collapseVar = 0;
        $scope.multiCollapseVar = 0;
        
        $scope.check = function(x){
          
          if(x==$scope.collapseVar)
            $scope.collapseVar = 0;
          else
            $scope.collapseVar = x;
        };
        
        $scope.multiCheck = function(y){
          
          if(y==$scope.multiCollapseVar)
            $scope.multiCollapseVar = 0;
          else
            $scope.multiCollapseVar = y;
        };
      }
    }
  }]);


  adminController.directive('sidebarSearch',function() {
    return {
      templateUrl:'templates/directives/sidebar/sidebar-search/sidebar-search.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller:function($scope){
        $scope.selectedMenu = 'home';
      }
    }
  });

  adminController.config(['$routeProvider', function($routeProvider){
		$routeProvider
			.when('/admin-panel/quotes',{
				templateUrl: 'templates/quotes.html',
        controller: 'QuotesController'
			})
	}]);