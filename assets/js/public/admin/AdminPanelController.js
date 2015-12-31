var adminController = angular.module('app.AdminPanelController',['ngRoute','ui.bootstrap']);
function AdminPanelController($scope,$routeParams, VehicleListingServices){
	VehicleListingServices.getVehicles().success(function(response){
		$scope.vehicles = response.rows;
	});

	$scope.myInterval = 5000;
  $scope.noWrapSlides = false;
}
AdminPanelController.$inject = ['$scope','$routeParams','VehicleListingServices'];

adminController.controller('AdminPanelController', AdminPanelController);

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
				templateUrl: 'templates/table.html'
			})
	}]);