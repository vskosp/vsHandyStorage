angular.module('vsHandyStorage', ['ngStorage'])
    .factory('vsStorageFactory', ['$localStorage', function($localStorage) {
		function createScope(scopeName) {
		    var scope = {};
		    scope[scopeName] = {};
			return scope;
		}		
		function initStorage(scope) {
		    $localStorage.$default(scope);
		}
		
		function create(name) {
		    if (name in $localStorage)
			    return $localStorage[name];
		    
			var scope = createScope(name);
			initStorage(scope);
			
			return $localStorage[name];
		}
		
		return {
		    create: create
		};
	 }])	 
    .directive('vsLocalStorage', ['vsStorageFactory', function(vsStorageFactory) {
        return {
            restrict: 'A',
            controller: function($scope, $element, $attrs) {
                var storage = vsStorageFactory.create($attrs.vsLocalStorage);
			
				this.put = function(key, value) {
				    storage[key] = value;
                };
				this.get = function(key) {
				    return storage[key];
                };
            }
        }
    }])
	.directive('vsLinkStorage', function() {
        return {
            restrict: 'A',
            require: ['^vsLocalStorage', 'ngModel'],
            link:function(scope, element, attrs, controllers) {
                var vsLocalStorage = controllers[0];
                var ngModel = controllers[1];
	
                var initValue = vsLocalStorage.get(attrs.name);
                if (initValue !== undefined) {
                    ngModel.$setViewValue(initValue);
                    ngModel.$render();
                }                
				
                scope.$watch(attrs.ngModel, function() {
                    if(ngModel.$dirty) {
 					   vsLocalStorage.put(attrs.name, ngModel.$modelValue);
                    }
                });
            } 
        }
    });