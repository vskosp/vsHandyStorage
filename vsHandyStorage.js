angular.module('vsHandyStorage', ['ngStorage'])
    .directive('vsLocalStorage', function($localStorage) {
        return {
            restrict: 'A',
            controller: function($scope, $element, $attrs) {
                var storageName = $attrs.vsLocalStorage;
				var storage = $localStorage;
				
			    function create() {
				    var storageOptions = {};
                    storageOptions[storageName] = {};
				    storage.$default(storageOptions);
				};
				function isCreated() {
				    return !!storage[storageName]; //unsafe
				};
				
				this.put = function(key, value) {
				    if(!isCreated())
					    create();
				    storage[storageName][key] = value;
				};
				this.get = function(key) {
				    if (isCreated()) {
                        return storage[storageName][key];
					} else { 
					    return undefined;
					}
                };
            }
        }
    })
	.directive('vsLinkStorage', function() {
        return {
            restrict: 'A',
            require: ['^vsLocalStorage', 'ngModel'],
            link:function(scope, element, attrs, controllers) {
                var vsLocalStorage = controllers[0];
                var ngModel = controllers[1];

                var initValue = vsLocalStorage.get(attrs.name);
                if (initValue !== undefined) {
                    scope[attrs.ngModel] = initValue;
                }                
				
                scope.$watch(attrs.ngModel, function() {
                    if(ngModel.$valid && ngModel.$dirty) {
 					   vsLocalStorage.put(attrs.name, ngModel.$modelValue);
                    }
                });
            } 
        }
    });