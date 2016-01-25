var adminController = angular.module('app.AdminPanelController',['ui.router','ui.bootstrap']);
function AdminPanelController($scope,$http,$stateParams, VehicleListingServices){
	

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
AdminPanelController.$inject = ['$scope','$http','$stateParams','VehicleListingServices'];

adminController.controller('AdminPanelController', AdminPanelController);

function QuotesController($scope,$http,$stateParams){
    
  $scope.getQuotes = function(status) {
    var self = this;
    var params = {};
    if ($scope.stateId) {
      params.stateId = $scope.stateId;
    };

    $http({
      method: 'GET',
      url: '/api/vehicle/bid',
      params: params
    }).then(function successCallback(response) {

      $scope.allQuotes = response.data.rows;

      $scope.acceptedQuotes = $scope.allQuotes.filter(function(quote) {
        return quote.action == "accepted";
      });

      $scope.rejectedQuotes = $scope.allQuotes.filter(function(quote) {
        return quote.action == "rejected";
      });

      $scope.pendingQuotes = $scope.allQuotes.filter(function(quote) {
        return quote.action == "pending";
      });

      $scope.unassignedQuotes = $scope.allQuotes.filter(function(quote) {
        return quote.AssigneeId == null;
      });

      self.changeQuotes(status);

    }, function errorCallback(response) {
        console.log(response);
    });

  };
    


  $http({
    method: 'GET',
    url: '/api/states/all'
  }).then(function successCallback(response) {
      $scope.states = response.data;
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log(response);
  });

  $scope.filter = function(stateId) {
    if(stateId) {
      $http({
        method: 'GET',
        url: '/api/vehicle/bid',
        params: {stateId : stateId}
      }).then(function successCallback(response) {
        $scope.quotes = response.data.rows;
      }, function errorCallback(response) {
          console.log(response);
      });
    }
  }

  $scope.changeQuotes = function(status) {

    if (status) {
        switch (status) {
          case "accepted": $scope.quotes = $scope.acceptedQuotes; break;
          case "rejected": $scope.quotes = $scope.rejectedQuotes; break;
          case "pending": $scope.quotes = $scope.pendingQuotes; break;
          case "unassigned": $scope.quotes = $scope.unassignedQuotes; break;
          case "all" : $scope.quotes = $scope.allQuotes; break;
        }
      }
  }


  $scope.updateAssignee = function(id) {

    var params = {};
      $http({
        method: 'PUT',
        url: '/api/quote/'+id+'/assignee',
        params: params
      }).then(function successCallback(response) {
        console.log(response);
        var data = response.data.rows;
        var filtered = data.filter(function(quote) {
          return quote.AssigneeId == null;
        })
        $scope.quotes = filtered;
      }, function errorCallback(response) {
          console.log(response);
      });
  }
  

}
QuotesController.$inject = ['$scope','$http','$stateParams'];

adminController.controller('QuotesController', QuotesController);


function MyQuotesController($scope,$http,$stateParams){
    
  $scope.getQuotes = function(status) {
    var self = this;
    var params = {};
    if ($scope.stateId) {
      params.stateId = $scope.stateId;
    };

    $http({
      method: 'GET',
      url: '/api/vehicle/bid/assignee',
      params: params
    }).then(function successCallback(response) {

      $scope.allQuotes = response.data.rows;

      $scope.acceptedQuotes = $scope.allQuotes.filter(function(quote) {
        return quote.action == "accepted";
      });

      $scope.rejectedQuotes = $scope.allQuotes.filter(function(quote) {
        return quote.action == "rejected";
      });

      $scope.pendingQuotes = $scope.allQuotes.filter(function(quote) {
        return quote.action == "pending";
      });

      $scope.unassignedQuotes = $scope.allQuotes.filter(function(quote) {
        return quote.AssigneeId == null;
      });

      self.changeQuotes(status);

    }, function errorCallback(response) {
        console.log(response);
    });

  };
    


  $http({
    method: 'GET',
    url: '/api/states/all'
  }).then(function successCallback(response) {
      $scope.states = response.data;
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log(response);
  });

  $scope.filter = function(stateId) {
    if(stateId) {
      $http({
        method: 'GET',
        url: '/api/vehicle/bid/assignee',
        params: {stateId : stateId}
      }).then(function successCallback(response) {
        $scope.quotes = response.data.rows;
      }, function errorCallback(response) {
          console.log(response);
      });
    }
  }

  $scope.changeQuotes = function(status) {

    if (status) {
        switch (status) {
          case "accepted": $scope.quotes = $scope.acceptedQuotes; break;
          case "rejected": $scope.quotes = $scope.rejectedQuotes; break;
          case "pending": $scope.quotes = $scope.pendingQuotes; break;
          case "unassigned": $scope.quotes = $scope.unassignedQuotes; break;
          case "all" : $scope.quotes = $scope.allQuotes; break;
        }
      }
  }

  $scope.updateAction = function(id,status) {

    var params = {action : status};
      $http({
        method: 'PUT',
        url: '/api/quote/'+id,
        params: params
      }).then(function successCallback(response) {
        
      }, function errorCallback(response) {
          console.log(response);
      });
    
  }

}
MyQuotesController.$inject = ['$scope','$http','$stateParams'];

adminController.controller('MyQuotesController', MyQuotesController);

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

  adminController.config(['$stateProvider','$urlRouterProvider', function($stateProvider , $urlRouterProvider){
		$stateProvider
			.state('adminPanel.quotes',{
        url: '/quotes',
				templateUrl: 'templates/quotes.html',
        controller: 'QuotesController'
			})
      .state('adminPanel.myQuotes',{
        url: '/myquotes',
        templateUrl: 'templates/myQuotes.html',
        controller: 'MyQuotesController'
      })
	}]);