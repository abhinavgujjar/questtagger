(function() {


	function loginController($scope, $location, goog) {

		$scope.ready = false;

		goog.ready.then(function() {
			$scope.ready = true;
		})


	}

	angular.module('quest').
	controller('loginController', loginController);


})();