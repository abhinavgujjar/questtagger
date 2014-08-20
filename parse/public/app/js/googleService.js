/*
---
name: Facebook Angularjs

description: Provides an easier way to make use of Facebook API with Angularjs

license: MIT-style license

authors:
  - Ciul

requires: [angular]
provides: [facebook]

...
*/
(function(window, angular, undefined) {
    /*global gapi */
    'use strict';

    var clientId = '335394801683-aase9ohca2cnjm7poonr5ke7cqp98e43.apps.googleusercontent.com';
    //var clientId = '335394801683-tnb7f91o5mv6puetisr9fimvppo24l2u.apps.googleusercontent.com';
    var scopes = 'https://www.googleapis.com/auth/drive';

    // Module global loadDeferred
    var loadDeferred;
    angular.module('tjGoog', []).

    factory('goog', ['$q',

        function($q) {

            var isSigndIn = false;

            function getProfile() {
                var gapi;
                return loadDeferred.promise.then(function(_api) {
                    gapi = _api;
                    var deferred = $q.defer();

                    if (!isSigndIn) {
                        gapi.auth.authorize({
                            client_id: clientId,
                            scope: scopes,
                            immediate: false
                        }, function(authResult) {
                            isSigndIn = true;
                            deferred.resolve(authResult);
                        });

                    } else {
                        deferred.resolve(true);

                    }

                    return deferred.promise;
                }).then(function(authResult) {
                    var deferred = $q.defer();

                    gapi.client.load('drive', 'v2', function() {
                        deferred.resolve();

                    });
                    return deferred.promise;

                }).then(function() {
                    var deferred = $q.defer();

                    var request = gapi.client.drive.files.list();

                    request.execute(function(result) {

                        deferred.resolve(result.items);

                    });

                    return deferred.promise;
                });
            }

            return {
                getProfile: getProfile,
                ready: loadDeferred.promise,
                name: 'google'
            };
        }
    ]).

    run([
        '$q',
        function($q) {
            // Define global loadDeffered to notify when Service callbacks are safe to use
            loadDeferred = $q.defer();


            /**
             * SDK script injecting
             */
            (function() {
                var po = document.createElement('script');
                po.type = 'text/javascript';
                po.async = true;
                po.src = 'https://apis.google.com/js/client:plusone.js';
                var s = document.getElementsByTagName('script')[0];
                po.onload = function() {
                    loadDeferred.resolve(gapi);
                };

                s.parentNode.insertBefore(po, s);
            })();


        }
    ]);

})(window, angular);