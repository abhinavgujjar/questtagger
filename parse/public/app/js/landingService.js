	/*global console*/

	'use strict';


	// Declare app level module which depends on filters, and services
	angular.module('quest')
		.factory('landingService', function($http, $q, $resource) {


			var tagFiles = [{
				count : 10,
				name : 'posters'
			},{
				count : 100,
				name : 'employability'
			},{
				count : 12,
				name : 'training'
			},{
				count : 88,
				name : 'research'
			},{
				count : 455,
				name : 'education'
			},{
				count : 73,
				name : 'youth'
			},{
				count : 12,
				name : 'english'
			},{
				count : 700,
				name : 'lesson'
			}]

			return {
				getTagFiles: function() {
					
					return tagFiles;

				}
			}

		});