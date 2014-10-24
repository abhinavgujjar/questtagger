app.controller('maincontroller', function($scope, goog, $sce, $q, $modal, wfservice, landingService, $location) {

	$scope.files = goog.sample;

	var userProfile;



	$scope.tagFiles = landingService.getTagFiles();

	$scope.filterTags = [];

	$scope.page = 1;
	$scope.itemsPerPage = 30;

	$scope.checkedFiles = {}



	$scope.pageChanged = function() {
		console.log('Page changed to: ' + $scope.page);
	};

	$scope.addTag = function(tag) {

		_.each($scope.selectedFiles, function(file) {

			var target = _.findWhere(file.properties, {
				value: 'QTAG',
				key: tag
			});

			if (!target) {

				goog.ready.then(function(gapi) {

					file.modding =true;

					goog.insertProperty(gapi, file.id, tag, 'QTAG', 'PUBLIC').then(function(prop) {
						if (prop) {
							file.properties = file.properties || [];
							file.properties.push(prop);
							file.addMode = false;
						}

						file.modding = false;

						refreshActiveTags();
					});
				});
			}
		});



	}

	$scope.removeTag = function(tag) {

		_.each($scope.selectedFiles, function(file) {

			var target = _.findWhere(file.properties, {
				value: 'QTAG',
				key: tag
			});

			if (target) {
				goog.ready.then(function(gapi) {
					goog.removeProperty(gapi, file.id, tag).then(function(prop) {

						file.properties.splice(file.properties.indexOf(target), 1);

						refreshActiveTags();
					});
				});


			}

		});


	}

	$scope.availableTags = ['education', 'employability', 'Resource', 'HID'];
	$scope.availableFunctionTags = ['R&D', 'Training', 'CPK', 'M&E', 'IT', 'Finance & Admin'];
	$scope.availableProjectTags = ['S2S', 'Equip_Youth', 'Youth_Spark', 'Anandshala', 'Videoshala', 'Lifeline', 'English', 'Master_coach', 'Navigator', 'Enrichment','Career_Development', 'Build_your_business', 'Big_picture', 'professional_pathways', 'partnership_development', 'branding_and_communication']


	$scope.addFilterTag = function(tag) {

		if (tag) {
			$scope.filterTags.push({
				key: tag
			});
		}

		$location.url('/results');

		//findFilesByTag();

	}

	$scope.selection = [];

	$scope.toggleSelection = function toggleSelection(file) {
		var idx = $scope.selection.indexOf(file);

		// is currently selected
		if (idx > -1) {
			$scope.selection.splice(idx, 1);
		}

		// is newly selected
		else {
			$scope.selection.push(file);
		}
	};

	var allFiles;

	$scope.selectedFiles = [];

	$scope.toggleFile = function(file) {
		var index = $scope.selectedFiles.indexOf(file);
		if (index > -1) {
			$scope.selectedFiles.splice(index, 1)
		} else {
			$scope.selectedFiles.push(file);
		}

		refreshActiveTags();

	}

	function refreshActiveTags() {

		var tags = [];

		_.each($scope.selectedFiles, function(file) {
			_.each(file.properties, function(prop) {
				if (prop.value === 'QTAG') {
					tags.push(prop.key);
				}
			});
		});


		tags = _.uniq(tags);


		$scope.activeTags = tags;

	}

	$scope.activeTags = [];


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

			//loadWf(items);

		});
	}

	//$scope.previewUrl = $sce.trustAsResourceUrl("https://docs.google.com/document/d/1uhs-a41dp2z0NLs-QiXYY-rqLGhgjmTf4iwBad2myzY/preview");
	$scope.selectFile = function(file) {
		$scope.previewUrl = $sce.trustAsResourceUrl(file.embedLink);
	};

	$scope.login = function() {
		$scope.isLoading = true;

		goog.signIn().then(function() {

			return goog.getUserProfile();

		}).then(function() {

			return goog.retrieveAllFiles();

		}).then(function(items) {

			var folders = manageFolders(items);

			$scope.files = items;

			$scope.isLoading = false;

			$location.url('/landing');

		}, null, function(numberOfFiles) {
			$scope.fileCount = numberOfFiles;
		});

	}

	var folders = {};

	function manageFolders(allFiles){
		_.each(allFiles, function(item){
			if (item.mimeType == 'application/vnd.google-apps.folder'){
				folders[item.id] = item.title;
			}
		})

		_.each(allFiles, function(item){
			_.each(item.parents, function(parent){
				parent.title = folders[parent.id];
			})
		})

		return folders;
	}

	$scope.filterByTag = function(filterTags) {

		return function(item) {
			if (!filterTags || filterTags.length == 0) {
				return true;
			} else {
				var match;
				angular.forEach(filterTags, function(tag) {
					angular.forEach(item.properties, function(prop) {
						if (prop.key === tag.key) {
							match = true;
						}
					});
				});

				return match;

			}
		}
	}



});