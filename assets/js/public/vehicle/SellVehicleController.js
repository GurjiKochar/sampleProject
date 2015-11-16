angular.module('SellVehicleModule').controller('SellVehicleController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){
	// set-up loading state
	$scope.sellVehicleForm = {
		loading: false
	}
}]);