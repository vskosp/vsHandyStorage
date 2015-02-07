angular.module('vsHandyStorage', ['ngStorage'])
    .directive('vsLocalStorage', function($localStorage) {
        return {
            restrict: 'A',
            controller: function($scope, $element, $attrs) {
                var storageName = $attrs.vsLocalStorage;
                var storageOptions = {};
                storageOptions[storageName] = {};
                $localStorage.$default(storageOptions);
             
                this.getStorage = function() {
                     return $localStorage[storageName];
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
                var localStorage = vsLocalStorage.getStorage();
                
                scope.$watch(attrs.ngModel, function() {
                    if(ngModel.$valid) {
                       localStorage[attrs.ngModel] = ngModel.$modelValue;
                    }
                });
                
                if (attrs.ngModel in localStorage) {
                    scope[attrs.ngModel] = localStorage[attrs.ngModel];
                }
            }
        }
    });