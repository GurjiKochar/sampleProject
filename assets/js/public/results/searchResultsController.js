angular.module('searchResultsModule').controller('searchResultsController', ['$scope', '$http', 'toastr','$uibModal', function($scope, $http, toastr,$uibModal){

	$scope.myInterval = 5000;
  $scope.noWrapSlides = false;
}]);