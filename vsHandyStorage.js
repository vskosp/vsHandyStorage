angular.module('vsHandyStorage', ['ngStorage'])
    .factory('vsStorageService', ['$localStorage', '$sessionStorage', function($localStorage, $sessionStorage) {
		function createScope(scopeName) {
		    var scope = {};
		    scope[scopeName] = {};
			return scope;
		}		
		
		function create(storage, name) {
		    if (name in storage)
			    return storage[name];	    
			storage.$default(createScope(name));
			return storage[name];
		}
		
		function createLocal(name) {
		    var localStorage = create($localStorage, name);
			return localStorage;
		}
		function createSession(name) {
		    var sessionStorage = create($sessionStorage, name);
			return sessionStorage;
		}
		
		return {
		    createLocal: createLocal,
		    createSession: createSession
		};
	 }])
    .factory('vsAbstractStorageModel', function() {
        function AbstractStorage() {
		    function isValid(value) {
			    var isNull = (value===null);
				var isEmpty = ((""+value).trim()==="");
				return !isNull && !isEmpty;
			}
			
		    this.storage = {};
            this.put = function (key, value) {
                this.storage[key] = isValid(value) ? value : undefined;
            };
            this.get = function (key) {
                return this.storage[key];
            };
		}
		
		return new AbstractStorage();
    })
	.factory('vsLocalStorageModel', ['vsAbstractStorageModel', 'vsStorageService', function(vsAbstractStorageModel, vsStorageService) {
        function LocalStorage(name) {        
            this.storage = vsStorageService.createLocal(name);
        }
        LocalStorage.prototype = vsAbstractStorageModel;
    
        return LocalStorage;
    }])
    .factory('vsSessionStorageModel', ['vsAbstractStorageModel', 'vsStorageService', function(vsAbstractStorageModel, vsStorageService) {
        function SessionStorage(name) {        
            this.storage = vsStorageService.createSession(name);
        }
        SessionStorage.prototype = vsAbstractStorageModel;
    
        return SessionStorage;
    }])		
    .directive('vsLocalStorage', ['vsLocalStorageModel', function(vsLocalStorageModel) {
        return {
            restrict: 'A',
            controller: function($scope, $element, $attrs) {
                var storageName = $attrs.vsLocalStorage;
	      		if(!storageName)
                    throw new Error("Bad storage name");
				var storage = new vsLocalStorageModel(storageName);    
				
				this.storage = storage;
            }
        }
    }])
	.directive('vsSessionStorage', ['vsSessionStorageModel', function(vsSessionStorageModel) {
        return {
            restrict: 'A',
            controller: function($scope, $element, $attrs) {
			    var storageName = $attrs.vsSessionStorage;
	      		if(!storageName)
                    throw new Error("Bad storage name");
                var storage = new vsSessionStorageModel(storageName);    
				
				this.storage = storage;
            }
        }
    }])
	.directive('vsLinkStorage', function() {
        return {
            restrict: 'A',
            require: ['?^^vsLocalStorage', '?^^vsSessionStorage', 'ngModel'],
            link:function(scope, element, attrs, controllers) {
			    var storageCtrl = controllers[0] || controllers[1];
				if (!storageCtrl) 
			        throw new Error("Storage is undefined");
                var storage = storageCtrl.storage;
                var ngModel = controllers[2];
	
                var initValue = storage.get(attrs.name);
                if (initValue !== undefined) {
                    ngModel.$setViewValue(initValue);
                    ngModel.$render();  
                }                
				
                scope.$watch(attrs.ngModel, function() {
                    if(ngModel.$dirty) {
 					   storage.put(attrs.name, ngModel.$modelValue);
                    }
                });
            } 
        }
    });