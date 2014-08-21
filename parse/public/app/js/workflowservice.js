	/*global console*/

	'use strict';


	// Declare app level module which depends on filters, and services
	angular.module('quest')
		.factory('wfservice', function($http, $q) {
			var parseHeaders = {
				'X-Parse-Application-Id': 'VhSVXNkuGnXNaL5ZidhJ2Z84SGU0Broc3W0ARshg',
				'X-Parse-REST-API-Key': '0ZTV2U2XlpngUWwheBbregw0YZtlxTpRgvKYhWH8',
				'Content-Type': 'application/json'
			}


			return {
				getWorkflow: function(files) {

				},
				saveSteps: function(fileId, steps) {
					angular.forEach(steps, function(step, index) {
						step.fileId = fileId;
						step.step = index;
						$http.post('https://api.parse.com/1/classes/steps', step, {
							headers: parseHeaders
						});
					});

				}
			}

		});