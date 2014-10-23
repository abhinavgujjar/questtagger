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

    var fields = "items(description,editable,iconLink,id,properties,title,defaultOpenWithLink,alternateLink, owners(displayName,picture)),nextPageToken";

    var clientId = '335394801683-p18s56v2q0ghp25m1tbk2s3iagicog84.apps.googleusercontent.com';
    //var clientId = '335394801683-tnb7f91o5mv6puetisr9fimvppo24l2u.apps.googleusercontent.com';
    var scopes = 'https://www.googleapis.com/auth/drive profile email https://www.googleapis.com/auth/drive.apps.readonly https://www.googleapis.com/auth/drive.readonly';

    // Module global loadDeferred
    var loadDeferred;



    angular.module('tjGoog', []).

    factory('goog', ['$q',

        function($q) {
            var userProfile = {};
            var isSigndIn = false;

            function retrieveAllFiles() {


                var deferred = $q.defer();
                var retrievePageOfFiles = function(request, result) {
                    request.execute(function(resp) {
                        if (!resp || !resp.nextPageToken) {
                            deferred.resolve(result);

                        } else {
                            result = result.concat(resp.items);

                            deferred.notify(result.length);

                            var nextPageToken = resp.nextPageToken;
                            if (nextPageToken) {
                                request = gapi.client.drive.files.list({
                                    'pageToken': nextPageToken,
                                    fields: fields,
                                    maxResults: 500
                                });
                                retrievePageOfFiles(request, result);
                            }
                        }
                    });
                }

                var initialRequest = gapi.client.drive.files.list({
                    fields: fields,
                    maxResults: 500
                });
                retrievePageOfFiles(initialRequest, []);


                return deferred.promise;
            }

            function signIn() {
                var gapi;

                if (isSigndIn) {

                    var deferred = $q.defer();
                    deferred.resolve(true);
                    return deferred.promise;
                }

                return loadDeferred.promise.then(function(_api) {
                    gapi = _api;
                    var deferred = $q.defer();

                    gapi.auth.authorize({
                        client_id: clientId,
                        scope: scopes,
                        immediate: false
                    }, function(authResult) {
                        isSigndIn = true;
                        deferred.resolve(authResult);
                    });


                    return deferred.promise;
                }).then(function(authResult) {


                    var deferred = $q.defer();

                    gapi.client.load('plus', 'v1', function() {
                        if (authResult.access_token) {
                            deferred.resolve(authResult);
                        } else if (authResult.error) {
                            deferred.reject(authResult.error);
                        }
                    });

                    return deferred.promise;

                }).then(function() {
                    var deferred = $q.defer();

                    var request = gapi.client.plus.people.get({
                        'userId': 'me'
                    });

                    request.execute(function(profile) {

                        if (profile.error) {
                            deferred.reject(profile.error);
                        }

                        userProfile = profile;

                        if (profile.emails) {
                            angular.forEach(profile.emails, function(item) {
                                if (item.type === 'account') {
                                    userProfile.defaultEmail = item.value;
                                }
                            })
                        }
                        deferred.resolve(userProfile);

                    });

                    return deferred.promise;
                }).then(function() {
                    var deferred = $q.defer();

                    gapi.client.load('drive', 'v2', function() {
                        deferred.resolve();

                    });
                    return deferred.promise;

                });
            }

            function search(filterTags) {
                var deferred = $q.defer();

                var query = '';
                var first = true;
                angular.forEach(filterTags, function(ftag) {
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
                        deferred.reject(result.error);
                    } else {
                        deferred.resolve(result.items);
                    }


                });

                return deferred.promise;
            }

            function removeProperty(gapi, fileId, key) {
                var deferred = $q.defer();

                var request = gapi.client.drive.properties.delete({
                    'fileId': fileId,
                    'propertyKey': key,
                    'visibility': 'PUBLIC'
                });

                request.execute(function(resp) {
                    deferred.resolve(resp.result);
                });

                return deferred.promise;
            }

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

            return {
                signIn: signIn,
                ready: loadDeferred.promise,
                search: search,
                isSigndIn: isSigndIn,
                insertProperty: insertProperty,
                removeProperty: removeProperty,
                retrieveAllFiles: retrieveAllFiles,
                sample: sample,
                getUserProfile: function() {
                    return userProfile;
                }
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