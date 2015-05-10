angular.module('vsBrowserStorageAPI')
	.factory('ngStorageAPI', ['$localStorage', '$sessionStorage', function($localStorage, $sessionStorage) {
		function ngStorageAPI(ngStorageService) {
		    this._ngStorageService = ngStorageService;
		}
		ngStorageAPI.prototype.set =  function (key, value) {
		    this._ngStorageService[key] = value;
		};
		ngStorageAPI.prototype.get = function (key) {
		    return this._ngStorageService[key];
		};
		ngStorageAPI.LOCAL_STORAGE_SERVICE = $localStorage;
		ngStorageAPI.SESSION_STORAGE_SERVICE = $sessionStorage;
		
		return ngStorageAPI;
	}]);