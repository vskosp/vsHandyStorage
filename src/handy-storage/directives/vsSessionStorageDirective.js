angular.module('vsHandyStorage')
	.directive('vsSessionStorage', ['vsStorageControllerProvider', 'vsSessionStorageAPI', function(vsStorageControllerProvider, vsSessionStorageAPI) {  						   
		return {
            restrict: 'A',
            controller: ['$scope', '$element', '$attrs', vsStorageControllerProvider.getController('vsSessionStorage', vsSessionStorageAPI)]
        };	
    }]);