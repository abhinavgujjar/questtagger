	/*global console*/

	'use strict';


	// Declare app level module which depends on filters, and services
	angular.module('quest', ['tjGoog', 'ui.bootstrap.tpls', 'ui.bootstrap.typeahead'])
		.controller('maincontroller', function($scope, goog, $sce, $q) {
			$scope.files = [{
				title: 'sdasd',
				properties: [{
					key: 'document',
					value: 'QTAG'

				}],
				editable : true
			}];

			$scope.doSomething = function(){
				alert('asd');
			}

			$scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

			$scope.filterTags = [];

			goog.ready.then(function() {
				$scope.ready = true;
			})

			$scope.addFilterTag = function(tag) {

				$scope.filterTags.push(tag);

				findFilesByTag();

			}

			$scope.removeFilter = function(tag) {
				var index = $scope.filterTags.indexOf(tag);
				if (index > -1) {
					$scope.filterTags.splice(index, 1);
				}

				findFilesByTag();
			}

			function findFilesByTag() {

				$scope.isLoading = true;


				goog.ready.then(function(gapi) {
					var query = '';
					var first = true;
					angular.forEach($scope.filterTags, function(ftag) {
						if (!first) {
							query += ' or ';
						}

						query += "(properties has { key='" + ftag.key + "' and value='QTAG' and visibility='PUBLIC' })";

						first = false;
					});

					var request = gapi.client.drive.files.list({
						q: query
					});

					request.execute(function(result) {
						if (result.error) {
							alert('shit happened');
						} else {
							$scope.$apply(function() {
								$scope.files = result.items;
								$scope.isLoading = false;

							});
						}


					});


				});
			}


			//$scope.previewUrl = $sce.trustAsResourceUrl("https://docs.google.com/document/d/1uhs-a41dp2z0NLs-QiXYY-rqLGhgjmTf4iwBad2myzY/preview");
			$scope.selectFile = function(file) {
				$scope.previewUrl = $sce.trustAsResourceUrl(file.embedLink);
			};

			$scope.login = function() {
				$scope.isLoading = true;
				goog.getProfile().then(function(profile) {
					$scope.isLoading = false;
					$scope.files = profile;
				});
			};

			$scope.addTag = function(file, tag) {
				goog.ready.then(function(gapi) {
					insertProperty(gapi, file.id, tag, 'QTAG', 'PUBLIC').then(function(prop) {
						if (prop) {
							file.properties = file.properties || [];
							file.properties.push(prop);
							file.addMode = false;
						}
					});
				});
			};

			function insertProperty(gapi, fileId, key, value, visibility) {
				var deferred = $q.defer();

				var body = {
					'key': key,
					'value': value,
					'visibility': visibility
				};

				var request = gapi.client.drive.properties.insert({
					'fileId': fileId,
					'resource': body
				});
				request.execute(function(resp) {
					deferred.resolve(resp.result);
				});

				return deferred.promise;
			}


		});