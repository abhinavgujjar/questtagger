/*global console*/

'use strict';


// Declare app level module which depends on filters, and services
angular.module('quest', ['tjGoog',
	'ui.bootstrap.tpls',
	'ui.bootstrap.typeahead',
	'ngResource',
	'ui.bootstrap.modal'
]).controller('maincontroller', function($scope, goog, $sce, $q, $modal, wfservice) {
	$scope.files = [];
	var userProfile;

	$scope.filterTags = [];

	goog.ready.then(function() {
		$scope.ready = true;
	})

	$scope.addFilterTag = function(tag) {

		$scope.filterTags.push(tag);

		//findFilesByTag();

	}

	var allFiles;

	$scope.$watch('myTasks', function(newValue, oldValue) {
		if (newValue != oldValue) {

			if (newValue) {
				var filteredFiles = [];
				angular.forEach($scope.files, function(item) {
					if (item.steps) {
						angular.forEach(item.steps, function(step) {
							if (step.person === userProfile.defaultEmail) {
								filteredFiles.push(item);
							}
						});
					}
				});

				allFiles = $scope.files;
				$scope.files = filteredFiles;
			} else {
				$scope.files = allFiles;
			}

		}
	})

	$scope.removeFilter = function(tag) {
		var index = $scope.filterTags.indexOf(tag);
		if (index > -1) {
			$scope.filterTags.splice(index, 1);
		}

		//findFilesByTag();
	}

	function findFilesByTag() {

		$scope.isLoading = true;

		goog.ready.then(function(gapi) {
			return goog.search($scope.filterTags);
		}).then(function(items) {

			$scope.files = items;
			$scope.isLoading = false;

			loadWf(items);

		});
	}

	function loadWf(items) {

		var promises = [];

		angular.forEach(items, function(file) {
			angular.forEach(file.properties, function(prop) {
				if (prop.key === 'workflow') {
					promises.push(wfservice.getWorkflow(file.id).then(function(steps) {
						file.steps = steps;
					}));
				}
			});

		});

		return $q.all(promises);
	}


	//$scope.previewUrl = $sce.trustAsResourceUrl("https://docs.google.com/document/d/1uhs-a41dp2z0NLs-QiXYY-rqLGhgjmTf4iwBad2myzY/preview");
	$scope.selectFile = function(file) {
		$scope.previewUrl = $sce.trustAsResourceUrl(file.embedLink);
	};

	$scope.login = function() {
		$scope.isLoading = true;
		goog.signIn().then(function() {

			userProfile = goog.getUserProfile();

			goog.retrieveAllFiles().then(function(items) {
				$scope.files = items;
				loadWf(items).then(function() {
					$scope.isLoading = false;

				});
			});

		});
	};

	$scope.addTag = function(file, tag) {
		goog.ready.then(function(gapi) {
			goog.insertProperty(gapi, file.id, tag, 'QTAG', 'PUBLIC').then(function(prop) {
				if (prop) {
					file.properties = file.properties || [];
					file.properties.push(prop);
					file.addMode = false;
				}
			});
		});
	};


	$scope.open = function(file) {

		var modalInstance = $modal.open({
			templateUrl: 'myModalContent.html',
			controller: ModalInstanceCtrl,
			size: 'sm',
			resolve: {
				file: function() {
					return file;
				}
			}
		});

		modalInstance.result.then(function(steps) {

			goog.insertProperty(gapi, file.id, 'workflow', 'true', 'PUBLIC')
				.then(function(prop) {
					file.properties = file.properties || [];
					file.properties.push(prop);

					wfservice.saveSteps(file.id, steps);

				});


		}, function() {
			console.log('Modal dismissed at: ' + new Date());
		});
	};

	$scope.getWorkflow = function(file) {
		var steps = [];
		angular.forEach(file.properties, function(prop) {
			if (prop.key === 'workflow') {
				return angular.fromJson(prop.value);
			}
		});

		return steps;
	}

	$scope.filterByTag = function(filterTags) {
		return function(item) {
			if (!filterTags || filterTags.length == 0) {
				return true;
			} else {
				var match;
				angular.forEach(filterTags, function(tag){
					angular.forEach(item.properties, function(prop){
						if ( prop.value === tag.value && prop.key === tag.key ){
							match = true;
						}
					});
				});

				return match;

			}
		}
	}



});


var ModalInstanceCtrl = function($scope, $modalInstance, file) {

	$scope.file = file;

	$scope.steps = file.steps;

	$scope.addStep = function(file, nextPerson) {
		if (!$scope.steps) {
			$scope.steps = [];
		}

		$scope.steps.push({
			person: nextPerson
		});
	}

	$scope.ok = function() {
		$modalInstance.close($scope.steps);
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

};


angular.module('quest')
	.filter('steps', function() {
		return function(prop) {
			if (prop && prop.length > 0) {
				return angular.fromJson(prop[0].value);
			} else {
				return [];
			}
		}
	});