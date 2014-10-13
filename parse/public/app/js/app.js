/*global console*/

'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('quest', ['tjGoog',
	'ui.bootstrap.tpls',
	'ui.bootstrap.typeahead',
	'ui.bootstrap.tabs',
	'ngResource',
	'ui.bootstrap.modal',
	'ui.bootstrap.pagination',
	'ui.router',
	'ngAnimate'
]);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');

	$stateProvider.state('landing', {
		url: '/landing',
		templateUrl: 'partials/landing.html'
	});

	$stateProvider.state('home', {
		url: '/home',
		templateUrl: 'partials/login.html'
	});

	$stateProvider.state('results', {
		url: '/results',
		templateUrl: 'partials/results.html'
	});


});


app.filter('offset', function() {
  return function(input, start) {
    start = parseInt(start, 10);
    return input.slice(start);
  };
});