var userDashboardController = angular.module('app.UserDashboardController',['ngRoute','ui.bootstrap']);

function UserDashboardController($scope,$http,$routeParams){
	

  $http({
    method: 'GET',
    url: '/api/vehicle/user'
  }).then(function successCallback(response) {
      $scope.vehicles = response.data.rows;
  }, function errorCallback(response) {

  });

  $scope.getQuotes = function(id) {
    $http({
      method: 'GET',
      url: '/api/vehicle/bid/'+id
    }).then(function successCallback(response) {
      $scope.quotes = response.data.rows;
      $(".quotes-"+id).show();
    }, function errorCallback(response) {

    });
  }
}
AdminPanelController.$inject = ['$scope','$http','$routeParams'];

userDashboardController.controller('UserDashboardController', UserDashboardController);