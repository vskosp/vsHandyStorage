/**
 * vsHandyStorage - v1.0.0-beta.1 - 2015-05-10
 * https://github.com/vskosp/vsHandyStorage
 * Copyright (c) 2015 K.Polishchuk
 * License: MIT
 */
'use strict';

(function() {

    /**
     * @ngdoc overview
     * @name ngStorage
     */

    angular.module('ngStorage', []).

    /**
     * @ngdoc object
     * @name ngStorage.$localStorage
     * @requires $rootScope
     * @requires $window
     */

    factory('$localStorage', _storageFactory('localStorage')).

    /**
     * @ngdoc object
     * @name ngStorage.$sessionStorage
     * @requires $rootScope
     * @requires $window
     */

    factory('$sessionStorage', _storageFactory('sessionStorage'));

    function _storageFactory(storageType) {
        return [
            '$rootScope',
            '$window',

            function(
                $rootScope,
                $window
            ){
                // #9: Assign a placeholder object if Web Storage is unavailable to prevent breaking the entire AngularJS app
                var webStorage = $window[storageType] || (console.warn('This browser does not support Web Storage!'), {}),
                    $storage = {
                        $default: function(items) {
                            for (var k in items) {
                                angular.isDefined($storage[k]) || ($storage[k] = items[k]);
                            }

                            return $storage;
                        },
                        $reset: function(items) {
                            for (var k in $storage) {
                                '$' === k[0] || delete $storage[k];
                            }

                            return $storage.$default(items);
                        }
                    },
                    _last$storage,
                    _debounce;

                for (var i = 0, k; i < webStorage.length; i++) {
                    // #8, #10: `webStorage.key(i)` may be an empty string (or throw an exception in IE9 if `webStorage` is empty)
                    (k = webStorage.key(i)) && 'ngStorage-' === k.slice(0, 10) && ($storage[k.slice(10)] = angular.fromJson(webStorage.getItem(k)));
                }

                _last$storage = angular.copy($storage);

                $rootScope.$watch(function() {
                    _debounce || (_debounce = setTimeout(function() {
                        _debounce = null;

                        if (!angular.equals($storage, _last$storage)) {
                            angular.forEach($storage, function(v, k) {
                                angular.isDefined(v) && '$' !== k[0] && webStorage.setItem('ngStorage-' + k, angular.toJson(v));

                                delete _last$storage[k];
                            });

                            for (var k in _last$storage) {
                                webStorage.removeItem('ngStorage-' + k);
                            }

                            _last$storage = angular.copy($storage);
                        }
                    }, 100));
                });

                // #6: Use `$window.addEventListener` instead of `angular.element` to avoid the jQuery-specific `event.originalEvent`
                'localStorage' === storageType && $window.addEventListener && $window.addEventListener('storage', function(event) {
                    if ('ngStorage-' === event.key.slice(0, 10)) {
                        event.newValue ? $storage[event.key.slice(10)] = angular.fromJson(event.newValue) : delete $storage[event.key.slice(10)];

                        _last$storage = angular.copy($storage);

                        $rootScope.$apply();
                    }
                });

                return $storage;
            }
        ];
    }

})();

(function (window, document) {
'use strict';
angular.module('vsBrowserStorageAPI', ['ngStorage']);
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
angular.module('vsBrowserStorageAPI')
	.factory('vsLocalStorageAPI', ['ngStorageAPI', function(ngStorageAPI) {
		var storageService = ngStorageAPI.LOCAL_STORAGE_SERVICE,
		    vsStorageAPI = new ngStorageAPI(storageService);
		return vsStorageAPI;
	}]);
angular.module('vsBrowserStorageAPI')
	.factory('vsSessionStorageAPI', ['ngStorageAPI', function(ngStorageAPI) {
		var storageService = ngStorageAPI.SESSION_STORAGE_SERVICE,
		    vsStorageAPI = new ngStorageAPI(storageService);
		return vsStorageAPI;
	}]);
angular.module('vsHandyStorage', ['vsBrowserStorageAPI']);
angular.module('vsHandyStorage')
	.factory('vsStorageModelValidator', function() {
	    function isObjectOnly(value) {
		    return Object.prototype.toString.call(value) === '[object Object]';
		}		
		function isValid(model) {
			return isObjectOnly(model);
		}
		function isValueValid(value) {
			var isNull = (value===null),
			    isEmpty = ((""+value).trim()==="");
			return !isNull && !isEmpty;
		}
		
		return {
		    isValid: isValid,
		    isValueValid: isValueValid
		};
	});

angular.module('vsHandyStorage')
	.factory('vsStorageControllerProvider', ['vsStorageModelValidator', function(vsStorageModelValidator) {
		function isBrowserStorageAPIValid(api) {
		    return angular.isDefined(api.set) && angular.isDefined(api.get);
		}
		function getController(directiveName, browserStorageAPI) {
			if(!isBrowserStorageAPIValid(browserStorageAPI))
                throw new Error("browserStorageAPI should have setter and getter");
			
			function storageController($scope, $element, $attrs) {
				var storageName = $attrs[directiveName],
				    storageModel = browserStorageAPI.get(storageName);
				if(!storageName)
                    throw new Error("Bad storage name");
				if(!vsStorageModelValidator.isValid(storageModel)) {
				    var storageDefaultModel = {};
					browserStorageAPI.set(storageName, storageDefaultModel);
					storageModel = browserStorageAPI.get(storageName);
				}
						    
				this.put = function (key, value) {
				    storageModel[key] = vsStorageModelValidator.isValueValid(value) ? value : undefined;
				};
				this.get = function (key) {
				    return storageModel[key];
				};
            }
			
			return storageController;
		}
		
		return {
		    getController: getController
		};
    }]);
angular.module('vsHandyStorage')
	.directive('vsLocalStorage', ['vsStorageControllerProvider', 'vsLocalStorageAPI', function(vsStorageControllerProvider, vsLocalStorageAPI) {
		return {
            restrict: 'A',
            controller: ['$scope', '$element', '$attrs', vsStorageControllerProvider.getController('vsLocalStorage', vsLocalStorageAPI)]
        };
    }]);
angular.module('vsHandyStorage')
	.directive('vsSessionStorage', ['vsStorageControllerProvider', 'vsSessionStorageAPI', function(vsStorageControllerProvider, vsSessionStorageAPI) {  						   
		return {
            restrict: 'A',
            controller: ['$scope', '$element', '$attrs', vsStorageControllerProvider.getController('vsSessionStorage', vsSessionStorageAPI)]
        };	
    }]);
angular.module('vsHandyStorage')
	.directive('vsLinkStorage', function() {
        return {
            restrict: 'A',
            require: ['?^^vsLocalStorage', '?^^vsSessionStorage', 'ngModel'],
            link: function(scope, element, attrs, controllers) {
			    var storageCtrl = controllers[0] || controllers[1],
				    ngModel = controllers[2],
					storageModelKey = attrs.name,
                    storageModelValue;
				
				if (!storageCtrl) 
			        throw new Error("Storage is undefined");
				
				storageModelValue = storageCtrl.get(storageModelKey);
				
				(function initView(storageModelValue) {
                    if (storageModelValue !== undefined) {
                        ngModel.$setViewValue(storageModelValue);
                        ngModel.$render();  
                    }
				})(storageModelValue);
				
				function updateStorageModel(modelValue) {
				    if(ngModel.$dirty) {
 					   storageCtrl.put(storageModelKey, modelValue);
                    }
				}

                scope.$watch(attrs.ngModel, updateStorageModel);
            } 
        };
    });
})(window, document);