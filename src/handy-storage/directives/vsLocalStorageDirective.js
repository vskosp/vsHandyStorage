angular.module('vsHandyStorage')
	.directive('vsLocalStorage', ['vsStorageControllerProvider', 'vsLocalStorageAPI', function(vsStorageControllerProvider, vsLocalStorageAPI) {
		return {
            restrict: 'A',
            controller: ['$scope', '$element', '$attrs', vsStorageControllerProvider.getController('vsLocalStorage', vsLocalStorageAPI)]
        };
    }]);