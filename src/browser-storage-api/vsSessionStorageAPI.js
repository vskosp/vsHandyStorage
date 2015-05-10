angular.module('vsBrowserStorageAPI')
	.factory('vsSessionStorageAPI', ['ngStorageAPI', function(ngStorageAPI) {
		var storageService = ngStorageAPI.SESSION_STORAGE_SERVICE,
		    vsStorageAPI = new ngStorageAPI(storageService);
		return vsStorageAPI;
	}]);