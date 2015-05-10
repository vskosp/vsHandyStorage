angular.module('vsBrowserStorageAPI')
	.factory('vsLocalStorageAPI', ['ngStorageAPI', function(ngStorageAPI) {
		var storageService = ngStorageAPI.LOCAL_STORAGE_SERVICE,
		    vsStorageAPI = new ngStorageAPI(storageService);
		return vsStorageAPI;
	}]);