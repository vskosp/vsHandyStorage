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