

app.controller('searchController', function($scope, goog, $location) {

	var tags = $scope.tagFiles = {};

	_.each($scope.files, function(file){
		_.each(file.properties, function(prop){
			if ( prop.value === 'QTAG'){
				if ( !tags[prop.key] ){
					tags[prop.key] = 1;
				}else
				{
					tags[prop.key] ++ ;
				}
			}
		})
	});

	

});