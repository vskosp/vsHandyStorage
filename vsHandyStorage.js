angular.module('vsHandyStorage', ['ngStorage'])
    .directive('vsLocalStorage', function($localStorage) {
        return {
            restrict: 'A',
            controller: function($scope, $element, $attrs) {
                var storageName = $attrs.vsLocalStorage;
                var storageOptions = {};
                storageOptions[storageName] = {};
				
			    function create() {
				    $localStorage.$default(storageOptions);
				};
				function isCreated() {
				    return !!$localStorage[storageName]; //unsafe
				};
				
				this.put = function(key, value) {
				    if(!isCreated())
					    create();
				    $localStorage[storageName][key] = value;
				};
				this.get = function(key) {
				    if (isCreated() && (key in $localStorage[storageName])) {
                        return $localStorage[storageName][key];
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

                var initValue = vsLocalStorage.get(attrs.ngModel);
                if (initValue !== undefined) {
                    scope[attrs.ngModel] = initValue;
                }                
				
                scope.$watch(attrs.ngModel, function() {
                    if(ngModel.$valid) {
 					   vsLocalStorage.put(attrs.ngModel, ngModel.$modelValue);
                    }
                });
            }
        }
    });